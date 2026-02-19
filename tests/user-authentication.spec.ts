import { test, expect } from '@playwright/test';
test.describe('user authentication test suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('login test', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();
  });

  test('logout test', async ({ page }) => {
    await test.step('fill login form with email and psw', async () => {
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
    });

    await page.locator('[data-test="login-button"]').click();
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(page.locator('[data-test="logout-sidebar-link"]')).toContainText('Logout');
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
