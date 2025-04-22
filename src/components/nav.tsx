import React from 'react'
import NavButton from './navButton'
import { HomeIcon, User } from 'lucide-react'

export default function nav() {
  return (
    <div className='flex space-x-10 '>

      <NavButton href='/home' title='HOME' icon={HomeIcon}/>
      <NavButton href='/user' title='USER' icon={User}/>
    </div>
  )
}
