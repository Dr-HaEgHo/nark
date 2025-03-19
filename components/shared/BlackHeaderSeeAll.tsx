import Link from "next/link";
import React, { FC } from "react";

interface Props {
  title: string;
  link?: string;
  linkWord?: string;
}

const BlackHeaderSeeAll: FC<Props> = ({ title, link, linkWord }) => {
  return (
    <div className="w-full flex items-center justify-between z-20 relative bg-foreground p-6">
      <h3 className="text-2xl font-medium text-background"> {title}
      </h3>
      <Link href={link ?? "/"} className="text-base font-medium text-seeText">
        {" "}
        {linkWord ?? "See All"}
      </Link>
    </div>
  );
};

export default BlackHeaderSeeAll;
