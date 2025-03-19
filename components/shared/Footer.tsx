import Link from "next/link";
import React from "react";
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";
import Button from "./Button";
import Image from "next/image";
import logo from "@/assets/icons/LogoWhite.svg";
import { footerLinks } from "@/constants/data";
import { RiFacebookLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { TbBrandTwitter } from "react-icons/tb";
import { RiLinkedinLine } from "react-icons/ri";
import { RiCopyrightLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-foreground py-4">
      <div className="container max-lg:px-5 py-10 flex items-start justify-between text-background">
        <div className="flex flex-col items-start gap-10 md:flex-row md:justify-between md:items-end">
          <Image src={logo} alt="website logo" loading="lazy" className="" />

          {/* <Button
            text="Send us a message"
            type="fill"
            theme="dark"
            className="text-sm px-6 h-[50px] flex items-center mb-3"
          /> */}
        </div>

        <div className="flex md:justify-between md:flex-row flex-col-reverse gap-10 ">
          <div className="flex gap-10 lg:gap-20">

          <div>
              <h3 className="text-darkPrimary font-medium text-[16px] mb-4">
                {" "}
                Support
              </h3>
              <div className="flex flex-col gap-3">
                <Link
                  href=""
                  className="text-sm text-grey800 font-normal hover:text-grey600 transition-all ease-in-out duration-200 "
                >
                  nark@gmail.com
                </Link>
                <Link
                  href=""
                  className="text-sm text-grey800 font-normal hover:text-grey600 transition-all ease-in-out duration-200 "
                >
                  +88015-88888-9999
                </Link>
               
              </div>
            </div>


            {footerLinks &&
              footerLinks.map((link) => (
                <div key={link.id} className="hidden sm:block">
                  <h3 className="text-background font-medium text-base mb-4">
                    {" "}
                    {link.name}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {link.links &&
                      link.links.map((item) => (
                        <Link
                        key={item.id}
                          href={item.route}
                          className="text-sm text-grey800 font-normal hover:text-grey600 transition-all ease-in-out duration-200 "
                        >
                          {item.title}
                        </Link>
                      ))}
                  </div>
                </div>
              ))}

            <div>
              <h3 className="text-darkPrimary font-medium text-[16px] mb-4">
                {" "}
                Get in Touch
              </h3>
              <div className="flex gap-6">
                <Link
                  href=""
                  className="text-sm text-grey800 font-normal hover:text-grey600 transition-all ease-in-out duration-200 "
                >
                  <RiFacebookLine size={24} color="white"/>
                </Link>
                <Link
                  href=""
                  className="text-sm text-grey800 font-normal hover:text-grey600 transition-all ease-in-out duration-200 "
                >
                  <FaInstagram size={24} color="white"/>
                </Link>
                <Link
                  href=""
                  className="text-sm text-grey800 font-normal hover:text-grey600 transition-all ease-in-out duration-200 "
                >
                  <TbBrandTwitter size={24} color="white"/>
                </Link>
                <Link
                  href=""
                  className="text-sm text-grey800 font-normal hover:text-grey600 transition-all ease-in-out duration-200 "
                >
                  <RiLinkedinLine size={24} color="white"/>
                </Link>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-center flex items-center justify-center gap-[6px] border-t border-copyright py-5">
        <RiCopyrightLine size={20} color="rgba(255, 255, 255,.1)" />
        <p className="text-copyright font-medium text-[20px]">Copyright Nark 2025. All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
