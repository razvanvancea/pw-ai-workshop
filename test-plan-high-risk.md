note: prompt example for pw-planner agent: Use the Playwright MCP server to browse https://tai-shop.razvanvancea.ro
and generate a .md test plan containing the top 5 highest-risk and most important missing automated test cases.



# Top 5 High-Risk Missing Test Cases - TAI Shop

## Application Overview

TAI Shop (tai-shop.razvanvancea.ro) is an e-commerce application featuring product browsing, shopping cart management, user authentication, and checkout functionality. Current test coverage includes basic login and add-to-cart scenarios. This test plan identifies the 5 highest-risk and most important missing automated test cases that should be prioritized to improve overall test coverage and catch critical defects.

## Test Scenarios

### 1. Checkout & Order Flow - Critical Path

**Seed:** `tests/seed.spec.ts`

#### 1.1. Complete checkout flow with all required fields and Pay on Delivery

**File:** `tests/checkout-full-flow.spec.ts`

**Steps:**

1. Login with valid credentials (admin@admin.com / admin123)


    - expect: User is logged in successfully
    - expect: Shopping cart is visible and empty

2. Add multiple products to cart (at least 2 different items with varying prices)


    - expect: Each product is added to cart successfully
    - expect: Cart total updates correctly after each addition
    - expect: Cart displays correct item count

3. Click 'PROCEED TO CHECKOUT' button


    - expect: User navigates to checkout page
    - expect: Shipping step is displayed (Step 1 of 2)
    - expect: Order summary shows correct subtotal

4. Fill in shipping form: Phone Number (+1 (555) 123-4567), Street Address (123 Main St), City (New York), Country (United States of America)


    - expect: All fields accept the input without validation errors
    - expect: Form state is preserved while filling

5. Verify 'Pay on Delivery' payment option is selected by default


    - expect: Pay on Delivery radio button is pre-selected
    - expect: Online Payment option is available but not selected

6. Verify order summary shows: Subtotal + Shipping = Total (e.g., Subtotal: $X.XX, Shipping: $15.00, Total: $Y.YY)


    - expect: All monetary values are displayed correctly
    - expect: Subtotal excludes shipping
    - expect: Total includes shipping
    - expect: Amounts are formatted with dollar signs and two decimals

7. Click 'Place Order' button


    - expect: Order is successfully placed
    - expect: User is redirected to confirmation page or home page
    - expect: Cart is cleared after order placement

#### 1.2. Promo code application and discount validation

**File:** `tests/promo-code-validation.spec.ts`

**Steps:**

1. Login and add product(s) totaling exactly $10 or more to cart


    - expect: Products are added to cart
    - expect: Cart total is displayed

2. Proceed to checkout and fill shipping details


    - expect: Checkout page loads with order summary

3. Verify promo code hint displays 'Try TAIVOUCHER30 for 30% off'


    - expect: Help text is visible and readable
    - expect: Promo code field is ready for input

4. Enter promo code 'TAIVOUCHER30' and click 'Apply' button


    - expect: Success message displays 'Voucher applied! 30% discount'
    - expect: Total price is recalculated: new total = (subtotal - (subtotal * 0.30)) + shipping

5. Verify discount calculation is correct (e.g., if subtotal was $10, discount should be $3, new subtotal $7, total with $15 shipping = $22)


    - expect: Discount is correctly applied to product subtotal only, not shipping
    - expect: Mathematical calculation is accurate

6. Try entering invalid promo code (e.g., 'INVALID123')


    - expect: Error message is displayed
    - expect: Total price reverts to original or no discount is applied
    - expect: Field is cleared or maintains user input for retry

#### 1.3. Payment method selection and form state management

**File:** `tests/payment-method-selection.spec.ts`

**Steps:**

1. Add product to cart and navigate to checkout


    - expect: Checkout page displays payment method options

2. Verify default payment method is 'Pay on Delivery'


    - expect: Pay on Delivery radio button is checked by default

3. Click on 'Online Payment' radio button


    - expect: Online Payment becomes selected
    - expect: Pay on Delivery becomes deselected
    - expect: Page does not refresh or lose form data

4. Switch back to 'Pay on Delivery' and verify selection


    - expect: Pay on Delivery becomes selected again
    - expect: Online Payment becomes deselected

5. Fill shipping form completely with 'Pay on Delivery' selected, then switch to 'Online Payment' multiple times


    - expect: All previously entered shipping data is preserved
    - expect: No data loss occurs when toggling payment methods

6. Place order with 'Online Payment' selected (or attempt to place order)


    - expect: Form accepts the submission or shows appropriate error if payment integration is incomplete
    - expect: Order state is consistent with selected payment method

### 2. User Authentication & Registration

**Seed:** `tests/seed.spec.ts`

#### 2.1. User registration with validation and error handling

**File:** `tests/user-registration-complete.spec.ts`

**Steps:**

1. Navigate to registration page (/register.html)


    - expect: Registration page loads successfully
    - expect: All form fields are visible: First Name, Last Name, Phone Number, Country, Email, Password, Terms checkbox

2. Attempt to create account with empty required fields and click 'Create Account'


    - expect: Validation error message appears for each empty required field
    - expect: Form prevents submission
    - expect: User remains on registration page

3. Enter valid First Name and Last Name, leave optional fields (Phone, Country) blank, fill Email and Password, check Terms, then submit


    - expect: Registration succeeds or validation errors appear only for truly required fields
    - expect: System distinguishes between required and optional fields correctly

4. Attempt to register with invalid email format (e.g., 'notanemail', 'test@', '@example.com')


    - expect: Email validation error message displays
    - expect: Form prevents submission with invalid email

5. Attempt to register with a weak password (e.g., '123') if password strength validation exists


    - expect: Password validation error or warning appears
    - expect: System communicates minimum password requirements

6. Attempt to register with email already in use (if backend prevents duplicates)


    - expect: Appropriate error message indicates email is already registered
    - expect: Form submission is rejected

7. Complete registration with all valid data: First Name, Last Name, Phone, Country, Email, strong Password, check Terms


    - expect: Account is created successfully
    - expect: User is redirected to login page or home page
    - expect: Success message is displayed

8. Log in with newly created account credentials


    - expect: Login succeeds with new account
    - expect: User can access shopping features

#### 2.2. Password recovery and reset functionality

**File:** `tests/password-recovery-flow.spec.ts`

**Steps:**

1. Navigate to password recovery page (/recover-password.html)


    - expect: Password recovery page loads
    - expect: Email input field and 'Send Reset Link' button are visible
    - expect: Note about sandbox environment is displayed

2. Click 'Send Reset Link' button without entering an email


    - expect: Validation error appears requiring email input
    - expect: Button click is prevented or validation occurs

3. Enter invalid email format (e.g., 'notanemail') and click 'Send Reset Link'


    - expect: Email validation error is displayed
    - expect: Reset link is not sent

4. Enter a valid email address that doesn't exist in the system (e.g., 'nonexistent@example.com')


    - expect: System either: shows success message (for security), shows error that email not found, or returns to login
    - expect: Behavior is consistent and secure

5. Enter the admin account email (admin@admin.com) and click 'Send Reset Link'


    - expect: Success message displays indicating reset link was sent
    - expect: User is redirected or shown next steps
    - expect: Page shows note that no actual email is sent in sandbox

6. Verify that attempting to log in immediately after reset request still allows login with old password


    - expect: Old credentials still work until reset is confirmed
    - expect: Reset token doesn't invalidate current session prematurely

### 3. Product Catalog & Browsing - Data Integrity

**Seed:** `tests/seed.spec.ts`

#### 3.1. Sorting, pagination, and product data consistency

**File:** `tests/product-sorting-pagination.spec.ts`

**Steps:**

1. Navigate to home page and verify default sort is 'Most Popular'


    - expect: Products are displayed in default order
    - expect: 'Most Popular' option is selected in Sort dropdown

2. Change sort to 'Price: Low to High' and verify product order


    - expect: Products are re-sorted and displayed in ascending price order
    - expect: First product has lowest price, last visible product has higher price
    - expect: Sorting changes immediately without page reload

3. Verify each product shows: name, image, price, 'ADD TO CART' button, 'Add to favorites' button


    - expect: All product elements are present and correctly labeled

4. Change sort to 'Price: High to Low' and verify opposite order


    - expect: Products are sorted in descending price order
    - expect: First product has highest price

5. Navigate to page 2 using pagination button and verify products are different from page 1


    - expect: Page 2 displays different products
    - expect: Product count per page is consistent (appears to be 10)
    - expect: Pagination buttons are functional

6. Change sort while on page 2, then navigate back to page 1


    - expect: Sorting persists and applies across all pages
    - expect: Page 1 shows correctly sorted products from the beginning

7. Verify all pagination buttons are functional: click through pages 1→5→10→20→1


    - expect: Each page loads with correct products
    - expect: Current page button is highlighted/disabled
    - expect: Previous/Next buttons are enabled/disabled appropriately

8. Click on a product to view details, then use back navigation


    - expect: Product detail page loads correctly
    - expect: Returning to listing preserves sort and page position
    - expect: No data loss or incorrect product display
