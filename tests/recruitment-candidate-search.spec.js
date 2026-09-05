import { test, expect } from '@playwright/test';

// Use the shared authenticated user session for this selected test.
test.use({ storageState: 'playwright/.auth/user.json' });

const recruitmentUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates';
const candidateName = 'Siti Rahayu';

test.describe('Authenticated Recruitment Candidates', () => {
  test('Search candidates using the available filters', async ({ page }) => {
    // Open the Recruitment Candidates page with the saved authenticated session.
    await page.goto(recruitmentUrl);

    await expect(page).toHaveURL(recruitmentUrl);
    await expect(page.getByRole('heading', { name: 'Candidates' })).toBeVisible();

    // Confirm the search form is ready before applying filters.
    const candidateNameInput = page.getByRole('textbox', { name: 'Type for hints...' });
    const statusFilter = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('Status', { exact: true }) })
      .locator('.oxd-select-text');
    const searchButton = page.getByRole('button', { name: 'Search' });

    await expect(candidateNameInput).toBeVisible();
    await expect(statusFilter).toBeVisible();
    await expect(searchButton).toBeEnabled();

    // Filter by a known candidate and a valid application status.
    await candidateNameInput.fill(candidateName);
    await statusFilter.click();
    await page.getByRole('option', { name: 'Application Initiated' }).click();

    await expect(candidateNameInput).toHaveValue(candidateName);
    await expect(statusFilter).toContainText('Application Initiated');

    // Submit the filters and verify the results remain on the Candidates view.
    await searchButton.click();

    await expect(page).toHaveURL(recruitmentUrl);
    await expect(page.getByRole('heading', { name: 'Candidates' })).toBeVisible();

    const resultsTable = page.getByRole('table');
    const noRecordsMessage = page.getByText(/No Records Found/i);

    await expect(resultsTable.or(noRecordsMessage)).toBeVisible();

    if (await resultsTable.isVisible()) {
      await expect(resultsTable).toContainText(candidateName);
    }
  });
});
