import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type props={
    title:string,
    icon:LucideIcon,
    href?: string
}

export default function navButton({
    title,
    icon:Icon,
    href
}:props){

  return (
    <button >
      {href?(<Link href={href}>
        <Icon size={35} className='hover:bg-gray-200 hover:rounded-xl p-1'/>
      </Link>): (<Icon size={35} className='hover:bg-gray-200 hover:rounded-xl p-1'/>)}
    </button>
  )
}
