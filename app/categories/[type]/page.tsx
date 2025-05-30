"use client";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { Suspense, useContext, useEffect, useState } from "react";
import {
  categories as data,
  categoriesWomen as data2,
} from "@/constants/data";
import ItemCard from "@/components/shared/ItemCard";
import HeaderSeeAll from "@/components/shared/HeaderSeeAll";
import { GlobalContext } from "@/context/context";
import Loading from "@/app/Loading";
import { useCollectionByHandle } from "@/hooks/useCollectionByHandle";
import ItemCardLoading from "@/components/shared/ItemCardLoading";
import { useMultipleCollections } from "@/hooks/useMultipleCollections";
import { showLowestPrice } from "@/constants/functions";

const TypePage = () => {
  const params = useParams();
  const path = usePathname();
  const search = useSearchParams();
  const type = new URLSearchParams(search).get("type");
  const idee = new URLSearchParams(search).get("id");

  const { subCat, categories, setCatCustomLayout, setCategories } =
    useContext(GlobalContext);

  const { collection, fetchCollection, loading, error } = useCollectionByHandle();
  const { fetchCollections } = useMultipleCollections()

  const handleIncomingData = () => {
    let newCat: any = null; // Initialize to avoid undefined errors

    switch (params.type) {
      case "men":
        {
          newCat = data;
          fetchCollection("men-top-deals");
        }
        break;
      case "women":{
        newCat = data2;
        fetchCollection("women-top-deals")
        // fetchCollections(["women-top-deals", "men-top-deals"])
      }
        break;
      default:
        console.warn("Unknown category:", params.type);
        return; // Exit early if params.type is not recognized
    }

    if (newCat) {
      console.log("Category name:", newCat.name);
      setCategories(newCat);
    }
  };

  useEffect(() => {
    if (!params.type) return;

    handleIncomingData();
  }, [params.type]);

  useEffect(() => {
    console.log("CHAANGE LAYOUT:::::::::::::::::::::::")
    setCatCustomLayout(false);
  }, []);

  useEffect(() => {
    // console.log("COLLECTION CATEGORIES:::::", collection)
  }, [])

  return (
    <div className="w-full max-md:px-4 max-lg:px-5">
      <div className="container">
        <div className="w-full flex flex-col gap-12 py-24">
          {/* Header and see all Component */}
          <HeaderSeeAll
            wordOne="Top"
            wordTwo="Deals"
            link=""
            // linkWord="See All"
          />

          {/* Grid container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
              [1, 2, 3, 4].map((_, idx: number) => (
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
                <p className="text-base font-normal text-deleteGrey text-center">
                  Error loading products...
                </p>
              </div>
            )}
          </div>

          <div className="w-full max-md:px-4 max-lg:px-6 block lg:hidden">
            {/* <Link href="/">
              <Button
                text="See All"
                icon={<FiArrowRight size={18} color="white" />}
                className="!rounded=full w-full max-w-[400px] px-5 mt-3 text-base justify-center flex-row-reverse"
                theme="dark"
                type="fill"
              />
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <TypePage />
    </Suspense>
  );
};

export default Page;
