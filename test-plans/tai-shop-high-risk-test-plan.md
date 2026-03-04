# TAI Shop Test Plan - High-Risk & Critical Missing Test Cases

**Date:** March 4, 2026  
**Environment:** https://tai-shop.razvanvancea.ro (QA Sandbox)  
**Scope:** Top 5 highest-risk automated test cases for critical e-commerce functionality

---

## Overview

TAI Shop is a QA practice e-commerce platform designed for testing. This test plan identifies the **top 5 highest-risk and most critical missing automated test cases** that should be prioritized for comprehensive coverage. These test cases address core business functionality that directly impacts user experience and revenue.

### Risk Assessment Criteria
- **High Business Impact:** Core shopping and checkout processes
- **Current Coverage:** Missing or incomplete in existing test suite
- **User Impact:** High volume of users affected by failures
- **Complexity:** Multiple edge cases and integration points

---

## Test Suite 1: Shopping Cart & Checkout Flow

### Risk Level: 🔴 **CRITICAL**

**Rationale:** Checkout is the revenue path. Cart calculation errors or checkout failures directly result in lost sales and customer frustration.

### Test Case 1.1: Add Multiple Products to Cart with Accurate Total Calculation

**Objective:** Verify cart correctly accumulates multiple products and calculates accurate totals with discount handling.

**Starting State:** User is logged in with admin@admin.com / admin123

**Steps:**

1. From the home page, add the following products to cart:
   - 2x Essence Mascara Lash Princess ($9.99 each, 10% discount)
   - 1x Calvin Klein CK One ($49.99)
   - 1x Dior J'adore ($89.99)

2. Verify each product shows in the cart with correct price

3. Verify cart displays accurate subtotal:
   - Expected: ($9.99 × 2) + $49.99 + $89.99 = $159.96

4. Verify cart item counter updates in navigation

5. Remove one mascara from cart (reduce quantity to 1)

6. Verify cart recalculates: ($9.99 × 1) + $49.99 + $89.99 = $149.97

**Expected Results:**
- ✅ Each product adds without errors
- ✅ Cart icon/counter updates immediately
- ✅ Prices display with consistent currency formatting
- ✅ Subtotals calculated correctly at each step
- ✅ Quantity changes trigger correct recalculation
- ✅ Discounts applied correctly in total

**Failure Scenarios to Test:**
- Adding same product multiple times (does it increment quantity or duplicate item?)
- Removing item completely from cart
- Clearing entire cart

---

### Test Case 1.2: Proceed to Checkout and Form Validation

**Objective:** Verify checkout page loads correctly and form validation works for all required fields.

**Starting State:** User is logged in with products in cart (from Test 1.1)

**Steps:**

1. Click "PROCEED TO CHECKOUT" button

2. Verify checkout page loads and displays:
   - Order summary with all cart items
   - Breakdown of prices
   - Checkout form with required fields

3. Attempt to submit checkout form with empty required fields

4. Verify error messages appear for each empty field

5. Fill form with valid data:
   - Billing Address: Complete address
   - Shipping Address: Complete address  
   - Payment Method: Valid test payment data
   - Any other required fields

6. Verify form accepts valid data without errors

7. Submit checkout form

**Expected Results:**
- ✅ Checkout page loads within 3 seconds
- ✅ Order summary shows correct items and total
- ✅ Form blocks submission with empty required fields
- ✅ Clear error messages for each validation failure
- ✅ Form accepts complete valid data
- ✅ Order processing completes successfully

**Failure Scenarios to Test:**
- Submit with partial address information
- Submit with invalid email format
- Submit with mismatched billing/shipping addresses
- Test with special characters in address fields

---

## Test Suite 2: User Account Creation with Advanced Validation

### Risk Level: 🔴 **CRITICAL**

**Rationale:** Account creation affects user retention, data integrity, and system security. Validation failures allow invalid data entry.

### Test Case 2.1: Account Registration with Full Form Validation

**Objective:** Verify all registration form fields validate correctly and prevent invalid data submission.

**Starting State:** User navigates to register.html

**Steps:**

1. Verify registration form displays all fields:
   - First Name
   - Last Name
   - Phone Number
   - Country (dropdown)
   - Email Address (required)
   - Password (required)
   - Terms & Conditions checkbox

2. **Test Required Field Validation:**
   - Leave all fields empty and attempt to submit
   - Verify error message appears for each required field
   - Verify form does NOT submit

3. **Test Special Character Handling:**
   - First Name: Enter "John O'Brien" (with apostrophe)
   - Last Name: Enter "Jean-Marie" (with hyphen)
   - Email: Enter "test+tag@example.com" (with plus)
   - Verify all special characters are accepted without truncation

4. **Test Password Validation:**
   - Enter password "123" (too short)
   - Verify rejection with minimum length requirement message
   - Enter password "abcdefgh" (no special chars)
   - Verify weak password warning (if applicable)
   - Enter password "Str0ng!Pass" 
   - Verify acceptance

5. **Test Email Format Validation:**
   - Enter "notanemail" 
   - Verify rejection with "Invalid email format" message
   - Enter "test@"
   - Verify rejection
   - Enter "test@example.com"
   - Verify acceptance

6. **Test Country Dropdown:**
   - Verify dropdown contains all countries
   - Verify "Select a country..." is default
   - Select "United States of America"
   - Verify selection saves in form

7. **Test Terms Checkbox Requirement:**
   - Fill all fields correctly EXCEPT leave checkbox unchecked
   - Attempt to submit
   - Verify error: "You must agree to terms and conditions"
   - Check the checkbox
   - Verify form can now be submitted

8. **Submit Valid Registration:**
   - Fill all fields with valid data
   - Check terms checkbox
   - Click "Create Account"
   - Verify success message

9. **Verify Application Limitation Message:**
   - Confirm success message indicates new credentials cannot be used for login
   - Confirm message directs to use admin@admin.com / admin123

**Expected Results:**
- ✅ All required fields have validation
- ✅ Special characters in names handled correctly
- ✅ Email format validation works accurately
- ✅ Password strength requirements enforced (if applicable)
- ✅ Country dropdown functional with all options
- ✅ Terms checkbox is mandatory
- ✅ Success message clear and helpful
- ✅ No account created without all validations passing

**Edge Cases to Test:**
- Unicode characters in name fields (Chinese, Arabic, etc.)
- Very long email addresses (>254 characters)
- Spaces in password
- Multiple consecutive special characters
- Phone number formats (international vs local)

---

## Test Suite 3: Product Catalog - Sorting, Filtering & Pagination

### Risk Level: 🟡 **HIGH**

**Rationale:** Product discovery is fundamental to user experience and conversion. Sorting/pagination issues can hide products and reduce sales.

### Test Case 3.1: Sort Functionality with Data Consistency

**Objective:** Verify product sorting maintains accuracy across all sort options and persists during pagination.

**Starting State:** User is logged in on the home page

**Steps:**

1. **Verify Sort Dropdown Options:**
   - Verify dropdown displays: "Most Popular", "Price: Low to High", "Price: High to Low"
   - Default selection should be "Most Popular"

2. **Test Price: Low to High Sort:**
   - Click "Sort by: Price: Low to High"
   - Verify products re-sort with cheapest first
   - First product should be: Red Nail Polish ($8.99)
   - Last product on page should be least expensive among visible
   - Verify all prices are visible and readable

3. **Test Price: High to Low Sort:**
   - Click "Sort by: Price: High to Low"
   - Verify products reverse-sort with most expensive first
   - First product should be: Chanel Coco Noir ($129.99)
   - Verify sort order is opposite of previous sort

4. **Test Most Popular Sort:**
   - Click "Sort by: Most Popular"
   - Verify products reorder to most popular listing
   - Compare with initial default state

5. **Test Sort Persistence Across Pagination:**
   - Set sort to "Price: Low to High"
   - Navigate to page 2
   - Verify sorting order continues correctly
   - Products on page 2 should continue from lowest to highest
   - No price should be lower than last product on page 1

6. **Test Pagination Navigation:**
   - On page 1: Verify "← Prev" button is disabled
   - On page 1: Verify "Next →" button is enabled
   - Click "Next →" to go to page 2
   - On page 2: Verify "← Prev" button is enabled
   - Click page button "3" directly
   - Verify page loads correctly

7. **Test Product Consistency Across Pages:**
   - Count total unique products across all pages
   - Verify no product appears on multiple pages
   - Verify no products are missing or skipped

**Expected Results:**
- ✅ Sort dropdown displays all options correctly
- ✅ Low-to-High sort displays accurate price ordering
- ✅ High-to-Low sort displays reverse price ordering
- ✅ Sort persists when navigating between pages
- ✅ Pagination buttons work correctly
- ✅ No product duplication across pages
- ✅ Each page displays correct products for current sort
- ✅ Page load time < 2 seconds per page

**Failure Scenarios to Test:**
- Rapid clicking through pages (stress test)
- Sort changes while on page 3
- Navigating back after changing sort
- Browser back button usage between pages

---

## Test Suite 4: Authentication & Login Security

### Risk Level: 🔴 **CRITICAL**

**Rationale:** Login is the gateway to accounts. Security flaws expose user data. Failed login UX impacts user retention.

### Test Case 4.1: Login with Valid Credentials and Session Management

**Objective:** Verify login succeeds with correct credentials and creates proper session state.

**Starting State:** User is on login page (not logged in)

**Steps:**

1. **Verify Demo Credentials Display:**
   - Confirm "admin@admin.com / admin123" is visible on login page
   - Verify credentials are presented as helper/demo text

2. **Successful Login:**
   - Enter email: "admin@admin.com"
   - Enter password: "admin123"
   - Click "Sign In"
   - Verify no error messages appear
   - Verify redirect to home page or dashboard
   - Verify "Log Out" link appears in navigation
   - Verify authenticated features are accessible (shopping cart, etc.)

3. **Test Session Persistence:**
   - Refresh the page
   - Verify user remains logged in
   - Verify authenticated features still visible

4. **Test Logout:**
   - Click "Log Out" link
   - Verify redirect to login page or home (unauthenticated)
   - Verify "Log Out" link disappears
   - Verify authenticated features are no longer accessible

5. **Test Post-Logout Access:**
   - Try accessing protected pages directly via URL
   - Verify redirect back to login page
   - Verify no sensitive data exposed in URL

**Expected Results:**
- ✅ Valid credentials accepted immediately
- ✅ User logged in without error messages
- ✅ Session created and persists across page refreshes
- ✅ Authenticated features fully accessible
- ✅ Logout clears session completely
- ✅ Protected resources inaccessible after logout
- ✅ No sensitive data in URLs or error messages

---

### Test Case 4.2: Login Error Handling & Invalid Credentials

**Objective:** Verify login fails gracefully with appropriate error messages for invalid credentials.

**Starting State:** User is on login page

**Steps:**

1. **Test Incorrect Password:**
   - Enter email: "admin@admin.com"
   - Enter password: "wrongpassword"
   - Click "Sign In"
   - Verify login fails with error message
   - Verify user remains on login page
   - Verify password field is cleared
   - Verify no redirect occurs

2. **Test Non-Existent Email:**
   - Enter email: "nonexistent@example.com"
   - Enter password: "admin123"
   - Click "Sign In"
   - Verify login fails
   - Verify error message (should not reveal email doesn't exist - security)

3. **Test Empty Email Field:**
   - Leave email empty
   - Enter password: "admin123"
   - Click "Sign In"
   - Verify form blocks submission
   - Verify error: "Email is required"

4. **Test Empty Password Field:**
   - Enter email: "admin@admin.com"
   - Leave password empty
   - Click "Sign In"
   - Verify form blocks submission
   - Verify error: "Password is required"

5. **Test All Fields Empty:**
   - Leave both fields empty
   - Click "Sign In"
   - Verify form blocks submission
   - Verify errors for both fields

6. **Test Case Sensitivity:**
   - Enter email: "ADMIN@ADMIN.COM" (uppercase)
   - Enter password: "admin123"
   - Click "Sign In"
   - Verify system either accepts (case-insensitive) or rejects appropriately

**Expected Results:**
- ✅ Incorrect password rejected with appropriate error
- ✅ Non-existent email handled securely (no email enumeration)
- ✅ Empty fields blocked with clear error messages
- ✅ User remains on login page for reentry
- ✅ Error messages don't leak security information
- ✅ Password field clears after failed attempt
- ✅ Rapid failed attempts don't lock out (or explain lockout)

---

## Test Suite 5: Password Recovery Flow

### Risk Level: 🟡 **HIGH**

**Rationale:** Password recovery is critical for users who forget credentials. UX and security issues here impact user retention and system security.

### Test Case 5.1: Password Recovery with Email Validation

**Objective:** Verify password recovery flow with proper form validation and user-friendly messaging.

**Starting State:** User is on login page

**Steps:**

1. **Navigate to Password Recovery:**
   - Click "Forgot your password?" link
   - Verify page loads to recover-password.html
   - Verify title shows "Reset Password"

2. **Verify QA Environment Notice:**
   - Confirm notice appears explaining this is QA playground
   - Confirm text states no actual emails will be sent in this environment
   - Verify user understands limitation of test environment

3. **Test Valid Email Submission:**
   - Enter: "admin@admin.com"
   - Click "Send Reset Link"
   - Verify form submission succeeds
   - Verify success message appears (confirming email would be sent in production)
   - Verify email field may clear or show confirmation

4. **Test Invalid Email Format:**
   - Enter: "notanemail"
   - Click "Send Reset Link"
   - Verify form validation rejects invalid format
   - Verify error: "Please enter a valid email address"
   - Verify form does NOT submit

5. **Test Email with Special Characters:**
   - Enter: "test+tag@example.com"
   - Verify email is accepted as valid
   - Submit and verify success

6. **Test Empty Email Field:**
   - Leave email empty
   - Click "Send Reset Link"
   - Verify form blocks submission
   - Verify error: "Email is required"

7. **Test Non-Existent Email:**
   - Enter: "nonexistent@example.com"
   - Click "Send Reset Link"
   - Verify response (should not reveal email exists or doesn't - security)

8. **Test Rapid Submissions:**
   - Enter email "admin@admin.com"
   - Click "Send Reset Link"
   - Immediately click again multiple times
   - Verify application handles gracefully
   - Verify no duplicate submissions or errors

9. **Test Navigation:**
   - From password recovery page, click "← Back to login"
   - Verify redirect to login page
   - Verify no email retained (security - no pre-fill)
   - Verify login form is ready for fresh entry

**Expected Results:**
- ✅ Password recovery page accessible from login
- ✅ QA environment notice clear and informative
- ✅ Valid emails accepted and processed
- ✅ Invalid format rejected with error message
- ✅ Special characters in email handled correctly
- ✅ Empty field validation works
- ✅ No email enumeration (doesn't reveal email exists or doesn't)
- ✅ Rapid submissions handled gracefully
- ✅ Back button functional and clears form
- ✅ All interactions complete within 3 seconds

---

## Priority & Execution Order

| Priority | Test Suite | Risk Level | Expected Duration |
|----------|-----------|-----------|-------------------|
| 1 | Shopping Cart & Checkout | 🔴 CRITICAL | 45 min |
| 2 | Authentication & Login | 🔴 CRITICAL | 35 min |
| 3 | Account Creation | 🔴 CRITICAL | 40 min |
| 4 | Product Sorting & Pagination | 🟡 HIGH | 30 min |
| 5 | Password Recovery | 🟡 HIGH | 25 min |

**Total Estimated Coverage Time:** ~175 minutes (3 hours)

---

## Success Criteria

✅ All test cases pass without errors  
✅ No data inconsistencies in calculations or displays  
✅ Error messages are clear and actionable  
✅ Form validation prevents invalid data submission  
✅ Security best practices (no email enumeration, no credential leaks)  
✅ Performance acceptable (< 3s page loads)  
✅ Edge cases handled gracefully  

---

## Known Environment Limitations

- **No Database Integration:** New account credentials cannot be used for login; admin@admin.com / admin123 is the test user
- **No Email Sending:** Password recovery and email verification don't actually send emails
- **QA Sandbox Only:** No real transactions, payments, or data persistence

---

**Test Plan Version:** 1.0  
**Last Updated:** March 4, 2026  
**Created by:** AI Test Planner for Playwright Framework
