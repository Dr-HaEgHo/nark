"use client";
import React, { useContext, useEffect, useState } from "react";
import ItemCard from "../shared/ItemCard";
import HeaderSeeAll from "../shared/HeaderSeeAll";
import { newArrival } from "@/constants/data";
import Button from "../shared/Button";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import client from "@/utils/StorefrontInit";
import { getCollectionByHandle } from "@/utils/queries";
import { GlobalContext } from "@/context/context";
import ItemCardLoading from "../shared/ItemCardLoading";
import { useCollectionByHandle } from "@/hooks/useCollectionByHandle";
import { showLowestPrice } from "@/constants/functions";

const NewArrivals = () => {
  const [products, setProducts] = useState<any | null>(null);

  const { collection, loading, error, fetchCollection } =
    useCollectionByHandle();

  useEffect(() => {
    fetchCollection("new-arrivals");
  }, []);

  useEffect(() => {
    // getId()
    // fetchCollection("new-arrivals");
    console.log("this is the collection woohooo: ", collection);
  }, [collection]);

  return (
    <div className="w-full max-md:px-4 max-lg:px-6 py-[72px]">
      <div className="container">
        {/* <button onClick={() => fetchCollection('new-arrivals')} className="bg-black text-white py-4 px-8 cursor-pointer">Refresh</button> */}
        <div className="w-full flex flex-col gap-12">
          {/* Header and see all Component */}
          <HeaderSeeAll
            wordOne="New"
            wordTwo="Arrivals"
            link=""
            linkWord="See All"
          />

          {/* Grid container */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
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

          <div className="w-full max-md:px-4 max-lg:px-6 blok hidden">
            <Link href="/">
              <Button
                text="See All"
                icon={<FiArrowRight size={18} color="white" />}
                className="!rounded=full w-full max-w-[400px] px-5 mt-3 text-base justify-center flex-row-reverse"
                theme="dark"
                type="fill"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
