"use client";
import React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { categories as data, categoriesWomen as data2 } from "@/constants/data";
import { GlobalContext } from "@/context/context";
import Image from "next/image";
import { empty } from "@/assets/images";
import BlackHeaderSeeAll from "@/components/shared/BlackHeaderSeeAll";
import ItemCard from "@/components/shared/ItemCard";
import { useCollectionByHandle } from "@/hooks/useCollectionByHandle";
import ItemCardLoading from "@/components/shared/ItemCardLoading";
import Button from "@/components/shared/Button";
import { showLowestPrice } from "@/constants/functions";

const SubCategoryPage = () => {
  const path = usePathname();
  const type = path.split("/")[2];
  const idee = path.split("/")[3];
  const params = useParams();

  const { subCat, setSubCat, categories, setCategories, setCatCustomLayout } =
    useContext(GlobalContext);
  const { collection, fetchCollection, loading, error } =
    useCollectionByHandle();
  const [header, setHeader] = useState<string>("");

  // console.log("this is the type", idee)

  const handleTypeData = () => {
    let newCat: any = null; // Initialize to avoid undefined errors

    switch (type) {
      case "men":
        {
          // setQuery("men");
          newCat = data;
        }
        break;
      case "women":
        {
          // setQuery("women");
          newCat = data2;
        }
        break;
      default:
        console.warn("Unknown category:", params.type);
        return; // Exit early if params.type is not recognized
    }

    if (newCat) {
      console.log("Category name:", newCat.name);
      setCategories(newCat);
    }
    handleIncomingData();
  };

  const handleIncomingData = () => {
    if (!categories) {
      return;
    }
    let newCat: any = null; // Initialize to avoid undefined errors

    switch (params.subtype) {
      case "fashion":
        {
          fetchCollection(`${type}-fashion`);
          setHeader(`${type} fashion`)
          newCat = categories.fashion;
        }
        break;
      case "beauty":
        {
          fetchCollection(`${type}-beauty`);
          setHeader(`${type} beauty`)
          newCat = categories.beauty;
        }
        break;
      case "lifestyle":
        {
          fetchCollection(`${type}-lifestyle`);
          setHeader(`${type} lifestyle`)
          newCat = categories.lifestyle;
        } 
        break;
      default:
        console.warn("Unknown category:", path);
        return; // Exit early if path is not recognized
    }

    if (newCat) {
      console.log("Category name:", newCat.title);
      setSubCat(newCat);
    }
  };

  useEffect(() => {
    if (!path) return;

    if (categories === null) {
      handleTypeData();
    }
    handleIncomingData();

    console.log("this is the path", categories);
  }, [categories, path]);

  useEffect(() => {
    setCatCustomLayout(false);
  }, [type, idee, path]);

  console.log("MEN FASHION SUCCESS::::::", collection);

  return (
    <div className="w-full">
      <div className="container">
        <div className="w-full">
          {loading ? (
            <div className="w-full grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((number, idx: number) => (
                <ItemCardLoading key={idx} />
              ))}
            </div>
          ) : collection !== null &&
            collection !== undefined &&
            collection.length ? (
            <>
              <BlackHeaderSeeAll title={header} />
              <div className="w-full grid grid-cols-4 gap-6 mt-10">
                {collection.map((item: any, idx: number) => (
                  <ItemCard
                    key={idx}
                    title={item.node.title}
                    price={showLowestPrice(item.node.variants.edges)}
                    image={
                      item.node.images !== null
                        ? item.node.images?.edges[0]?.node.url
                        : "" 
                    }
                    id={item.node.id}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-center flex-col">
              Couldn't fetch collection
              <Button
                text="Refresh"
                className="w-fit pl-6"
                type="fill"
                theme="dark"
              />
            </div>
          )}
          {/* {subCat && subCat.catalogue ? (
            subCat.catalogue.map((item: any, idx: number) => (
              <div key={idx} className="w-full mt-14 flex flex-col gap-10">
                <BlackHeaderSeeAll
                  title={item.name}
                  link={"/"}
                  linkWord={"See All"}
                />

                <div className="w-full grid grid-cols-4 gap-6">
                  {item.products ? (
                    item.products.map((product: any, idx: number) => (
                      <ItemCard
                        key={idx}
                        title={product.name}
                        price={product.price}
                        image={product.images[0]}
                        id={product.id}
                      />
                    ))
                  ) : (
                    <div className="w-full grid grid-cols-4 gap-6">
                      {[1, 2, 3, 4].map((number, idx: number) => (
                        <div
                          key={idx}
                          className="w-full aspect-[1.01] overflow-hidden bg-yellow-400 rounded-[20px] relative"
                        >
                          <Image
                            src={empty}
                            alt={`empty state for picture ${number}`}
                            loading="lazy"
                            className="w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((number, idx: number) => (
                <div
                  key={idx}
                  className="w-full aspect-[1.01] overflow-hidden bg-yellow-400 rounded-[20px] relative"
                >
                  <Image
                    src={empty}
                    alt={`empty state for picture ${number}`}
                    loading="lazy"
                    className="w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryPage;
