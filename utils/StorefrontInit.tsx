import { createStorefrontApiClient, StorefrontApiClient } from '@shopify/storefront-api-client';

const client: StorefrontApiClient = createStorefrontApiClient({
  storeDomain: "http://zda0v1-py.myshopify.com",
  apiVersion: '2025-01',
  publicAccessToken: "49f12c3c356d37f59dee2e859353126f",
});

export default client;