"use client";
import { GlobalContext } from "@/context/context";
import { TiStarFullOutline } from "react-icons/ti";
import React, { useContext, useEffect, useState } from "react";
import Button from "@/components/shared/Button";
import { FiTruck } from "react-icons/fi";
import { TfiPackage } from "react-icons/tfi";
import { GoGift } from "react-icons/go";
import {
  box,
  gift,
  image,
  image1,
  image2,
  image3,
  image4,
  image5,
  sustain,
  van,
} from "@/assets/images";
import Image from "next/image";
import { useProductById } from "@/hooks/useProductById";
import { useSearchParams } from "next/navigation";
import ProductDetailsLoader from "@/components/loaders/ProductDetailsLoader";
// import ProductOverview from "@/components/product/ProductOverview";
import { TickCircle } from "iconsax-react";
import client from "@/utils/StorefrontInit";
import { addToCart } from "@/utils/queries";

const Page = () => {
  const search = useSearchParams();
  const idee = new URLSearchParams(search).get("id");

  const [selected, setSelected] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [reviews, setReviews] = useState<any | null>(null)

  const { setCatCustomLayout, setCartOpen } = useContext(GlobalContext);

  const { product, loading, error } = useProductById(idee as string);

  // console.log("PARAMS OF THIS PAGE:::::::::", product);

  // utils/fetchReviews.ts
  // const fetchReviews = async (productId: string) => {
  //   try {
  //     const response = await fetch(
  //       `GET https://app.judge.me/oauth/authorize?client_id=[your_client_id]&redirect_uri=[your_redirect_uri]&response_type=code&scope=[list_of_permissions_you_are_asking]&state=[state]`
  //     );
  //     const data = await response.json();
  //     setReviews(data.reviews); // array of review objects
  //   } catch (err: any) {
  //     console.log("THE ERROR FROM THE REVIEWS")
  //   }
  // };

  const handleToggleSelectProducts = (item: any) => {
    const id = selected.map((item: any) => item.id);
    if (id.includes(item.id)) {
      setSelected(() => {
        return selected.filter((ns: any) => ns.id !== item.id);
      });
    } else {
      setSelected([...selected, item]);
    }

    console.log("the Id", id);
  };

  function sumProductPrices(products: any[] | null): number {
    let total;
    if (products === null) total = 0;

    total = products?.reduce(
      (total: number, product: any) =>
        total + parseFloat(product.priceV2.amount),
      0
    );

    //  console.log("THE PRICE CALCULATED::::::", parseFloat(total.toFixed(2)))
    return total ? parseFloat(total.toFixed(2)) : 0;
  }



  const addProductToCart = async () => {
    const cartId = localStorage.getItem("narkCartId");

    const newLines = selected.map((item: any) => ({
      merchandiseId: item.id, // Shopify variant ID
      quantity: 1, // you can customize this if needed
    }));

    try {
      const res = await client.request(addToCart, {
        variables: {
          cartId,
          lines: newLines,
        },
      });

      console.log("ADD TO CART SUCCESS::::::", res);
      setCartOpen(true);
      setSelected([]);
    } catch (err) {
      console.error("ADD TO CART ERROR::::::", err);
    }
  }

  useEffect(() => {
    setCatCustomLayout(true);
    setTotal(0);
    // fetchReviews(idee as string)
  }, []);

  useEffect(() => {
    setTotal(sumProductPrices(null));
  }, [product]);

  useEffect(() => {
    setTotal(sumProductPrices(selected));
    console.log("PRODUCTS OF THIS PAGE:::::::::", selected);
  }, [selected]);

  // useEffect(() => {
  //   console.log("IDEES OF THIS PAGE:::::::::", selected);
  // }, [selected]);
  return (
    <>
      {loading ? (
        <ProductDetailsLoader />
      ) : product !== undefined ? (
        <div className="w-full max-md:px-4 max-lg:px-5">
          <div className="container">
            <div className="w-full">
              <div className="flex flex-col items-center pt-[92px]">
                <h1 className="text-[40px]  leading-[100%] font-medium text-center py-24">
                  <span className="playfair italic">Product </span>Details
                </h1>
              </div>

              <div className="w-full flex lg:hidden items-start justify-between max-lg:flex-col">
                <div className="w-full lg:w-[67%] grid grid-cols-3 lg:grid-cols-2 gap-2">
                  {[image, image1, image2, image3].map((stuff, idx: number) => (
                    <div
                      key={idx}
                      className="w-full aspect-[0.81] first:col-span-3"
                    >
                      <Image
                        src={stuff}
                        alt="product"
                        width={1024}
                        height={1024}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:flex items-start justify-between max-lg:flex-col">
                <div className="w-full lg:w-[67%] hidden lg:grid grid-cols-3 lg:grid-cols-2 gap-2">
                  {product.images.edges.map((image: any, idx: number) => (
                    <div key={idx} className="w-full aspect-[0.81] bg-gray-100">
                      <Image
                        src={image.node.url}
                        alt="product"
                        width={1024}
                        height={1024}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="sticky top-4 w-full lg:w-[31%] max-lg:mt-6">
                  <h4 className="text-inputIconGrey text-2xl font-normal leading-[33px] mb-1">
                    {product.collections.edges[0].node.title}
                  </h4>
                  <div className="w-full flex items-start justify-between border-b border-borderGrey2 gap-3 mb-4 pb-4">
                    <p className="text-2xl leading-[33px] font-normal text-foreground">
                      {product.title}
                    </p>
                    {/* <p className="text-[32px] font-normal leading-[33px] text-foreground">
                      $167
                    </p> */}
                  </div>

                  {/* stars */}
                  {/* <div className="w-fit flex items-center justify-start gap-[10px]">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((_, idx: number) => (
                        <TiStarFullOutline key={idx} size={14} color="black" />
                      ))}
                    </div>
                    <p className="text-xs text-inputIconGrey font-normal leading-[16px]">
                      5.0 (2 Reviews)
                    </p>
                  </div> */}

                  {/* colors */}
                  <div className="w-fit flex items-center gap-3 mt-[17px] mb-9">
                    {/* {["blue", "brown"].map((color, idx: number) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: color,
                        }}
                        className="w-8 h-8 rounded-full"
                      />
                    ))} */}
                  </div>

                  {/* size */}
                  <div className="w-full mb-5">
                    <div className="w-full flex items-center justify-between mb-[10px]">
                      <p className="text-xs font-semibold text-foreground">
                        Variants
                      </p>
                      {/* <p className="text-xs font-normal text-foreground cursor-pointer underline">
                        Size Guide
                      </p> */}
                    </div>

                    {/* <div className="w-full flex items-center gap-3">
                  {["XS", "S", "M", "L", "XL", "XXL"].map(
                    (name, idx: number) => (
                      <div
                        key={idx}
                        className="px-3 py-2 lg:px-4 lg:py-3 bg-sizebox"
                      >
                        <p className="text-xs font-normal text-black ">
                          {name}
                        </p>
                      </div>
                    )
                  )}
                </div> */}
                    <div className="w-full grid grid-cols-3 items-center gap-3">
                      {product.variants?.edges?.map(
                        (variant: any, idx: number) => (
                          <div
                            key={idx}
                            className="transition duration-200 cursor-pointer h-full hover:shadow-sm rounded-md p-1"
                            onClick={() => {
                              handleToggleSelectProducts(variant.node);
                            }}
                          >
                            <div
                              key={idx}
                              className="w-full aspect-square relative"
                            >
                              {selected.includes(variant.node) ? (
                                <TickCircle
                                  size="24"
                                  className="absolute right-1"
                                  color="#000"
                                  variant="Bold"
                                />
                              ) : null}
                              <Image
                                src={variant.node.image.src}
                                alt="product"
                                width={1024}
                                height={1024}
                                className="w-full h-full object-cover rounded overflow-hidden"
                              />
                              <div className="w-full h-full absolute top-0 rounded opacity-[5%] left-0 z-[999] bg-black" />
                            </div>
                            <p className="text-xs font-normal text-black ">
                              {variant.node.title}
                            </p>

                            <p className="text-xs font-normal text-priceGreen ">
                              <span className="line-through text-[#929292]">
                                {" "}
                                ${" "}
                                {(variant.node.priceV2.amount / 0.8).toFixed(2)}
                              </span>{" "}
                              {"  "} $ {variant.node.priceV2.amount}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* BUTTON */}
                  <div className="w-full py-8 border-b border-borderGrey2">
                    <Button
                      text={`Add to Cart ($ ${total})`}
                      disabled={selected.length <= 0 ? true : false}
                      cta={() => {
                        addProductToCart();
                      }}
                      // icon={<FiArrowRight size={18} color="white" />}
                      className="!rounded=full w-full px-5 py-[14] disabled:opacity-[60%] mt-3 text-base justify-center flex-row-reverse"
                      theme={"dark"}
                      type="fill"
                    />
                  </div>

                  {/* SHIPPING DETAILS */}
                  <div className="w-full py-6 gap-6 flex flex-col border-b border-borderGrey2">
                    {/* <div className="flex gap-4 items-start">
                      <Image
                        src={van}
                        alt="van"
                        loading="lazy"
                        className="w-[34px] h-[34px] object-cover"
                      />
                      <p className="text-sm font-medium leading-[20px] tracking-[0.42px] text-foreground">
                        Free Shipping <br />
                        <span className="text-xs text-foreground font-normal tracking-[0.2px] leading-[16px]">
                          On all U.S. orders over $100{" "}
                          <a href="/">Learn more.</a>
                        </span>
                      </p>
                    </div> */}

                    <div className="flex gap-4 items-start">
                      <Image
                        src={box}
                        alt="van"
                        loading="lazy"
                        className="w-[34px] h-[34px] object-cover"
                      />
                      <p className="text-sm font-medium leading-[20px] tracking-[0.42px] text-foreground">
                        Easy Returns <br />
                        <span className="text-xs text-foreground font-normal tracking-[0.2px] leading-[16px]">
                          We have a solid returns policy.
                          <a href="/">Return Details</a>
                        </span>
                      </p>
                    </div>

                    <div className="flex gap-4 items-start">
                      <Image
                        src={gift}
                        alt="van"
                        loading="lazy"
                        className="w-[34px] h-[34px] object-cover"
                      />
                      <p className="text-sm font-medium leading-[20px] tracking-[0.42px] text-foreground">
                        Send It As A Gift <br />
                        <span className="text-xs text-foreground font-normal tracking-[0.2px] leading-[16px]">
                          Add a free personalized note during checkout.
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="w-full pt-10 border-b border-borderGrey2 mb-5">
                    <p className="text-base text-foreground font-normal leading-[24px] tracking-[0.2px]">
                      Description
                    </p>
                    <p className="text-base text-foreground font-normal leading-[24px] tracking-[0.2px] mb-3">
                      {/* Meet your new chilly weather staple. The ReWool® Oversized
                      Shirt Jacket has all the classic shirt detailing—collar,
                      cuffs with buttons, and a shirttail hem, along with two
                      front chest flap pockets and on-seam pockets. The sleeves
                      are fully lined for added warmth and it’s made with a
                      GRS-certified recycled Italian Wool and GRS-certified
                      recycled nylon blend. Think cozy, comfy, and oh-so easy to
                      layer. With the goal of increasing the use of recycled
                      materials and reducing the harmful impacts of production,
                      the Global Recycled Standard (GRS) sets requirements for
                      third-party certification of recycled input in
                      products—including chain of custody, social and
                      environmental practices, and chemical restrictions. */}
                      {product.description}
                    </p>
                    {/* <ProductOverview overviewText={product.description} /> */}

                    {/* <div className="w-full flex items-center justify-between py-5 border-b border-borderGrey2">
                      <p className="w-[106px] text-base text-foreground font-medium leading-[24px] tracking-[0.2px]">
                        Model
                      </p>
                      <p className="text-sm text-foreground w-full font-normal leading-[16px] tracking-[1.4px]">
                        Model is 6′2″, wearing a size M
                      </p>
                    </div> */}

                    <div className="w-fyll flex items-center justify-between py-5 border-t border-borderGrey2">
                      <p className="w-[106px] text-base text-foreground font-medium leading-[24px] tracking-[0.2px]">
                        Fit
                      </p>
                      <p className="text-sm text-foreground w-full font-normal leading-[16px] tracking-[1.4px]">
                        Questions about fit? <br />
                        <a href="/contact">Contact Us </a>
                        <br />
                        {/* <a href="">Size Guide</a> */}
                      </p>
                    </div>
                  </div>

                  {/* SUSTAINABILITY */}
                  {/* <div className="w-full z-10 relative">
                    <Image
                      src={sustain}
                      alt="sustainability"
                      loading="lazy"
                      className="w-full"
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No products</div>
      )}
    </>
  );
};

export default Page;
