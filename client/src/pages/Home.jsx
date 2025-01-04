import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [offerListing,setOfferListing]=useState([]);
  const [saleListing,setSaleListing]=useState([]);
  const [rentListing,setRentListing]=useState([]);

  return (
    <div>
      {/* top */}
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
            <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <span className='text-slate-500'>perfect</span>
            <br />
            place with ease
          </h1>
          <div className='text-gray-400 text-xs sm:text-sm'>Sameena Estate is the best place to live.
            <br />
            We have a wide range of properties
          </div>
          <p className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>Let's get started...</p>
        </div>
      {/* swiper */}

      {/* listing results */}
    </div>
  )
}
