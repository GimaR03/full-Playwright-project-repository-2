// tests/positive_functional_part2.spec.js
// IT3040 ITPM Assignment 1 – Positive Functional Test Cases (continued)
// TC IDs: Pos_Fun_0013 to Pos_Fun_0025

const { test, expect } = require('@playwright/test');
const { translateAndGetOutput } = require('../helpers/translatorPage');

// ─────────────────────────────────────────────────────────────────────────────
// 4. GRAMMATICAL FORMS
// ─────────────────────────────────────────────────────────────────────────────

test('Pos_Fun_0013 – Convert past tense sentence', async ({ page }) => {
  // TC: Past tense | Daily language usage | S | Accuracy validation
  const output = await translateAndGetOutput(page, 'mama iiyee gedhara giyaa.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
  expect(output).not.toBe('mama iiyee gedhara giyaa.');
});

test('Pos_Fun_0014 – Convert future tense sentence with capital letters', async ({ page }) => {
  // TC: Future tense | Daily language usage | M | Accuracy validation
  const output = await translateAndGetOutput(page, 'api iiLaGa sathiyee gedhara yamu.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
});

test('Pos_Fun_0015 – Convert plural third-person pronoun', async ({ page }) => {
  // TC: Plural form | Daily language usage | S | Accuracy validation
  const output = await translateAndGetOutput(page, 'eyaalaa enavaa.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
});

test('Pos_Fun_0016 – Convert present-tense sentence with pronoun variation', async ({ page }) => {
  // TC: Present tense | Daily language usage | S | Accuracy validation
  const output = await translateAndGetOutput(page, 'mama dhaen vaeda karanavaa.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. MIXED SINGLISH + ENGLISH (Places, Brand Terms, Abbreviations)
// ─────────────────────────────────────────────────────────────────────────────

test('Pos_Fun_0016b – Retain English place name Colombo in output', async ({ page }) => {
  // TC: Simple sentence | Names / places / common English words | M | Accuracy validation
  const output = await translateAndGetOutput(page, 'siiyaa Colombo yanna hadhannee.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
  expect(output).toContain('Colombo');
});

test('Pos_Fun_0017 – Retain brand name Zoom in mixed sentence', async ({ page }) => {
  // TC: Simple sentence | Mixed Singlish + English | M | Accuracy validation
  const output = await translateAndGetOutput(page, 'Zoom meeting ekak thiyennee.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
  expect(output).toContain('Zoom');
});

test('Pos_Fun_0022 – Retain abbreviations OTP and SMS in output', async ({ page }) => {
  // TC: Past tense | Mixed Singlish + English | M | Accuracy validation
  const output = await translateAndGetOutput(page, 'mata OTP eka SMS ekakata aava.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
  expect(output).toContain('OTP');
  expect(output).toContain('SMS');
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. PUNCTUATION, NUMBERS AND FORMATTING
// ─────────────────────────────────────────────────────────────────────────────

test('Pos_Fun_0018 – Preserve currency value Rs. 5343', async ({ page }) => {
  // TC: Interrogative | Punctuation / numbers | M | Accuracy validation
  const output = await translateAndGetOutput(page, 'meeka Rs. 5343 ka vadhi kiimayakdha?');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
  expect(output).toContain('5343');
});

test('Pos_Fun_0019 – Preserve date in DD/MM/YYYY format', async ({ page }) => {
  // TC: Simple sentence | Punctuation / numbers | M | Accuracy validation
  const output = await translateAndGetOutput(page, 'heta 25/12/2025 vennee.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
  expect(output).toContain('25/12/2025');
});

test('Pos_Fun_0020 – Preserve unit of measurement kg', async ({ page }) => {
  // TC: Simple sentence | Punctuation / numbers | M | Accuracy validation
  const output = await translateAndGetOutput(page, 'meeka kiloogram 2 kg thamai.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
  expect(output).toContain('kg');
});

test('Pos_Fun_0021 – Handle multiple spaces in input', async ({ page }) => {
  // TC: Simple sentence | Formatting (spaces / line breaks / paragraph) | M | Accuracy validation
  const output = await translateAndGetOutput(page, 'mama gedhara   yanavaa.');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. SLANG AND LONG INPUT
// ─────────────────────────────────────────────────────────────────────────────

test('Pos_Fun_0023 – Convert slang expression ela machan', async ({ page }) => {
  // TC: Simple sentence | Slang / informal language | M | Accuracy validation
  const output = await translateAndGetOutput(page, 'ela machan! supiri!!');
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
});

test('Pos_Fun_0025 – Convert long mixed paragraph input', async ({ page }) => {
  // TC: Complex sentence | Mixed Singlish + English | L | Accuracy validation
  const longInput =
    'mama office yanna late vunaa traffic nisaa. Eheta gihin boss kiyanakota mata eeka maraa giyaa. ' +
    'Dhaen mama heta ilin yannam. Mama email ekak evanna oonee reports attach karalaa. ' +
    'WiFi baelaa nam hotspot ekak dhaapan. Meeting ekee link eka WhatsApp karanna puLuvandha? ' +
    'Api passee kathaa karamu.';
  const output = await translateAndGetOutput(page, longInput, 4000);
  expect(output).toMatch(/[\u0D80-\u0DFF]/);
  expect(output.length).toBeGreaterThan(20);
});
