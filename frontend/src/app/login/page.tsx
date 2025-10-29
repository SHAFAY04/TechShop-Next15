"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Space_Grotesk } from 'next/font/google'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import {useSendAuthMailMutation} from '@/redux/authApiSlice'
import EmailSentComponent from '@/components/emailSent'
import RequestFailedError from '@/components/requestFailedError'
import { useRouter,useSearchParams } from 'next/navigation'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import Loading from '@/components/Loading'
import { SerializedError } from '@reduxjs/toolkit'

const font = Space_Grotesk({
  weight: "400",
  subsets: ["latin"]
})



export default function Login() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [emailState, setEmailState] = useState<string>()
  const [Mailerror, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [EmailSent,setEmailSent]=useState(false)
  const [sendAuthMail,{data,isLoading,isError,error,reset}]=useSendAuthMailMutation()
  
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

  const [userNotFoundError,setUserNotFoundError]=useState(false)
  const [isOtherError,setIsOtherError]=useState(false)
  const [otherError,setOtherError]=useState<unknown>()
  type data={
    message:string
  }
  useEffect(() => {
    if (isError) {
      console.log(error);
      const fetchError = error as FetchBaseQueryError;
  
      // Check for a numerical status code (like 404 or 504)
      if (typeof fetchError.status === 'number') {
        if (fetchError.status === 404) {
          setUserNotFoundError(true);
        } else if (fetchError.status === 504) {
          setIsOtherError(true);
          setOtherError('504 Gateway Timeout: Auth Microservice down');
        }
      }
      // Check for a string status code like 'PARSING_ERROR'
      else if (fetchError.status === 'PARSING_ERROR') {
        console.log(typeof error);
        setIsOtherError(true);
        setOtherError('Auth Microservice down');
      } else if (fetchError.status === 'FETCH_ERROR') {
        console.log(typeof error);
        setIsOtherError(true);
        setOtherError('Couldnt communicate with server');
      }else {
        // Generic error handling
        setIsOtherError(true);
        setOtherError('An unexpected error occurred.');
      }
    }
  }, [error, isError]);

  if (!mounted) return null // or show a loader
  

  return (
    isLoading ? (
      <Loading text='Please wait while we send you the confirmation email!' />
    ) : isError && userNotFoundError ? (
      <RequestFailedError 
        text={`Oops! couldn't find this email registered.`}
        onClose={() => { setUserNotFoundError(false); reset(); }} 
      />
    ) :  isError && isOtherError ? (
      <RequestFailedError 
        text={otherError as string}
        onClose={() => { setIsOtherError(false); setOtherError(undefined); reset(); }} 
      />
    
    ):data? (
      <EmailSentComponent login/>
    ):(
      <main className="flex justify-center items-center min-h-screen">
        <div className={`pt-10 pb-20 flex flex-col justify-center items-center w-md rounded-2xl border-2 shadow-2xl ${theme === "dark" ? " text-white" : ""}`}>
          {theme === 'dark' ? <img src="https://pub-d81cf4a8a26d4e8d8a83a8d23172d5e5.r2.dev/logoDark.png" height='100' width='100' alt="Tech Stop" /> :  <img src="https://pub-d81cf4a8a26d4e8d8a83a8d23172d5e5.r2.dev/logo White.png" height='100' width='100' alt="Tech Stop" /> }
          <h1 className={`${font.className} font-bold text-2xl pt-8`}>Hello Friend! Welcome Back</h1>
          <label className={`${font.className} pt-8 mr-64 -ml-3 pb-2 text-lg`} htmlFor="emailBox">Email</label>
          <input 
            ref={inputRef} 
            onChange={(e) => setEmailState(e.target.value)} 
            className={`rounded-md transition-colors p-3 w-xs h-12 border-1 focus:outline-none ${
               Mailerror ? 'border-red-600' : 
              theme === 'dark' ? 'border-white' : 'border-black'
            }`}
            type="email" 
            id='emailBox' 
          />
          {!Mailerror && emailState ? (
            theme === 'dark' ? (
              <Button 
                onClick={() => sendAuthMail({email:emailState,destination:from})} 
                className={`${font.className} border-1 border-black mt-7 w-xs h-12 text-md bg-white text-black hover:bg-gray-300`}
              >
                Continue
              </Button>
            ) : (
              <Button 
                onClick={() => sendAuthMail({email:emailState,destination:from})} 
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
