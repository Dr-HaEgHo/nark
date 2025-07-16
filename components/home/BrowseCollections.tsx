import { empty } from "@/constants/data";
import { CardProps } from "@/types";
import Image from "next/image";
import React, { FC } from "react";

import cosmetics from "@/assets/images/whitecreamlady.jpeg";
import guy from "@/assets/images/brownjacketguy.jpeg";
import rainbow from "@/assets/images/rainbowlady.jpeg";
import Button from "../shared/Button";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

const Card: FC<CardProps> = ({ image, title, route }) => {
  const router = useRouter();
  return (
    <div className="w-full h-full rounded-[20px] overflow-hidden relative z-0">
      <Image
        src={image ?? empty}
        alt={title ?? ""}
        loading="lazy"
        className="w-full h-full object-cover z-0 relative"
      />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between side-gradient z-10 p-4 md:p-10">
        <p className="text-white text-xl md:text-5xl font-medium">{title}</p>
        <div className="w-full flex justify-end">
          <Button
            text="Shop Collection"
            icon={<FiArrowRight size={18} color="black" />}
            className="!rounded=full w-fit px-5 mt-3 text-base justify-center flex-row-reverse"
            theme="light"
            type="fill"
            cta={() => {
              router.push(route)
            }}
          />
        </div>
      </div>
    </div>
  );
};

const BrowseCollections = () => {
  return (
    <div className="w-full lg:max-h-[696px] mb-[88px] lg:mb-[158px]">
      <div className="container">
        <div className="w-full">
          <div className="w-full flex justify-center mb-10">
            <h2 className="text-5xl font-medium text-center">
              <span className="playfair italic">Browse</span> <br /> Our
              Collection
            </h2>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2  max-md:px-4 max-lg:px-5 gap-6">
            <div className="w-full aspect-[0.98]">
              <Card image={guy} title="Men's" route={"/categories/men"} />
            </div>
            <div className="w-full aspect-[0.98]">
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
