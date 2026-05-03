// helpers/translatorPage.js
// Shared helper for interacting with swifttranslator.com

const { expect } = require('@playwright/test');

/**
 * Navigates to the translator, types input and waits for Sinhala output.
 * @param {import('@playwright/test').Page} page
 * @param {string} singlishInput - Text to type into the Singlish textarea
 * @param {number} waitMs - ms to wait for real-time update (default 2500)
 * @returns {Promise<string>} The Sinhala output text
 */
async function translateAndGetOutput(page, singlishInput, waitMs = 2500) {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Locate the Singlish input area (textarea or contenteditable)
  const inputLocator = page.locator('textarea').first();
  await inputLocator.waitFor({ state: 'visible', timeout: 10000 });
  await inputLocator.click();
  await inputLocator.fill('');
  await inputLocator.fill(singlishInput);

  // Wait for real-time conversion
  await page.waitForTimeout(waitMs);

  // Locate the Sinhala output (second textarea or output div)
  const outputLocator = page.locator('textarea').nth(1);
  const outputText = await outputLocator.inputValue().catch(async () => {
    return await outputLocator.innerText().catch(() => '');
  });

  return outputText.trim();
}

/**
 * Clears the Singlish input and returns the resulting output text.
 */
async function clearInputAndGetOutput(page, waitMs = 2000) {
  const inputLocator = page.locator('textarea').first();
  await inputLocator.fill('');
  await page.waitForTimeout(waitMs);
  const outputLocator = page.locator('textarea').nth(1);
  return (await outputLocator.inputValue().catch(() => '')).trim();
}

module.exports = { translateAndGetOutput, clearInputAndGetOutput };
