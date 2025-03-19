import React from "react";
import ItemCard from "../shared/ItemCard";
import HeaderSeeAll from "../shared/HeaderSeeAll";
import { newArrival } from "@/constants/data";

const NewArrivals = () => {
  return (
    <div className="w-full py-[72px]">
      <div className="container">
        <div className="w-full flex flex-col gap-12">
          {/* Header and see all Component */}
          <HeaderSeeAll
            wordOne="New"
            wordTwo="Arrivals"
            link=""
            linkWord="See All"
          />

          {/* Grid container */}
          <div className="grid grid-cols-4 gap-6">
            {newArrival &&
              newArrival.map((item) => (
                <ItemCard
                  key={item.id}
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

export default NewArrivals;
