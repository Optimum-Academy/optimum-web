import { test, expect } from '@playwright/test';

test('course filter at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 600 });
  await page.goto('http://localhost:3016/courses');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verification/screenshots/course-filter-320px.png' });
});
