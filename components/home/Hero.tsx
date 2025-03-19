import React from "react";
import Button from "@/components/shared/Button";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import brownhat from "@/assets/images/hatman.jpeg";
import purple from "@/assets/images/purplelady.jpeg";
import brownlady from "@/assets/images/nudecoatlady.jpeg";
import { logos } from "@/constants/data";

const Hero = () => {
  return (
    <div className="w-full relative">
      <div className="w-[394px] z-0 h-[394px] bg-blueTrans blur-[204px] rounded-full absolute top-1/2 " />
      <div className="w-[394px] z-0 h-[394px] bg-yellowTrans blur-[204px] rounded-full absolute top-1/2 right-0 " />

      <div className="container relative z-10">
        <div className="w-full">
          <div className="flex flex-col items-center py-[92px]">
            <h1 className="text-[64px] leading-[100%] font-medium text-center mb-11">
              <span className="playfair italic">Level Up</span> Your Style{" "}
              <br /> with Our Collections
            </h1>
            <Button
              text="Start Shopping"
              icon={<FiArrowRight size={18} color="white" />}
              className="!rounded=full w-fit px-5 mt-3 text-base justify-center flex-row-reverse"
              theme="dark"
              type="fill"
            />
          </div>

          <div className="w-full grid grid-cols-3 items-end gap-6 mb-15">
            <div className="w-full aspect-[1.01] overflow-hidden bg-yellow-400 rounded-[20px]">
              <Image
                src={brownhat}
                alt="brown hat guy"
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
            <div className="w-full aspect-[1.36] overflow-hidden rounded-[20px]">
              <Image
                src={purple}
                alt="brown hat guy"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full aspect-[1.01] overflow-hidden rounded-[20px]">
              <Image
                src={brownlady}
                alt="brown hat guy"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-16">
            {logos &&
              logos.map((logo) => (
                <div key={logo.id} className="w-16 h-16">
                  <Image
                    src={logo.image}
                    alt="brown hat guy"
                    loading="lazy"
                    className="w-full object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
