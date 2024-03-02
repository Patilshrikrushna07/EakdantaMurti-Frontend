import React from "react";

const HeroBanner = () => {
  const images = [
    { id: 1, source: "/homebanner1.jpg" },
    { id: 2, source: "/homebanner2.jpg" },
    { id: 3, source: "/homebanner3.jpg" },
    { id: 4, source: "/homebanner4.jpg" },
    { id: 5, source: "/homebanner5.jpg" }
  ];

  return (
    <div>
      <div className="flex flex-row h-[90vh] ">
        {images.map((image) => (
          <img key={image.id} src={image.source} alt={`Banner ${image.id}`} />
        ))}
      </div>
      <div className="w-[85vw] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl bg-gradient-to-r from-[#eddcc8f3] to-[#fffffff6] md:w-[35vw] flex flex-col space-y-4 p-[5vh]">
        <h3 className="text-[#333333]">New Arrival</h3>
        <h1 className="text-[#846a28] text-[3.5vh] md:text-[6.5vh] font-bold font-mono leading-tight">Discover Our New Collection</h1>
        <p className="text-[#333333]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
        <button  className="bg-[#B88E2F] text-white font-bold md:w-[10vw] p-[3vh]">PRE BOOK</button>
      </div>

    </div>
  );
};

export default HeroBanner;
