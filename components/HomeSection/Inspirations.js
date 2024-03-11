import React from "react";
import Link from "next/link";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Inspirations = () => {
  const images = [
    { id: 1, source: "/inspiration1.jpg" },
    { id: 2, source: "/inspiration2.jpg" },
    { id: 3, source: "/inspiration3.jpg" },
  ];

  return (
    <div className="bg-[#FCF8F3] flex flex-col md:flex-row justify-between items-center my-[5vh] md:my-[15vh]">
      <div className="text-left p-8 md:p-4 md:w-[60vw] md:ml-[20vh]">
        <h1 className="font-poppins font-bold text-3xl  md:text-6xl">
          50+ Beautiful Idols & Statues
        </h1>
        <p className="mt-4 mb-6 text-lg hidden md:block">
          Immerse yourself in the exquisite craftsmanship and timeless elegance
          showcased in our carefully selected pieces. Whether you're an art
          enthusiast, a collector, or simply appreciate the aesthetic appeal of
          sculptures, our diverse array of idols and statues is sure to
          captivate your senses.
        </p>
        <p className="mt-4 mb-6 text-lg md:hidden">
          Immerse yourself in the exquisite craftsmanship and timeless elegance
          showcased in our carefully selected pieces.{" "}
        </p>
        <Link href="/shop">
          <button className="bg-[#60482D] text-white font-bold rounded-md py-2 px-6 md:py-3 md:px-8">
            SHOP NOW!
          </button>
        </Link>
      </div>
      <div className="slide-container md:w-[70vh] w-[50vh] overflow-hidden  md:mr-[10vh]">
        <Zoom scale={0.4}>
          {images.map((image) => (
            <img
              key={image.id}
              src={image.source}
              className="object-fill md:h-[80vh] h-[50vh] mx-auto"
              alt={`Inspiration ${image.id}`}
            />
          ))}
        </Zoom>
      </div>
    </div>
  );
};

export default Inspirations;
