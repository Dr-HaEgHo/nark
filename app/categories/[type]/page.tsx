"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { categories as data, empty } from "@/constants/data";
import Image from "next/image";
import BlackHeaderSeeAll from "@/components/shared/BlackHeaderSeeAll";
import ItemCard from "@/components/shared/ItemCard";
import CatItemCard from "@/components/shared/CatItemCard";
import HeaderSeeAll from "@/components/shared/HeaderSeeAll";

const Page = () => {
  const params = useParams();
  const [categories, setCategories] = useState<any>({});

  const handleIncomingData = () => {
    let newCat: any = null; // Initialize to avoid undefined errors

    switch (params.type) {
      case "men":
        newCat = data.men;
        break;
      case "women":
        newCat = data.women;
        break;
      case "cosmetics":
        newCat = data.cosmetics;
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
  }, []);

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
            {categories && categories.topDeals ?
              categories.topDeals.map((item: any) => (
                <ItemCard
                  key={item.id}
                  title={item.name}
                  price={item.price}
                  image={item.images[0]}
                  id={item.id}
                />
              )) : (
                <div className="w-full grid grid-cols-4 gap-6">
                          {
                            [1, 2, 3, 4].map((number, idx: number) => (
                              <div
                                key={idx}
                                className="w-full aspect-[1.01] overflow-hidden bg-yellow-400 rounded-[20px] relative"
                              >
                                <Image
                                  src={empty}
                                  alt={`empty state for picture ${number}`}
                                  loading="lazy"
                                  className="w-full object-cover"
                                />
                              </div>
                            ))
                          }
                        </div>  
              )}
          </div>
        {/* </div> */}

          {categories && categories.catalogue
            ? categories.catalogue.map((item: any) => (
                <div className="w-full flex flex-col gap-10">
                  <BlackHeaderSeeAll
                    title={item.name}
                    link={"/"}
                    linkWord={"See All"}
                  />

                  <div className="w-full grid grid-cols-4 gap-6">
                    {item.products
                      ? item.products.map((product:any) => (
                          <ItemCard
                            key={product.id}
                            title={product.name}
                            price={product.price}
                            image={product.images[0]}
                            id={product.id}
                          />
                        ))
                      : (
                        <div className="w-full grid grid-cols-4 gap-6">
                          {
                            [1, 2, 3, 4].map((number, idx: number) => (
                              <div
                                key={idx}
                                className="w-full aspect-[1.01] overflow-hidden bg-yellow-400 rounded-[20px] relative"
                              >
                                <Image
                                  src={empty}
                                  alt={`empty state for picture ${number}`}
                                  loading="lazy"
                                  className="w-full object-cover"
                                />
                              </div>
                            ))
                          }
                        </div>
                      )}
                  </div>
                </div>
              ))
            : [1, 2, 3, 4].map((number, idx: number) => (
                <div
                  key={idx}
                  className="w-full aspect-[1.01] overflow-hidden bg-yellow-400 rounded-[20px] relative"
                >
                  <Image
                    src={empty}
                    alt={`empty state for picture ${number}`}
                    loading="lazy"
                    className="w-full object-cover"
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
