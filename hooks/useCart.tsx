// hooks/useShopifyCart.ts
"use client";

import { useState } from "react";
import client from "@/utils/StorefrontInit";
import { createCart, addToCart as addCart } from "@/utils/queries";

export const useShopifyCart = () => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToCart = async (variantId: string, quantity: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      if (!cartId) {
        // No cart yet — create a new one
        const res = await client.request(createCart, {
          variables: {
            lines: [{ merchandiseId: variantId, quantity }],
          }
        });
        // const newCart = res.cartCreate.cart;
        // setCartId(newCart.id);
        // setCartData(newCart);
        console.log("this is the cart response", res)
      } else {
        // Cart exists — just add item
        const res = await client.request(addCart, {
          variables:{
            cartId,
            lines: [{ merchandiseId: variantId, quantity }],
          }
        });
        // setCartData(res.cartLinesAdd.cart);
      }
    } catch (err: any) {
      console.error("Add to cart error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
 
  return {
    cartId,
    cartData,
    loading,
    error,
    addToCart,
  };
};
