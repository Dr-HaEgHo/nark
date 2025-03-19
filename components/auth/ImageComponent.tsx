import { authGuy1, LogoWhite } from "@/assets/images";
import Image from "next/image";
import React from "react";

const ImageComponent = () => {
  return (
    <div className="w-full aspect-[1.03] rounded-tr-[20px] overflow-hidden relative">
      <Image
        src={authGuy1}
        alt="auth guy"
        loading="lazy"
        className="w-full h-full object-cover"
      />

      <div className="w-full h-full flex flex-col items-center p-16 justify-between absolute top-0 left-0 top-gradient-full">
        <div className="w-full self-start">
          <Image src={LogoWhite} alt="white logo" loading="lazy"/>
        </div>
        
        
        
        <div className="w-full">
          <h1 className="text-[40px] text-center leading-[100%] font-medium text-background">
            <span className="italic playfair">Level Up</span> Your Style <br />
            with Our Collections
          </h1>
          <p className="text-base font-normal text-authGreyText text-center py-4">
            We dropship seamlessly on all platforms <br /> in various
            currencies.
          </p>
          <div className="pt-2 flex items-center justify-center gap-1">
            <div className="h-1 w-6 rounded-full bg-background" />
            <div className="h-1 w-1 rounded-full bg-background" />
            <div className="h-1 w-1 rounded-full bg-background" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;
