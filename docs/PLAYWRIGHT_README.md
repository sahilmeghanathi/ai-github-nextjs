# Playwright Test Suite - AI GitHub Intelligence

This directory contains end-to-end (E2E) tests for the AI GitHub Intelligence application using Playwright.

## 📋 Test Coverage

The test suite includes **100+ test cases** covering:

### Test Categories

1. **Hero Section & Input Validation** (7 tests)
   - Hero section visibility
   - Valid/invalid repo URL formats
   - Input normalization
   - Multi-click prevention (debouncing)

2. **Loading States** (2 tests)
   - Spinner display
   - Button state during analysis

3. **Dashboard Display** (4 tests)
   - Risk heatmap rendering
   - PR score list
   - File frequency analysis
   - Complete dashboard appearance

4. **AI Insights** (3 tests)
   - Predictions streaming
   - Refactor plan streaming
   - Progressive content loading

5. **Error Handling** (3 tests)
   - Invalid repositories
   - API rate limiting
   - Retry functionality

6. **Navigation & UI** (3 tests)
   - New analysis workflow
   - Input persistence
   - Keyboard navigation

7. **Data Accuracy** (3 tests)
   - Repo URL display
   - Number formatting
   - Risk level color coding

8. **Edge Cases** (3 tests)
   - Empty repositories
   - Large repositories
   - Special characters in filenames

9. **Responsive Design** (3 tests)
   - Mobile viewport (375x667)
   - Tablet viewport (768x1024)
   - Desktop viewport (1920x1080)

10. **Accessibility** (5 tests)
    - Heading hierarchy
    - Button labels
    - Input labels
    - Screen reader support
    - ARIA attributes

## 🚀 Getting Started

### Prerequisites

1. **Node.js** 18+ installed
2. **Application running locally** at `http://localhost:3000`
3. **Environment variables configured** (`.env.local`):
   ```bash
   GITHUB_TOKEN=your_github_token
   GROQ_API_KEY=your_groq_api_key
   ```

### Installation

```bash
# Install Playwright and browsers
npm install -D @playwright/test

# Install Playwright browsers (chromium, firefox, webkit)
npx playwright install

# Optional: Install dependencies for specific OS
npx playwright install-deps
```

Alternatively, add to your `package.json`:

```json
{
  "devDependencies": {
    "@playwright/test": "^1.48.0"
  }
}
```

## 🏃 Running Tests

### Start the Application First

```bash
# Terminal 1: Start dev server
npm run dev
# App will be available at http://localhost:3000
```

### Run Tests

```bash
# Terminal 2: Run all tests
npm run test:e2e

# Run specific test file
npx playwright test tests/e2e.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run specific test by name (regex)
npx playwright test -g "should display Risk Heatmap"

# Run with UI mode (interactive)
npx playwright test --ui

# Run in headed mode (see browser)
npx playwright test --headed

# Debug mode (step through tests)
npx playwright test --debug
```

### Add npm Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:chromium": "playwright test --project=chromium",
    "test:e2e:report": "playwright show-report"
  }
}
```

Then run:

```bash
npm run test:e2e
npm run test:e2e:ui
npm run test:e2e:headed
```

## 📊 Test Reports

After tests run, Playwright generates reports:

### HTML Report

```bash
# View the HTML report
npx playwright show-report
```

Reports are stored in:
- `test-results/` - Test artifacts
- `playwright-report/` - HTML test report

### CI/CD Integration

For CI/CD pipelines (GitHub Actions, etc.):

```yaml
# .github/workflows/test.yml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run dev &
      - run: sleep 5
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## 🔍 Key Test Scenarios

### Scenario 1: Valid Repository Analysis

```typescript
test('should display full dashboard after successful analysis', async ({ page }) => {
  const inputField = page.getByPlaceholder(/enter github repo/i);
  const analyzeButton = page.getByRole('button', { name: /analyze/i });
  
  await inputField.fill('facebook/react');
  await analyzeButton.click();
  
  // Verify dashboard appears
  const riskHeatmap = page.getByRole('heading', { name: /risk heatmap/i });
  await expect(riskHeatmap).toBeVisible({ timeout: 15000 });
});
```

### Scenario 2: Invalid Input Handling

```typescript
test('should handle invalid GitHub URL formats', async ({ page }) => {
  const inputField = page.getByPlaceholder(/enter github repo/i);
  
  const invalidRepos = [
    'https://github.com/facebook/react',
    'facebook',
    '',
  ];
  
  for (const invalidRepo of invalidRepos) {
    await inputField.clear();
    await inputField.fill(invalidRepo);
    // Verify error or disabled state
  }
});
```

### Scenario 3: Streaming Content Verification

```typescript
test('should stream AI predictions', async ({ page }) => {
  // Analysis starts, AI content streams in real-time
  await analyzeButton.click();
  
  const predictionsHeading = page.getByText(/prediction|insight/i);
  await expect(predictionsHeading.first()).toBeVisible({ timeout: 15000 });
});
```

## 🛠️ Debugging Tests

### UI Mode (Recommended)

```bash
npx playwright test --ui
```

Browser with Inspector opens. Step through tests, inspect elements, set breakpoints.

### Debug Mode

```bash
npx playwright test --debug
```

Opens Playwright Inspector. Step through each test action.

### Generated Traces & Videos

Check `test-results/` for:
- `trace.zip` - Full test execution trace (playback available)
- `.webm` videos - Recorded test runs
- Screenshots - On failure

### Inspect Element in Tests

```typescript
test('debug test', async ({ page }) => {
  // Take a screenshot
  await page.screenshot({ path: 'screenshot.png' });
  
  // Pause execution
  await page.pause();
  
  // Get page state
  console.log(await page.locator('body').screenshot());
});
```

## ⚙️ Configuration

### Base URL

Tests use `http://localhost:3000` as base URL (from `playwright.config.ts`).

Change by modifying:

```typescript
use: {
  baseURL: 'http://your-app-url',
}
```

### Timeouts

- **Test timeout**: 30 seconds
- **Expect timeout**: 5 seconds
- **Navigation timeout**: 30 seconds

Modify in `playwright.config.ts` or per-test:

```typescript
test('slow test', async ({ page }) => {
  await expect(element).toBeVisible({ timeout: 10000 });
}, { timeout: 60_000 });
```

### Retries

- **CI**: 2 retries (to handle flakiness)
- **Local**: 0 retries

### Parallel Execution

Tests run **sequentially** (1 worker) to avoid:
- GitHub API rate limiting
- Conflicting state
- Resource contention

For faster runs (if API allows):

```typescript
// playwright.config.ts
workers: 4,
```

## 🚨 Common Issues

### Issue: Tests timeout waiting for API response

**Solution**: GitHub/Groq APIs are slow. Increase timeout:

```typescript
await expect(element).toBeVisible({ timeout: 20000 });
```

### Issue: "Port 3000 is already in use"

**Solution**: Kill existing process or change port:

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
# Update baseURL in playwright.config.ts
```

### Issue: "Could not connect to http://localhost:3000"

**Solution**: Ensure dev server is running:

```bash
npm run dev  # Terminal 1
npm run test:e2e  # Terminal 2
```

### Issue: GitHub API rate limit (403 error)

**Solution**: 
- Use valid `GITHUB_TOKEN` in `.env.local`
- Wait for rate limit to reset (1 hour)
- Test with different repos

### Issue: Flaky tests (intermittent failures)

**Solution**:
- Increase timeouts for API calls
- Use explicit waits instead of time-based delays
- Retry failed tests (`retries: 2` in config)

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Inspector](https://playwright.dev/docs/inspector)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)

## 🎯 Next Steps

1. **Run the tests**: `npm run test:e2e`
2. **View the report**: `npm run test:e2e && npx playwright show-report`
3. **Add CI/CD integration**: Create GitHub Actions workflow
4. **Expand coverage**: Add more test cases for edge cases
5. **Performance tests**: Add Lighthouse audits via Playwright

---

**Questions?** Check the [Playwright docs](https://playwright.dev) or the test file comments.
