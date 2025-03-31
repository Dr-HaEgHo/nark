import React from "react";
import ItemCard from "../shared/ItemCard";
import HeaderSeeAll from "../shared/HeaderSeeAll";
import { newArrival } from "@/constants/data";
import Button from "../shared/Button";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const NewArrivals = () => {
  return (
    <div className="w-full max-md:px-4 max-lg:px-6 py-[72px]">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrival &&
              newArrival.map((item, idx: number) => (
                <ItemCard
                  key={idx}
                  title={item.name}
                  price={item.price}
                  image={item.images[0]}
                  id={item.id}
                />
              ))}
          </div>

          <div className="w-full max-md:px-4 max-lg:px-6 block lg:hidden">
          <Link href="/">
          <Button
              text="See All"
              icon={<FiArrowRight size={18} color="white" />}
              className="!rounded=full w-full max-w-[400px] px-5 mt-3 text-base justify-center flex-row-reverse"
              theme="dark"
              type="fill"
            /></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
