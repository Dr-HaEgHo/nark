import React, { FC } from "react";
import Button from "@/components/shared/Button";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import { categoryLinks, empty } from "@/constants/data";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  data: any;
}

const CategoryHero: FC<Props> = ({ data }) => {
  const path = usePathname();
  const type = path.split("/")[2];

  const router = useRouter();

  console.log("some path you are", path);

  const routeItems = (link: string) => {
    router.push(link);
    console.log("we are happy to be here", path);
  };

  return (
    <div className="w-full relative max-md:px-4 max-lg:px-5">
      <div className="container relative z-10">
        <div className="w-full">
          {/* BUTTONS AND TEXT */}
          <div className="flex flex-col items-center pt-12 lg:pt-[92px]">
            <div className="w-full flex items-center flex-col lg:flex-row justify-center gap-1 lg:gap-4">
              {categoryLinks &&
                categoryLinks.map((link, idx: number) => (
                  <Button
                    key={idx}
                    text={`${link.title}'s Fashion`}
                    cta={() => routeItems(link.route)}
                    // icon={<FiArrowRight size={18} color="white" />}
                    className="!rounded=full w-fit hoverActiveScale2 cursor-pointer px-5 mt-3 text-base justify-center flex-row-reverse"
                    theme={
                      path === link.route || type === link.title.toLowerCase()
                        ? "dark"
                        : "disabled"
                    }
                    type="fill"
                  /> 
                ))}
            </div>

            <h1 className="text-[40px] playfair italic leading-[100%] font-medium text-center py-12 lg:py-24">
              Categories
            </h1>
          </div>

          <div className="w-full mb-15">
            {data && data.beauty ? (
              <div className="w-full grid grid-cols-2 lg:grid-cols-3 items-center justify-items-end gap-3 md:gap-6">
                <Link
                  href={`/categories/${
                    path.split("/")[2]
                  }/${data.fashion.title.toLowerCase()}`}
                  className="w-full aspect-[1.49] overflow-hidden bg-yellow-400 rounded-xl md:rounded-[20px] relative"
                >
                  <Image
                    src={data.fashion.image}
                    alt={data.fashion.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />

                  <div className="w-full absolute top-0 left-0 h-full p-4 md:p-7 top-gradient flex items-end justify-center">
                    <p className="text-base md:text-lg lg:text-2xl max-md:leading-[16px] text-background font-medium text-center">
                      {data.fashion.title}
                    </p>
                  </div>
                </Link>
                <Link
                  href={`/categories/${
                    path.split("/")[2]
                  }/${data.beauty.title.toLowerCase()}`}
                  className="w-full aspect-[1.49] overflow-hidden bg-yellow-400 rounded-xl md:rounded-[20px] relative"
                >
                  <Image
                    src={data.beauty.image}
                    alt={data.beauty.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />

                  <div className="w-full absolute top-0 left-0 h-full p-4 md:p-7 top-gradient flex items-end justify-center">
                    <p className="text-base md:text-lg lg:text-2xl max-md:leading-[16px] text-background font-medium text-center">
                      {data.beauty.title}
                    </p>
                  </div>
                </Link>
                <Link
                  href={`/categories/${
                    path.split("/")[2]
                  }/${data.lifestyle.title.toLowerCase()}`}
                  className="w-full aspect-[1.49] overflow-hidden bg-yellow-400 rounded-xl md:rounded-[20px] relative"
                >
                  <Image
                    src={data.lifestyle.image}
                    alt={data.lifestyle.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />

                  <div className="w-full absolute top-0 left-0 h-full p-4 md:p-7 top-gradient flex items-end justify-center">
                    <p className="text-base md:text-lg lg:text-2xl max-md:leading-[16px] text-background font-medium text-center">
                      {data.lifestyle.title}
                    </p>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="w-full grid grid-cols-3 items-end gap-6">
                {[1, 2, 3].map((number, idx: number) => (
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
