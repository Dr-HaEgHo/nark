"use client";
import { GlobalContext } from "@/context/context";
import React, { FormEvent, useContext, useEffect } from "react";
import { LineInput } from "@/components/shared/Input";
import { Eye, Lock, SearchNormal1, Sms } from "iconsax-react";
import Button from "@/components/shared/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter()

  const { customLayout, setCustomLayout } = useContext(GlobalContext);

  console.log("this is the customLayout", customLayout);

  const sendData = () => {};
  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    router.push('/')
  };

  useEffect(() => {
    setCustomLayout(true);
    console.log("this is the layout value: ", customLayout);
  }, []);

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full flex flex-col gap-3">
        <h1 className="text-[32px] text-foreground font-medium leading-[100%]">
          Welcome back
        </h1>
        <p className="text-base text-inputIconGrey font-medium leading-[100%]">
          Enter your login details to continue
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
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
          label="Password"
          placeholder="must contain atleast 8 characters"
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
        <Link href="/forgotPassword" className="text-foreground text-base text-right">Forgot Password?</Link>
        <Button
          text={"Login"}
          size="medium"
          // icon={<FiArrowRight size={18} color="white" />}
          className="!rounded=full w-full py-[14.5px] px-5 mt-3 text-base justify-center flex-row-reverse"
          theme={"disabled"}
          type="fill"
        />
      </form>

      <p className="text-center w-full text-inputIconGrey font-medium">
        New to Nark?{" "}
        <Link href="/auth/signup" className="text-foreground">
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default Login;
