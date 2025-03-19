"use client";
import { GlobalContext } from "@/context/context";
import React, { useContext, useEffect, useState } from "react";
import { LineInput, PasswordLineInput } from "@/components/shared/Input";
import { Eye, Lock, SearchNormal1, Sms, User } from "iconsax-react";
import Button from "@/components/shared/Button";
import Link from "next/link";
import { useFormik } from "formik";
import { signupSchema } from "@/schemas";
import client from "@/utils/StorefrontInit";
import { createAccessToken, createCustomer } from "@/utils/queries";
import { Loader } from "@/components/shared/Loading";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Signup = () => {
  const router = useRouter();
  const { customLayout, setCustomLayout, user, setUser, setToken } =
    useContext(GlobalContext);

  const [isFormButtonDisabled, setIsFormButtonDisabled] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // const createToken = async () => {
  //   try{
  //     const {data} = await client.request(createAccessToken, {
  //       variables:{
  //         email: values.email,
  //         password: values.password,
  //       }
  //     })

  //     if(!data.customerAccessTokenCreate){
  //       return;
  //     }

  //     if(data){
  //       setToken(data.customerAccessTokenCreate.customerAccessToken.accessToken)
  //       localStorage.setItem('ACCESS_TOKEN', JSON.stringify(data.customerAccessTokenCreate.customerAccessToken.accessToken))
  //       setLoading(false);
  //     }
  //   }
  //   catch(err) {
  //     setLoading(false);
  //   }
  // };

  const onSubmit = async () => {
    console.log("we have submitted the form: ", values);
    let cursor: string | null = null;
    setLoading(true);

    try {
      const variables = {
        input: {
          email: values.email,
          password: values.password,
          firstName: values.firstname || "",
          lastName: values.lastname || "",
          // phone: "+2348139347195",
          // acceptsMarketing: true,
          // send_email_invite: true,
        },
      };
      const data: any = await client.request(createCustomer, {
        variables,
      });

      
      if (!data) {
        console.log("there is no single data")
        return;
      }
      
      if (data) {
        setLoading(false);
        
        if (data.errors) {
          console.log("this is the data: ", data.errors)
          toast.error("Oops!, something went wrong");
          return;
        }
        
        if (data.data.customerCreate) {
          console.log("this is the data: ", data.data.customerCreate)
          setLoading(false);
          if (
            data.data.customerCreate === null ||
            data.data.customerCreate.customer === null
          ) {
            toast.error(data.data.customerCreate.customerUserErrors[0].message);
            console.log("not yet, we're on the way: ", data.data.customerCreate.customerUserErrors[0].message);
          } else {
            toast.success("Signed up successfully");
            setUser(data.data.customerCreate.customer);
            localStorage.setItem(
              "SHOPIFY_USER",
              JSON.stringify(data.data.customerCreate.customer)
            );
            // createToken();
          }
        }
      }
      // cursor = data.data.products.pageInfo.endCursor;

      console.log("Total Products Fetched:", data);
    } catch (error) {
      setLoading(false);
      console.error("Fetch Error:", error);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: signupSchema,
      onSubmit,
    });

  useEffect(() => {
    if (
      values.firstname !== "" &&
      values.lastname !== "" &&
      values.email !== "" &&
      values.password !== "" &&
      values.confirmPassword !== "" &&
      !errors.firstname &&
      !errors.lastname &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword &&
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
    setCustomLayout(true);
    console.log("this is the layout value: ", customLayout);
  }, [customLayout]);

  useEffect(() => {
    if (user !== null) {
      router.push("/auth/login");
    }
    console.log("this is the user value: ", user);
  }, [user]);

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
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="w-full flex items-start justify-between">
          <LineInput
            id="firstname"
            handleChange={handleChange}
            touched={touched.firstname}
            blur={handleBlur}
            isDisabled={false}
            value={values.firstname}
            label="First Name"
            placeholder="e.g John"
            error={errors.firstname}
            // iconWrapperClass="!left-[6px]"
            inputWrapperClass="!w-[48%]\"
            iconStart={
              <User
                size={20}
                color="#909090"
                className="aspect-square h-full text-inputIconGrey"
              />
            }
            inputClass="rounded-lg border flex-[1] border-inputBorder text-grey900 "
          />
          <LineInput
            id="lastname"
            handleChange={handleChange}
            touched={touched.lastname}
            blur={handleBlur}
            isDisabled={false}
            value={values.lastname}
            label="Last Name"
            placeholder="e.g Doe"
            // iconWrapperClass="!left-[6px]"
            inputWrapperClass="!w-[48%]"
            error={errors.lastname}
            iconStart={
              <User
                size={20}
                color="#909090"
                className="aspect-square h-full text-inputIconGrey"
              />
            }
            inputClass="rounded-lg border !flex-[1] border-inputBorder text-grey900"
          />
        </div>

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
        <PasswordLineInput
          id="confirmPassword"
          handleChange={handleChange}
          blur={handleBlur}
          isDisabled={false}
          value={values.confirmPassword}
          label="Confirm Password"
          placeholder=""
          error={errors.confirmPassword}
          inputClass="rounded-lg border border-inputBorder text-grey900 w-full"
          iconStart={
            <Lock
              size={20}
              color="#909090"
              className="aspect-square h-full text-black"
            />
          }
        />

        <Button
          text={loading ? "loading ..." : "Sign Up"}
          size="medium"
          disabled={!isFormButtonDisabled}
          // icon={<FiArrowRight size={18} color="white" />}
          className="!rounded-full cursor-pointer w-full py-[14.5px] px-5 mt-3 text-base justify-center flex-row-reverse"
          theme={!isFormButtonDisabled || loading ? "disabled" : "dark"}
          type="fill"
        >
          {loading && <Loader />}
        </Button>
      </form>

      <p className="text-center w-full text-inputIconGrey font-medium">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-foreground hoverActiveOpacity hoverActiveUnderline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
