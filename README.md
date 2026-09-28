# End-to-End E-commerce Automation Framework using Playwright

## Overview
This project automates the complete Sauce Labs Backpack purchase journey on Swag Labs using Playwright with TypeScript and the Page Object Model (POM).

## Framework structure
```text
playwright-ecommerce-assignment/
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── utils/
│   └── helper.ts
├── test-data/
│   └── users.ts
├── tests/
│   └── purchase.spec.ts
├── .env.example
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Setup
1. Install Node.js.
2. Open this project in VS Code.
3. Run:
   ```bash
   npm install
   npx playwright install
   ```
4. Copy `.env.example` to `.env`.
5. Run the test:
   ```bash
   npx playwright test
   ```

## Useful commands
```bash
npx playwright test
npx playwright test tests/purchase.spec.ts
npx playwright test tests/purchase.spec.ts --headed
npx playwright test --ui
npx playwright test --debug
npx playwright show-report
```

## Automated workflow
1. Navigate to Swag Labs.
2. Log in with `standard_user` / `secret_sauce`.
3. Verify successful login.
4. Verify Sauce Labs Backpack is visible.
5. Capture and print its price.
6. Add the product to the cart and verify it was added.
7. Open the cart and verify the product.
8. Open checkout.
9. Submit first name, last name, and postal code.
10. Verify checkout overview.
11. Finish the order.
12. Verify `Thank you for your order!`.

## Design choices
- Page Object Model separates page-specific locators/actions from test flow.
- Product selection uses a reusable `productName` variable.
- Credentials and checkout values are externalized through environment variables with assignment-compatible defaults.
- Assertions are kept in page methods where the validation belongs.
- Chromium, Firefox, and WebKit projects are configured for cross-browser execution.
- HTML reporting is enabled.

## Optional dynamic checkout data
The `utils/helper.ts` file includes `generateUser()` for the bonus dynamic-data requirement. To use it in the test, replace the imported `checkoutUser` with:
```ts
const checkoutUser = generateUser();
```
and import `generateUser` from `../utils/helper`.
