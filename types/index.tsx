import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface Product {
  id: string;
  title: string;
  image: string;
}

export interface emailInputPropsFade {
  id?: string;
  label?: string;
  placeholder: string;
  type: string;
  setValue?: (value: string) => void;
  icon?: ReactNode;
  iconStart?: ReactNode;
  value?: string;
  error?: string | undefined;
  isDisabled?: boolean;
  iconWrapperClass?: string;
  inputClass?: string;
  inputWrapperClass?: string;
  touched?: boolean | undefined;
  handleChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  handleClick: () => void;
  blur?: React.FocusEventHandler<HTMLInputElement> | undefined;
}


export interface variablesType {
  first: number, 
  after: string 
}

export interface ShopifyImage {
  node: {
    url: string;
  };
}

export interface ShopifyProductNode {
  node: {
    id: string;
    title: string;
    images: {
      edges: ShopifyImage[];
    };
  };
  cursor: string;
}

export interface ShopifyProductsResponse {
  products: {
    edges: ShopifyProductNode[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}


export interface CardProps {
  image: StaticImageData;
  title: string;
  route: string;
}