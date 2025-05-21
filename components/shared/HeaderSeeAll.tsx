import Link from "next/link";
import React, { FC } from "react";

interface Props {
  wordOne?: string;
  wordTwo?: string;
  link?: string;
  linkWord?: string;
}

const HeaderSeeAll: FC<Props> = ({ wordOne, wordTwo, link, linkWord }) => {
  return (
    <div className="w-full flex items-center justify-center lg:justify-between">
      <h3 className="text-5xl font-medium text-center lg:text-left">
        <span className="playfair italic">{wordOne}</span> {wordTwo}
      </h3>
      <Link href={link ?? "/"}  className="hidden lg:block text-base font-medium text-seeText">
        {" "}
        {linkWord}
      </Link>
    </div>
  );
};

export default HeaderSeeAll;
