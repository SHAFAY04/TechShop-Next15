"use client"
import React, { useEffect, useState } from 'react'
import { Space_Grotesk } from 'next/font/google'
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

const font = Space_Grotesk({
  weight: "400",
  subsets: ["latin"]
})

export default function Login() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // or show a loader

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className={`pt-20 pb-20 flex flex-col justify-center items-center w-sm p-10 rounded-2xl border-2 shadow-2xl ${theme === "dark" ? "bg-white text-black" : ""}`}>
        <h1 className={`${font.className} text-3xl`}>Repair Shop</h1>
        <Button className="mt-7 w-56 bg-black text-white hover:bg-neutral-900" asChild>
          <LoginLink>Sign in</LoginLink>
        </Button>
      </div>
    </main>
  )
}
