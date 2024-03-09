import React, { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Person2Icon from "@mui/icons-material/Person2";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Link from "next/link";
import { useStateContext } from "../../context/StateContext";
import { toast } from "react-hot-toast";

const Navbar = () => {

  const {totalQuantities}= useStateContext();

  return (
    <div className="bg-white shadow-md mb-[1vh] static">
      <div className="p-[2vh] w-[90%] mx-auto flex flex-row justify-between items-center">
        <Link href="/"><img src="/favicon.ico" className="w-[13vh]" alt="" /></Link>

        <div className="list-none flex flex-row gap-x-[4vh]">
          <Link href="/"><li className="text-[2.5vh] font-semibold ">Home</li></Link>
          <Link href="/about"><li className="text-[2.5vh] font-semibold">About</li></Link>
          <Link href="/shop"><li className="text-[2.5vh] font-semibold">Shop</li></Link>
          <Link href="/contact"><li className="text-[2.5vh] font-semibold">Contact</li></Link>
        </div>
        <div className="list-none flex flex-row gap-x-[4vh]">
          <Person2Icon className="cursor-pointer text-orange-800 text-[4.5vh]" />
          <SearchIcon className="cursor-pointer text-orange-800 text-[4.5vh]" />
          <FavoriteIcon className="cursor-pointer text-red-500 text-[4.5vh]" />
          <Link href="/checkout">
            <div className="relative">
              <p className="w-[4vh] h-[4vh] -top-[2vh] left-[2vh] bg-yellow-950 text-white rounded-full flex flex-row justify-center items-center absolute">
                {totalQuantities}
              </p>
              <ShoppingBagIcon className="cursor-pointer text-orange-300 text-[4.5vh]" />
            </div>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;