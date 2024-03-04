import React from "react";
import ReactImageMagnify from "react-image-magnify";

export default function ProductDetails({ product }) {
  console.log("Product received in ProductDetails:", product);

  if (!product || !product.data) {
    return <div>Loading...</div>;
  }

  const { name, images, description, price } = product.data;

  return (
    <div className="md:mx-[15vh] m-[5vh] md:my-10  flex md:flex-row flex-col gap-x-[3vh]">
      <div className="flex flex-col-reverse md:flex-row md:space-x-4">
        <div className="flex flex-row  items-center overflow-hidden md:flex-col ">
          <img
            className="md:h-[20vh] md:w-[20vh] w-[10vh]  object-cover"
            src={images[0]}
            alt={name}
          />
          <img
            className="md:h-[20vh] md:w-[20vh] w-[10vh]  object-cover m-[2vh]"
            src={images[1]}
            alt={name}
          />
        </div>
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Wristwatch by Ted Baker London",
              isFluidWidth: true,
              src: images[1],
            },
            largeImage: {
              src: images[1],
              width: 679,
              height: 679,
            },
          }}
        />
      </div>
      <div className="flex flex-col space-y-4 md:ml-[2vh]">
        <h1 className="md:text-[5vh] text-[3vh] text-[#303030] font-medium ">{name}</h1>
        <p className="md:text-[3vh] font-medium  text-[#4c4b4b]">{description}</p>
        <div className="flex flex-row space-x-4">
          <p className=" text-[3vh] text-[#7a7979] font-bold font-poppins">Rs.{price}</p>
          <p className=" text-[3vh] text-[#ed6969] font-bold font-poppins line-through">Rs.{price}</p>
        </div>
        <div>
          <h1 className=" text-[2.5vh] text-[#878787] font-semibold font-poppins">
            Size
          </h1>
          <div className="flex flex-row space-x-4 my-[1vh]">
            <p className="bg-[#F9F1E7] p-[2vh]">12 inch</p>
            <p className="bg-[#F9F1E7] p-[2vh]">8 inch</p>
            <p className="bg-[#F9F1E7] p-[2vh] ">6 inch</p>
          </div>
        </div>
        <div>
          <h1 className=" text-[2.5vh] text-[#878787] font-semibold font-poppins">
            Color
          </h1>
          <div className="flex flex-row space-x-4 my-[1vh]">
            <span className="bg-[#BEBBCD] p-[2vh] rounded-full"></span>
            <span className="bg-[#242323] p-[2vh] rounded-full"></span>
            <span className="bg-[#B88E2F] p-[2vh] rounded-full "> </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { id } = params;
    console.log("ID parameter recieved", id);
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
