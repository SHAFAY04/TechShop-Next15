import { Space_Grotesk } from 'next/font/google'
import React from 'react'
import {FaClock} from 'react-icons/fa'
const font = Space_Grotesk({
    weight: "400",
    subsets: ["latin"]
  })
  

export default function requestFailedError() {
  return (

    <div className='flex flex-col min-h-screen justify-center items-center'>
    <FaClock size={50} color='black'/>
    <p className={`${font.className} mt-6`}>Oops! the request failed please try again later.</p>

    </div>

  )
}
