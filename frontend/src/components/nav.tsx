"use client"
import React, { useEffect, useState } from 'react'
import NavButton from './navButton'
import { HomeIcon, User, LucideLogOut, MessageCircleMore } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import { useTheme } from 'next-themes'
import  Button  from './button'
import { useDispatch, useSelector } from 'react-redux'
import { rootState, storeDispatch } from './store'
import { setChatClosed,setChatOpened } from '@/redux/stateSlice'


export default function Nav() {

  const {theme}= useTheme()
  const [themeState,setThemeState]=useState<string>()
  const chatOpened=useSelector<rootState>((state)=>state.state.chatOpened)
  useEffect(()=>{

      setThemeState(theme)

  },[theme])

  const dispatch=useDispatch<storeDispatch>()

  return (
    <div className='flex space-x-4 md:space-x-10 '>

      <NavButton href='/home' title='HOME' theme={themeState} icon={HomeIcon}/>
      <Button className={`${theme==="light" ? "bg-white hover:bg-gray-200 border-1 rounded-md  p-2":" border-gray-600 border-1 hover:bg-[#2A2A2A]	 rounded-md bg-[#242424] p-2"}`} Icon={MessageCircleMore} onclick={()=>{
        chatOpened?dispatch(setChatClosed()):dispatch(setChatOpened())
        console.log(chatOpened)
      }}/>
      <ModeToggle/>
    </div>
  )
}
