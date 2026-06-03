import { test, expect } from '@playwright/test';

test('API health check - ping returns 201', async ({ request }) => {
  const response = await request.get('https://restful-booker.herokuapp.com/ping');
  expect(response.status()).toBe(201);
});