import { test as base, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { NavigationPage } from '../pages/navigation.page';
import { ProductPage } from '../pages/product.page';
import { RegisterPage } from '../pages/register.page';

interface PageFixtures {
  loginPage: LoginPage;
  navigationPage: NavigationPage;
  productPage: ProductPage;
  registerPage: RegisterPage;
}

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }: { page: Page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  navigationPage: async ({ page }: { page: Page }, use) => {
    const navigationPage = new NavigationPage(page);
    await use(navigationPage);
  },

  productPage: async ({ page }: { page: Page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },

  registerPage: async ({ page }: { page: Page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
});

export { expect } from '@playwright/test';
