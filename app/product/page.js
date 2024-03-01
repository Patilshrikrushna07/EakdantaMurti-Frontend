"use client";
import React, { useEffect, useState } from "react";
import { ProductCard } from "../../components";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetch("https://eakdantamurti.onrender.com/api/get-all-products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-[90%] mx-auto">
      <h1 className="Our Products text-[4vh] font-medium text-center my-[5vh]">Products</h1>
      <ProductCard/>
    </div>
  );
};

export default ProductPage;
