"use client";
import BrowseCollections from "@/components/home/BrowseCollections";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/home/NewArrivals";
import { GlobalContext } from "@/context/context";
import { getAllProducts } from "@/utils/queries";
import client from "@/utils/StorefrontInit";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<
    { id: string; title: string; description: string; image: string }[]
  >([]);

  const { setCustomLayout } = useContext(GlobalContext);

  const fetchData = async () => {
    try {
      const query = `
        query searchProducts($query: String!, $first: Int!) {
          search(query: $query, first: $first, types: PRODUCT) {
            edges {
              node {
                ... on Product {
                  id
                  title
                  description
                  images(first: 1) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const { data, errors } = await client.request(query, {
        variables: {
          query: "easter",
          first: 1,
        },
      });

      if (errors) {
        console.error("GraphQL Errors:", errors);
      } else {
        console.log("Fetched Data:", data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
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
    fetchData();
    setCustomLayout(false);
    // fetchAllProducts()
  }, []);

  return (
    <>
      <Hero />
      <NewArrivals />
      <BrowseCollections />
      <FeaturedProducts />
    </>
  );
}
