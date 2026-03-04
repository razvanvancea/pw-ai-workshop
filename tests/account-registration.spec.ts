// @ai-generated
// Test Case 2.1: Account Registration with Full Form Validation
// Objective: Verify all registration form fields validate correctly and prevent invalid data submission

import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Account Registration - Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to registration page
    await page.goto('https://tai-shop.razvanvancea.ro/register.html');
  });

  test('registration form displays all required fields @ai-generated', async ({ page }) => {
    await test.step('Verify all form fields are visible', async () => {
      // Verify form heading
      await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();

      // Verify all input fields are visible
      await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Phone number' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Email address *' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Password *' })).toBeVisible();

      // Verify country dropdown
      await expect(page.getByLabel('Country')).toBeVisible();

      // Verify terms checkbox
      await expect(page.getByRole('checkbox', { name: /terms and conditions/i })).toBeVisible();

      // Verify submit button
      await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
    });
  });

  test('form validation - required fields cannot be empty @ai-generated', async ({ page }) => {
    await test.step('Attempt to submit empty form', async () => {
      // Click Create Account without filling any fields
      await page.getByRole('button', { name: 'Create Account' }).click();

      // Browser HTML5 validation should prevent submission and focus first required field
      // The form should not submit, which means we should still be on the registration page
      await expect(page).toHaveURL(/register\.html/);
    });

    await test.step('Verify required fields have required attribute', async () => {
      // Check that required fields have the required HTML attribute
      const emailField = page.getByRole('textbox', { name: 'Email address *' });
      const passwordField = page.getByRole('textbox', { name: 'Password *' });

      await expect(emailField).toHaveAttribute('required', '');
      await expect(passwordField).toHaveAttribute('required', '');
    });

    await test.step('Fill first name and verify next field is required', async () => {
      const firstNameField = page.getByRole('textbox', { name: 'First Name' });
      await firstNameField.fill('John');

      // Try to submit again
      await page.getByRole('button', { name: 'Create Account' }).click();

      // Should still be on registration page (form didn't submit)
      await expect(page).toHaveURL(/register\.html/);
    });
  });

  test('special character handling in name and email fields @ai-generated', async ({ page }) => {
    await test.step('Test names with special characters', async () => {
      const firstNameField = page.getByRole('textbox', { name: 'First Name' });
      const lastNameField = page.getByRole('textbox', { name: 'Last Name' });
      const emailField = page.getByRole('textbox', { name: 'Email address *' });
      const phoneField = page.getByRole('textbox', { name: 'Phone number' });
      const passwordField = page.getByRole('textbox', { name: 'Password *' });
      const termsCheckbox = page.getByRole('checkbox', { name: /terms and conditions/i });

      // Fill with special characters
      await firstNameField.fill("John O'Brien");
      await lastNameField.fill('Jean-Marie');
      await emailField.fill('test+tag@example.com');
      await phoneField.fill('555-123-4567');
      await page.getByLabel('Country').selectOption('United States of America');
      await passwordField.fill('TestPassword123!');
      await termsCheckbox.check();

      // Verify all values were accepted without truncation
      await expect(firstNameField).toHaveValue("John O'Brien");
      await expect(lastNameField).toHaveValue('Jean-Marie');
      await expect(emailField).toHaveValue('test+tag@example.com');
    });
  });

  test('password field validation with strength requirements @ai-generated', async ({ page }) => {
    const passwordField = page.getByRole('textbox', { name: 'Password *' });
    const firstNameField = page.getByRole('textbox', { name: 'First Name' });
    const lastNameField = page.getByRole('textbox', { name: 'Last Name' });
    const emailField = page.getByRole('textbox', { name: 'Email address *' });
    const phoneField = page.getByRole('textbox', { name: 'Phone number' });

    // Common setup for each password test
    const setupForm = async () => {
      await firstNameField.fill('Test');
      await lastNameField.fill('User');
      await emailField.fill(faker.internet.email());
      await phoneField.fill(faker.phone.number());
      await page.getByLabel('Country').selectOption('United States of America');
    };

    await test.step('Test short password rejection', async () => {
      await setupForm();
      await passwordField.fill('123');

      // Attempt submission
      const submitButton = page.getByRole('button', { name: 'Create Account' });
      await submitButton.click();

      // Form should not submit (still on page)
      await expect(page).toHaveURL(/register\.html/);
    });

    await test.step('Test weak password acceptance (8+ chars, no special)', async () => {
      // Clear previous values
      await firstNameField.clear();
      await lastNameField.clear();
      await emailField.clear();
      await phoneField.clear();
      await passwordField.clear();

      await setupForm();
      await passwordField.fill('abcdefgh');

      // Verify password field accepts the value
      await expect(passwordField).toHaveValue('abcdefgh');
    });

    await test.step('Test strong password acceptance', async () => {
      await passwordField.clear();
      await passwordField.fill('Str0ng!Pass');

      await expect(passwordField).toHaveValue('Str0ng!Pass');
    });
  });

  test('email format validation @ai-generated', async ({ page }) => {
    const emailField = page.getByRole('textbox', { name: 'Email address *' });
    const firstNameField = page.getByRole('textbox', { name: 'First Name' });
    const lastNameField = page.getByRole('textbox', { name: 'Last Name' });
    const phoneField = page.getByRole('textbox', { name: 'Phone number' });
    const passwordField = page.getByRole('textbox', { name: 'Password *' });
    const termsCheckbox = page.getByRole('checkbox', { name: /terms and conditions/i });

    const setupFormWithoutEmail = async () => {
      await firstNameField.fill('Test');
      await lastNameField.fill('User');
      await phoneField.fill('555-123-4567');
      await page.getByLabel('Country').selectOption('United States of America');
      await passwordField.fill('TestPassword123!');
      await termsCheckbox.check();
    };

    await test.step('Test invalid email format (no @)', async () => {
      await setupFormWithoutEmail();
      await emailField.fill('notanemail');

      // Try to submit
      await page.getByRole('button', { name: 'Create Account' }).click();

      // Email validation should prevent submission
      await expect(page).toHaveURL(/register\.html/);
    });

    await test.step('Test incomplete email format', async () => {
      await emailField.clear();
      await emailField.fill('test@');

      // Try to submit
      await page.getByRole('button', { name: 'Create Account' }).click();

      // Should not submit
      await expect(page).toHaveURL(/register\.html/);
    });

    await test.step('Test valid email format acceptance', async () => {
      await emailField.clear();
      await emailField.fill('test@example.com');

      // Verify email field accepts the value
      await expect(emailField).toHaveValue('test@example.com');
    });
  });

  test('country dropdown functionality @ai-generated', async ({ page }) => {
    const countrySelect = page.getByLabel('Country');

    await test.step('Verify country dropdown has default option', async () => {
      await expect(countrySelect).toHaveValue('');

      // Check that default text is present
      const defaultOption = page.locator('select', { has: page.locator('option:has-text("Select a country...")') });
      await expect(defaultOption).toBeVisible();
    });

    await test.step('Select specific country and verify selection', async () => {
      await countrySelect.selectOption('United States of America');

      // Verify selection is saved
      await expect(countrySelect).toHaveValue('United States of America');
    });

    await test.step('Verify country options are available', async () => {
      // Verify common countries exist (options in select are not DOM-visible until selected)
      // Use getAllOptions or verify by attempting to select
      await countrySelect.selectOption('Australia');
      await expect(countrySelect).toHaveValue('Australia');

      // Reset and verify another country
      await countrySelect.selectOption('Canada');
      await expect(countrySelect).toHaveValue('Canada');

      // Reset and verify Japan
      await countrySelect.selectOption('Japan');
      await expect(countrySelect).toHaveValue('Japan');
    });
  });

  test('terms and conditions checkbox requirement @ai-generated', async ({ page }) => {
    const firstNameField = page.getByRole('textbox', { name: 'First Name' });
    const lastNameField = page.getByRole('textbox', { name: 'Last Name' });
    const emailField = page.getByRole('textbox', { name: 'Email address *' });
    const phoneField = page.getByRole('textbox', { name: 'Phone number' });
    const passwordField = page.getByRole('textbox', { name: 'Password *' });
    const termsCheckbox = page.getByRole('checkbox', { name: /terms and conditions/i });
    const submitButton = page.getByRole('button', { name: 'Create Account' });

    const fillFormWithoutTerms = async () => {
      await firstNameField.fill('John');
      await lastNameField.fill('Doe');
      await emailField.fill(faker.internet.email());
      await phoneField.fill('555-123-4567');
      await page.getByLabel('Country').selectOption('United States of America');
      await passwordField.fill('ValidPassword123!');
      // Do NOT check terms checkbox
    };

    await test.step('Attempt submission without checking terms checkbox', async () => {
      await fillFormWithoutTerms();

      // Try to submit
      await submitButton.click();

      // Form should not submit
      await expect(page).toHaveURL(/register\.html/);
    });

    await test.step('Verify checkbox is unchecked initially', async () => {
      await expect(termsCheckbox).not.toBeChecked();
    });

    await test.step('Check terms checkbox and verify it is checked', async () => {
      await termsCheckbox.check();

      await expect(termsCheckbox).toBeChecked();
    });
  });

  test('successful account registration with valid data @ai-generated', async ({ page }) => {
    const firstNameField = page.getByRole('textbox', { name: 'First Name' });
    const lastNameField = page.getByRole('textbox', { name: 'Last Name' });
    const emailField = page.getByRole('textbox', { name: 'Email address *' });
    const phoneField = page.getByRole('textbox', { name: 'Phone number' });
    const passwordField = page.getByRole('textbox', { name: 'Password *' });
    const termsCheckbox = page.getByRole('checkbox', { name: /terms and conditions/i });
    const submitButton = page.getByRole('button', { name: 'Create Account' });

    await test.step('Fill all form fields with valid data', async () => {
      await firstNameField.fill('Jane');
      await lastNameField.fill('Smith');
      await emailField.fill(faker.internet.email());
      await phoneField.fill(faker.phone.number());
      await page.getByLabel('Country').selectOption('Australia');
      await passwordField.fill('SecurePassword123!');

      // Verify all values are accepted
      await expect(firstNameField).toHaveValue('Jane');
      await expect(lastNameField).toHaveValue('Smith');
      await expect(page.getByLabel('Country')).toHaveValue('Australia');
    });

    await test.step('Check terms checkbox', async () => {
      await termsCheckbox.check();
      await expect(termsCheckbox).toBeChecked();
    });

    await test.step('Submit form and verify success', async () => {
      await submitButton.click();

      // Wait for success message to appear
      await expect(page.locator('#message')).toBeVisible();

      // Verify success message content
      const successMessage = page.locator('#message');
      await expect(successMessage).toContainText('Success! Your account has been created');
    });
  });

  test('account registration - verify application limitation message @ai-generated', async ({ page }) => {
    const firstNameField = page.getByRole('textbox', { name: 'First Name' });
    const lastNameField = page.getByRole('textbox', { name: 'Last Name' });
    const emailField = page.getByRole('textbox', { name: 'Email address *' });
    const phoneField = page.getByRole('textbox', { name: 'Phone number' });
    const passwordField = page.getByRole('textbox', { name: 'Password *' });
    const termsCheckbox = page.getByRole('checkbox', { name: /terms and conditions/i });
    const submitButton = page.getByRole('button', { name: 'Create Account' });

    await test.step('Complete registration with valid data', async () => {
      await firstNameField.fill('Test');
      await lastNameField.fill('User');
      const testEmail = faker.internet.email();
      await emailField.fill(testEmail);
      await phoneField.fill('555-999-8888');
      await page.getByLabel('Country').selectOption('Canada');
      await passwordField.fill('TestPassword123!');
      await termsCheckbox.check();

      await submitButton.click();

      // Wait for success message
      await expect(page.locator('#message')).toBeVisible();
    });

    await test.step('Verify success message contains limitation notice', async () => {
      const successMessage = page.locator('#message');

      // Verify message explains new credentials won't work immediately
      await expect(successMessage).toContainText('WILL NOT be able to use the new credentials for login');
      await expect(successMessage).toContainText('because this website does not have a database integration yet');

      // Verify message directs to use test credentials
      await expect(successMessage).toContainText('admin@admin.com');
      await expect(successMessage).toContainText('admin123');
    });
  });

  test('form field isolation - validating one field does not affect others @ai-generated', async ({ page }) => {
    await test.step('Fill first name with special characters', async () => {
      const firstNameField = page.getByRole('textbox', { name: 'First Name' });
      await firstNameField.fill("O'Connor");

      await expect(firstNameField).toHaveValue("O'Connor");
    });

    await test.step('Clear first name and verify other fields remain empty', async () => {
      const firstNameField = page.getByRole('textbox', { name: 'First Name' });
      const lastNameField = page.getByRole('textbox', { name: 'Last Name' });

      await firstNameField.clear();

      await expect(firstNameField).toHaveValue('');
      await expect(lastNameField).toHaveValue('');
    });

    await test.step('Fill multiple fields and verify independence', async () => {
      const emailField = page.getByRole('textbox', { name: 'Email address *' });
      const passwordField = page.getByRole('textbox', { name: 'Password *' });

      await emailField.fill('user@test.com');
      await passwordField.fill('MyPassword123');

      // Verify each field maintains its own value
      await expect(emailField).toHaveValue('user@test.com');
      await expect(passwordField).toHaveValue('MyPassword123');

      // Clear one field and verify the other is unaffected
      await emailField.clear();
      await expect(emailField).toHaveValue('');
      await expect(passwordField).toHaveValue('MyPassword123');
    });
  });
});
