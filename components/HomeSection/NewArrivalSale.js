import React from 'react'
import Link from 'next/link'

export const NewArrivalSale = () => {
  return (
    <div className='flex flex-row bg-gradient-to-b from-white to-[#DADADA]'>
      <div className='-skew-x-12 origin-top-right bg-[#F8F8F8]  w-[50vw]'>

      </div>
      <div className=" md:w-[35vw]  flex flex-col space-y-4 p-[5vh]">
        <h3 className="text-[#333333]">New Arrival</h3>
        <h1 className="text-[#6D4128] text-[3.5vh] md:text-[6.5vh] font-bold font-mono leading-tight">Discover Our New Collection</h1>
        <p className="text-[#333333]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
        <Link href='/shop'><button className="bg-[#6D4128] text-white font-bold md:w-[10vw] md:p-[3vh] p-[1.5vh]">PRE BOOK</button>
        </Link>
      </div>
    </div>
  )
}
