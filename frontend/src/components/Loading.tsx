import { Space_Grotesk } from 'next/font/google'
import React from 'react'
import {HashLoader} from 'react-spinners'

const font = Space_Grotesk({
    weight: "400",
    subsets: ["latin"]
  })
type LoadingProps={
  text:string
}  

export default function Loading({text}:LoadingProps) {
  return (

    <div className='flex flex-col min-h-screen justify-center items-center'>
    <HashLoader color='black' size={50}/>
    <p className={`${font.className} mt-6`}>{text}</p>

    </div>

  )
}
