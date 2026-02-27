import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
test.describe('user authentication test suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('login test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('standard_user', 'secret_sauce');
  });

  test('logout test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('standard_user', 'secret_sauce');
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(page.locator('[data-test="logout-sidebar-link"]')).toContainText('Logout');
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
