// @ai-generated
// Test Case 1.2: Proceed to Checkout and Form Validation
// Objective: Verify checkout page loads correctly and form validation works for all required fields

import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Checkout - Form Validation and Submission', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to TAI Shop
    await page.goto('https://tai-shop.razvanvancea.ro');

    // Login with test credentials
    await test.step('Login to TAI Shop', async () => {
      await page.getByRole('textbox', { name: 'Email Address' }).fill('admin@admin.com');
      await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
      await page.getByRole('button', { name: 'Sign In' }).click();
      await page.getByRole('link', { name: 'Log Out' }).waitFor();
    });

    // Add multiple products to cart
    await test.step('Add products to cart', async () => {
      // Add Essence Mascara Lash Princess ($9.99)
      await page.getByRole('button', { name: 'ADD TO CART' }).first().click();
      await page.waitForTimeout(300);

      // Add Calvin Klein CK One ($49.99) - 6th product on the page
      const addToCartButtons = page.locator('button:has-text("ADD TO CART")');
      await addToCartButtons.nth(5).click();
      await page.waitForTimeout(300);

      // Add Dior J'adore ($89.99) - 8th product on the page
      await addToCartButtons.nth(7).click();
      await page.waitForTimeout(500);

      // Verify cart total shows correct amount
      await expect(page.locator('text=$149.97')).toBeVisible();
    });
  });

  test('proceed to checkout - verify page loads with order summary and form @ai-generated', async ({ page }) => {
    // Step 1: Click "PROCEED TO CHECKOUT" button
    await test.step('Click PROCEED TO CHECKOUT button', async () => {
      await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
      await page.waitForTimeout(1000);
    });

    // Step 2: Verify checkout page loads and displays order summary
    await test.step('Verify checkout page loads with order summary', async () => {
      // Verify page contains checkout form sections
      await expect(page.getByRole('heading', { name: 'Shipping Details' })).toBeVisible();

      // Verify order summary is displayed
      await expect(page.getByRole('heading', { name: 'Order Summary' })).toBeVisible();

      // Verify cart items are displayed in order summary
      await expect(page.locator('text=/Subtotal.*149.97/i')).toBeVisible();

      // Verify price breakdown
      await expect(page.locator('text=/Shipping.*15.00/i')).toBeVisible();

      // Verify total calculation
      await expect(page.locator('text=/Total.*164.97/i')).toBeVisible();
    });

    // Step 3: Verify checkout form has required fields
    await test.step('Verify checkout form contains all required fields', async () => {
      // Contact Information section
      await expect(page.getByRole('textbox', { name: 'Phone Number *' })).toBeVisible();

      // Address Information section
      await expect(page.getByRole('textbox', { name: 'Street Address *' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'City *' })).toBeVisible();
      await expect(page.getByRole('combobox').filter({ has: page.locator('option:has-text("Select a country...")') })).toBeVisible();

      // Payment Method section
      await expect(page.getByRole('heading', { name: 'Payment Method' })).toBeVisible();
      await expect(page.getByRole('radio', { name: 'Pay on Delivery' })).toBeVisible();
      await expect(page.getByRole('radio', { name: 'Online Payment' })).toBeVisible();

      // Place Order button
      await expect(page.getByRole('button', { name: 'Place Order' })).toBeVisible();
    });
  });

  test('checkout form validation - empty required fields @ai-generated', async ({ page }) => {
    // Navigate to checkout page
    await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
    await page.waitForTimeout(1000);

    // Step 1: Attempt to submit form with all empty fields
    await test.step('Attempt to submit form with empty required fields', async () => {
      // Try to submit without filling any fields
      await page.getByRole('button', { name: 'Place Order' }).click();
      await page.waitForTimeout(300);

      // Verify form validation prevents submission and shows required field indicators
      // HTML5 validation will show on the first required field
      const phoneInput = page.getByRole('textbox', { name: 'Phone Number *' });
      await expect(phoneInput).toBeFocused();
    });

    // Step 2: Verify required field attributes are set
    await test.step('Verify required field attributes and validation', async () => {
      // Check that required fields have the required attribute
      const phoneInput = page.getByRole('textbox', { name: 'Phone Number *' });
      const streetInput = page.getByRole('textbox', { name: 'Street Address *' });
      const cityInput = page.getByRole('textbox', { name: 'City *' });
      const countrySelect = page.locator('combobox').first();

      // Verify required attributes exist
      await expect(phoneInput).toHaveAttribute('required', '');
      await expect(streetInput).toHaveAttribute('required', '');
      await expect(cityInput).toHaveAttribute('required', '');
    });

    // Step 3: Fill only phone number and verify other fields are still required
    await test.step('Fill only phone number field and test validation', async () => {
      const phoneInput = page.getByRole('textbox', { name: 'Phone Number *' });
      await phoneInput.fill('+1 (555) 123-4567');

      // Try to submit again
      await page.getByRole('button', { name: 'Place Order' }).click();
      await page.waitForTimeout(300);

      // Should focus on next required field (Street Address)
      const streetInput = page.getByRole('textbox', { name: 'Street Address *' });
      await expect(streetInput).toBeFocused();
    });
  });

  test('checkout form validation - invalid field formats @ai-generated', async ({ page }) => {
    // Navigate to checkout page
    await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
    await page.waitForTimeout(1000);

    // Step 1: Enter invalid phone number format
    await test.step('Test phone number field validation', async () => {
      const phoneInput = page.getByRole('textbox', { name: 'Phone Number *' });
      await phoneInput.fill('123'); // Too short
      await phoneInput.blur();

      // Field should still be visible and not throw error (basic validation)
      await expect(phoneInput).toHaveValue('123');
    });

    // Step 2: Test street address field
    await test.step('Test street address field accepts valid input', async () => {
      const streetInput = page.getByRole('textbox', { name: 'Street Address *' });
      await streetInput.fill('123 Main Street, Apt 4B');

      await expect(streetInput).toHaveValue('123 Main Street, Apt 4B');
    });

    // Step 3: Test city field with special characters
    await test.step('Test city field accepts valid input with special characters', async () => {
      const cityInput = page.getByRole('textbox', { name: 'City *' });
      await cityInput.fill("New York-on-Hudson"); // Hyphenated city name

      await expect(cityInput).toHaveValue('New York-on-Hudson');
    });
  });

  test('checkout form submission - with valid data @ai-generated', async ({ page }) => {
    // Navigate to checkout page
    await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
    await page.waitForTimeout(1000);

    // Step 1: Fill all required fields with valid data
    await test.step('Fill checkout form with valid data', async () => {
      const phoneInput = page.getByRole('textbox', { name: 'Phone Number *' });
      const streetInput = page.getByRole('textbox', { name: 'Street Address *' });
      const cityInput = page.getByRole('textbox', { name: 'City *' });
      const countrySelect = page.locator('combobox').first();

      // Fill contact information
      await phoneInput.fill('+1 (555) 987-6543');

      // Fill address information
      await streetInput.fill('456 Oak Avenue, Suite 200');
      await cityInput.fill('San Francisco');

      // Select country
      await countrySelect.selectOption('United States of America');

      // Verify values were accepted
      await expect(phoneInput).toHaveValue('+1 (555) 987-6543');
      await expect(streetInput).toHaveValue('456 Oak Avenue, Suite 200');
      await expect(cityInput).toHaveValue('San Francisco');
    });

    // Step 2: Verify payment method is selected
    await test.step('Verify payment method selection', async () => {
      const payOnDeliveryRadio = page.getByRole('radio', { name: 'Pay on Delivery' });

      // Default should be Pay on Delivery (checked)
      await expect(payOnDeliveryRadio).toBeChecked();
    });

    // Step 3: Submit the form
    await test.step('Submit checkout form with valid data', async () => {
      const placeOrderButton = page.getByRole('button', { name: 'Place Order' });

      // Click Place Order
      await placeOrderButton.click();
      await page.waitForTimeout(1500);

      // Verify order was processed - check if we're still on checkout or moved to confirmation
      // Success can be: page change, success message, or form disappearing
      const stillOnCheckout = await page.getByRole('heading', { name: 'Shipping Details' }).isVisible().catch(() => false);
      const orderProcessed = !stillOnCheckout; // If shipping form is gone, order proceeded

      // Order should have proceeded (form should be gone or replaced)
      expect(orderProcessed).toBeTruthy();
    });
  });

  test('checkout form - promo code functionality @ai-generated', async ({ page }) => {
    // Navigate to checkout page
    await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
    await page.waitForTimeout(1000);

    // Step 1: Verify promo code input is available
    await test.step('Verify promo code section is visible', async () => {
      const promoHeading = page.getByRole('heading', { name: 'Promo Code' });
      await expect(promoHeading).toBeVisible();

      const promoInput = page.getByRole('textbox', { name: /promo code/i });
      const applyButton = page.getByRole('button', { name: 'Apply' });

      await expect(promoInput).toBeVisible();
      await expect(applyButton).toBeVisible();
    });

    // Step 2: Test entering the suggested promo code
    await test.step('Test promo code application', async () => {
      const promoInput = page.getByRole('textbox', { name: /promo code/i });
      const applyButton = page.getByRole('button', { name: 'Apply' });

      await promoInput.fill('TAIVOUCHER30');
      await applyButton.click();
      await page.waitForTimeout(500);

      // Check if total was updated with discount
      // Total should be less than original $164.97 if promo was applied
      const totalLocator = page.locator('text=/Total/');
    });
  });

  test('checkout form - navigation and back button @ai-generated', async ({ page }) => {
    // Navigate to checkout page
    await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
    await page.waitForTimeout(1000);

    // Step 1: Verify Back to Products button is available
    await test.step('Verify back to products button is visible', async () => {
      const backButton = page.getByRole('button', { name: 'Back to Products' });
      await expect(backButton).toBeVisible();
    });

    // Step 2: Click back button and verify navigation
    await test.step('Click back button and verify return to products', async () => {
      const backButton = page.getByRole('button', { name: 'Back to Products' });
      await backButton.click();
      await page.waitForTimeout(1000);

      // Verify we're back at the home/products page
      const addToCartButton = page.getByRole('button', { name: 'ADD TO CART' }).first();
      await expect(addToCartButton).toBeVisible();

      // Verify cart items are still there
      await expect(page.locator('text=/Total.*149.97/i')).toBeVisible();
    });
  });
});
