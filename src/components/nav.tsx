"use client"
import React, { useEffect, useState } from 'react'
import NavButton from './navButton'
import { HomeIcon, User, LucideLogOut } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import { useTheme } from 'next-themes'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'



export default function Nav() {

  const {theme}= useTheme()
  const [themeState,setThemeState]=useState<string>()

  useEffect(()=>{

      setThemeState(theme)

  },[theme])

  return (
    <div className='flex space-x-10 '>

      <NavButton href='/home' title='HOME' theme={themeState} icon={HomeIcon}/>
      <NavButton href='/user' title='USER' theme={themeState} icon={User}/>
      <ModeToggle/>
      <LogoutLink >{<NavButton title='LOGOUT' theme={themeState} icon={LucideLogOut}></NavButton>}</LogoutLink>
    </div>
  )
}
