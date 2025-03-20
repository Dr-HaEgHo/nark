'use client'
import CategoryHero from "@/components/categories/CategoryHero"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ReactNode, useContext, useEffect, useState } from "react"
import { categories as data, categoriesWomen as data2  } from '@/constants/data'
import { GlobalContext } from "@/context/context"


const CategoriesLayout = ({children}: {children: ReactNode}) => {

  const router = useRouter();
  const search = useSearchParams()
  const type = new URLSearchParams().get('type')
  const idee = new URLSearchParams().get('id')

  const [categories, setCategories] = useState<any>({})
  const { catCustomLayout, setCatCustomLayout } = useContext(GlobalContext);




  const path = usePathname()

  const handleIncomingData = () => {
    let newCat: any = null; // Initialize to avoid undefined errors
    

    switch (path) {
      case "/categories/men":
        newCat = data;
        break;
      case "/categories/women":
        newCat = data2;
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
  }, [path]);

  useEffect(() => {
    if(type && idee) return;
    setCatCustomLayout(false);
  }, [type, idee, path]);


  return (
    <div>
      { catCustomLayout === false && <CategoryHero data={categories}/> }
      {children}
    </div>
  )
}

export default CategoriesLayout