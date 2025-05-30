import React, { useEffect } from "react";
import ItemCard from "../shared/ItemCard";
import HeaderSeeAll from "../shared/HeaderSeeAll";
import { featuredProducts } from "@/constants/data";
import { useCollectionByHandle } from "@/hooks/useCollectionByHandle";
import ItemCardLoading from "../shared/ItemCardLoading";
import { showLowestPrice } from "@/constants/functions";

const FeaturedProducts = () => {

  const {collection, loading, error, fetchCollection } = useCollectionByHandle();

  useEffect(() => {
    fetchCollection("featured-products")
  } ,[])

  return (
    <div className="w-full py-0 lg:py-[72px] max-md:px-4 max-lg:px-6">
      <div className="container">
        <div className="w-full flex flex-col gap-12">
          {/* Header and see all Component */}
          <HeaderSeeAll
            wordOne="Featured"
            wordTwo="Products"
            link=""
            linkWord="See All"
          />

          {/* Grid container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
              [1, 2, 3, 4].map((item, idx: number) => (
                <ItemCardLoading key={idx} />
              ))
            ) : collection !== null && collection !== undefined && collection.length ? (
              collection.map((item: any, idx: number) => (
                <ItemCard
                  key={idx}
                  title={item.node.title}
                  price={showLowestPrice(item.node.variants.edges)}
                  image={item.node.images !== null ? item.node.images?.edges[0]?.node.url : ""}
                  id={item.node.id}
                />
              ))
            ) : (
              <div className="w-full h-[100px] flex items-center justify-center">
                <p className="text-base font-normal text-deleteGrey">
                  Error loading products
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;