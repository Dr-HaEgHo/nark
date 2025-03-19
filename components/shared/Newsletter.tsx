"use client";
import Image from "next/image";
import React from "react";

import purple from "@/assets/images/purplelady.jpeg";
import Input from "./Input";
import { Icon, SearchNormal1 } from "iconsax-react";
import Button from "./Button";
import { FiArrowRight } from "react-icons/fi";

const Newsletter = () => {
  const sendData = () => {};

  return (
    <div className="w-full py-[137px]">
      <div className="container">
        <div className="w-full flex items-stretch overflow-hidden rounded-[20px]">
          <div className="w-1/2">
            <Image
              src={purple}
              alt="purple lady"
              loading="lazy"
              className="w-full h-huff object-cover"
            />
          </div>

          <div className="w-1/2 flex flex-col justify-center bg-foreground px-[130px] gap-6">
            <div className="w-full fle flex-col gap-1">
              <p className="playfair text-background italic text-[32px] ">
                Stay In Touch
              </p>
              <p className="text-inputTextDark text-lg ">
                Join our newsletter to stay up to date
              </p>
            </div>
            <div className="w-[292px] flex flex-col">
              <Input
                type="text"
                placeholder="Enter email Address"
                handleClick={sendData}
                // icon={ }
                inputClass="rounded !w-full !bg-none border border-border inputGreyDark text-white placeholder:text-inputTextDark"
              />
              <Button
                text="Join NewsLetter"
                icon={<FiArrowRight size={18} color="black" />}
                className="!rounded w-full px-[10px] mt-3 text-base justify-center flex-row-reverse"
                theme="light"
                type="fill"
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
