"use client"
import React from 'react'
import NavButton from './navButton'
import { HomeIcon, User } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import { useTheme } from 'next-themes'



export default function nav() {

  const {theme}= useTheme()

  return (
    <div className='flex space-x-10 '>

      <NavButton href='/home' title='HOME' theme={theme} icon={HomeIcon}/>
      <NavButton href='/user' title='USER' theme={theme} icon={User}/>
      <ModeToggle/>
    </div>
  )
}
