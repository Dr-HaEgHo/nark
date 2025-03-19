"use client";

import { useState } from "react";
import client from "@/utils/StorefrontInit";
import { getCollectionByHandle } from "@/utils/queries";

type ProductType = {
  id: string;
  title: string;
  price: string;
  image: string;
  sku: string;
  available: boolean;
};

type CategoryType = {
  id: number;
  name: string;
  image: string;
  products: ProductType[];
};

export const useMultipleCollections = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCollections = async (handles: string[]) => {
    setLoading(true);
    setError(null);

    try {
      const results = await Promise.all(
        handles.map(async (handle) => {
          const response = await client.request(getCollectionByHandle, {
            variables: { handle },
          });

          const collection = response.data.collectionByHandle;

          if (!collection) return null;

          const products = collection.products?.edges.map((edge: any) => ({
            id: edge.node.id,
            title: edge.node.title,
            price: edge.node.variants.edges[0]?.node?.priceV2.amount || "0.00",
            image: edge.node.images.edges[0]?.node?.url || "",
            sku: edge.node.variants.edges[0]?.node?.sku || "",
            available: edge.node.variants.edges[0]?.node?.availableForSale || false,
          }));

          const category: CategoryType = {
            id: Math.floor(Math.random() * 100000), // Generate a random id or use collection.id
            name: collection.title,
            image: products?.[0]?.image || "", // Use first product's image as category image
            products,
          };

          return category;
        })
      );

      setCategories(results.filter(Boolean) as CategoryType[]);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching collections");
      console.error("fetchCollections error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCollections,
  };
};
