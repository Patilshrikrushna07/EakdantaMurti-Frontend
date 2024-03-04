import React from "react";

export default function ProductDetails({ product }) {

  console.log("Product received in ProductDetails:",product)

  if (!product || !product.data) {
    return <div>Loading...</div>; 
  }

  const { name, images, description, price } = product.data;

  return (
    <div className="w-[85%] mx-auto flex flex-row gap-x-[3vh]">
      <div>
        <img className="h-[20vh] w-[20vh] object-cover mb-[2vh]" src={images[0]} alt={name} />
        <img className="h-[20vh] w-[20vh] object-cover mb-[2vh]" src={images[1]} alt={name} />
      </div>
      <img className="h-[70vh] w-[60vh] object-cover" src={images[1]} alt={name} />
      <div>
        <h1 className="text-[4.5vh] font-semibold mb-[1.5vh]">{name}</h1>
        <p className="text-[3vh] font-medium my-[1.5vh]">{description}</p>
        <p className="text-[4vh]">Rs.{price}</p>
      </div>
      
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { id } = params;
    console.log("ID parameter recieved",id)
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${apiUrl}/get-product/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    const product = await response.json();

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    return {
      props: {
        product: null,
        error: "Failed to fetch product details",
      },
    };
  }
}