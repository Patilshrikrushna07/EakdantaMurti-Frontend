import React from 'react';
import {ProductCard} from "../components";

const Shop = () => {
  return (
    <div className='w-[90%] mx-auto'>
      <h1 className="text-[4vh] my-[3vh] text-center">This is Product Page</h1>
      <ProductCard/>
    </div>
  )
}

export default Shop;