"use client";
import { GlobalContext } from "@/context/context";
import { TiStarFullOutline } from "react-icons/ti";
import React, { useContext, useEffect } from "react";
import Button from "@/components/shared/Button";
import { FiTruck } from "react-icons/fi";
import { TfiPackage } from "react-icons/tfi";
import { GoGift } from "react-icons/go";
import {
  box,
  gift,
  image,
  image1,
  image2,
  image3,
  image4,
  image5,
  sustain,
  van,
} from "@/assets/images";
import Image from "next/image";

const Page = () => {
  const { setCatCustomLayout } = useContext(GlobalContext);

  useEffect(() => {
    setCatCustomLayout(true);
  }, []);
  return (
    <div className="w-full">
      <div className="container">
        <div className="w-full">
          <div className="flex flex-col items-center pt-[92px]">
            <h1 className="text-[40px]  leading-[100%] font-medium text-center py-24">
              <span className="playfair italic">Product </span>Details
            </h1>
          </div>

          <div className="w-full flex items-start justify-between">
            <div className="w-[67%] grid grid-cols-2 gap-2">
              {[image, image1, image2, image3, image4, image5].map(
                (stuff, idx: number) => (
                  <div key={idx} className="w-full aspect-[0.81] bg-orange-400">
                    <Image
                      src={stuff}
                      alt="product"
                      width={1024}
                      height={1024}
                    />
                  </div>
                )
              )}
            </div>

            <div className="sticky top-4 w-[31%]">
              <h4 className="text-inputIconGrey text-2xl font-normal leading-[33px] mb-1">
                Men Fashion
              </h4>
              <div className="w-full flex items-start justify-between border-b border-borderGrey2 mb-4 pb-4">
                <p className="text-2xl leading-[33px] font-normal text-foreground">
                  The ReWool® Oversized Shirt Jacket
                </p>
                <p className="text-[32px] font-normal leading-[33px] text-foreground">
                  $167
                </p>
              </div>

              {/* stars */}
              <div className="w-fit flex items-center justify-start gap-[10px]">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(() => (
                    <TiStarFullOutline size={14} color="black" />
                  ))}
                </div>
                <p className="text-xs text-inputIconGrey font-normal leading-[16px]">
                  5.0 (2 Reviews)
                </p>
              </div>

              {/* colors */}
              <div className="w-fit flex items-center gap-3 mt-[17px] mb-9">
                {["blue", "brown"].map((color, idx: number) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: color,
                    }}
                    className="w-8 h-8 rounded-full"
                  />
                ))}
              </div>

              {/* size */}
              <div className="w-full mb-5">
                <div className="w-full flex items-center justify-between mb-[10px]">
                  <p className="text-xs font-semibold text-foreground">Size</p>
                  <p className="text-xs font-normal text-foreground cursor-pointer underline">
                    Size Guide
                  </p>
                </div>

                <div className="w-full flex items-center gap-3">
                  {["XS", "S", "M", "L", "XL", "XXL"].map(
                    (name, idx: number) => (
                      <div key={idx} className="px-4 py-3 bg-sizebox">
                        <p className="text-xs font-normal text-black ">
                          {name}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* BUTTON */}
              <div className="w-full py-8 border-b border-borderGrey2">
                <Button
                  text={"Add to Cart"}
                  // cta={() => r
                  // icon={<FiArrowRight size={18} color="white" />}
                  className="!rounded=full w-full px-5 py-[14] mt-3 text-base justify-center flex-row-reverse"
                  theme={"dark"}
                  type="fill"
                />
              </div>

              {/* SHIPPING DETAILS */}
              <div className="w-full py-6 gap-6 flex flex-col border-b border-borderGrey2">
                <div className="flex gap-4 items-start">
                  <Image
                    src={van}
                    alt="van"
                    loading="lazy"
                    className="w-[34px] h-[34px] object-cover"
                  />
                  <p className="text-sm font-medium leading-[20px] tracking-[0.42px] text-foreground">
                    Free Shipping <br />
                    <span className="text-xs text-foreground font-normal tracking-[0.2px] leading-[16px]">
                      On all U.S. orders over $100 <a href="/">Learn more.</a>
                    </span>
                  </p>
                </div>

                <div className="flex gap-4 items-start">
                  <Image
                    src={box}
                    alt="van"
                    loading="lazy"
                    className="w-[34px] h-[34px] object-cover"
                  />
                  <p className="text-sm font-medium leading-[20px] tracking-[0.42px] text-foreground">
                    Easy Returns <br />
                    <span className="text-xs text-foreground font-normal tracking-[0.2px] leading-[16px]">
                      Extended returns through January 31.
                      <a href="/">Return Details</a>
                    </span>
                  </p>
                </div>

                <div className="flex gap-4 items-start">
                  <Image
                    src={gift}
                    alt="van"
                    loading="lazy"
                    className="w-[34px] h-[34px] object-cover"
                  />
                  <p className="text-sm font-medium leading-[20px] tracking-[0.42px] text-foreground">
                    Send It As A Gift <br />
                    <span className="text-xs text-foreground font-normal tracking-[0.2px] leading-[16px]">
                      Add a free personalized note during checkout.
                    </span>
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="w-full pt-10 border-b border-borderGrey2 mb-5">
                <p className="text-base text-foreground font-normal leading-[24px] tracking-[0.2px]">
                  Part shirt, part jacket, all style.
                </p>
                <p className="text-base text-foreground font-normal leading-[24px] tracking-[0.2px] mb-3">
                  Meet your new chilly weather staple. The ReWool® Oversized
                  Shirt Jacket has all the classic shirt detailing—collar, cuffs
                  with buttons, and a shirttail hem, along with two front chest
                  flap pockets and on-seam pockets. The sleeves are fully lined
                  for added warmth and it’s made with a GRS-certified recycled
                  Italian Wool and GRS-certified recycled nylon blend. Think
                  cozy, comfy, and oh-so easy to layer. With the goal of
                  increasing the use of recycled materials and reducing the
                  harmful impacts of production, the Global Recycled Standard
                  (GRS) sets requirements for third-party certification of
                  recycled input in products—including chain of custody, social
                  and environmental practices, and chemical restrictions.
                </p>

                <div className="w-full flex items-center justify-between py-5 border-b border-borderGrey2">
                  <p className="w-[106px] text-base text-foreground font-medium leading-[24px] tracking-[0.2px]">
                    Model
                  </p>
                  <p className="text-sm text-foreground w-full font-normal leading-[16px] tracking-[1.4px]">
                    Model is 6′2″, wearing a size M
                  </p>
                </div>

                <div className="w-fyll flex items-center justify-between py-5">
                  <p className="w-[106px] text-base text-foreground font-medium leading-[24px] tracking-[0.2px]">
                    Fit
                  </p>
                  <p className="text-sm text-foreground w-full font-normal leading-[16px] tracking-[1.4px]">
                    Questions about fit? <br />
                    <a href="">Contact Us </a>
                    <br />
                    <a href="">Size Guide</a>
                  </p>
                </div>
              </div>

              {/* SUSTAINABILITY */}
              <div className="w-full z-10 relative">
                <Image
                  src={sustain}
                  alt="sustainability"
                  loading="lazy"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
