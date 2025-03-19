"use client";

import { getCollections } from "@/utils/queries";
import client from "@/utils/StorefrontInit";
import { usePathname } from "next/navigation";
import React, {
  createContext,
  SetStateAction,
  Dispatch,
  useState,
  useReducer,
  useEffect,
} from "react";

interface messageType {
  message: string;
  chat_id: string;
}

interface ContextProps {
  customLayout: boolean;
  setCustomLayout: Dispatch<SetStateAction<boolean>>;
  catCustomLayout: boolean;
  setCatCustomLayout: Dispatch<SetStateAction<boolean>>;
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>>;
  categories: any | null;
  setCategories: Dispatch<SetStateAction<any | null>>;
  products: any | null;
  setProducts: Dispatch<SetStateAction<any | null>>;
  subCat: any | null;
  setSubCat: Dispatch<SetStateAction<any | null>>;
  user: any | null;
  setUser: Dispatch<SetStateAction<any | null>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  isSubscribed: boolean;
  setIsSubscribed: Dispatch<SetStateAction<boolean>>;
  collections: any | null;
  setCollections: Dispatch<SetStateAction<any | null>>;
}

export const GlobalContext = createContext<ContextProps>({
  customLayout: false,
  setCustomLayout: (): boolean => false,
  catCustomLayout: false,
  setCatCustomLayout: (): boolean => false,
  cartOpen: false,
  setCartOpen: (): boolean => false,
  categories: null,
  setCategories: (): any => null,
  products: null,
  setProducts: () : any | null => null,
  subCat: null,
  setSubCat: (): any => null,
  user: null,
  setUser: (): any | null => null,
  token: null,
  setToken: (): string | null => null,
  isSubscribed: false,
  setIsSubscribed: () : boolean => false,
  collections: null,
  setCollections: (): any | null => null 
});

const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const [isActive, setIsActive] = useState<string>("");
  const [customLayout, setCustomLayout] = useState<boolean>(false);
  const [catCustomLayout, setCatCustomLayout] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<any>(null);
  const [ products, setProducts ] = useState<any | null>(null);
  const [subCat, setSubCat] = useState<any>(null);
  const [ user, setUser ] = useState<any | null>(null);
  const [ token, setToken ] = useState<any | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [ collections, setCollections ] = useState<any | null>(null);
  

  const path = usePathname() 
  const localToken = window ? window.localStorage.getItem('ACCESS_TOKEN') : null;
  const localUser = window ? JSON.parse(localStorage.getItem('SHOPIFY_USER') as string) : null;
  

  const setLocalRoute = () => {
    console.log("this is the path: ", path)
  }


  const checkTokenAndValidate = () => {
    if(localToken){
      setToken(localToken)
    }

    if(localUser){
      setUser(localUser)
    }
  }



  useEffect(() => {
    checkTokenAndValidate();
  }, [path]);

  return (
    <GlobalContext.Provider
      value={{
        // isActive,
        // setIsActive,
        products, 
        setProducts,
        customLayout,
        setCustomLayout,
        catCustomLayout,
        setCatCustomLayout,
        cartOpen,
        setCartOpen,
        categories,
        setCategories,
        subCat,
        setSubCat,
        user,
        setUser,
        token, 
        setToken, 
        isSubscribed, 
        setIsSubscribed,
        collections, 
        setCollections
        
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider

// export const useGlobalContext = useContext(GlobalContext);
