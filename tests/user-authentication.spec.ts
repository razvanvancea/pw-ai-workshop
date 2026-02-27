import { test, expect } from '@playwright/test';

test.describe('User authentication test suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tai-shop.razvanvancea.ro/');
  });

  test('login test', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email Address' }).fill('admin@admin.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByTestId('submitBtn').click();
    await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
  });

  test('logout test', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email Address' }).fill('admin@admin.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('link', { name: 'Log Out' }).click();
    await expect(page.locator('#loginSection')).toContainText('Welcome back');
  });
});
