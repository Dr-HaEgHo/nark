// hooks/useShopifyAdmin.ts
import { useCallback } from "react";

export const useShopifyAdmin = () => {
  const fetchFromShopify = useCallback(
    async ({
      query,
      variables,
      route
    }: {
      query: string;
      variables?: Record<string, any>;
      route: string
    }) => {
      try {
        const response = await fetch(route, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, variables }),
        });

        const result = await response.json();


        if (result.errors) {
          throw new Error(result.errors[0]?.message || "Shopify error");
        }

        return result.data;
      } catch (error: any) {
        console.error("Shopify Admin API Error:", error);
        throw error;
      }
    },
    []
  );

  return { fetchFromShopify };
};
