"use client";
import React from "react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const { _id, name, images, description, price } = product;
  const truncatedDescription =
    description.length > 40
      ? description.substring(0, 40) + "..."
      : description;

  const truncatedName = name.length > 16 ? name.substring(0, 16) + "..." : name;

  return (
    <Link href="/productdetails/[id]" as={`/productdetails/${_id}`}>
      <div className="relative cursor-pointer bg-gray-100 shadow-lg w-[30vh] mb-[10vh]">
        <div>
          <img src={images[0]} className="h-[35vh] w-[30vh] object-cover" />
        </div>

        <p className="absolute z-20 top-[2vh] right-[2vh] text-white bg-red-500 w-[6vh] h-[6vh] rounded-full flex flex-row justify-center items-center">
          30%
        </p>
        <h1 className="px-[1vh]  text-[2.8vh] text-[#111] font-semibold my-[1vh]">
          {truncatedName}
        </h1>
        <p className="px-[1vh] text-[2.1vh] text-gray-600 font-normal mb-[1vh]">
          {truncatedDescription}
        </p>
        <div className="flex flex-row justify-between items-center px-[1vh] py-[1vh]">
          <p className="text-[2.5vh] font-semibold">Rs.{price}</p>
          <p className="line-through text-red-500 text-[2vh]">Rs.3500</p>
        </div>
        {/* <div className="onhover flex flex-col items-center p-[1vh]">
        <button className="bg-white text-[#B88E2F] w-full py-[1vh] text-[2.6vh] font-semibold">
          Add to Cart
        </button>
      </div> */}
      </div>
    </Link>
  );
};

export default ProductCard;
