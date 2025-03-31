import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loading from "@/assets/icons/loading.gif";
import Image from "next/image";

const Loading = () => {
  return (
    <div>
      <DotLottieReact src="../../assets/lottie/dotload.lottie" loop autoplay />
    </div>
  );
};

export default Loading;

export const Loader2 = () => {
  return (
    <div>
      <DotLottieReact src="../../../assets/lottie/dotload.lottie" loop autoplay />
    </div>
  );
};

export const Loader = () => {
  return (
    <div className="w-52 h-7">
      <Image
        src={loading}
        width={200}
        height={40}
        className="h-full w-auto mx-auto"
        alt="loading"
      />

      {/* <video src="../../assets/icons/loading.mp4" className="h-full w-auto mx-auto" loop autoPlay muted>
      </video> */}
    </div>
  );
};
