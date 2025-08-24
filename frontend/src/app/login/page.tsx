"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Space_Grotesk } from 'next/font/google'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import DarkModeLogo from 'public/logoDark.png'
import whiteModeLogo from 'public/logo White.png'
import Image from 'next/image'
import {useSendAuthMailMutation} from '@/redux/authApiSlice'
import EmailSentComponent from '@/components/emailSent'
import RequestFailedError from '@/components/requestFailedError'
import { useLocation } from 'react-router-dom'
import { useRouter,useSearchParams } from 'next/navigation'

const font = Space_Grotesk({
  weight: "400",
  subsets: ["latin"]
})



export default function Login() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [emailState, setEmailState] = useState<string>()
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [clicked,setClicked]=useState(false)
  const [EmailSent,setEmailSent]=useState(false)
  const [sendAuthMail,{data,isLoading,isError}]=useSendAuthMailMutation()
  
  const searchParams = useSearchParams()
  
  // Get the redirect destination from URL params or default to /home
  const from = searchParams.get('redirect') || '/home'

  useEffect(() => {
    setMounted(true)
  }, [])


  useEffect(() => {

    if (emailState) {
      if (!emailState.includes('@')) {
        setError('Please include an @ in the email address!')
      }
      else {
        setError(null)
      }
    }
    else {
      setError(null)

    }
  }, [emailState])

  useEffect(()=>{
    if(clicked && emailState){
      sendAuthMail({email:emailState,destination:from})
      setEmailSent(true)
    }
  },[clicked])

  useEffect(()=>{

  },[EmailSent])

  if (!mounted) return null // or show a loader

  

  return (
    isLoading ? (
      <EmailSentComponent />
    ) : isError ? (
      <RequestFailedError />
    ) : (
      <main className="flex justify-center items-center min-h-screen">
        <div className={`pt-10 pb-20 flex flex-col justify-center items-center w-md rounded-2xl border-2 shadow-2xl ${theme === "dark" ? " text-white" : ""}`}>
          {theme === 'dark' ? <Image src={DarkModeLogo} alt='Tech Stop' height='100' width='100'></Image> : <Image src={whiteModeLogo} alt='Tech Stop' height='100' width='100'></Image>}
          <h1 className={`${font.className} font-bold text-2xl pt-8`}>Hello Friend! Welcome Back</h1>
          <label className={`${font.className} pt-8 mr-64 -ml-3 pb-2 text-lg`} htmlFor="emailBox">Email</label>
          <input 
            ref={inputRef} 
            onChange={(e) => setEmailState(e.target.value)} 
            className={`rounded-md transition-colors p-3 w-xs h-12 border-1 focus:outline-none ${
              error ? 'border-red-600' : 
              theme === 'dark' ? 'border-white' : 'border-black'
            }`}
            type="email" 
            id='emailBox' 
          />
          {!error && emailState ? (
            theme === 'dark' ? (
              <Button 
                onClick={() => setClicked(true)} 
                className={`${font.className} border-1 border-black mt-7 w-xs h-12 text-md bg-white text-black hover:bg-gray-300`}
              >
                Continue
              </Button>
            ) : (
              <Button 
                onClick={() => setClicked(true)} 
                className={`${font.className} mt-7 w-xs h-12 text-md bg-black text-white hover:bg-neutral-800`}
              >
                Continue
              </Button>
            )
          ) : (
            theme === 'dark' ? (
              <Button 
                disabled 
                className={`${font.className} border-1 border-black mt-7 w-xs h-12 text-md bg-white text-black hover:bg-gray-300`}
              >
                Continue
              </Button>
            ) : (
              <Button 
                disabled 
                className={`${font.className} mt-7 w-xs h-12 text-md bg-black text-white hover:bg-neutral-800`}
              >
                Continue
              </Button>
            )
          )}
        </div>
      </main>
    )
  );
}
