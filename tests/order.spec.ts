import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';

test.describe('Order management test suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('add to cart test @smoke', async ({ page }) => {
    await test.step('Login to the application', async () => {
      const loginPage = new LoginPage(page);
      await loginPage.doLogin('admin@admin.com', 'admin123');
    });

    await test.step('Add product to cart', async () => {
      const productPage = new ProductPage(page);
      await productPage.addFirstProductToCart();
    });
  });
});
