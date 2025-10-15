import React from 'react'
import { LucideProps } from 'lucide-react'
import { Icon } from 'next/dist/lib/metadata/types/metadata-types'
import Link from 'next/link'

type navButtonProps={
  text?:string,
  link?:string,
  Icon?:React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
  IconColor?:string,
  IconSize?:string,
  fill?:string,
  onclick?:()=>void,
  className?:string
}

export default function Navbutton({text,link,Icon,IconColor,IconSize,fill,onclick,className}:navButtonProps) {
  return text?<Link href={`./${link}`} className='border-2 hover:cursor-grab bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] border-[var(--color-border)] p-3 rounded-2xl'>{text}</Link>:
Icon?<button onClick={onclick} className={`${className} hover:cursor-grab bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] border-[var(--color-border)] rounded-2xl`}><Icon fill={fill} size={IconSize} color={IconColor}/></button>:null
} 