"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { Heart, SearchNormal1, Shop } from "iconsax-react";
import { FiUser } from "react-icons/fi";
import { GrCart } from "react-icons/gr";

import logo from "@/assets/icons/Logo.svg";
import jamMenu from "@/assets/icons/jamMenu.svg";
import Input from "./Input";
import { GlobalContext } from "@/context/context";
import SearchResults from "./SearchResults";
import { debounce } from "@/utils/debounce";
import client from "@/utils/StorefrontInit";
import { searchProductsByName } from "@/utils/queries";

const links = [
  { id: 1, name: "Men", route: "/categories/men" },
  { id: 2, name: "Women", route: "/categories/women" },
  // {
  //   id: 3,
  //   name: "Cosmetics",
  //   route: "/categories/cosmetics",
  // },
  { id: 4, name: "Shop", route: "/categories" },
  { id: 5, name: "Contact", route: "/", subroute: "/categories" },
];

const Navbar = () => {
  const path = usePathname();

  const [open, setOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const { customLayout, cartOpen, setCartOpen, searchOpen, setSearchOpen } =
    useContext(GlobalContext);
  const [searchResultsOpen, setSearchResultsOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [searchLoad, setSearchLoad] = useState<boolean>(false);
  // const sendData = () => {};

  const searchProducts = async (term: string) => {
    console.log("Searching for:", term);
    if(term === "") return;
    setKeyword(term);
    setSearchLoad(true);
    setSearchResults(null);
    // Your fetch/query function here
    try {
      const res = await client.request(searchProductsByName, {
        variables: {
          searchTerm: term,
        },
      });
      if (res) {
        console.log("SEARCH SUCCESS::::::", res.data.products.edges);
        setSearchResults(res?.data?.products?.edges)
      }
      setSearchLoad(false);
    } catch (err: any) {
      console.log("SEARCH ERROR::::::", err);
      setSearchLoad(false);
    }

    console.log("SEARCH RESULTS:::::::", searchResults)
  };

  const debouncedSearch = useCallback(debounce(searchProducts, 2000), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const sendData = () => {};

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      {customLayout ? (
        ""
      ) : (
        <div className="relative z-[9999999] h-fit w-full px-[30px]">
          <div className="container relative z-10 mx-auto w-full py-5 lg:py-0">
            {/* Large devices upward */}
            <div className="flex items-center justify-between">
              {/* LOGO  */}
              <div className="flex items-center justify-between">
                <Link href="/">
                  <Image src={logo} alt="logo" loading="lazy" />
                </Link>
              </div>

              {/* NAVIGATION LINKS */}
              <nav className="hidden lg:block">
                <ul className="flex items-center gap-5">
                  {links &&
                    links.map((link) => (
                      <li key={link.id} className="text-xm relative py-5">
                        {path === link.route || path === link.subroute ? (
                          <div
                            className={`absolute bottom-0 h-[5px] w-full rounded-tl-full rounded-tr-full bg-purpleGradient`}
                          />
                        ) : (
                          ""
                        )}
                        <Link href={link.route}>{link.name}</Link>
                      </li>
                    ))}
                </ul>
              </nav>
              {/* {searchResultsOpen === true ? "Yes oh" : "No oh"} */}
              {/* SEARCH BAR */}
              <div className="hidden lg:flex items-center gap-6">
                <div className="">
                  <div onClick={() => setSearchResultsOpen(true)}>
                    <Input
                      type="text"
                      placeholder="What are you looking for?"
                      handleClick={sendData}
                      handleChange={handleChange}
                      icon={
                        <SearchNormal1
                          size={18}
                          color="black"
                          className="aspect-square h-full text-black"
                        />
                      }
                      inputClass="rounded bg-inputGrey text-grey900"
                    />
                  </div>
                  <SearchResults
                    searchterm={keyword}
                    open={searchResultsOpen}
                    setOpen={setSearchResultsOpen}
                    loading={searchLoad}
                    setLoading={setSearchLoad}
                    collection={searchResults}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Link href="/">
                    <Heart size={18} color="black" />
                  </Link>
                  <button
                    onClick={() => {
                      setCartOpen(!cartOpen);
                    }}
                    className="hoverActiveGrey rounded cursor-pointer p-2"
                  >
                    <GrCart size={18} color="black" />
                  </button>
                  <Link href="/">
                    <FiUser size={18} color="black" />
                  </Link>
                </div>
              </div>

              {/* HAMBURGER MENU */}
              <div
                onClick={toggleMenu}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[6px] bg-menuPink lg:hidden"
              >
                {open ? (
                  <RiCloseLargeFill className="h-full w-full p-2" />
                ) : (
                  <Image
                    src={jamMenu}
                    alt="menu"
                    aria-label="menu toggle switch to open menu"
                  />
                )}
              </div>

              {/* MOBILE MENU */}

              <div
                style={{
                  bottom: open ? "0%" : "-103%",
                }}
                className="menuHeight fixed left-0 w-full bg-menuPink p-4 transition duration-300"
              >
                <div className="flex h-full w-full flex-col">
                  <div className="flex items-center justify-start border-b border-greyPink py-6">
                    <p className="text-4 font-[600]">Menu</p>
                  </div>

                  <ul className="mt-7 flex w-full flex-[1] flex-col gap-4">
                    {links &&
                      links.map((link, idx: number) => (
                        <li
                          key={idx}
                          onClick={toggleMenu}
                          className={`rounded-lg p-4 text-lg font-[500] uppercase ${
                            link.route === path ? "text-white" : "text-grey1000"
                          } ${
                            link.route === path ? "bg-purplePrimary" : "bg-none"
                          }`}
                        >
                          <Link href={link.route}>{link.name}</Link>
                        </li>
                      ))}
                  </ul>

                  {/* COPYRIGHT  */}
                  <div className="flex items-center justify-center border-t border-purplePrimary py-5 pb-12">
                    <p className="text-[13px] font-[300]">2025 Nark</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
