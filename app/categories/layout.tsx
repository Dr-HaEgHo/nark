'use client'
import CategoryHero from "@/components/categories/CategoryHero"
import { usePathname } from "next/navigation"
import { ReactNode, useContext, useEffect, useState } from "react"
import { categories as data } from '@/constants/data'
import { GlobalContext } from "@/context/context"


const CategoriesLayout = ({children}: {children: ReactNode}) => {

  const [categories, setCategories] = useState<any>({})
  const { catCustomLayout } = useContext(GlobalContext)

  const path = usePathname()

  const handleIncomingData = () => {
    let newCat: any = null; // Initialize to avoid undefined errors

    switch (path) {
      case "/categories/men":
        newCat = data.men;
        break;
      case "/categories/women":
        newCat = data.women;
        break;
      case "/categories/cosmetics":
        newCat = data.cosmetics;
        break;
      default:
        console.warn("Unknown category:", path);
        return; // Exit early if path is not recognized
    }
  
    if (newCat) {
      console.log("Category name:", newCat.title);
      setCategories(newCat);
    }
  }

  useEffect(() => {

    if(!path) return;

    handleIncomingData()
  }, [path])

  return (
    <div>
      { catCustomLayout === false && <CategoryHero data={categories}/> }
      {children}
    </div>
  )
}

export default CategoriesLayout