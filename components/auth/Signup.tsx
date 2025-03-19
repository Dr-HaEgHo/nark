"use client";
import { GlobalContext } from "@/context/context";
import React, { useContext, useEffect } from "react";
import { LineInput } from "@/components/shared/Input";
import { Eye, Lock, SearchNormal1, Sms } from "iconsax-react";
import Button from "@/components/shared/Button";
import Link from "next/link";

const Signup = () => {
  const { customLayout, setCustomLayout } = useContext(GlobalContext);

  console.log("this is the customLayout", customLayout);

  const sendData = () => {};

  useEffect(() => {
    setCustomLayout(true);
    console.log("this is the layout value: ", customLayout);
  }, []);

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full flex flex-col gap-3">
        <h1 className="text-[32px] text-foreground font-medium leading-[100%]">
          Create Account
        </h1>
        <p className="text-base text-inputIconGrey font-medium leading-[100%]">
          Enter your details to get started
        </p>
      </div>
      <form action="" className="w-full flex flex-col gap-6">
        <LineInput
          type="text"
          label="Email Address"
          placeholder="name@email.com"
          handleClick={sendData}
          iconStart={
            <Sms
              size={20}
              color="#909090"
              className="aspect-square h-full text-inputIconGrey"
            />
          }
          inputClass="rounded-lg border border-inputBorder text-grey900 w-full"
        />
        <LineInput
          type="text"
          label="Choose Password"
          placeholder=""
          handleClick={sendData}
          icon={
            <Eye
              size={20}
              color="#909090"
              className="aspect-square h-full text-black"
            />
          }
          iconStart={
            <Lock
              size={20}
              color="#909090"
              className="aspect-square h-full text-black"
            />
          }
          inputClass="rounded-lg border border-inputBorder text-grey900 w-full"
        />
        <LineInput
          type="text"
          label="Email Address"
          placeholder=""
          handleClick={sendData}
          icon={
            <Eye
              size={20}
              color="#909090"
              className="aspect-square h-full text-black"
            />
          }
          iconStart={
            <Lock
              size={20}
              color="#909090"
              className="aspect-square h-full text-black"
            />
          }
          inputClass="rounded-lg border border-inputBorder text-grey900 w-full"
        />
        <Button
          text={"Sign Up"}
          size="medium"
          // icon={<FiArrowRight size={18} color="white" />}
          className="!rounded=full w-full py-[14.5px] px-5 mt-3 text-base justify-center flex-row-reverse"
          theme={"disabled"}
          type="fill"
        />
      </form>

      <p className="text-center w-full text-inputIconGrey font-medium">Already have an account? <Link href="/auth/login" className="text-foreground">Login</Link></p>
    </div>
  );
};

export default Signup;
