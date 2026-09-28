import { Page, expect } from '@playwright/test';

export class ProductsPage {
    constructor(private page: Page) {}

    async verifyProduct(productName: string) {
        await expect(
            this.page.getByText(productName, { exact: true })
        ).toBeVisible();
    }

    async getPrice(productName: string) {
        const product = this.page.locator('.inventory_item').filter({
            hasText: productName
        });

        const price = await product.locator('.inventory_item_price').textContent();

        console.log('Product price:', price);

        return price;
    }

    async addToCart(productName: string) {
    const product = this.page.locator('.inventory_item').filter({
        hasText: productName
    });

    await product.getByRole('button', { name: 'Add to cart' }).click();

    await expect(
        product.getByRole('button', { name: 'Remove' })
    ).toBeVisible();
}
    async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }
}
