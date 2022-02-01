import Link from "next/link";
import { useEffect, useState } from "react";

import EntityHeader from "./EntityHeader";
import HeadBanner from "./HeadBanner";
import NavBar from "./Navbar";
import EntityName from "./EntityName";
import { Router } from "next/router";

const RouteComponents = ({ children }) => {
  const [entity, setEntity] = useState({});



  useEffect(() => {
    setEntity({ name: "Prototype", ratings: 4.5, ratingsCount: 124 });
  }, []);

  return (
    <div className="mx-auto px-4 bg-gray-200">
      <HeadBanner />
      <div className="sticky top-0 sm:hidden z-20 bg-gray-200 bg-opacity-80">
        <EntityName name={entity.name} />
      </div>
      {entity.ratings && (
        <EntityHeader
          ratings={entity.ratings}
          ratingsCount={entity.ratingsCount}
          name={entity.name}
        />
      )}

      <NavBar />
      <div>{children}</div>
      {/* footer */}
      <div className=" flex justify-evenly mx-auto bg-gray-300 gap-10 shadow-sm rounded-2xl grid-cols-2 h-20 sm:h-10 mt-8 pb-16">
        <h1 className=" text-xs md:text-base text-gray-800 text-opacity-80 pt-4 pl-8">
          Author: Chathura Konara
        </h1>
        <h1 className=" text-xs md:text-base text-gray-800 text-opacity-80 pt-4">
          Email: chathurajkonara@gmail.com
        </h1>
        {/* <h1 className=" text-xs md:text-base text-gray-800 text-opacity-80 pt-4 pr-8">
          Internship Projet
        </h1> */}
      </div>
    </div>
  );
};

export default RouteComponents;
