"use client"
import { rootState, storeDispatch } from '@/components/store';
import Button from '@/components/button';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Circle } from 'lucide-react';
import { setActiveCarousel } from '@/redux/stateSlice';




export default function page() {
  const chatOpened = useSelector<rootState>((state) => state.state.chatOpened);
  const activeCarousel = useSelector<rootState>((state) => state.state.activeCarousel);

  const translationValue=activeCarousel===1?"0%":activeCarousel===2?"-100%":activeCarousel===3?"-200%":null
  const dispatch = useDispatch<storeDispatch>()

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setActiveCarousel({ 
        activeCarousel: activeCarousel === 3 ? 1 : activeCarousel + 1 
      }))
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [activeCarousel, dispatch])
  return (
    <div className='p-3'>
      <div className='rounded-lg h-[400px] w-[1200px] bg-white overflow-hidden relative'>
        <div className='absolute flex h-full'
        style={{
          transition: 'transform 1s ease-in-out',
          transform: `translateX(${translationValue})`,
        }}>
          <img
            src="https://pub-d81cf4a8a26d4e8d8a83a8d23172d5e5.r2.dev/amd_1200x400.jpg"
            alt="amd"
            width={1200}
            height={400}
               />
          <img
            src="https://pub-d81cf4a8a26d4e8d8a83a8d23172d5e5.r2.dev/asus.jpg"
            alt="lcd screens"
            width={1200}
            height={400}

                   />
          <img
            src="https://pub-d81cf4a8a26d4e8d8a83a8d23172d5e5.r2.dev/msigpu.jpeg"
            alt="lcd screens"
            width={1200}
            height={400}
          />
          <img
            src="https://pub-d81cf4a8a26d4e8d8a83a8d23172d5e5.r2.dev/msi.jpg"
            alt="lcd screens"
            width={1200}
            height={400}
          />

        </div>
        <div className='absolute slow flex mx-[550px] mt-[370px] space-x-7  '>
            <Button Icon={Circle}  fill={activeCarousel === 1 ? 'white' : "transparent"} IconColor='white' IconSize={activeCarousel === 1 ? '22' : "15"} onclick={() => dispatch(setActiveCarousel({ activeCarousel: 1 }))} />
            <Button Icon={Circle}  fill={activeCarousel === 2 ? 'white' : "transparent"} IconColor='white' IconSize={activeCarousel === 2 ? '22' : "15"} onclick={() => dispatch(setActiveCarousel({ activeCarousel: 2 }))} />
            <Button Icon={Circle}  fill={activeCarousel === 3 ? 'white' : "transparent"} IconColor='white' IconSize={activeCarousel === 3 ? '22' : "15"} onclick={() => dispatch(setActiveCarousel({ activeCarousel: 3 }))} />
          </div>


      </div>
    </div>
  )
}
