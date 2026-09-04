import { test, expect } from '../fixtures/loginFixture.js';

const validUsername = 'Admin';
const validPassword = 'admin123';

test.describe('LoginPage', () => {
  // The loginPage fixture creates the page object and opens the login URL before each test.
  test.beforeEach(async ({ loginPage }) => {
    // Confirm the page is ready before attempting the login flow.
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
      // Keep failure evidence in the test output and include it in the HTML report.
      const screenshotPath = testInfo.outputPath('failure.png');

      await page.screenshot({ path: screenshotPath, fullPage: true });
      await testInfo.attach('failure-screenshot', {
        path: screenshotPath,
        contentType: 'image/png',
      });
    }
  });

  test('Submit valid login credentials', async ({ page, loginPage }) => {
    // Use the page object's reusable login action instead of interacting with selectors here.
    await loginPage.login(validUsername, validPassword);

    // A successful login redirects to the dashboard and displays its heading.
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });
});
