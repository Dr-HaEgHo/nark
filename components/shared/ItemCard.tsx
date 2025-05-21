import { empty } from "@/constants/data";
import Image, { StaticImageData } from "next/image";
import React, { FC } from "react";
import Button from "./Button";
import { Eye, Heart } from "iconsax-react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  title?: string;
  price?: number;
  image?: string;
  id?: string;
}

const ItemCard: FC<Props> = ({ title, price, image, id }) => {

  const router = useRouter();
  const path = usePathname();

  return (
    <button className="w-full flex flex-col gap-4 ">
      <div className="aspect-[0.83] bg-[#e2e2e2] card rounded-[15px] overflow-hidden relative">
        <Image
          src={image ?? ""}
          alt={title ?? ""}
          loading="lazy"
          className="w-full h-full object-cover"
          width={1024}
          height={1024}
        />

        {/* FLOATING BUTTONS */}
        {/* <div className="absolute right-0 top-0 p-3 flex flex-col items-center justigy-center gap-2 z-20">
          <button  className="w-9 h-8 rounded-full bg-background cursor-pointer hoverActiveScale flex items-center justify-center p-2">
            <Heart color="black"/>
          </button>
          <button  className="w-9 h-8 rounded-full bg-background cursor-pointer hoverActiveScale flex items-center justify-center p-2">
            <Eye color="black"/>
          </button>
        </div> */}

        {/* BUTTONS */}
        <div className="transition duration-300 w-full btns h-full absolute bg-blackTrans opacity-0 flex-col items-center justify-center top-[100%] left-0 px-14">
          {/* <Button
            text="Add to Cart"
            // icon={<FiArrowRight size={18} color="black" />}
            className="!rounded=full w-full cursor-pointer py-[14.5px] mt-3 text-base justify-center flex-row-reverse"
            theme="dark"
            type="fill"
          />
          <Button
            text="View Pro"
            icon={<FiArrowRight size={18} color="black" />}
            className="!rounded=full w-full cursor-pointer py-[14.5px] mt-3 text-base justify-center flex-row-reverse"
            theme="light"
            type="fill"
          /> */}
        </div>
        
      </div>

      <div className="flex flex-col items-start gap-2">
        <button onClick={() => router.push(`/categories/product?id=${id}`)} className="transition duration-200 text-base text-left font-medium cursor-pointer leading-[24px] hover:opacity-60 active:opacity-50 line-clamp-2 overflow-ellipsis">{title ?? 'Product Name'}</button>
        <p className="text-base font-medium leading-[24px] text-priceGreen">
          { price ? `$${price}` : ''}
        </p>
      </div>
    </button>
  );
};

export default ItemCard;
