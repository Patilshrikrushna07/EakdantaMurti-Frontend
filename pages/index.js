import React from "react";
import HeroBanner from "../components/HomeSection/HeroBanner";
import Homesale from "../components/HomeSection/Homesale";
import { ProductCard } from "../components";
import Link from "next/link";
import Inspirations from "../components/HomeSection/Inspirations";

export default function Home({ products }) {
  const productsArray = products.data.slice(0, 6);
  console.log("Products received:", products);

  return (
    <div>
      <HeroBanner />
      <Homesale />
      <div>
        <h1 className="text-center font-poppins font-bold md:text-[6vh] text-[3vh]">
          Our Murtis
        </h1>
        <div className="md:w-[80%] overflow-hidden mx-auto flex flex-wrap  md:my-[5vh] md:flex-row justify-center items-center gap-[2vh] md:gap-[5vh]  ">
          {productsArray.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <Link href="/shop" >
          <p className="text-center my-[2vh] font-semibold shadow-md hover:scale-105 mx-auto py-[1vh] text-[#B88E2F]  border-[#B88E2F] border-[0.3vh] w-[35vw] md:w-[10vw]">Show More</p>
        </Link>
      </div>
      <Inspirations/>
    </div>
  );
}
export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${apiUrl}/get-all-products`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();

    return {
      props: {
        products: products || [],
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
        error: "Failed to fetch products",
      },
    };
  }
}
