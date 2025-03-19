import { empty } from "@/assets/images";
import HeaderSeeAll from "@/components/shared/HeaderSeeAll";
import ItemCard from "@/components/shared/ItemCard";
import { menTopDeals } from "@/constants/data";
import Image from "next/image";
import React from "react";

const Page = () => {
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
            {menTopDeals ? (
              menTopDeals.map((item: any) => (
                <ItemCard
                  key={item.id}
                  title={item.name}
                  price={item.price}
                  image={item.images[0]}
                  id={item.id}
                />
              ))
            ) : (
              <div className="w-full grid grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((number, idx: number) => (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
