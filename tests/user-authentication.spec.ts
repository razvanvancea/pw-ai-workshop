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
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="username"]').press('Tab');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(page.locator('[data-test="logout-sidebar-link"]')).toContainText('Logout');
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
