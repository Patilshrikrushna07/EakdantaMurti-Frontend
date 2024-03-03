import React from "react";
import { useRouter } from "next/router";

export default function ProductDetail({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading..</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  console.log(product); // Check product object

  const { name, images, description, price } = product;

  return (
    <div>
      <h1>{name}</h1>
      {images && images.length > 0 && (
        <img src={images[0]} alt={name} />
      )}
      <p>{description}</p>
      <p>Rs.{price}</p>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const { _id } = query;
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${apiUrl}/get-product/${_id}`);

    if (!response.ok) {
      console.error("Failed to fetch product:", response.status);
      return {
        notFound: true,
      };
    }

    const product = await response.json();
    console.log("Fetched product:", product); // Log the fetched product

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      notFound: true,
    };
  }
}