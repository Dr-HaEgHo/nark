import { empty } from "@/constants/data";
import { CardProps } from "@/types";
import Image from "next/image";
import React, { FC } from "react";

import cosmetics from "@/assets/images/whitecreamlady.jpeg";
import guy from "@/assets/images/brownjacketguy.jpeg";
import rainbow from "@/assets/images/rainbowlady.jpeg";
import Button from "../shared/Button";
import { FiArrowRight } from "react-icons/fi";

const Card: FC<CardProps> = ({ image, title, route }) => {
  return (
    <div className="w-full h-full rounded-[20px] overflow-hidden relative z-0">
      <Image
        src={image ?? empty}
        alt={title ?? ""}
        loading="lazy"
        className="w-full object-cover z-0 relative"
      />

      <div className="absolute top-0 left-0 w-full h-full flex justify-start side-gradient z-10 p-10">
        <p className="text-white text-5xl font-medium">{title}</p>
        <div className="w-full self-end justify-self-end flex justify-end">
        <Button
              text="Shop Collection"
              icon={<FiArrowRight size={18} color="black" />}
              className="!rounded=full w-fit px-5 mt-3 text-base justify-center flex-row-reverse"
              theme="light"
              type="fill"
            />
        </div>
      </div>
    </div>
  );
  
};

const BrowseCollections = () => {
  return (
    <div className="w-full max-h-[696px] mb-[158px]">
      <div className="container">
        <div className="w-full">

          <div className="w-full flex justify-center mb-10">
            <h2 className="text-5xl font-medium text-center"><span className="playfair italic">Browse</span> <br /> Our Collection</h2>
          </div>
          <div className="w-full grid grid-cols-2 grid-rows-2 gap-6">
            <div className="row-span-2 aspect-[0.875]">
              <Card
                image={cosmetics}
                title="Cosmetics"
                route={"/categories/cosmetics"}
              />
            </div>
            <div className="w-full aspect-[1.81]">
              <Card image={guy} title="Men's" route={"/categories/men"} />
            </div>
            <div className="w-full aspect-[1.81]">
              <Card
                image={rainbow}
                title="Women's"
                route={"/categories/women"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseCollections;
