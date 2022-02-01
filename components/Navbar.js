import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
  const [productsSelected, setProductsSelected] = useState(true);
  const [servicesSelected, setServicesSelected] = useState(false);
  const [contactSelected, setContactSelected] = useState(false);

  const router = useRouter();

  useEffect(() => {
    router.pathname === "/index"
      ? setProductsSelected(true)
      : setProductsSelected(false);
    router.pathname === "/ProductsList"
      ? setProductsSelected(true)
      : setProductsSelected(false);
    router.pathname === "/ServicesList"
      ? setServicesSelected(true)
      : setServicesSelected(false);
    router.pathname === "/ContatEntity"
      ? setContactSelected(true)
      : setContactSelected(false);
  }, [router]);

  return (
    <nav
      className={`text-sm sm:text-base  mb-12 mt-2 bg-transparent sticky top-10 sm:top-22 z-10 ${
        router.pathname === "/SignUp" ? "hidden" : "block"
      }`}
    >
      {/* sticky top-33 sm:top-29 md:top-21 z-10 */}
      <ul className="flex justify-evenly space-x-2 bg-gray-200 bg-opacity-80">
        <li
          className={`flex-auto text-center rounded-md bg-white font-bold hover:bg-gray-100 transition ease-out duration-700 text-gray-700 shadow-md inline-block p-2 ${
            productsSelected ? "bg-gray-200 font-extrabold uppercase" : "bg-current"
          }`}
        >
          <Link href="/ProductsList" className=" flex w-full justify-center">
            <a
              className=" flex w-full justify-center"
              onClick={(e) => {
                setProductsSelected(true);
                setServicesSelected(false);
                setContactSelected(false);
              }}
            >
              Products
            </a>
          </Link>
        </li>
        <li
          className={`flex-auto text-center rounded-md bg-white font-bold hover:bg-gray-100 transition ease-in-out duration-700 text-gray-700 shadow-md inline-block p-2 ${
            servicesSelected ? "bg-gray-200 font-extrabold uppercase" : "bg-current"
          }`}
        >
          <Link href="/ServicesList" className=" flex w-full justify-center">
            <a
              className=" flex w-full justify-center"
              onClick={(e) => {
                setServicesSelected(true);
                setProductsSelected(false);
                setContactSelected(false);
              }}
            >
              About
            </a>
          </Link>
        </li>
        <li
          className={`flex-auto text-center rounded-md bg-white font-bold hover:bg-gray-100 transition ease-in-out duration-700 text-gray-700 shadow-md inline-block p-2 ${
            contactSelected ? "bg-gray-200 font-extrabold uppercase" : "bg-current"
          }`}
        >
          <Link href="/ContatEntity" className=" flex w-full justify-center">
            <a
              className=" flex w-full justify-center"
              onClick={(e) => {
                setContactSelected(true);
                setProductsSelected(false);
                setServicesSelected(false);
              }}
            >
              How To
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
