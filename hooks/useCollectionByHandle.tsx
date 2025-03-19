import { getCollectionByHandle } from "@/utils/queries";
import client from "@/utils/StorefrontInit";
import { useCallback, useState } from "react";

export const useCollectionByHandle = () => {
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCollection = useCallback(async (handle: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await client.request(getCollectionByHandle, { variables:{handle} });
      setCollection(data.data.collectionByHandle.products.edges);
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    collection,
    loading,
    error,
    fetchCollection,
  };
};