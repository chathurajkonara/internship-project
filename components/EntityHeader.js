import EntityName from "./EntityName";
import StarRating from "./StarRating";
import Image from "next/dist/client/image";
import shopping_cart from "../images/shopping_cart.svg";
import visit from "../images/visit.svg";

import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import Link from 'next/link';

const EntityHeader = (props) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');

  const fetchData = async () => {
    const res = await fetch("https://api/jwt",{credentials: 'include',});
    const user = await res.json();
    console.log(user);
    setName(user.name);
    if(user.name){
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //log user out

  
    const logout = async (e) => {
      e.preventDefault();

      console.log("Inside logout fu");
      const res = await fetch("https://api/jwt/logout",{
        method: "POST",
        credentials: 'include',
      });

      const msg = await res.json();

      router.reload();
      console.log("Inside logout func");
      alert(msg);

    };
  

  // setInterval(() => {
  //   try {
  //     fetchData();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, 5000);



  return (
    <div
      className={`grid sm:grid-cols-3 bg-gray-300 sticky sm:top-0 z-10 ${
        router.pathname === "/SignUp" ? "hidden" : "block"
      }`}
    >
      <div className="hidden sm:block ">
        <EntityName name={props.name} />
      </div>
      <StarRating ratings={props.ratings} ratingsCount={props.ratingsCount} />
      <div className="flex justify-center sm:justify-evenly space-x-2 justify-items-center my-2 sm:my-4 grid-cols-3 text-sm sm:text-lg lg:text-2xl">
        <div className="text-lg flex justify-evenly font-extrabold text-green-800 hover:text-blue-600">
          
         
        </div>
        {/* <div className=" font-extrabold text-green-800 hover:text-blue-600">
          <Image src={shopping_cart} alt="shopping cart" />
        </div> */}
        <Link href="/SellerPlatform">
        <a
          className= {`font-extrabold text-green-800 hover:text-blue-600 ${isLoggedIn? 'block' : 'hidden'}`}
          
        >
          {" "}
           Add An Item
        </a></Link>

        <div
          className={`font-extrabold text-green-800 hover:text-blue-600 ${isLoggedIn? 'block' : 'hidden'}`}
          
        >
          |
        </div>

        <div
          className={`font-extrabold text-green-800 hover:text-blue-600 ${isLoggedIn? 'block' : 'hidden'}`}
          
        >
          {`Hi ${name}`}
           
        </div>
        
        <Link href="/ProductsList">
        <a
          className= {`font-extrabold text-green-500 hover:text-blue-400 ${isLoggedIn? 'block' : 'hidden'}`}
          onClick = {logout}
          
        >
          {" "}
           Logout
        </a></Link>

       



        <Link href="/Login">
        <a
          className= {`font-extrabold text-green-800 hover:text-blue-600 ${isLoggedIn? 'hidden' : 'block'}`}
          
        >
          {" "}
           Login
        </a></Link>

        <div
          className= {`font-extrabold text-green-800 hover:text-blue-600 ${isLoggedIn? 'hidden' : 'block'}`}
          
        >
          |
        </div>
        <Link href="/SignUp">
        <a
          className={`font-extrabold text-green-800 hover:text-blue-600 ${isLoggedIn? 'hidden' : 'block'}`}
          
        >
          {" "}
           SignUp
        </a></Link>
      </div>
    </div>
  );
};

export default EntityHeader;
