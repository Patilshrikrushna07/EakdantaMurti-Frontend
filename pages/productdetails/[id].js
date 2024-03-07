import React, { useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import ShareIcon from "@mui/icons-material/Share";

export default function ProductDetails({ product }) {
  console.log("Product received in ProductDetails:", product);

  if (!product || !product.data) {
    return <div>Loading...</div>;
  }

  const { name, images, description, price } = product.data;
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: name,
          text: description,
          url: window.location.href,
        });
      } else {
        console.log("Web Share API not supported");
        // Fallback for browsers that do not support Web Share API
        // You can implement your custom sharing logic here
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="md:mx-[15vh] m-[5vh] md:my-10  flex md:flex-row flex-col gap-x-[3vh]">
      <div className="flex flex-col-reverse md:flex-row md:space-x-4">
        <div className="flex flex-row   items-center overflow-hidden md:flex-col ">
          {images.map((image, index) => (
            <img
              key={index}
              className={`md:h-[20vh] md:w-[20vh] w-[10vh] object-cover ${
                index !== 0 ? "m-[2vh]" : ""
              }`}
              src={image}
              alt={name}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
        <div className="relative">
          {/* {selectedImage && (
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Product Image",
                  isFluidWidth: true,
                  src: selectedImage,
                },
                largeImage: {
                  src: selectedImage,
                  width: 1200,
                  height: 1800,
                },
              }}
            />
          )} */}
          <div
            onClick={handleShare}
          >
            <ShareIcon className="cursor-pointer absolute p-[1.2vh] bg-[#ffffffd4] rounded-full top-4 right-4 text-black text-[6vh] " />
          </div>
          {selectedImage && (
            <img
              className="md:w-[70vw] h-full"
              src={selectedImage}
              alt={name}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-4 md:ml-[2vh]">
        <h1 className="md:text-[5vh] text-[3vh] text-[#303030] font-medium ">
          {name}
        </h1>
        <p className="md:text-[3vh] font-medium  text-[#4c4b4b]">
          {description}
        </p>
        <div className="flex flex-row space-x-4">
          <p className=" text-[3vh] text-[#7a7979] font-bold font-poppins">
            Rs.{price}
          </p>
          <p className=" text-[3vh] text-[#ed6969] font-bold font-poppins line-through">
            Rs.{price}
          </p>
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
        <div className="flex flex-row space-x-5">
          <button className="md:px-[4.8vh] md:py-[1.2vh] px-[2vh] py-[1vh] shadow-sm md:text-[2.8vh] rounded-xl border-[0.3vh] border-[#2424248f] text-[#242424] hover:scale-105 ">
            Add To Cart
          </button>
          <button className="md:px-[5.5vh] md:py-[1.3vh] px-[3vh] py-[1vh] shadow-md font-semibold md:text-[3vh] rounded-xl  text-[#fef8f8] bg-[#B88E2F] hover:scale-105">
            Buy Now!
          </button>
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
