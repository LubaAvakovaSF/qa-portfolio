import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

test('Adobe Learn loads as logged in user', async ({ page }) => {
  await page.goto('https://www.adobe.com/learn', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Hello, Lu')).toBeVisible();
});

test('Text Browser Adobe Learn is visible', async ({page}) => {
    await page.goto('https://www.adobe.com/learn', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Browse Adobe Learn')).toBeVisible();
})

test('Text Learn Firefly is visible', async ({page}) => {
    await page.goto('https://www.adobe.com/learn', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Learn Firefly')).toBeVisible();
})