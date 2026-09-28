import { Page, expect } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) {}

    async verifyProduct(productName: string) {
        await expect(
            this.page.getByText(productName, { exact: true })
        ).toBeVisible();
    }

    async clickCheckout() {
        await this.page.getByRole('button', { name: 'Checkout' }).click();
    }
}