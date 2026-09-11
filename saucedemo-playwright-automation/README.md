# SauceDemo — Playwright Automation Suite (JavaScript)

End-to-end automated test suite for the [SauceDemo](https://www.saucedemo.com) e-commerce demo application, built with **Playwright + JavaScript** using the **Page Object Model (POM)**. This project demonstrates a complete, production-style automation framework covering the core purchase journey: **Login → Product Listing/Filters → Cart → Checkout**.

It pairs with a manual test case suite (module-wise Excel sheet) covering the same application, demonstrating both manual and automated QA workflows end-to-end.

## Tech Stack

- [Playwright Test](https://playwright.dev/) — test runner & browser automation
- JavaScript (Node.js)
- Page Object Model architecture
- GitHub Actions — CI pipeline that runs the suite on every push

## Modules Covered

| Module | Test File | Scenarios |
|---|---|---|
| Login | `tests/login.spec.js` | Valid login, invalid password, locked-out user, empty-field validation, logout |
| Product Listing & Filters | `tests/products.spec.js` | Product count, sort by name (A-Z/Z-A), sort by price (low-high/high-low), product detail navigation |
| Shopping Cart | `tests/cart.spec.js` | Add single/multiple items, remove from listing page, remove from cart page, empty cart state, continue shopping |
| Checkout | `tests/checkout.spec.js` | Valid checkout, required-field validation (first name/last name/postal code), order total calculation, cancel flow, order confirmation |

**37 automated scenarios** across 4 modules, run against Chromium, Firefox, and WebKit.

## Project Structure

```
saucedemo-playwright-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI pipeline
├── pages/                       # Page Object Model classes
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── ProductDetailPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── tests/                       # Test specs (one per module)
│   ├── login.spec.js
│   ├── products.spec.js
│   ├── cart.spec.js
│   └── checkout.spec.js
├── utils/
│   └── testData.js              # Centralized test data (users, products, checkout info)
├── playwright.config.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or later

### Installation

```bash
git clone https://github.com/Khizer-QA-Engineer/saucedemo-playwright-automation.git
cd saucedemo-playwright-automation
npm install
npx playwright install
```

### Running the Tests

```bash
# Run the full suite (all browsers, headless)
npm test

# Run in headed mode (see the browser)
npm run test:headed

# Run in interactive UI mode
npm run test:ui

# Run a single module
npm run test:login
npm run test:products
npm run test:cart
npm run test:checkout

# Run on a specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Viewing the Report

```bash
npm run report
```

This opens an interactive HTML report with step-by-step traces, screenshots, and videos for any failed test.

## Continuous Integration

Every push to `main` (and every pull request) automatically triggers the full suite via GitHub Actions. The HTML report is uploaded as a workflow artifact for review. See `.github/workflows/playwright.yml`.

## Design Notes

- **Page Object Model**: each page/flow (Login, Products, Cart, Checkout) is its own class exposing locators and actions, keeping test specs readable and framework changes isolated to one place.
- **Centralized test data**: `utils/testData.js` keeps users, product names, and checkout fixtures in one place instead of hardcoded in specs.
- **Resilient locators**: uses SauceDemo's `data-test` attributes and stable element IDs rather than brittle text/CSS selectors where possible.
- **Cross-browser**: configured to run against Chromium, Firefox, and WebKit out of the box.
- **Traceability**: test cases are commented with their corresponding manual Test Case ID (e.g. `// TC_LOGIN_01`) to keep the manual and automated suites traceable to each other.

## Author

**Khizer** — QA Engineer (Manual + Automation)
[GitHub](https://github.com/Khizer-QA-Engineer)
