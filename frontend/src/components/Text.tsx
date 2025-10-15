import { Space_Grotesk } from 'next/font/google'
import React from 'react'
import AppFont from './Appfont'

export default function Text({ text,textWidth }: { text: string,textWidth?:string }) {
  return <p className={`${AppFont.className} text-lg text-[var(--color-foreground)] `}>{text}</p>
}
