import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {


    await page.goto('https://rahulshettyacademy.com/seleniumPractise/');
    await page.getByText("Flight Booking").click();
  });
});
