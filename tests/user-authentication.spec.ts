import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('user authentication test suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://tai-shop.razvanvancea.ro/');
  });

  test('login test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('admin@admin.com', 'admin123');
  });

  test('logout test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('admin@admin.com', 'admin123');
    await loginPage.logoutBtn.click();
    await expect(page.locator('#loginSection')).toContainText('Welcome back');
  });
});
