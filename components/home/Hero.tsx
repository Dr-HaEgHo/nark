import React from "react";
import Button from "@/components/shared/Button";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import brownhat from "@/assets/images/hatman.jpeg";
import purple from "@/assets/images/purplelady.jpeg";
import brownlady from "@/assets/images/nudecoatlady.jpeg";
import { logos } from "@/constants/data";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full relative overflow-hidden">
      <div className="w-[394px] z-0 h-[394px] bg-blueTrans blur-[204px] lg:blur-[204px] rounded-full absolute top-0 lg:top-1/2 max-md:-left-[200px] left-0"/>
      <div className="w-[394px] z-0 h-[394px] bg-yellowTrans blur-[204px] lg:blur-[204px] rounded-full absolute lg:top-1/2 max-md:-right-[200px] right-0"/>

      <div className="container relative z-10">
        <div className="w-full">

          <div className="flex flex-col items-center py-11 lg:py-[92px]">
            <h1 className="text-5xl lg:text-[64px] leading-[100%] font-medium text-center mb-3 lg:mb-11">
              <span className="playfair italic">Level Up</span> Your Style{" "}
              <br className="hidden lg:block"/> with Our Collections
            </h1>
            <Link href="/auth/signup">
            <Button
              text="Start Shopping"
              icon={<FiArrowRight size={18} color="white" />}
              className="!rounded=full w-fit px-5 mt-3 text-base justify-center flex-row-reverse"
              theme="dark"
              type="fill"
            /></Link>
          </div>

          <div className="w-[815px] max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:relative mx-auto lg:w-full max-md:h-[394px] grid grid-cols-2 lg:grid-cols-3 items-center lg:items-end gap-5 lg:gap-6 mb-5 lg:mb-15">
            <div className="lg:w-full max-md:h-full aspect-[1.01] overflow-hidden bg-yellow-400 rounded-[20px]">
              <Image
                src={brownhat}
                alt="brown hat guy"
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
            <div className="w-full aspect-[1.36] hidden lg:block overflow-hidden rounded-[20px]">
              <Image
                src={purple}
                alt="brown hat guy"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:w-full max-md:h-full aspect-[1.01] overflow-hidden rounded-[20px]">
              <Image
                src={brownlady}
                alt="brown hat guy"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-2 lg:gap-16">
            {logos &&
              logos.map((logo, idx:number) => (
                <div key={idx} className="w-8 h-8 lg:w-16 lg:h-16">
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
