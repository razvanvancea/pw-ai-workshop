import { test } from '../fixtures/pages';

test.describe('User authentication test suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('login test @smoke', async ({ loginPage }) => {
    await test.step('Perform user login', async () => {
      await loginPage.doLogin('admin@admin.com', 'admin123');
    });
  });

  test('logout test', async ({ loginPage, navigationPage }) => {
    await test.step('Login to the application', async () => {
      await loginPage.doLogin('admin@admin.com', 'admin123');
    });

    await test.step('Logout from the application', async () => {
      await loginPage.logoutBtn.click();
      await navigationPage.verifyWelcomeMessage();
    });
  });
});
