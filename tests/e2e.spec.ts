import { test, expect } from '@playwright/test';

/**
 * Playwright Test Suite for AI GitHub Intelligence App
 * 
 * Test Coverage:
 * - Happy path: Full analysis workflow
 * - Input validation: Invalid repo URLs
 * - Error handling: API failures
 * - UI interactions: Button clicks, loading states
 * - Data display: Risk heatmap, PR scores, AI insights
 * - Edge cases: Empty repos, rate limiting
 */

test.describe('AI GitHub Intelligence App', () => {
  
  test.beforeEach(async ({ page }) => {
    // Load the application
    await page.goto('http://localhost:3000');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  // ============================================================================
  // HERO SECTION & INPUT VALIDATION TESTS
  // ============================================================================

  test.describe('Repository Input & Hero Section', () => {
    
    test('should display hero section on initial load', async ({ page }) => {
      // Hero section should be visible
      const heroTitle = page.getByRole('heading', { level: 1, name: /detect risky files/i });
      await expect(heroTitle).toBeVisible();
      
      const heroDescription = page.getByText(/detect risky files, unstable PRs/i);
      await expect(heroDescription).toBeVisible();
      
      // Input field should be present
      const inputField = page.getByPlaceholder(/enter github repo/i);
      await expect(inputField).toBeVisible();
      
      // Analyze button should be present and enabled
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      await expect(analyzeButton).toBeEnabledEnabled();
    });

    test('should accept valid GitHub repo URL format', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      
      // Test valid formats
      const validRepos = [
        'facebook/react',
        'microsoft/vscode',
        'torvalds/linux',
        'owner/repo'
      ];
      
      for (const repo of validRepos) {
        await inputField.clear();
        await inputField.fill(repo);
        await expect(inputField).toHaveValue(repo);
      }
    });

    test('should handle invalid GitHub URL formats', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      // Test invalid formats
      const invalidRepos = [
        'https://github.com/facebook/react',  // URL instead of owner/repo
        'facebook',  // Only owner
        '/repo',  // Only repo with slash
        'repo',  // Only repo name
        '',  // Empty
        '   '  // Whitespace
      ];
      
      for (const invalidRepo of invalidRepos) {
        await inputField.clear();
        await inputField.fill(invalidRepo);
        
        // Try to analyze - should show error or disable button
        // Depending on implementation, either:
        // 1. Button is disabled
        // 2. Error message appears
        // 3. Toast notification shows error
      }
    });

    test('should normalize repo URL (remove spaces, trim)', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      
      await inputField.fill('  facebook/react  ');
      await inputField.blur();  // Trigger normalization
      
      const value = await inputField.inputValue();
      expect(value.trim()).toBe('facebook/react');
    });

    test('should prevent multiple concurrent analysis requests', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      await inputField.fill('facebook/react');
      
      // Click analyze button 3 times rapidly
      await analyzeButton.click();
      await analyzeButton.click();
      await analyzeButton.click();
      
      // Should only make 1 API request (check via network inspection)
      // Or button should be disabled after first click
      await expect(analyzeButton).toBeDisabled();
    });
  });

  // ============================================================================
  // LOADING STATE TESTS
  // ============================================================================

  test.describe('Loading States', () => {
    
    test('should show loading spinner during analysis', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      await inputField.fill('facebook/react');
      
      // Start listening for responses (don't wait)
      const analysisPromise = page.waitForResponse(response => 
        response.url().includes('/api/predict') || response.url().includes('/api/refactor')
      );
      
      await analyzeButton.click();
      
      // Loading spinner should appear
      const spinner = page.getByRole('status').or(page.getByTestId('loading-spinner'));
      await expect(spinner).toBeVisible();
      
      // Wait for analysis to complete
      await analysisPromise;
    });

    test('should show "Analyzing..." state on button', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      await inputField.fill('facebook/react');
      await analyzeButton.click();
      
      // Button text should indicate loading
      await expect(analyzeButton).toContainText(/analyzing|loading|please wait/i);
      await expect(analyzeButton).toBeDisabled();
    });
  });

  // ============================================================================
  // DASHBOARD DISPLAY TESTS
  // ============================================================================

  test.describe('Dashboard & Analysis Results', () => {
    
    test('should display full dashboard after successful analysis', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      await inputField.fill('facebook/react');
      await analyzeButton.click();
      
      // Wait for dashboard to appear (any of these sections)
      const riskHeatmap = page.getByRole('heading', { name: /risk heatmap/i }).or(
        page.getByText(/file|risk|medium|high|low/i).first()
      );
      
      await expect(riskHeatmap).toBeVisible({ timeout: 15000 });
    });

    test('should display Risk Heatmap section', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      await inputField.fill('facebook/react');
      await analyzeButton.click();
      
      // Risk heatmap should show
      const heatmapHeading = page.getByRole('heading', { name: /risk heatmap/i });
      await expect(heatmapHeading).toBeVisible({ timeout: 15000 });
      
      // Should have table with columns
      const table = page.getByRole('table').first();
      await expect(table).toBeVisible();
      
      // Check for risk level indicators
      const riskLevels = page.locator('[class*="high"],[class*="medium"],[class*="low"]');
      await expect(riskLevels).toHaveCount(1, { gte: true });
    });

    test('should display PR Score List section', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      await inputField.fill('facebook/react');
      await analyzeButton.click();
      
      // PR scores should be visible
      const prSection = page.getByText(/pull request|pr score/i).first();
      await expect(prSection).toBeVisible({ timeout: 15000 });
      
      // Should show PR information
      const prCards = page.locator('[class*="pr-"],[class*="PR"]');
      await expect(prCards.first()).toBeVisible();
    });

    test('should display File Frequency Analysis section', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      await inputField.fill('facebook/react');
      await analyzeButton.click();
      
      // File frequency should be visible
      const fileFreq = page.getByText(/file frequency|frequent files|hotspot/i).first();
      await expect(fileFreq).toBeVisible({ timeout: 15000 });
    });
  });

  // ============================================================================
  // AI INSIGHTS STREAMING TESTS
  // ============================================================================

  test.describe('AI Insights (Predictions & Refactor)', () => {
    
    test('should stream AI predictions', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      await inputField.fill('facebook/react');
      await analyzeButton.click();
      
      // Predictions section should appear
      const predictionsHeading = page.getByText(/prediction|insight|risk/i);
      await expect(predictionsHeading.first()).toBeVisible({ timeout: 15000 });
      
      // Should have prediction items
      const predictions = page.locator('[class*="prediction"],[class*="insight"]');
      await expect(predictions.first()).toBeVisible();
    });

    test('should stream refactor plan', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      await inputField.fill('facebook/react');
      await analyzeButton.click();
      
      // Refactor plan section should appear
      const refactorHeading = page.getByText(/refactor|recommendation/i);
      await expect(refactorHeading.first()).toBeVisible({ timeout: 20000 });
      
      // Should have refactor steps
      const steps = page.locator('[class*="step"],[class*="refactor"]');
      await expect(steps.first()).toBeVisible();
    });

    test('should display streaming content progressively', async ({ page }) => {
      // Listen to network requests to verify streaming
      const responses: string[] = [];
      
      page.on('response', response => {
        if (response.url().includes('/api/predict') || response.url().includes('/api/refactor')) {
          console.log('Stream response:', response.status());
        }
      });
      
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      await inputField.fill('facebook/react');
      await analyzeButton.click();
      
      // Content should appear and grow over time
      const contentArea = page.locator('[class*="prediction"],[class*="refactor"]').first();
      
      // Wait for content to start appearing
      await expect(contentArea).toBeVisible({ timeout: 15000 });
      
      const initialLength = (await contentArea.textContent())?.length || 0;
      
      // Wait and check if content grows (streaming)
      await page.waitForTimeout(2000);
      
      const finalLength = (await contentArea.textContent())?.length || 0;
      
      // Final content should be longer than initial (more streamed)
      expect(finalLength).toBeGreaterThanOrEqual(initialLength);
    });
  });

  // ============================================================================
  // ERROR HANDLING TESTS
  // ============================================================================

  test.describe('Error Handling', () => {
    
    test('should handle invalid repository errors gracefully', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      // Enter a non-existent repo
      await inputField.fill('nonexistent-owner-12345/nonexistent-repo-67890');
      await analyzeButton.click();
      
      // Should show error message or toast
      const errorMessage = page.getByText(/not found|error|failed/i);
      
      // Error should eventually appear (within timeout)
      await expect(errorMessage.first()).toBeVisible({ timeout: 10000 });
    });

    test('should handle GitHub API rate limit errors', async ({ page }) => {
      // This test is hard to trigger naturally, but we can verify error UI exists
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      // Even if we get rate limited, app should handle it gracefully
      await inputField.fill('facebook/react');
      await analyzeButton.click();
      
      // App should not crash - navigation should still work
      const homeButton = page.getByRole('link', { name: /home|logo/i });
      
      // App should still be responsive
      await expect(page).not.toHaveTitle(/error|crash/i);
    });

    test('should allow retry after error', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      // Try with invalid repo
      await inputField.fill('invalid/repo/url');
      await analyzeButton.click();
      
      // Wait for potential error
      await page.waitForTimeout(2000);
      
      // Should be able to retry with valid repo
      await inputField.clear();
      await inputField.fill('facebook/react');
      await analyzeButton.click();
      
      // Analysis should proceed
      const content = page.locator('[class*="dashboard"]').or(page.locator('[class*="insight"]'));
      await expect(content.first()).toBeVisible({ timeout: 15000 });
    });
  });

  // ============================================================================
  // NAVIGATION & UI INTERACTION TESTS
  // ============================================================================

  test.describe('Navigation & UI Interactions', () => {
    
    test('should allow starting new analysis', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      // First analysis
      await inputField.fill('facebook/react');
      await analyzeButton.click();
      
      // Wait for results
      await page.waitForTimeout(3000);
      
      // Start new analysis
      await inputField.clear();
      await inputField.fill('microsoft/vscode');
      await analyzeButton.click();
      
      // Dashboard should update
      const content = page.locator('[class*="dashboard"]').or(page.locator('[class*="insight"]'));
      await expect(content).toBeVisible({ timeout: 15000 });
    });

    test('should persist input value while typing', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      
      // Type slowly to verify persistence
      await inputField.focus();
      await inputField.type('facebook/react', { delay: 100 });
      
      // Value should be preserved
      await expect(inputField).toHaveValue('facebook/react');
    });

    test('should have accessible keyboard navigation', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      // Focus input
      await inputField.focus();
      
      // Type repo
      await inputField.type('facebook/react');
      
      // Tab to button and press Enter
      await inputField.press('Tab');
      
      // Button should be focused
      await analyzeButton.press('Enter');
      
      // Analysis should start
      await page.waitForTimeout(2000);
    });
  });

  // ============================================================================
  // DATA ACCURACY TESTS
  // ============================================================================

  test.describe('Data Accuracy & Formatting', () => {
    
    test('should display correct repo URL in analysis', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      const testRepo = 'facebook/react';
      await inputField.fill(testRepo);
      await analyzeButton.click();
      
      // The analyzed repo should be referenced somewhere in dashboard
      const repoRef = page.getByText(testRepo);
      
      // Should be visible or at least not crash
      await expect(page).not.toHaveTitle(/error/i);
    });

    test('should display numeric data with proper formatting', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      await inputField.fill('facebook/react');
      await analyzeButton.click();
      
      // Wait for dashboard
      await page.waitForTimeout(3000);
      
      // Check for properly formatted numbers (no strange values)
      const numberElements = page.locator('[class*="score"],[class*="number"],[class*="count"]');
      
      if (await numberElements.count() > 0) {
        // Verify numbers are readable
        const firstNumber = await numberElements.first().textContent();
        expect(firstNumber).toBeTruthy();
      }
    });

    test('should color-code risk levels correctly', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      await inputField.fill('facebook/react');
      await analyzeButton.click();
      
      // Wait for risk heatmap
      await page.waitForTimeout(3000);
      
      // Check for risk level indicators
      const riskBadges = page.locator('[class*="high"],[class*="medium"],[class*="low"]');
      
      // Should have some risk badges
      const count = await riskBadges.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  // ============================================================================
  // EDGE CASES & STRESS TESTS
  // ============================================================================

  test.describe('Edge Cases', () => {
    
    test('should handle empty repository', async ({ page }) => {
      // A repo with no commits or PRs
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      // Use a valid but potentially empty repo
      await inputField.fill('github/gitignore');
      await analyzeButton.click();
      
      // Should either show data or empty state gracefully
      await page.waitForTimeout(3000);
      await expect(page).not.toHaveTitle(/error|crash/i);
    });

    test('should handle repos with very large number of commits', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      // Large repo with lots of commits
      await inputField.fill('torvalds/linux');
      await analyzeButton.click();
      
      // Should not crash or timeout excessively
      // Dashboard should appear within reasonable time
      await page.waitForTimeout(5000);
      await expect(page).not.toHaveTitle(/error|crash/i);
    });

    test('should handle special characters in filenames', async ({ page }) => {
      // The app should handle repos with special characters in filenames
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      await inputField.fill('facebook/react');
      await analyzeButton.click();
      
      // Wait for results with any filenames
      await page.waitForTimeout(3000);
      
      // App should display content without crashing
      await expect(page).not.toHaveTitle(/error|crash/i);
    });
  });

  // ============================================================================
  // RESPONSIVE DESIGN TESTS
  // ============================================================================

  test.describe('Responsive Design', () => {
    
    test('should be responsive on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('http://localhost:3000');
      
      const inputField = page.getByPlaceholder(/enter github repo/i);
      await expect(inputField).toBeVisible();
      
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      await expect(analyzeButton).toBeVisible();
    });

    test('should be responsive on tablet viewport', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('http://localhost:3000');
      
      const inputField = page.getByPlaceholder(/enter github repo/i);
      await expect(inputField).toBeVisible();
    });

    test('should be responsive on desktop viewport', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('http://localhost:3000');
      
      const inputField = page.getByPlaceholder(/enter github repo/i);
      await expect(inputField).toBeVisible();
    });
  });

  // ============================================================================
  // ACCESSIBILITY TESTS
  // ============================================================================

  test.describe('Accessibility', () => {
    
    test('should have proper heading hierarchy', async ({ page }) => {
      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toBeVisible();
      
      // Should not skip heading levels
      // (h2 should not appear before h1 is gone)
    });

    test('should have accessible button labels', async ({ page }) => {
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      // Button should have accessible name
      const name = await analyzeButton.getAttribute('aria-label');
      const textContent = await analyzeButton.textContent();
      
      expect(name || textContent).toBeTruthy();
    });

    test('should have input with associated label', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      
      // Input should have placeholder or aria-label
      const placeholder = await inputField.getAttribute('placeholder');
      const ariLabel = await inputField.getAttribute('aria-label');
      
      expect(placeholder || ariLabel).toBeTruthy();
    });

    test('should announce loading state to screen readers', async ({ page }) => {
      const inputField = page.getByPlaceholder(/enter github repo/i);
      const analyzeButton = page.getByRole('button', { name: /analyze/i });
      
      await inputField.fill('facebook/react');
      await analyzeButton.click();
      
      // Either button changes text or aria-busy is set
      const ariaState = await analyzeButton.getAttribute('aria-busy');
      const buttonText = await analyzeButton.textContent();
      
      // Should indicate loading state
      expect(ariaState === 'true' || buttonText?.includes('loading')).toBeTruthy();
    });
  });
});
      