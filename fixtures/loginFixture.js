import { test as base, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await use(loginPage);
    },
});

export { expect };
