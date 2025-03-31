import React from "react";
import ItemCard from "../shared/ItemCard";
import HeaderSeeAll from "../shared/HeaderSeeAll";
import { featuredProducts } from "@/constants/data";

const FeaturedProducts = () => {
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
            {featuredProducts &&
              featuredProducts.map((item, idx:number) => (
                <ItemCard
                  key={idx}
                  title={item.name}
                  price={item.price}
                  image={item.images[0]}
                  id={item.id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;