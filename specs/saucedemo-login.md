# Saucedemo Login Test Plan

## Application Overview

Swag Labs (https://www.saucedemo.com) is a demo e-commerce site whose entry point is a single login form
(Username, Password, Login button). A successful login redirects to `/inventory.html` (the "Products" page,
6 items). Failed logins stay on `/` and show a dismissible error banner (`[data-test="error"]`) prefixed
"Epic sadface:". The login page lists the accepted usernames and the shared password (`secret_sauce`).

**Observed locators (login page):** `[data-test="username"]`, `[data-test="password"]`, `[data-test="login-button"]`,
error banner `[data-test="error"]` with a "Dismiss error" button.

## Test Scenarios

### 1. Login

**Seed:** `tests/seed.spec.ts` (navigates to `https://www.saucedemo.com/`; to be created at generation time)

#### 1.1. standard-user-login-success

**File:** `tests/login/standard-user-login-success.spec.ts`

**Preconditions:** Fresh browser context, login page loaded, user not authenticated.

**Steps:**
  1. Type `standard_user` into the Username field
    - expect: Username field has value `standard_user`
  2. Type `secret_sauce` into the Password field
    - expect: Password field is masked and has value `secret_sauce`
  3. Click the Login button
    - expect: URL is `https://www.saucedemo.com/inventory.html`
    - expect: "Products" heading/title is visible
    - expect: Product list shows 6 items, sort dropdown defaults to "Name (A to Z)"
    - expect: Cart is empty and "Open Menu" button is visible
    - expect: No error banner is present

#### 1.2. locked-out-user-shows-error

**File:** `tests/login/locked-out-user-shows-error.spec.ts`

**Preconditions:** Fresh browser context, login page loaded.

**Steps:**
  1. Type `locked_out_user` into the Username field
    - expect: Username field has value `locked_out_user`
  2. Type `secret_sauce` into the Password field
  3. Click the Login button
    - expect: Error banner is visible with text "Epic sadface: Sorry, this user has been locked out."
    - expect: URL remains `https://www.saucedemo.com/`
    - expect: Login form is still displayed; inventory page is not shown

#### 1.3. empty-username-shows-error

**File:** `tests/login/empty-username-shows-error.spec.ts`

**Preconditions:** Fresh browser context, login page loaded.

**Steps:**
  1. Leave the Username field empty
  2. Type `secret_sauce` into the Password field
  3. Click the Login button
    - expect: Error banner is visible with text "Epic sadface: Username is required"
    - expect: URL remains `https://www.saucedemo.com/`
    - expect: Username field is empty; Password field retains its value

#### 1.4. empty-password-shows-error

**File:** `tests/login/empty-password-shows-error.spec.ts`

**Preconditions:** Fresh browser context, login page loaded.

**Steps:**
  1. Type `standard_user` into the Username field
  2. Leave the Password field empty
  3. Click the Login button
    - expect: Error banner is visible with text "Epic sadface: Password is required"
    - expect: URL remains `https://www.saucedemo.com/`

#### 1.5. invalid-credentials-show-error

**File:** `tests/login/invalid-credentials-show-error.spec.ts`

**Preconditions:** Fresh browser context, login page loaded.

**Steps:**
  1. Type `foo` into the Username field
  2. Type `bar` into the Password field
  3. Click the Login button
    - expect: Error banner is visible with text "Epic sadface: Username and password do not match any user in this service"
    - expect: URL remains `https://www.saucedemo.com/`
    - expect: Inventory page is not shown

## Exploration Notes

- Both fields empty (not in scope, not walked) is expected to show "Username is required" as the username check runs first.
- The browser console reports 2 errors on failed-login pages; these were not investigated and should not be asserted on.
- `playwright-cli` snapshot refs changed after `reload`, so generation should use the `data-test` locators above rather than stale refs.
- Exploration was done via `playwright-cli open --headed` directly, not through a seed test, since no seed or Playwright config exists in the workspace yet.
