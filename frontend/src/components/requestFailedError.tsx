import { Space_Grotesk } from 'next/font/google'
import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
const font = Space_Grotesk({
    weight: "400",
    subsets: ["latin"]
  })
  
type Props = {
  text: string
  onClose?: () => void
}
export default function RequestFailedError({ text, onClose }: Props) {
  const { theme } = useTheme()

  return (
    <div className={`flex flex-col min-h-screen justify-center items-center ${theme === 'dark' ? 'text-white' : ''}`}>
      <div className={`rounded-sm shadow-2xl flex flex-col justify-center items-center p-10 ${theme === 'dark' ? '' : ''}`}>
        <FaExclamationTriangle size={50} color={theme === 'dark' ? 'white' : 'black'} />
        <p className={`${font.className} mt-6 text-center`}>{text}</p>
        {theme === 'dark' ? (
          <Button
            onClick={() => onClose ? onClose() : null}
            className={`${font.className} border-1 border-black mt-7 w-xs h-12 text-md bg-white text-black hover:bg-gray-300`}
          >
            Okay
          </Button>
        ) : (
          <Button
            onClick={() => onClose ? onClose() : null}
            className={`${font.className} mt-7 w-xs h-12 text-md bg-black text-white hover:bg-neutral-800`}
          >
            Okay
          </Button>
        )}
      </div>
    </div>
  )
}
