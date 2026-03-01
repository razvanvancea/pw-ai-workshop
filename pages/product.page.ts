import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly productItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole('button', { name: 'ADD TO CART' });
    this.removeButton = page.getByRole('button', { name: 'REMOVE' });
    this.productItems = page.locator('[data-testid="product-item"]');
  }

  async addFirstProductToCart() {
    await this.addToCartButton.first().click();
    await expect(this.removeButton).toBeVisible();
  }

  async removeFirstProductFromCart() {
    await this.removeButton.first().click();
    await expect(this.addToCartButton).toBeVisible();
  }
}
