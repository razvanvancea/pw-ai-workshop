import { test, expect } from '../fixtures/pages';

test.describe('User authentication test suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL);
  });

  test('login test', async ({ loginPage }) => {
    await loginPage.login('admin@admin.com', 'admin123');

    await test.step('Verify logout link is visible', async () => {
      await expect(loginPage.logoutBtn).toBeVisible();
    });
  });

  test('logout test', async ({ loginPage, navigationPage }) => {
    await loginPage.login('admin@admin.com', 'admin123');
    await loginPage.logoutBtn.click();
    await navigationPage.verifyWelcomeMessage();
  });

  test('create account test', async ({ registerPage }) => {
    await registerPage.createAccount({
      firstName: 'John',
      lastName: 'Sparrow',
      phone: '07200000000',
      country: 'Romania',
      email: 'somerandommail@gmail.com',
      password: 'Superpass.123',
    });
    await expect(registerPage.successText).toBeVisible();
    await expect(registerPage.backToSignInLink).toBeVisible();
  });
});
