// tests/negative_functional.spec.js
// IT3040 ITPM Assignment 1 – Negative Functional Test Cases
// TC IDs: Neg_Fun_0001 to Neg_Fun_0010
// These tests verify that the system FAILS or behaves incorrectly for edge inputs.
// A "Pass" result in Playwright means the FAILURE BEHAVIOUR was correctly observed.

const { test, expect } = require('@playwright/test');
const { translateAndGetOutput } = require('../helpers/translatorPage');

test('Neg_Fun_0001 – Joined words without spaces fail to convert correctly', async ({ page }) => {
  // TC: Simple sentence | Typographical error handling | M | Robustness validation
  // Expected: system cannot segment joined words → output = input unchanged
  const input = 'mamagedharayanavaa';
  const output = await translateAndGetOutput(page, input);
  // The system should NOT produce proper Sinhala script for fully joined input
  // Verify output does NOT fully convert to Sinhala (failure case)
  const hasSinhala = /[\u0D80-\u0DFF]/.test(output);
  const isUnchanged = output.trim() === input;
  // Either no Sinhala produced OR output is same as input = confirmed failure
  expect(hasSinhala === false || isUnchanged).toBeTruthy();
});

test('Neg_Fun_0002 – All-caps abbreviations only return unchanged', async ({ page }) => {
  // TC: Simple sentence | Mixed Singlish + English | S | Robustness validation
  const input = 'ASAP FYI VIP TBA';
  const output = await translateAndGetOutput(page, input);
  // No Singlish tokens → output should mirror input without Sinhala conversion
  const hasSinhala = /[\u0D80-\u0DFF]/.test(output);
  expect(hasSinhala).toBeFalsy();
});

test('Neg_Fun_0003 – Misspelled Singlish word produces incorrect output', async ({ page }) => {
  // TC: Simple sentence | Typographical error handling | M | Robustness validation
  // 'baath' (extra 'a') should not correctly map to 'බත්'
  const input = 'mata baath oonee.';
  const output = await translateAndGetOutput(page, input);
  // Check output is either unchanged or doesn't fully convert to expected Sinhala
  // We verify the misspelled token is not correctly converted
  const correctSinhala = 'බත්';
  expect(output).not.toContain(correctSinhala);
});

test('Neg_Fun_0004 – Punctuation-only input returns unchanged', async ({ page }) => {
  // TC: Simple sentence | Punctuation / numbers | S | Robustness validation
  const input = '!!!???';
  const output = await translateAndGetOutput(page, input);
  const hasSinhala = /[\u0D80-\u0DFF]/.test(output);
  expect(hasSinhala).toBeFalsy();
});

test('Neg_Fun_0005 – Mixed Sinhala Unicode + Singlish causes partial failure', async ({ page }) => {
  // TC: Simple sentence | Typographical error handling | M | Robustness validation
  // Native Sinhala Unicode mixed with Singlish words should cause failed conversion
  const input = 'mama මම gedhara yanavaa.';
  const output = await translateAndGetOutput(page, input);
  // The romanised words may not convert when mixed with native script
  // Verify the system does not cleanly produce all-Sinhala output
  expect(output).toBeDefined();
  // At minimum, the output should not be a perfectly clean full Sinhala sentence
  // (checking that 'mama' or 'gedhara' still appear unconverted, or output = input)
  const unchanged = output.includes('mama') || output === input;
  expect(unchanged).toBeTruthy();
});

test('Neg_Fun_0006 – Non-standard romanisation giiyaa not recognised', async ({ page }) => {
  // TC: Past tense | Typographical error handling | M | Robustness validation
  // 'giiyaa' (double-i) is not standard; should not produce correct Sinhala
  const input = 'mama iiyee gedhara giiyaa.';
  const output = await translateAndGetOutput(page, input);
  // The correctly converted past tense token would be 'ගියා'
  // With non-standard spelling it should either be skipped or misrendered
  const correctToken = 'ගියා';
  const partialFail = !output.includes(correctToken) || output.includes('giiyaa');
  expect(partialFail).toBeTruthy();
});

test('Neg_Fun_0007 – Numeric-only input returns unchanged', async ({ page }) => {
  // TC: Simple sentence | Punctuation / numbers | S | Robustness validation
  const input = '12345';
  const output = await translateAndGetOutput(page, input);
  const hasSinhala = /[\u0D80-\u0DFF]/.test(output);
  expect(hasSinhala).toBeFalsy();
  expect(output).toContain('12345');
});

test('Neg_Fun_0008 – Long run-on sentence without punctuation degrades accuracy', async ({ page }) => {
  // TC: Compound sentence | Formatting (spaces / line breaks / paragraph) | L | Robustness validation
  const input =
    'mama gedhara yanavaa oyaa enavadha api kaeema kanna yanavaa saha passe film ekak balanavaa ' +
    'eyaalaa enavaa heta api yamu kiiyaa kiwwaa mama office yanavaa traffic nisaa late vunaa dhaen ' +
    'mata bath kanna oonee api api baelaa innee naehae heta ennee naehae';
  const output = await translateAndGetOutput(page, input, 5000);
  // System is expected to fail on excessively long unpunctuated input
  // Verify output either equals input or has very limited Sinhala conversion
  const sinhalaChars = (output.match(/[\u0D80-\u0DFF]/g) || []).length;
  const inputLength = input.length;
  // If fewer than 5% of output chars are Sinhala, conversion has degraded significantly
  const conversionRatio = sinhalaChars / output.length;
  expect(conversionRatio).toBeLessThan(0.5); // less than 50% Sinhala = degraded
});

test('Neg_Fun_0009 – Random mid-word capitalisation breaks conversion', async ({ page }) => {
  // TC: Simple sentence | Typographical error handling | M | Robustness validation
  const input = 'mAma gEdhara yAnavaa.';
  const output = await translateAndGetOutput(page, input);
  // Non-standard casing should prevent correct transliteration
  const correctExpected = 'මම ගෙදර යනවා.';
  expect(output).not.toBe(correctExpected);
});

test('Neg_Fun_0010 – Line break in input causes split output failure', async ({ page }) => {
  // TC: Interrogative | Formatting (spaces / line breaks / paragraph) | M | Robustness validation
  const input = 'mama gedhara yanavaa.\noyaa enavadha maath ekka yanna?';
  const output = await translateAndGetOutput(page, input, 3000);
  // System should fail to convert both lines correctly
  // Either the second line remains unconverted or full output = full input
  const fullySinhala =
    /[\u0D80-\u0DFF]/.test(output) &&
    !output.includes('mama') &&
    !output.includes('oyaa');
  // We expect it NOT to be fully converted
  expect(fullySinhala).toBeFalsy();
});
