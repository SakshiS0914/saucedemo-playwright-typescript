import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { generateUser } from '../utils/helper';

test('Validate product price on Products page and Checkout page', async ({ page }) => {
    const loginPage = new LoginPage(page);
          await loginPage.open();
          await loginPage.login('standard_user', 'secret_sauce');
          await expect(
            page.getByText('Products', { exact: true })).toBeVisible();
    const product = page.locator('.inventory_item').filter({
        hasText: 'Sauce Labs Backpack'
    });
    const productPrice = await product.locator('.inventory_item_price')
        .textContent();
    console.log('Product page price:', productPrice);

    await product.getByRole('button', { name: 'Add to cart' }).click();

    await page.locator('.shopping_cart_link').click();

    await expect(
        page.getByText('Sauce Labs Backpack', { exact: true })
    ).toBeVisible();

    await page.getByRole('button', { name: 'Checkout' }).click();
    const user = generateUser();

    await page.getByPlaceholder('First Name').fill(user.firstName);
    await page.getByPlaceholder('Last Name').fill(user.lastName);
    await page.getByPlaceholder('Zip/Postal Code').fill(user.postalCode);

    await page.getByRole('button', { name: 'Continue' }).click();

    // Get price from Checkout Overview
    const checkoutPrice = await page
        .locator('.inventory_item_price').textContent();

    console.log('Checkout page price:', checkoutPrice);

    expect(checkoutPrice?.trim()).toEqual(productPrice?.trim());
});

test('Validate product price, tax and total', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(
            page.getByText('Products', { exact: true })).toBeVisible();
    const product = page.locator('.inventory_item').filter({hasText: 'Sauce Labs Backpack'
        });
        await product.getByRole('button', { name: 'Add to cart' }).click();
        await page.locator('.shopping_cart_link').click();
        await page.getByRole('button', { name: 'Checkout' }).click();

        const user = generateUser();
        await page.getByPlaceholder('First Name').fill(user.firstName);
        await page.getByPlaceholder('Last Name').fill(user.lastName);
        await page.getByPlaceholder('Zip/Postal Code').fill(user.postalCode);

        await page.getByRole('button', { name: 'Continue' }).click();
        const itemTotalText = await page.getByText(/Item total:/).textContent();
        const taxText = await page.getByText(/Tax:/).textContent();
        const totalText= await page.getByText(/^Total:/).textContent();
        const itemTotal = parseFloat(itemTotalText!.replace('Item total: $', ''));
        const tax = parseFloat(taxText!.replace('Tax: $', ''));
        const total = parseFloat(totalText!.replace('Total: $',''));
        const calculatedTotal = Math.round((itemTotal + tax) * 100) / 100;
        console.log('Item Total:', itemTotal);
        console.log('Tax:', tax);
        console.log('Total:', total);
        console.log('Calculated Total:', calculatedTotal);
        expect(calculatedTotal).toEqual(total);
    });
