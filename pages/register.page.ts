import { expect, type Locator, type Page } from '@playwright/test';

export interface RegisterData {
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  email: string;
  password: string;
}

export class RegisterPage {
  readonly page: Page;
  readonly createAccountLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneInput: Locator;
  readonly countrySelect: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly agreeCheckbox: Locator;
  readonly createAccountButton: Locator;
  readonly successMessage: Locator;
  readonly successText: Locator;
  readonly backToSignInLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createAccountLink = page.getByRole('link', { name: 'Create account' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.phoneInput = page.getByRole('textbox', { name: 'Phone number' });
    this.countrySelect = page.getByLabel('Country');
    this.emailInput = page.getByRole('textbox', { name: 'Email address *' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
    this.agreeCheckbox = page.getByRole('checkbox', { name: 'I agree with the terms and' });
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    this.successMessage = page.locator('#message');
    this.successText = page.getByText('Success! Your account has');
    this.backToSignInLink = page.getByRole('link', { name: 'Back to Sign In' });
  }

  async createAccount(data: RegisterData) {
    await this.createAccountLink.click();
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.phoneInput.fill(data.phone);
    await this.countrySelect.selectOption(data.country);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.agreeCheckbox.check();
    await this.createAccountButton.click();
    await expect(this.successMessage).toContainText('Success!');
  }
}
