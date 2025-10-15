
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type props={
    title:string,
    icon:LucideIcon,
    href?: string,
    theme:string|undefined;
}

export default function NavButton({
    title,
    icon:Icon,
    href,
    theme
}:props){

  return (
    <button >
      {href?(<Link href={href}>
        <Icon size={35} className={`${theme==="light" ? "bg-white hover:bg-gray-200 border-1 rounded-md  p-2":" border-gray-600 border-1 hover:bg-[#2A2A2A]	 rounded-md bg-[#242424] p-2"}`}/>
      </Link>): (<Icon size={35} className={`${theme==="light" ? "hover:bg-gray-300 border-1 rounded-md  p-2":" border-gray-600 border-1 hover:bg-[#2A2A2A]	 rounded-md bg-[#242424] p-2"}`}/>
)}
    </button>
  )
}
