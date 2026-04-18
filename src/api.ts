export const BASE_URL: string = 'http://localhost:5000';

interface ApiUrls {
  users: string;
  products: string;
  orders: string;
  cart: string;
  disputes: string;
}

export const API_URLS: ApiUrls = {
  users: `${BASE_URL}/users`,
  products: `${BASE_URL}/products`,
  orders: `${BASE_URL}/orders`,
  cart: `${BASE_URL}/cart`,
  disputes: `${BASE_URL}/disputes`,
};
