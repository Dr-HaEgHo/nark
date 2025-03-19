"use client";
import CategoryHero from "@/components/categories/CategoryHero";
import { ReactNode, Suspense, useContext } from "react";
import { GlobalContext } from "@/context/context";

const CategoriesLayout = ({ children }: { children: ReactNode }) => {

  const { categories, catCustomLayout, setCatCustomLayout } = useContext(GlobalContext);


  return (
    <Suspense>
      <div>
        {catCustomLayout === false && <CategoryHero data={categories} />}
        {children}
      </div>
    </Suspense>
  );
};

export default CategoriesLayout;