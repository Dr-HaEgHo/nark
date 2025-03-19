'use client'
import ImageComponent from "@/components/auth/ImageComponent";
import { GlobalContext } from "@/context/context";
import React, { ReactNode, useContext, useEffect } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {

  const { customLayout, setCustomLayout } = useContext(GlobalContext);


  useEffect(() => {
    setCustomLayout(true);
    console.log("this is the layout value: ", customLayout);
  }, []);
  return (
    <div className="w-full h-screen bg-authBg bg-top-gradient min-w-[727px] flex items-center">
      <div className="authContainer">
        
        <div className="w-full flex items-center gap-[60px]">
          <div className="w-[52%]">
            <ImageComponent />
          </div>

          <div className="w-[35%] lg:min-w-[546px] rounded-[20px] py-14 px-[70px]  bg-background">
           { children }
          </div>
        </div>


      </div>
    </div>
  );
};

export default AuthLayout;