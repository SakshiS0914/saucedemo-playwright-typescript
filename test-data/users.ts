export const testUser = {
  username: process.env.USERNAME || 'standard_user',
  password: process.env.PASSWORD || 'secret_sauce'
};

export const checkoutUser = {
  firstName: process.env.FIRST_NAME || 'John',
  lastName: process.env.LAST_NAME || 'Doe',
  postalCode: process.env.POSTAL_CODE || '12345'
};
