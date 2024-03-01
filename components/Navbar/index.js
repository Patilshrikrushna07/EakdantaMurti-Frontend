import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Person2Icon from "@mui/icons-material/Person2";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md">
      <div className="p-[2vh] w-[90%] mx-auto flex flex-row justify-between items-center">
        <img src="/logo.jpg.png" className="w-[13vh]" alt="" />
        <div className="list-none flex flex-row gap-x-[4vh]">
          <li className="text-[2.5vh] font-semibold">Home</li>
          <li className="text-[2.5vh] font-semibold">About</li>
          <li className="text-[2.5vh] font-semibold">Shop</li>
          <li className="text-[2.5vh] font-semibold">Contact Us</li>
        </div>
        <div className="list-none flex flex-row gap-x-[4vh]">
          <Person2Icon className="cursor-pointer text-orange-800 text-[4.5vh]" />
          <SearchIcon className="cursor-pointer text-orange-800 text-[4.5vh]" />
          <FavoriteIcon className="cursor-pointer text-red-500 text-[4.5vh]" />
          <div className="relative">
            <p className="w-[4vh] h-[4vh] -top-[2vh] left-[2vh] bg-yellow-950 text-white rounded-full flex flex-row justify-center items-center absolute">
              3
            </p>
            <ShoppingBagIcon className="cursor-pointer text-orange-300 text-[4.5vh]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
