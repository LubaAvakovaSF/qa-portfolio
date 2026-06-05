import { test, expect } from '@playwright/test';

test('API health check - ping returns 201', async ({ request }) => {
  const response = await request.get('https://restful-booker.herokuapp.com/ping');
  expect(response.status()).toBe(201);
});

test('GET all bookings returns 200', async ({ request }) => {
  const response = await request.get('https://restful-booker.herokuapp.com/booking');
  
  expect(response.status()).toBe(200);
  
  const body = await response.json();
  expect(body.length).toBeGreaterThan(0);
});

test('POST create a booking returns 200', async ({ request }) => {
  const response = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: {
      firstname: 'Luba',
      lastname: 'Avakova',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2024-01-01',
        checkout: '2024-01-05'
      },
      additionalneeds: 'Breakfast'
    }
  });

  expect(response.status()).toBe(200);
  
  const body = await response.json();
  expect(body.bookingid).toBeDefined();
  expect(body.booking.firstname).toBe('Luba');
});


test('POST create and GET booking by id', async ({ request }) => {
  // Step 1 - Create a booking
  const createResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: {
      firstname: 'Luba',
      lastname: 'Avakova',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2024-01-01',
        checkout: '2024-01-05'
      },
      additionalneeds: 'Breakfast'
    }
  });

  expect(createResponse.status()).toBe(200);
  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  // Step 2 - Get the booking we just created
  const getResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
  
  expect(getResponse.status()).toBe(200);
  const getBody = await getResponse.json();
  expect(getBody.firstname).toBe('Luba');
  expect(getBody.lastname).toBe('Avakova');
});

test('DELETE booking', async ({ request }) => {
  // Step 1 - Get auth token
  const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });
  expect(authResponse.status()).toBe(200);
  const authBody = await authResponse.json();
  const token = authBody.token;

  // Step 2 - Create a booking to delete
  const createResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: {
      firstname: 'Delete',
      lastname: 'Me',
      totalprice: 100,
      depositpaid: true,
      bookingdates: {
        checkin: '2024-01-01',
        checkout: '2024-01-05'
      }
    }
  });
  const bookingId = (await createResponse.json()).bookingid;

  // Step 3 - Delete the booking
  const deleteResponse = await request.delete(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
      headers: {
        Cookie: `token=${token}`
      }
    }
  );
  expect(deleteResponse.status()).toBe(201);
});