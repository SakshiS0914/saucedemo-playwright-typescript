import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
test('Login with valid username and valid password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(
            page.getByText('Products', { exact: true })).toBeVisible();
        await expect(
            page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
    });
test('Login with invalid username and valid password', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login('user', 'secret_sauce');
        await expect(
            page.getByText('Epic sadface: Username and password do not match any user in this service')
        ).toBeVisible();
    });
test('Login with valid username and invalid password', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login('standard_user', 'password');
        await expect(
            page.getByText('Epic sadface: Username and password do not match any user in this service')
        ).toBeVisible();
        await expect(
            page.getByRole('button', { name: 'Login' })).toBeVisible();
    });
test('Login with invalid username and password', async ({ page }) =>{
    const loginPage= new LoginPage(page);
    await loginPage.open();
    await loginPage.login('user','password');
    await expect(
        page.getByText('Epic sadface: Username and password do not match any user in this service')
        ).toBeVisible();
        await expect(
        page.getByRole('button', { name: 'Login' })).toBeVisible();
    });
