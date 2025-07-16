"use client";
import BrowseCollections from "@/components/home/BrowseCollections";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/home/NewArrivals";
import TwilioChat from "@/components/home/TwilioChat";
import { GlobalContext } from "@/context/context";
import { createCart, getAllProducts } from "@/utils/queries";
import client from "@/utils/StorefrontInit";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any | null>(null);

  const { setCustomLayout } = useContext(GlobalContext);

  const handleCheckout = async () => {
    const res = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lineItems: [
          {
            variantId: "gid://shopify/ProductVariant/42691486974035",
            quantity: 1,
          },
        ],
      }),
    });

    const data = await res.json();

    if (data.checkout?.webUrl) {
      window.location.href = data.checkout.webUrl;
    }
  };

  


  const fetchAllProducts = async () => {
    let allProducts: {
      id: string;
      title: string;
      description: string;
      image: string;
    }[] = [];
    let cursor: string | null = null;
    let hasNextPage = true;

    try {
      while (hasNextPage) {
        const variables = { first: 50, after: cursor };
        const data: any = await client.request(getAllProducts, {
          variables,
        });

        const newProducts = data.data.products.edges.map(({ node }: any) => ({
          id: node.id,
          title: node.title,
          description: node.description,
          image:
            node.images.edges.length > 0 ? node.images.edges[0].node.url : "",
        }));

        allProducts = [...allProducts, ...newProducts];

        hasNextPage = data.data.products.pageInfo.hasNextPage;
        cursor = data.data.products.pageInfo.endCursor;
      }

      setProducts(allProducts);
      console.log("Total Products Fetched:", products);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  // console.log("happy: ", happy);
  // console.log("isSuccess: ", isSuccess);
  // console.log("names: ", gbola);

  useEffect(() => {
    // fetchData();
    setCustomLayout(false);
    // fetchAllProducts();
  }, []);

  return (
    <>
      {/* <button onClick={fetchAllProducts} className="py-2 cursor-pointer px-6 bg-black text-white ">Fetch Variants</button> */}
      {/* <button onClick={handleCheckout} className="py-2 cursor-pointer px-6 bg-black text-white ">Checkout</button> */}
      {/* <TwilioChat/> */}
      {/* <button onClick={handleCreateCart} className="py-2 cursor-pointer px-6 bg-black text-white ">Create Cart</button> */}
      {/* <button
        onClick={() => getCollectionByHandle("gid://shopify/Collection/292794826835")}
        className="py-2 cursor-pointer px-6 bg-black text-white "
      >
        Get Collection
      </button> */}
      <Hero />
      <NewArrivals />
      <BrowseCollections />
      <FeaturedProducts />
    </>
  );
}
