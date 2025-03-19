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
    <div className="w-full flex items-center justify-between">
      <h3 className="text-5xl font-medium ">
        <span className="playfair italic">{wordOne}</span> {wordTwo}
      </h3>
      <Link href={link ?? "/"} className="text-base font-medium text-seeText">
        {" "}
        {linkWord ?? "See All"}
      </Link>
    </div>
  );
};

export default HeaderSeeAll;
