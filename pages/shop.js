// "use client"
import React from "react";
import { ProductCard } from "../components";

export default function Shop({ products }) {
  console.log("Products received:", products);

  const productsArray = products.data;

  if (!Array.isArray(productsArray)) {
    console.error("Products is not an array:", productsArray);
    return <div>Error: Products data is not in expected format</div>;
  }

  if (productsArray.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-[4vh] my-[3vh] text-center">This is Product Page</h1>
      <div className="flex flex-row justify-center gap-x-[3vh]">
        {productsArray.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
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
