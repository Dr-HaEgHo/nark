import { GraphQLClient } from 'graphql-request';
import { createStorefrontApiClient, StorefrontApiClient } from '@shopify/storefront-api-client';

const client: StorefrontApiClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!,
  apiVersion: '2024-01',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_PUB_ACCESS_TOKEN!,
});

export default client;
