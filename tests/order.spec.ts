import { test, expect } from '@playwright/test';

test.describe('User authentication test suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tai-shop.razvanvancea.ro/');
  });

  test('add to cart test', async ({ page }) => {
    // use the debugger and start the 'add to cart' test from here
    // await page.pause();
    await page.getByRole('textbox', { name: 'Email Address' }).fill('admin@admin.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByTestId('submitBtn').click();
    await page.getByRole('link', { name: 'Log Out' }).click();
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  });
});
