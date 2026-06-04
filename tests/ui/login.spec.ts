import { test, expect } from '@playwright/test';
import {login} from '../utils/helpers';

// test.beforeEach(async ({ page }) => {
//   await page.goto('https://automationexercise.com/logout');
// });

test('login with valid credentials', async ({ page }) => {
  await login(page, 'luba1234@gmail.com', '12345Mira');
  await expect(page.getByText(' Sign Out ')).toBeVisible();
});

test('login with invalid credentials', async ({ page }) => {
  await login(page, 'luba1234@gmail.com', '12345Mira12345')
  await expect(page).toHaveURL(/login/);
  
})

//Showing 3 results

test('showing 3 results', async ({page}) => {
      await login(page, 'luba1234@gmail.com', '12345Mira');
  await expect(page.getByText('Showing 3 results')).toBeVisible();
})
