'use client'
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {

  const router = useRouter()


  useEffect(() => {
    router.push("/categories/men")
  }, [])

  return (
    <div className="w-full">
    </div>
  );
};

export default Page;
