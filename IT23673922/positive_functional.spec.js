// tests/positive_functional.spec.js
// IT3040 ITPM Assignment 1 – Positive Functional Test Cases
// System Under Test: https://www.swifttranslator.com/ (Singlish → Sinhala)
// TC IDs: Pos_Fun_0001 to Pos_Fun_0025

const { test, expect } = require('@playwright/test');
const { translateAndGetOutput } = require('../helpers/translatorPage');

// ─────────────────────────────────────────────────────────────────────────────
// 1. SENTENCE STRUCTURES
// ─────────────────────────────────────────────────────────────────────────────

test('Pos_Fun_0001 – Convert simple present-tense sentence', async ({ page }) => {
  // TC: Simple sentence | Daily language usage | S | Accuracy validation
  const output = await translateAndGetOutput(page, 'mama gedhara yanavaa.');
  expect(output.length).toBeGreaterThan(0);
  // Verify key Sinhala characters appear in output (non-empty Sinhala script)
  expect(output).toMatch(/[\u0D80-\u0DFF]/); // Unicode range for Sinhala script
});

test('Pos_Fun_0002 – Convert compound sentence with two clauses', async ({ page }) => {
  // TC: Compound sentence | Daily language usage | M | Accuracy validation
  const output = await translateAndGetOutput(
    page,
    'api kaeema kanna yanavaa saha passe chithrapatayakuth balanavaa.'
  );
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
  expect(output.length).toBeGreaterThan(10);
});

test('Pos_Fun_0003 – Convert complex conditional sentence', async ({ page }) => {
  // TC: Complex sentence | Daily language usage | M | Accuracy validation
  const output = await translateAndGetOutput(page, 'oya enavaanam mama balan innavaa.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
});

test('Pos_Fun_0004 – Convert interrogative question form', async ({ page }) => {
  // TC: Interrogative | Daily language usage | S | Accuracy validation
  const output = await translateAndGetOutput(page, 'oyaa kavadhdha enna hithan inne?');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
  // Question mark should be preserved
  expect(output).toContain('?');
});

test('Pos_Fun_0005 – Convert imperative command form', async ({ page }) => {
  // TC: Imperative (command) | Daily language usage | S | Accuracy validation
  const output = await translateAndGetOutput(page, 'vahaama enna.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
});

test('Pos_Fun_0006 – Convert positive future-tense sentence', async ({ page }) => {
  // TC: Future tense | Daily language usage | S | Accuracy validation
  const output = await translateAndGetOutput(page, 'api heta enavaa.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
});

test('Pos_Fun_0007 – Convert negative sentence form', async ({ page }) => {
  // TC: Negation | Daily language usage | S | Accuracy validation
  const output = await translateAndGetOutput(page, 'api heta ennee naehae.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
  // Output should not be identical to input (conversion occurred)
  expect(output).not.toBe('api heta ennee naehae.');
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. DAILY LANGUAGE USAGE
// ─────────────────────────────────────────────────────────────────────────────

test('Pos_Fun_0008 – Convert common greeting aayuboovan', async ({ page }) => {
  // TC: Simple sentence | Greeting / request / response | S | Accuracy validation
  const output = await translateAndGetOutput(page, 'aayuboovan!');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
  expect(output).toContain('!');
});

test('Pos_Fun_0009 – Convert polite request with question mark', async ({ page }) => {
  // TC: Interrogative | Greeting / request / response | M | Accuracy validation
  const output = await translateAndGetOutput(
    page,
    'karuNaakaralaa mata podi udhavvak karanna puLuvandha?'
  );
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
  expect(output).toContain('?');
});

test('Pos_Fun_0010 – Convert informal phrasing', async ({ page }) => {
  // TC: Imperative | Slang / informal language | S | Accuracy validation
  const output = await translateAndGetOutput(page, 'eeyi, ooka dhiyan.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
});

test('Pos_Fun_0024 – Convert day-to-day expression', async ({ page }) => {
  // TC: Simple sentence | Daily language usage | S | Accuracy validation
  const output = await translateAndGetOutput(page, 'mata nidhimathayi.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. WORD COMBINATIONS AND PHRASE PATTERNS
// ─────────────────────────────────────────────────────────────────────────────

test('Pos_Fun_0011 – Convert multi-word collocation gihin enna', async ({ page }) => {
  // TC: Imperative | Word combination / phrase pattern | S | Accuracy validation
  const output = await translateAndGetOutput(page, 'gihin enna.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
});

test('Pos_Fun_0012 – Convert repeated word emphasis expression', async ({ page }) => {
  // TC: Simple sentence | Word combination / phrase pattern | S | Accuracy validation
  const output = await translateAndGetOutput(page, 'hari hari');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
});
