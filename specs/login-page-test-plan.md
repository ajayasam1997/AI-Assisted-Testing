# OrangeHRM LoginPage Test Plan

## Application Overview

Focused functional test plan for the LoginPage page object only. The page opens the OrangeHRM login URL, exposes Username and Password inputs, a Login button, and a Forgot your password? control, and provides a login(username, password) action. Every scenario starts from a fresh browser context using the loginPage fixture.

## Test Scenarios

### 1. LoginPage

**Seed:** `fixtures/loginFixture.js`

#### 1.1. Display the login page controls

**File:** `tests/login-page/login-page-display.spec.js`

**Steps:**
  1. Start a fresh test using the loginPage fixture.
    - expect: The OrangeHRM login URL is open.
    - expect: The Username textbox, Password textbox, Login button, and Forgot your password? control are visible.

#### 1.2. Submit valid login credentials

**File:** `tests/login-page/login-page-valid-login.spec.js`

**Steps:**
  1. Start a fresh test using the loginPage fixture.
    - expect: The OrangeHRM login page is open.
  2. Call loginPage.login with username Admin and password admin123.
    - expect: The credentials are entered into the corresponding fields.
    - expect: The Login button is submitted.
    - expect: The application opens an authenticated dashboard or otherwise leaves the login page.

#### 1.3. Reject invalid login credentials

**File:** `tests/login-page/login-page-invalid-login.spec.js`

**Steps:**
  1. Start a fresh test using the loginPage fixture.
    - expect: The OrangeHRM login page is open.
  2. Call loginPage.login with an invalid username and invalid password.
    - expect: The user remains on the login page.
    - expect: An authentication error is displayed.
    - expect: The login controls remain available.

#### 1.4. Validate empty login submission

**File:** `tests/login-page/login-page-required-fields.spec.js`

**Steps:**
  1. Start a fresh test using the loginPage fixture and click the Login button without entering credentials.
    - expect: The user remains on the login page.
    - expect: Required validation is shown for the missing username and password.
    - expect: No authenticated page is opened.

#### 1.5. Open password reset from LoginPage

**File:** `tests/login-page/login-page-forgot-password.spec.js`

**Steps:**
  1. Start a fresh test using the loginPage fixture and click the Forgot your password? control.
    - expect: The password-reset page or reset form is displayed.
    - expect: The user is not authenticated.
