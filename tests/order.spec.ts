import { test } from '../fixtures/pages';

test.describe('Order management test suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tai-shop.razvanvancea.ro');
  });

  test('add to cart test @smoke', async ({ loginPage, productPage }) => {
    await test.step('Login to the application', async () => {
      await loginPage.login('admin@admin.com', 'admin123');
    });

    await test.step('Add product to cart', async () => {
      await productPage.addFirstProductToCart();
    });
  });
});
