"use client";
import { GlobalContext } from "@/context/context";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { LineInput, PasswordLineInput } from "@/components/shared/Input";
import { Eye, Lock, SearchNormal1, Sms } from "iconsax-react";
import Button from "@/components/shared/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { loginSchema } from "@/schemas";
import { Loader } from "@/components/shared/Loading";
import client from "@/utils/StorefrontInit";
import { createAccessToken } from "@/utils/queries";

const Login = () => {
  const router = useRouter();

  const { token, setToken } = useContext(GlobalContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFormButtonDisabled, setIsFormButtonDisabled] =
    useState<boolean>(false);

  const createToken = async () => {
    setLoading(true);

    const variables = {
      input: {
        email: values.email.toLowerCase(),
        password: values.password,
      },
    };

    try {
      const { data } = await client.request(createAccessToken, {
        variables,
      });

      const response = data.customerAccessTokenCreate;

      // Handle Errors
      if (response.customerUserErrors.length > 0) {
        console.error("Shopify Errors:", response.customerUserErrors);
        setLoading(false);
        return;
      }

      // Store Token
      if (response.customerAccessToken) {
        setToken(response.customerAccessToken.accessToken);
        localStorage.setItem(
          "ACCESS_TOKEN",
          JSON.stringify(response.customerAccessToken.accessToken)
        );
      }
    } catch (err) {
      console.error("Error fetching token:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () => {
    console.log("these are the values", values);
    createToken();
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  useEffect(() => {
    if (
      values.email !== "" &&
      values.password !== "" &&
      !errors.email &&
      !errors.password &&
      loading === false
    ) {
      setIsFormButtonDisabled(true);
    } else if (loading === true) {
      setIsFormButtonDisabled(false);
    } else {
      setIsFormButtonDisabled(false);
    }
  }, [values, errors, loading]);

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

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
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        {/* EMAIL  */}
        <LineInput
          id="email"
          handleChange={handleChange}
          touched={touched.email}
          blur={handleBlur}
          isDisabled={false}
          value={values.email}
          label="Email Address"
          placeholder="name@email.com"
          error={errors.email}
          iconStart={
            <Sms
              size={20}
              color="#909090"
              className="aspect-square h-full text-inputIconGrey"
            />
          }
          inputClass="rounded-lg border border-inputBorder text-grey900 w-full"
        />

        {/* PASSWORD  */}
        <PasswordLineInput
          id="password"
          handleChange={handleChange}
          touched={touched.password}
          blur={handleBlur}
          isDisabled={false}
          value={values.password}
          label="Password"
          placeholder=""
          error={errors.password}
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
          text={loading ? "loading ..." : "Login"}
          size="medium"
          disabled={!isFormButtonDisabled}
          // icon={<FiArrowRight size={18} color="white" />}
          className="!rounded=full w-full py-[14.5px] px-5 mt-3 text-base justify-center flex-row-reverse"
          theme={!isFormButtonDisabled || loading ? "disabled" : "dark"}
          type="fill"
        >
          {loading && <Loader />}
        </Button>
      </form>

      <p className="text-center w-full text-inputIconGrey font-medium">
        New to Nark?{" "}
        <Link
          href="/auth/signup"
          className="text-foreground hoverActiveOpacity hoverActiveUnderline"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default Login;
