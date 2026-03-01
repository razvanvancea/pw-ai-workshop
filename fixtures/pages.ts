import { test as base, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { NavigationPage } from '../pages/navigation.page';
import { ProductPage } from '../pages/product.page';

interface PageFixtures {
  loginPage: LoginPage;
  navigationPage: NavigationPage;
  productPage: ProductPage;
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
});

export { expect } from '@playwright/test';