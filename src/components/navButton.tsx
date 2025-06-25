
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type props={
    title:string,
    icon:LucideIcon,
    href?: string,
    theme:string|undefined;
}

export default function navButton({
    title,
    icon:Icon,
    href,
    theme
}:props){

  return (
    <button >
      {href?(<Link href={href}>
        <Icon size={35} className={`${theme==="light" ? "hover:bg-gray-100 border-1 rounded-md  p-2":" border-gray-600 border-1 hover:bg-gray-900 rounded-md  p-2"}`}/>
      </Link>): (<Icon size={35} className=' border-1 rounded-md p-2'/>)}
    </button>
  )
}
