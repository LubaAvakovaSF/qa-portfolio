import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//   await page.goto('https://automationexercise.com/logout');
// });

test('login with valid credentials', async ({ page }) => {
  await page.goto('/client/#/auth/login');
  await page.getByRole('textbox', { name: 'email@example.com' }).fill('luba1234@gmail.com');
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill('12345Mira');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(' Sign Out ')).toBeVisible();
});

test('login with invalid credentials', async ({ page }) => {
  await page.goto('/client/#/auth/login');
  await page.getByRole('textbox', { name: 'email@example.com' }).fill('luba1234@gmail.com');
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill('12345Mira123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/login/);
  
})
