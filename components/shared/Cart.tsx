import React, { FC, useContext, useEffect, useState } from "react";
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
import { getCartById, getCheckout, removeFromCart } from "@/utils/queries";
import { useRouter } from "next/navigation";
interface cartItemProps {
  title: string;
  subtitle: string;
  price: string;
  image: string;
  deleteItem: (id: string) => void;
  id: string;
}

const CartItem: FC<cartItemProps> = ({
  title,
  subtitle,
  price,
  image,
  id,
  deleteItem,
}) => {
  const { cartOpen, setCartOpen } = useContext(GlobalContext);
  const [fetch, setFetch] = useState<boolean>(false);

  return (
    <div className="w-full flex items-center gap-4">
      <div className="w-[15%] bg-yellow-500 aspect-[0.7]">
        <Image
          src={image}
          width={1024}
          height={1024}
          alt="clithing product"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-[1] flex flex-col gap-1 md:gap-[10px]">
        <div className="w-full flex items-center gap-1 md:gap-3 justify-between">
          <button className="text-left cursor-pointer">
            <p className="text-foreground w-[90%] text-xs md:text-sm font-normal line-clamp-2 md:line-clamp-3 leading-[14px] md:leading-[16.8px]">
              {title}
            </p>
            <p className="text-deleteGrey font-normal text-[10px] md:text-xs ">
              {subtitle}
            </p>
          </button>
          <button
            className="hoverActiveGrey p-2 rounded"
            onClick={() => deleteItem(id)}
          >
            <RiDeleteBinLine size={18} color="#737373" />
          </button>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="">
            <p className="text-foreground text-xs font-semibold">
              ${price}
              <span className="text-deleteGrey font-normal line-through">
                {" "}
                ${(parseInt(price) / 0.8).toFixed(2)}
              </span>
            </p>
            <p className="text-redOff text-xs font-normal">(20% off)</p>
          </div>

          {/* ADD / REMOVE ITEM FROM CART
          <div className="w-fit flex items-center gap-4 px-2 py-[10px] border border-borderGrey2">
            <button className="hoverActiveGrey px-1 py-1">
              <RiSubtractLine />
            </button>
            <p className="text-xs text-foreground font-normal">1</p>
            <button className="hoverActiveGrey px-1 py-1">
              <IoMdAdd />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const router = useRouter();
  const { cartOpen, setCartOpen } = useContext(GlobalContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [cartData, setCartData] = useState<any | null>(null);
  const [checkoutLoad, setCheckoutLoad] = useState<boolean>(false);
  const [ checkoutUrl, setCheckoutUrl ] = useState<any | null>(null)
  // const [ items, setItems] = useState<any[] | null>(null)

  const fetchCart = async () => {
    const cartId = localStorage.getItem("narkCartId");
    if (!cartId) return;

    setLoading(true);
    try {
      const res = await client.request(getCartById, {
        variables: { cartId },
      });

      console.log(
        "GET CART BY ID SUCCESS:::::::",
        res.data.cart.lines.edges[0]
      );
      if (res) {
        setCartData(res.data.cart);
        setLoading(false);
      }
      setLoading(false);
    } catch (err) {
      console.log("GET CART BY ID ERROR:::::::", err);
      setLoading(false);
    }
  };

  const fetchCheckoutUrl = async (cartId: string) => {
    setCheckoutLoad(true);
    try {
      const res = await client.request(getCheckout, {
        variables: {
          id: cartId,
        },
      });

      if (res) {
        console.log("Checkout URL:", res.data.cart);
        setCheckoutUrl(res.data)
        router.push(res.data.cart.checkoutUrl);
        setCheckoutLoad(false);
        return res;
      }
      
      // return null;
    } catch (err) {
      console.error("Failed to fetch checkout URL", err);
      setCheckoutLoad(false);
      return null;
    }
  };

  const handleCheckout = async () => {
    setCheckoutLoad(true);
    let items: { variantId: string; quantity: number }[] =
      cartData.lines.edges.map((item: any) => ({
        variantId: item.node.merchandise.id,
        quantity: item.node.quantity,
      }));
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineItems: items,
        }),
      });

      const data = await res.json();
      console.log(
        "THIS IS THE CHECKOUT DATA",
        data.checkout.data.checkoutCreate.checkout.webUrl
      );
      if (data.checkout.data.checkoutCreate.checkout.webUrl) {
        window.location.href =
          data.checkout.data.checkoutCreate.checkout.webUrl;
      }
      setCheckoutLoad(false);
    } catch (err: any) {
      setCheckoutLoad(false);
    }

    // console.log("THIS IS THE ITEM ID AND QUANTITIES", items);
  };

  const checkOut = () => {
    // handleCheckout();
    const cartId = localStorage.getItem("narkCartId");
    if (cartId === null) return;

    fetchCheckoutUrl(cartId);
    // if (checkoutUrl === null) return;
    // router.push(checkoutUrl.cart.checkoutUrl);
  };

  const deleteItem = async (lineId: string) => {
    const cartId = localStorage.getItem("narkCartId");
    let idees: string[] = [lineId];
    try {
      const res = await client.request(removeFromCart, {
        variables: {
          cartId,
          lineIds: idees,
        },
      });
      if (res) {
        fetchCart();
      }

      console.log("ADD TO CART SUCCESS::::::", res);
    } catch (err) {
      console.error("ADD TO CART ERROR::::::", err);
    }
  };

  useEffect(() => {
    if (cartOpen === true) {
      fetchCart();
    }
  }, [cartOpen]);

  return (
    <div className={cartOpen ? "cartOpen" : "cartClose"}>
      <div
        onClick={() => {
          setCartOpen(false);
        }}
        className="flex flex-[1] h-full bg-"
      ></div>
      <div className={cartOpen ? "drawerOpen" : "drawerClose"}>
        {loading === true ? (
          <div className="w-full h-full flex items-center justify-center">
            <p>Please wait...</p>
          </div>
        ) : cartData === null ? (
          <div className="w-full h-full flex flex-col items-center justify-center opacity-35">
            <p className="text-xl font-semibold">Oops!</p>
            <p>You have no Item in your cart</p>
          </div>
        ) : !cartData.cost ? (
          <div></div>
        ) : (
          <div className="w-full h-full flex flex-col">
            <div className="w-full px-1 py-2 flex-[1]">
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
              <h3 className="mb-4 text-2xl px-4 leading-[33px] font-semibold ">
                Your Cart
              </h3>
              {/* {loading === true && <p>Loading...</p>} */}
              <div className="w-full h-full max-h-[600px] flex flex-col gap-4 scroll-vertical px-5">
                {cartData.lines.edges?.map((item: any, idx: number) => (
                  <CartItem
                    title={item.node.merchandise.product.title}
                    subtitle={item.node.merchandise.title}
                    price={item.node.merchandise.price.amount}
                    image={
                      item.node.merchandise.product.images.edges[0].node.url
                    }
                    id={item.node.id}
                    deleteItem={deleteItem}
                  />
                ))}
              </div>
            </div>

            {/* PRICE AND CHECKOUT SECTION WITH SHADOW */}
            <div className="w-full sm-shad py-8 px-5 flex flex-col gap-8 justify-self-end">
              <div className="w-full flex items-center justify-between">
                <p className="text-base text-foreground font-medium leading-[24px] ">
                  Subtotal{" "}
                  <span className="font-normal">
                    ({cartData.totalQuantity} items)
                  </span>
                </p>
                <p className="text-base text-foreground font-medium leading-[24px] ">
                  ${cartData.cost?.subtotalAmount.amount}
                </p>
              </div>

              <Button
                text={checkoutLoad === true ? "Loading..." : "Shop Collection"}
                icon={<FiArrowRight size={18} color="black" />}
                className="!rounded=full w-full px-5 py-[14px] mt-3 text-base justify-center flex-row-reverse"
                theme="dark"
                type="fill"
                cta={() => checkOut()}
              />
              <p className="text-xs text-foreground font-semibold text-center leading-[16px] ">
                Psst, get it now before it sells out.
              </p>
            </div>
          </div>
        )}

        {/* SECTION WHEN THERE IS DATA */}
      </div>
    </div>
  );
};

export default Cart;
