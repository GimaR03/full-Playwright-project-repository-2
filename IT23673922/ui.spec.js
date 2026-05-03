// tests/ui.spec.js
// IT3040 ITPM Assignment 1 – UI Test Case
// TC ID: Pos_UI_0001
// Verifies that the Sinhala output field clears when the Singlish input is fully deleted.

const { test, expect } = require('@playwright/test');
const { translateAndGetOutput, clearInputAndGetOutput } = require('../helpers/translatorPage');

test('Pos_UI_0001 – Output field clears when input is fully deleted', async ({ page }) => {
  // Step 1: Navigate and type a valid Singlish sentence
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  const inputLocator = page.locator('textarea').first();
  await inputLocator.waitFor({ state: 'visible', timeout: 10000 });
  await inputLocator.click();
  await inputLocator.fill('mama yanavaa.');

  // Step 2: Wait for real-time Sinhala output to appear
  await page.waitForTimeout(2500);

  const outputLocator = page.locator('textarea').nth(1);
  const outputBefore = (await outputLocator.inputValue().catch(() => '')).trim();

  // Confirm Sinhala output was produced before clearing
  expect(outputBefore.length).toBeGreaterThan(0);
  expect(outputBefore).toMatch(/[\u0D80-\u0DFF]/);

  // Step 3: Clear the Singlish input
  await inputLocator.fill('');
  await page.waitForTimeout(2000);

  // Step 4: Verify the Sinhala output field is now empty (or shows placeholder only)
  const outputAfter = (await outputLocator.inputValue().catch(() => '')).trim();

  expect(outputAfter).toBe('');
});
