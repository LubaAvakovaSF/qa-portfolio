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

test('Iphone 13', async ({page}) => {
    await login(page, 'luba1234@gmail.com', '12345Mira');
    await page.getByRole('textbox', { name: 'search' }).fill('iphone');
    await expect(page.getByText('IPHONE 13 PRO')).toBeVisible();
})

test('add to card=t', async ({page}) => {
    await login(page, 'luba1234@gmail.com', '12345Mira');
    // Find the iPhone card specifically, then click Add To Cart within it
    await page.locator('.card').filter({ hasText: 'IPHONE 13 PRO' }).getByRole('button', { name: 'Add To Cart' }).click();
    await page.getByRole('button', { name: '   Cart' }).click();
    await expect (page.getByRole('heading', { name: 'iphone 13 pro' })).toBeVisible();

//     page.locator('.card')  // find all cards
//   .filter({ hasText: 'IPHONE 13 PRO' })  // keep only the iPhone one
//   .getByRole('button', { name: 'Add To Cart' })  // find button inside
})

/*
test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.getByRole('textbox', { name: 'email@example.com' }).click();
  await page.getByRole('textbox', { name: 'email@example.com' }).fill('luba');
  await page.getByRole('textbox', { name: 'email@example.com' }).click();
  await page.getByRole('textbox', { name: 'email@example.com' }).fill('luba1234@gmail.com');
  await page.getByRole('textbox', { name: 'enter your passsword' }).click();
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill('12345Mira');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: ' Add To Cart' }).nth(2).click();
  await page.getByRole('button', { name: '   Cart' }).click();
  await page.getByRole('heading', { name: 'iphone 13 pro' }).click();
  await page.getByRole('heading', { name: 'My Cart' }).click();
});

*/




