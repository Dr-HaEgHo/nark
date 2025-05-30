import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { FiArrowRight } from "react-icons/fi";
import {
  RiCloseLargeLine,
  RiDeleteBinLine,
  RiSubtractLine,
} from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import Image from "next/image";
import { image2 } from "@/assets/images";
import { GlobalContext } from "@/context/context";
import client from "@/utils/StorefrontInit";
import { getCartById } from "@/utils/queries";

const CartItem = () => {
  const { cartOpen, setCartOpen } = useContext(GlobalContext);
  const [ fetch, setFetch ] = useState<boolean>(false);


  

  return (
    <div className="w-full flex items-center gap-4">
      <div className="w-[15%] bg-yellow-500 aspect-[0.7]">
        <Image
          src={image2}
          alt="clithing product"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-[1] flex flex-col gap-[10px]">
        <div className="w-full flex items-center gap-3 justify-between">
          <button className="text-left cursor-pointer">
            <p className="text-foreground w-[90%] text-sm font-normal leading-[16.8px]">
              The Organic Cotton Long-Sleeve Turtleneck
            </p>
            <p className="text-deleteGrey font-normal text-xs ">
              Medium | Black
            </p>
          </button>
          <button>
            <RiDeleteBinLine size={18} color="#737373" />
          </button>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="">
            <p className="text-deleteGrey text-xs font-normal">
              {" "}
              $50 <span className="text-foreground font-semibold">$35</span>
            </p>
            <p className="text-redOff text-xs font-normal"> (30% off)</p>
          </div>

          {/* ADD / REMOVE ITEM FROM CART */}
          <div className="w-fit flex items-center gap-4 px-2 py-[10px] border border-borderGrey2">
            <button className="hoverActiveGrey px-1 py-1">
              <RiSubtractLine />
            </button>
            <p className="text-xs text-foreground font-normal">1</p>
            <button className="hoverActiveGrey px-1 py-1">
              <IoMdAdd />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cartOpen, setCartOpen } = useContext(GlobalContext);
  const [ loading, setLoading ] = useState<boolean>(false)

  const fetchCart = async () => {
    const cartId = localStorage.getItem("narkCartId");
    if (!cartId) return;
    
    setLoading(true);
    try {
      const res = client.request(getCartById, {
        variables: { cartId },
      });
      
      console.log("GET CART BY ID SUCCESS:::::::", res);
      setLoading(false);
    } catch (err) {
      console.log("GET CART BY ID ERROR:::::::", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cartOpen === true) {
      fetchCart();
    }
  }, [cartOpen]);

  return (
    <div className={cartOpen ? "cartOpen" : "cartClose"}>
      <div className={cartOpen ? "drawerOpen" : "drawerClose"}>
        <div className="w-full px-5 py-2">
          <div className="w-full flex items-center justify-end">
            <button
              onClick={() => {
                setCartOpen(!cartOpen);
              }}
              className="mb-6 hoverActiveGrey p-1"
            >
              <RiCloseLargeLine size={26} />
            </button>
          </div>
          <h3 className="mb-4 text-2xl leading-[33px] font-semibold ">
            Your Cart
          </h3>
              {
                loading === true && <p>Loading...</p>
              }
          <div className="w-full flex flex-col gap-4">

            <CartItem />
            <CartItem />
            <CartItem />
          </div>
        </div>

        {/* PRICE AND CHECKOUT SECTION WITH SHADOW */}
        <div className="w-full sm-shad py-8 px-5 flex flex-col gap-8 justify-self-end">
          <div className="w-full flex items-center justify-between">
            <p className="text-base text-foreground font-medium leading-[24px] ">
              Subtotal <span className="font-normal">(2 items)</span>
            </p>
            <p className="text-base text-foreground font-medium leading-[24px] ">
              $202
            </p>
          </div>

          <Button
            text="Shop Collection"
            icon={<FiArrowRight size={18} color="black" />}
            className="!rounded=full w-full px-5 py-[14px] mt-3 text-base justify-center flex-row-reverse"
            theme="dark"
            type="fill"
          />
          <p className="text-xs text-foreground font-semibold text-center leading-[16px] ">
            Psst, get it now before it sells out.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
