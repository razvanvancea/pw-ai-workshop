import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { NavigationPage } from '../pages/navigation.page';
import { RegisterPage } from '../pages/register.page';

test.describe('User authentication test suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tai-shop.razvanvancea.ro');
  });

  test('login test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('admin@admin.com', 'admin123');

    await test.step('Verify logout link is visible', async () => {
      await expect(loginPage.logoutBtn).toBeVisible();
    });
  });

  test('logout test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navigationPage = new NavigationPage(page);
    await loginPage.login('admin@admin.com', 'admin123');
    await loginPage.logoutBtn.click();
    await navigationPage.verifyWelcomeMessage();
  });

  test('create account test', async ({ page }) => {
    const registerPage = new RegisterPage(page);
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
