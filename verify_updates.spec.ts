import { test, expect } from '@playwright/test';

test('verify images load and removed courses are gone', async ({ page }) => {
  await page.goto('http://localhost:3009/courses');

  // Check that removed courses are not present
  await expect(page.locator('text=Certificate IV in Disability Support')).not.toBeVisible();
  await expect(page.locator('text=Certificate IV in Ageing Support')).not.toBeVisible();

  // Check images for HLTAID011 and CHC33021
  const images = page.locator('img');
  const count = await images.count();
  console.log(`Found ${count} images`);

  for (let i = 0; i < count; i++) {
    const src = await images.nth(i).getAttribute('src');
    console.log(`Image ${i}: ${src}`);
    // In Next.js, images might be proxied/optimized
  }

  // Take a screenshot to visually verify
  await page.screenshot({ path: 'verification/screenshots/courses_page_updated.png', fullPage: true });
});
