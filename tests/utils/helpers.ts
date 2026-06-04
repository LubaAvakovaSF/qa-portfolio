import { Page } from '@playwright/test';

export async function login(page: Page, email: string, password: string) {
  await page.goto('/client/#/auth/login');
  await page.getByRole('textbox', { name: 'email@example.com' }).fill(email);
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}