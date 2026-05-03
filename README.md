# IT3040 ITPM – Assignment 1
## SwiftTranslator Singlish-to-Sinhala Automated Test Suite

> **System Under Test:** https://www.swifttranslator.com/  
> **Tool:** Playwright (JavaScript)  
> **Module:** IT3040 – IT Project Management, Semester 1  

---

## Test Coverage Summary

| Category | Count |
|---|---|
| Positive Functional (Pos_Fun) | 25 |
| Negative Functional (Neg_Fun) | 10 |
| Positive UI (Pos_UI) | 1 |
| **Total** | **36** |

---

## Prerequisites

- **Node.js** v16 or higher — [Download](https://nodejs.org/)
- **npm** (bundled with Node.js)
- Internet access (tests connect to swifttranslator.com)

---

## Installation

### 1. Clone or extract the project

```bash
git clone <your-repo-url>
cd playwright-singlish-tests
```

Or extract the ZIP and navigate into the folder.

### 2. Install Node dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install chromium
```

---

## Running the Tests

### Run all tests (headless)
```bash
npm test
```

### Run all tests with browser visible
```bash
npm run test:headed
```

### Run a specific test file
```bash
npx playwright test tests/positive_functional.spec.js
npx playwright test tests/positive_functional_part2.spec.js
npx playwright test tests/negative_functional.spec.js
npx playwright test tests/ui.spec.js
```

### Run a single test by title
```bash
npx playwright test -g "Pos_Fun_0001"
```

### View HTML report after a run
```bash
npm run test:report
```

---

## Project Structure

```
playwright-singlish-tests/
├── helpers/
│   └── translatorPage.js       # Shared page interaction helpers
├── tests/
│   ├── positive_functional.spec.js       # Pos_Fun_0001–0013 (Sentence structures, daily language)
│   ├── positive_functional_part2.spec.js # Pos_Fun_0013–0025 (Grammar, mixed, formatting, slang)
│   ├── negative_functional.spec.js       # Neg_Fun_0001–0010 (Edge/failure cases)
│   └── ui.spec.js                        # Pos_UI_0001 (Real-time clear behaviour)
├── playwright.config.js
├── package.json
└── README.md
```

---

## Test ID Conventions

| Prefix | Meaning |
|---|---|
| `Pos_Fun_XXXX` | Positive functional test — system should convert correctly |
| `Neg_Fun_XXXX` | Negative functional test — system is expected to fail or behave incorrectly |
| `Pos_UI_XXXX` | Positive UI test — correct UI behaviour verified |
| `Neg_UI_XXXX` | Negative UI test — incorrect UI behaviour verified |

---

## Notes on Negative Tests

Negative tests (`Neg_Fun_*`) **pass in Playwright when the failure behaviour is confirmed**.  
For example, if the system cannot convert joined words, the test asserts that no valid Sinhala output is produced — which is the expected failure behaviour.

---

## Important

- The application performs **real-time conversion** with no submit button; tests include `waitForTimeout` delays to allow the UI to update.
- Do **not** test backend APIs, performance, or security — only UI-level Singlish-to-Sinhala conversion is in scope.
- Refer to the application's **Help page** for correct Singlish character combinations when defining expected outputs.
