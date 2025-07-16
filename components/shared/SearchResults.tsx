import { GlobalContext } from "@/context/context";
import { CloseCircle } from "iconsax-react";
import React, { FC, useContext } from "react";
import ItemCardLoading from "./ItemCardLoading";
import ItemCard from "./ItemCard";
import { showLowestPrice } from "@/constants/functions";

interface SearchResultsPropsType {
  open: boolean;
  setOpen: Function;
  searchterm: string;
  loading: boolean;
  setLoading: Function;
  collection: any[] | null;
}

const SearchResults: FC<SearchResultsPropsType> = ({
  open,
  setOpen,
  searchterm,
  loading,
  setLoading,
  collection,
}) => {
  //  const { searchOpen, setSearchOpen } = useContext(GlobalContext);

  return (
    <div
      className={
        open === true
          ? "sliderOpen scroll-vertical"
          : "sliderClose scroll-vertical"
      }
    >
      <div>
        {/* TOP BAR WITH CLOSE BUTTON */}
        <div className="w-full sticky top-0 p-2 px-8 flex items-center justify-end">
          <div
            onClick={() => {
              setOpen(false);
              // alert("clicked");
            }}
            className="hoverActiveGrey p-[2px] rounded"
          >
            <CloseCircle size="32" color="#000" variant="Bold" className="" />
          </div>
        </div>
        {/* {["green", "yellow", "red", "pink", "purple", "orange", "peach"].map(
        (item: string) => (
          <div
            key={item}
            style={{
              backgroundColor: item,
            }}
            className="w-12 h-[80vh] rounded-xl"
          ></div>
        )
      )} */}

        <div className="w-full max-md:px-4 max-lg:px-5">
          <div className="container">
            <div className="w-full">
              <div className="flex flex-col items-center">
                <h1 className="text-[40px] leading-[100%] font-medium text-center pt-6">
                  <span className="playfair italic">Search </span>Results
                </h1>
                {searchterm !== "" && <p>for: {searchterm}</p>}
              </div>

              {/* Grid container */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pb-10">
                {loading ? (
                  [1, 2, 3, 4, 5, 6, 7, 8].map((_, idx: number) => (
                    <ItemCardLoading key={idx} />
                  ))
                ) : collection === null || searchterm === "" ? (
                  <div className="w-full flex items-center justify-center ">
                    <p className="text-base font-normal text-deleteGrey text-left">
                      Please enter the name of the product you're looking for
                    </p>
                  </div>
                ) : !collection?.length ? (
                  <div className="w-full h-[100px] flex items-center justify-center ">
                    <p className="text-base font-normal text-deleteGrey text-center">
                      Apologies! we don't have { searchterm} yet... 
                    </p>
                  </div>
                ) : (
                  collection.map((item: any, idx: number) => (
                    <div onClick={() => setOpen(false)}>
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
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
