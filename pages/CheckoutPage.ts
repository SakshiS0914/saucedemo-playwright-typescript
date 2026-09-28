import { Page, expect } from '@playwright/test';

export class CheckoutPage {
    constructor(private page: Page) {}

    async enterDetails(firstName: string, lastName: string, postalCode: string) {
        await this.page.getByPlaceholder('First Name').fill(firstName);
        await this.page.getByPlaceholder('Last Name').fill(lastName);
        await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode);
    }

    async clickContinue() {
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }

    async verifyCheckout() {
        await expect(
            this.page.getByText('Checkout: Overview')
        ).toBeVisible();
    }

    async clickFinish() {
        await this.page.getByRole('button', { name: 'Finish' }).click();
    }

    async verifyOrder() {
        await expect(
            this.page.getByText('Thank you for your order!')
        ).toBeVisible();
    }
}
