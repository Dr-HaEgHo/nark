"use client";

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
}

export const GlobalContext = createContext<ContextProps>({
  customLayout: false,
  setCustomLayout: (): boolean => false,
  catCustomLayout: false,
  setCatCustomLayout: (): boolean => false,
  cartOpen: false,
  setCartOpen: () : boolean => false
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const [isActive, setIsActive] = useState<string>("");
  const [ customLayout, setCustomLayout ] = useState<boolean>(false)
  const [ catCustomLayout, setCatCustomLayout ] = useState<boolean>(false)
  const [ cartOpen, setCartOpen ] = useState<boolean>(false)

  return (
    <GlobalContext.Provider
      value={{
        // isActive,
        // setIsActive,
        customLayout,
        setCustomLayout,
        catCustomLayout,
        setCatCustomLayout,
        cartOpen,
        setCartOpen
      }}

    >
      {children}
    </GlobalContext.Provider>
  );
};

// export const useGlobalContext = useContext(GlobalContext);
