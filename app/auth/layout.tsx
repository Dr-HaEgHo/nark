import ImageComponent from "@/components/auth/ImageComponent";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full bg-authBg h-screen min-w-[727px] flex items-center">
      <div className="authContainer">
        
        <div className="w-full flex items-center gap-[60px]">
          <div className="w-[52%]">
            <ImageComponent />
          </div>

          <div className="w-[35%] rounded-[20px] py-14 px-20 bg-background">
           { children }
          </div>
        </div>


      </div>
    </div>
  );
};

export default AuthLayout;
