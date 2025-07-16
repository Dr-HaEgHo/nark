import React, { useEffect } from "react";
import Button from "@/components/shared/Button";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import brownhat from "@/assets/images/hatman.jpeg";
import purple from "@/assets/images/purplelady.jpeg";
import brownlady from "@/assets/images/nudecoatlady.jpeg";
import { logos } from "@/constants/data";
import Link from "next/link";
import man from "@/assets/images/authguy1.jpeg";
import wave from "@/assets/images/bgwave.jpg";
import { useCollectionByHandle } from "@/hooks/useCollectionByHandle";

const Hero = () => {
  const { collection, loading, error, fetchCollection } =
    useCollectionByHandle();

  useEffect(() => {
    fetchCollection("featured-products");
  }, []);

  useEffect(() => {
    console.log(
      "THIS IS THE COLLECTION DATA:::::::",
      collection === null ? null : collection[0]
    );
  }, [collection]);

  return (
    <div className="w-full relative overflow-hidden">
      <div className="w-[394px] z-0 h-[394px] bg-blueTrans blur-[204px] lg:blur-[204px] rounded-full absolute top-0 lg:top-1/2 max-md:-left-[200px] left-0" />
      <div className="w-[394px] z-0 h-[394px] bg-yellowTrans blur-[204px] lg:blur-[204px] rounded-full absolute lg:top-1/2 max-md:-right-[200px] right-0" />

      <div className="container relative z-10">
        <div className="w-full">
          <div className="flex flex-col items-center py-11 lg:py-[92px]">
            <h1 className="text-5xl lg:text-[64px] leading-[100%] font-medium text-center mb-3 lg:mb-11">
              <span className="playfair italic">Level Up</span> Your Style{" "}
              <br className="hidden lg:block" /> with Our Collections
            </h1>
            <Link href="/categories">
              <Button
                text="Start Shopping"
                icon={<FiArrowRight size={18} color="white" />}
                className="!rounded=full w-fit px-5 mt-3 text-base justify-center flex-row-reverse"
                theme="dark"
                type="fill"
              />
            </Link>
          </div>

          {/* <div className="w-[815px] max-md:kleft-1/2 max-md:transform max-md:-translate-x-1/2 max-md:relative mx-auto lg:w-full max-md:h-[394px] grid grid-cols-2 lg:grid-cols-3 items-center lg:items-end gap-5 lg:gap-6 mb-5 lg:mb-15">
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
          </div> */}

          <div className="w-full h40 lg:mb-[26px] flex relative">
            <div className="relative flex w-1/2 aspect-[1.5] py-[42px] px-[27px] flex-col items-start justify-end z-[9999]">
              <h1 className="text-[10px] md:text-xs font-[400] text-[#9f9f9f] md:ls26 z-[9999]">
                Trending Sales
              </h1>
              <h2 className="text-base md:text-4xl font-[500] leading-[16px] md:leading-[30px] z-[9999]">
                Your Summer Closet <br />{" "}
                <span className="playfair italic font-[400] tracking-[0px]">
                  {" "}
                  Starts here
                </span>
              </h2>
              <Link href="/categories" className="z-[9999]">
                <Button
                  text="Start Shopping"
                  icon={<FiArrowRight size={18} color="white" />}
                  className="!rounded-full w-fit px-2 lg:px-5 mt-3 text-xs max-md:gap-1 lg:text-base justify-center flex-row-reverse"
                  theme="dark"
                  type="fill"
                />
              </Link>

              <div className="absolute w-full h-full left-0 top-0 z-0">
                <Image
                  src={wave}
                  alt="featured product"
                  className="w-[200%] h-full object-cover"
                />
              </div>
            </div>
            <div className="flex w-1/2 aspect-[1.5]">
              {loading ? (
                "Loading"
              ) : collection === null ? (
                ""
              ) : (
                <Image
                  src={
                    collection !== null && collection[7].node.images !== null
                      ? collection[7].node.images?.edges[0]?.node.url
                      : ""
                  }
                  alt="featured product"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
          {/* 
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
