"use client"
import { useTheme } from 'next-themes'
import React from 'react'
import { useSelector } from 'react-redux'
import { rootState } from './store'
import { Space_Grotesk } from 'next/font/google'
import { Bot, Send } from 'lucide-react'
import Button from './button'

const space = Space_Grotesk({
  weight: "400",
  subsets: ["latin"]

})


export default function Chat() {
  const { theme } = useTheme()
  const chatOpened = useSelector<rootState>((state) => state.state.chatOpened)

  const arrayOfTechBotSlogans = [
    "Your Best Choice. In Real Time.",
    "Decide Smarter. Support Faster. Always Here.",
    "Real-time Answers. Real-time Relief. Better Shopping.",
    "From Comparison to Correction: Your Purchase Powerhouse",
    "Compare Confidently. Resolve Simply. Start Now.",
    "Smart Choices. Seamless Support"
  ]

  const getRandom = (min: any, max: any) => {

    const val = max - min
    const rand = Math.random() * val
    return Math.trunc(rand)

  }
  const val = getRandom(0, arrayOfTechBotSlogans.length)

  return (
    <>
      <div className={chatOpened ? theme === "light" ? `shadow-2xl sticky p-5 chat min-h-screen bg-white w-md rounded-xl border-1 border-gray-200` : `shadow-2xl sticky p-5 chat min-h-screen w-md rounded-xl border-1 border-gray-200 bg-[#242424] ` : theme === "dark" ? "shadow-2xl sticky p-5 min-h-screen w-md rounded-xl border-1 border-gray-200 bg-[#242424] nochat" : "shadow-2xl sticky p-5  min-h-screen bg-white w-md rounded-xl border-1 border-gray-200 nochat"}>
        <div className='flex flex-col justify-center items-center space-y-2'>
          <div className="flex md:space-x-2 items-center justify-center mt-8 ">
            <Bot size={"30px"} />

            <h1 className={`${space.className} text-2xl `}>TechBot</h1>
          </div>

          <h1 className={`${space.className} text-sm text-center `}>{`${arrayOfTechBotSlogans[val]}`}</h1>

        </div>
        {/*actual  chat div */}
        <div className=' pt-20 h-[750px]'></div>

        {/*Type Bar div */}
        <div className={theme==="light"?`w-[355px] rounded-xl shadow-2xl bg-gray-200 focus:outline-none outline-none h-10 flex space-x-2 items-center `:`flex items-center space-x-2 w-[355px] outline-none focus:outline-none rounded-xl shadow-2xl bg-white h-10 `}>
          <input 
            type="text" 
            placeholder='Ask TechBot'
            className={theme==="dark" 
              ? 'rounded-xl h-full px-3 w-[300px] border-r-0 outline-none focus:outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus:border-transparent text-black placeholder:text-black' 
              : 'rounded-xl h-full px-3 w-[300px] border-r-0 outline-none focus:outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus:border-transparent'} 
          />
          <Button className={`p-2 ${theme==="light" ? "bg-white  border-1 rounded-md" : "border-gray-600 border-1 hover:bg-[#2A2A2A] py-2 px-2 rounded-md bg-[#242424]"}`} IconColor='black' Icon={Send}/>
        </div>

      </div>
    </>
  )
}
