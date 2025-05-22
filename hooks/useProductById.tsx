// hooks/useProductById.ts
"use client";

import useSWR from "swr";
import client from "@/utils/StorefrontInit";
import { getProductById } from "@/utils/queries";

const fetchProductById = async (id: string) => {
  const res = await client.request(getProductById, { variables:{id} });
  return res.data;
};

export const useProductById = (id: string) => {
  const { data, error, isLoading } = useSWR(id ? `product-${id}` : null, () => fetchProductById(id));

  return {
    product: data?.product,
    loading: isLoading,
    error,
  };
};
