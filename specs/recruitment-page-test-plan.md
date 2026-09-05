# OrangeHRM Authenticated Recruitment Test Plan

## Application Overview

Test plan for the authenticated OrangeHRM Recruitment Candidates page after logging in with the saved storage state. The page is available at /web/index.php/recruitment/viewCandidates and includes Candidates and Vacancies navigation, candidate search filters, Reset and Search controls, an Add action, a records count, and a candidates results table. Tests assume a fresh browser context with valid authentication available through the project's storage state.

## Test Scenarios

### 1. Authenticated Recruitment Candidates

**Seed:** `tests/loggedin-recruiter-test.spec.js`

#### 1.1. Open the Recruitment Candidates page after login

**File:** `tests/recruitment/recruitment-page-display.spec.js`

**Steps:**
  1. Start a fresh browser context with valid authenticated storage state and navigate to the Recruitment module.
    - expect: The user remains authenticated.
    - expect: The URL contains /web/index.php/recruitment/viewCandidates.
    - expect: The page heading Recruitment is visible.
    - expect: The Candidates tab, Vacancies tab, candidate filter form, Add button, and candidates table are visible.

#### 1.2. Search candidates using the available filters

**File:** `tests/recruitment/recruitment-candidate-search.spec.js`

**Steps:**
  1. Open the authenticated Recruitment Candidates page.
    - expect: The candidate search form is visible.
  2. Enter a candidate name in the Candidate Name field and select a valid Status filter.
    - expect: The selected search values remain visible in the form.
  3. Click Search.
    - expect: The results table refreshes using the selected criteria.
    - expect: The displayed records match the selected search criteria or an explicit no-results state is shown.
    - expect: The page remains on the Recruitment Candidates view.

#### 1.3. Reset candidate search filters

**File:** `tests/recruitment/recruitment-candidate-reset.spec.js`

**Steps:**
  1. Open the authenticated Recruitment Candidates page.
    - expect: The candidate search form is visible.
  2. Set one or more filters, including Candidate Name and Keywords.
    - expect: The entered filter values are visible.
  3. Click Reset.
    - expect: All search fields return to their default empty or Select state.
    - expect: The results area returns to the default candidate list or refreshes without the applied filters.

#### 1.4. Show a controlled empty result for unmatched criteria

**File:** `tests/recruitment/recruitment-empty-search.spec.js`

**Steps:**
  1. Open the authenticated Recruitment Candidates page.
    - expect: The candidate search form is visible.
  2. Enter a unique candidate value that does not exist and click Search.
    - expect: The page remains stable and authenticated.
    - expect: The results show zero records or a clear no-records message.
    - expect: No unrelated candidate records are displayed.

#### 1.5. Open the Add Candidate workflow

**File:** `tests/recruitment/recruitment-add-candidate.spec.js`

**Steps:**
  1. Open the authenticated Recruitment Candidates page.
    - expect: The Add button is visible and enabled.
  2. Click Add.
    - expect: The Add Candidate form opens.
    - expect: The page heading or form identifies the candidate-creation workflow.
    - expect: The user remains authenticated.

#### 1.6. Switch between Candidates and Vacancies views

**File:** `tests/recruitment/recruitment-navigation.spec.js`

**Steps:**
  1. Open the authenticated Recruitment module on the Candidates view.
    - expect: Candidates is the active view.
  2. Click Vacancies.
    - expect: The vacancies view opens.
    - expect: The page remains authenticated and the URL or heading identifies Vacancies.
  3. Click Candidates.
    - expect: The candidates view opens again.
    - expect: The candidate search form and results table are visible.
