import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { generateUser } from '../utils/helper';

test('SauceDemo purchase end to end automation', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const username = 'standard_user';
    const password = 'secret_sauce';

    const productName = 'Sauce Labs Backpack';

    await loginPage.open();
    await loginPage.login(username, password);
    await loginPage.verifyLogin();

    await productsPage.verifyProduct(productName);

    const price = await productsPage.getPrice(productName);
    console.log('Backpack price:', price);

    await productsPage.addToCart(productName);

    await productsPage.openCart();
    await cartPage.(productName);
    await cartPage.clickCheckout();

    const user = generateUser();

    await checkoutPage.enterDetails(
        user.firstName,
        user.lastName,
        user.postalCode
    );

    await checkoutPage.clickContinue();
    await checkoutPage.verifyCheckout();

    await checkoutPage.clickFinish();
    await checkoutPage.verifyOrder();
});