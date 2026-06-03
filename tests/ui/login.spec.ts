import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://automationexercise.com/logout');
});

test('login page has login form', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveURL(/login/);
  await expect(page.getByPlaceholder('Email Address').first()).toBeVisible();
});

test('login with valid credentials', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');
  await page.getByPlaceholder('Email Address').first().fill('lulutest@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('12345Test!');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Logged in as')).toBeVisible();
});