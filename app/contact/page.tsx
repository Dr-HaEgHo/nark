"use client";
import Button from "@/components/shared/Button";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
// import { FilledButton } from "./Button";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [show, setShow] = useState<boolean>(false);

  let timeoutId: ReturnType<typeof setTimeout>;

  const mySetTimeout = () => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      setStatus(null); // Hide the toast
      setShow(false);
    }, 3000);
  };

  useEffect(() => {
    if (status) {
      setShow(true); // Show the toast
      mySetTimeout(); // Set the timeout to hide it after duration
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [status]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setLoading(false);
        setStatus("Email sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
          phone: "",
        });
      } else {
        setStatus("Error sending email");
        setLoading(false);
      }
    } catch (error) {
      setStatus("Error sending email");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      formData.email === "" ||
      formData.message === "" ||
      formData.name === "" ||
      loading === true
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [formData, loading]);

  return (
    <div className="w-full">
      <div className="container">
        <div className="flex flex-col items-center py-11 lg:py-[92px]">
          <h1 className="text-5xl lg:text-[64px] leading-[100%] font-medium text-center mb-3 lg:mb-11">
            <span className="playfair italic">Contact Us</span>
            {/* <br className="hidden lg:block" /> with us */}
          </h1>
        </div>
        <div className="w-full py-16 px-6 lg:px-[70px] bg-black lg:rounded-[20px]">
          {show && (
            <div className="w-[70%] lg:w-[400px] p-3 bg-[#fff] rounded-full fixed top-10 right-10 z-[999999] shadow-lg">
              <p className="text-black font-normal text-base">
                {/* {status && status} */}sjnfrfwefw
              </p>
            </div>
          )}
          <div className="w-full max-w-[1300px] mx-auto flex flex-col lg:flex-row items-start gap-10 lg:gap-[60px]">
            <div className="w-fit flex flex-col items-start gap-4">
              <p className="text-white text-[40px] lg:text-[80px] font-medium lh100">
                Send Us
              </p>
              <p className="text-white text-[40px] lg:text-[80px] font-black underline whitespace-nowrap lh100">
                an email
              </p>
            </div>

            <div className="w-full">
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-8"
                action=""
              >
                <div className="">
                  <label
                    htmlFor=""
                    className="text-base text-white font-medium lh160"
                  >
                    Full name
                  </label>
                  <input
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    className="input lh160 "
                    type="text"
                    placeholder="What should we call you?"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor=""
                    className="text-base text-white font-medium lh160"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input lh160 "
                    type="text"
                    placeholder="What is your email address?"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor=""
                    className="text-base text-white font-medium lh160"
                  >
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input lh160 "
                    type="text"
                    placeholder="What is your phone number?"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor=""
                    className="text-base text-white font-medium lh160"
                  >
                    Type your message
                  </label>
                  <input
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="input lh160 "
                    type="text"
                    placeholder="Tell us in details what you would like us to do for you"
                  />
                </div>
                <Button
                  text={loading ? "Loading..." : "Submit Form"}
                  icon={<FiArrowRight size={18} color="black" />}
                  className="!rounded-full w-fit px-6 py-4 mt-3 text-base justify-center flex-row-reverse disabled:opacity-[40%]"
                  theme="light"
                  type="fill"
                  disabled={isDisabled}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
