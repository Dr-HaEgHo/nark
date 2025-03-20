import React, { FC } from "react";
import Button from "@/components/shared/Button";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import brownhat from "@/assets/images/hatman.jpeg";
import { categoryLinks, empty } from "@/constants/data";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  data: any;
}

const CategoryHero: FC<Props> = ({ data }) => {
  const path = usePathname();

  const router = useRouter();

  const routeItems = (link: string) => {
    router.push(link);
    console.log("we are happy to be here", path);
  };

  return (
    <div className="w-full relative">
      <div className="container relative z-10"> 
        <div className="w-full">
          {/* BUTTONS AND TEXT */}
          <div className="flex flex-col items-center pt-[92px]">
            <div className="w-full flex items-center justify-center gap-4">
              {categoryLinks &&
                categoryLinks.map((link) => (
                  <Button
                    text={link.title}
                    cta={() => routeItems(link.route)}
                    // icon={<FiArrowRight size={18} color="white" />}
                    className="!rounded=full w-fit hoverActiveScale2 cursor-pointer px-5 mt-3 text-base justify-center flex-row-reverse"
                    theme={path === link.route ? "dark" : "disabled"}
                    type="fill"
                  />
                ))}
            </div>

            <h1 className="text-[40px] playfair italic leading-[100%] font-medium text-center py-24">
              Categories
            </h1>
          </div>

          <div className="w-full mb-15">
            {data && data.beauty
              ? (<div className="w-full grid grid-cols-3 items-end gap-6">
                  <Link
                    href={`${path}/${data.fashion.title.toLowerCase()}`}
                    className="w-full aspect-[1.49] overflow-hidden bg-yellow-400 rounded-[20px] relative"
                  >
                    <Image
                      src={data.fashion.image}
                      alt={data.fashion.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />

                    <div className="w-full absolute top-0 left-0 h-full p-7 top-gradient flex items-end justify-center">
                      <p className="text-2xl text-background font-medium text-center">
                        {data.fashion.title}
                      </p>
                    </div>
                  </Link>
                  <Link
                    href={`${path}/${data.beauty.title.toLowerCase()}`}
                    className="w-full aspect-[1.49] overflow-hidden bg-yellow-400 rounded-[20px] relative"
                  >
                    <Image
                      src={data.beauty.image}
                      alt={data.beauty.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />

                    <div className="w-full absolute top-0 left-0 h-full p-7 top-gradient flex items-end justify-center">
                      <p className="text-2xl text-background font-medium text-center">
                        {data.beauty.title}
                      </p>
                    </div>
                  </Link>
                  <Link
                    href={`${path}/${data.lifestyle.title.toLowerCase()}`}
                    className="w-full aspect-[1.49] overflow-hidden bg-yellow-400 rounded-[20px] relative"
                  >
                    <Image
                      src={data.lifestyle.image}
                      alt={data.lifestyle.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />

                    <div className="w-full absolute top-0 left-0 h-full p-7 top-gradient flex items-end justify-center">
                      <p className="text-2xl text-background font-medium text-center">
                        {data.lifestyle.title}
                      </p>
                    </div>
                  </Link>
                  </div>
                )
              : (
                <div className="w-full grid grid-cols-3 items-end gap-6">
                  {
                    [1, 2, 3].map((number, idx: number) => (
                      <div
                        key={idx}
                        className="w-full aspect-[1.49] overflow-hidden bg-yellow-400 rounded-[20px] relative"
                      >
                        <Image
                          src={empty}
                          alt={`empty state for picture ${number}`}
                          loading="lazy"
                          className="w-full object-cover"
                        />
                      </div>
                    ))
                  }
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
