import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { NavigationPage } from '../pages/navigation.page';

test.describe('User authentication test suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('login test @smoke', async ({ page }) => {
    await test.step('Perform user login', async () => {
      const loginPage = new LoginPage(page);
      await loginPage.doLogin('admin@admin.com', 'admin123');
    });
  });

  test('logout test', async ({ page }) => {
    await test.step('Login to the application', async () => {
      const loginPage = new LoginPage(page);
      await loginPage.doLogin('admin@admin.com', 'admin123');
    });

    await test.step('Logout from the application', async () => {
      const loginPage = new LoginPage(page);
      const navigationPage = new NavigationPage(page);
      await loginPage.logoutBtn.click();
      await navigationPage.verifyWelcomeMessage();
    });
  });
});
