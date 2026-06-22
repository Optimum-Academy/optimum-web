import { test, expect } from '@playwright/test';

test('verify HLTAID011 course page', async ({ page }) => {
  await page.goto('http://localhost:3009/courses/hltaid011-provide-first-aid');

  // Check title
  await expect(page.locator('h1')).toContainText('Provide First Aid');

  // Check fee (using first() to avoid strict mode violation)
  await expect(page.getByText('$200.00').first()).toBeVisible();

  // Check duration
  await expect(page.getByText('1 day training and assessment session')).toBeVisible();

  // Check units (using first() to avoid strict mode violation)
  await expect(page.getByText('HLTAID011').first()).toBeVisible();

  // Take screenshot
  await page.screenshot({ path: '/home/jules/verification/screenshots/first_aid_course_page.png', fullPage: true });
});
