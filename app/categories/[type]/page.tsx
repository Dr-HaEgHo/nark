"use client";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { Suspense, useContext, useEffect, useState } from "react";
import {
  categories as data,
  categoriesWomen as data2,
  empty,
} from "@/constants/data";
import Image from "next/image";
import BlackHeaderSeeAll from "@/components/shared/BlackHeaderSeeAll";
import ItemCard from "@/components/shared/ItemCard";
import CatItemCard from "@/components/shared/CatItemCard";
import HeaderSeeAll from "@/components/shared/HeaderSeeAll";
import { GlobalContext } from "@/context/context";
import Loading from "@/app/Loading";

const TypePage = () => {
  const params = useParams();
  const path = usePathname()
  const search = useSearchParams();
  const type = new URLSearchParams(search).get("type");
  const idee = new URLSearchParams(search).get("id");
  
  const { subCat, categories, setCatCustomLayout, setCategories } = useContext(GlobalContext);
  
  
  const handleIncomingData = () => {
    let newCat: any = null; // Initialize to avoid undefined errors

    switch (params.type) {
      case "men":
        newCat = data;
        break;
      case "women":
        newCat = data2;
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
    if (type && idee) return;
    setCatCustomLayout(false);
  }, [type, idee, path]);

  return (
    <div className="w-full">
      <div className="container">
        <div className="w-full flex flex-col gap-12 py-24">
          {/* Header and see all Component */}
          <HeaderSeeAll
            wordOne="Top"
            wordTwo="Deals"
            link=""
            linkWord="See All"
          />

          {/* Grid container */}
          <div className="grid grid-cols-4 gap-6">
            {categories && categories.topDeals
              ? categories.topDeals.map((item: any, idx: number) => (
                  <ItemCard
                    key={idx}
                    title={item.name}
                    price={item.price}
                    image={item.images[0]}
                    id={item.id}
                  />
                ))
              : // <div className="w-full grid grid-cols-4 gap-6">
                // {
                [1, 2, 3, 4].map((number, idx: number) => (
                  <div
                    key={idx}
                    className="w-full animate-pulse aspect-[1.01] overflow-hidden bg-borderGrey2 rounded-[20px] relative"
                  />
                ))
                // }
                // </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};


const Page = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <TypePage/>
    </Suspense>
  )
}

export default Page;
