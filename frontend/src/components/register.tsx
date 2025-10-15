"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Space_Grotesk } from 'next/font/google'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import DarkModeLogo from 'public/logoDark.png'
import whiteModeLogo from 'public/logo White.png'
import Image from 'next/image'
import {useSendEmployeeRegisterMailMutation,useSendCustomerRegisterMailMutation} from '@/redux/authApiSlice'
import EmailSent from '@/components/emailSent'
import RequestFailedError from '@/components/requestFailedError'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import Loading from '@/components/Loading'
import { usePathname, useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { rootState } from './store'


const font = Space_Grotesk({
  weight: "400",
  subsets: ["latin"]
})



export default function Register() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [emailState, setEmailState] = useState<string>()
  const [Mailerror, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [sendEmployeeRegisterMail,{data:employeedata,isLoading:employeeLoading,isError:employeeIsError,error:employeeError,reset:resetEmloyee}]=useSendEmployeeRegisterMailMutation()  
  const [sendCustomerRegisterMail,{data,isLoading,isError,error,reset}]=useSendCustomerRegisterMailMutation()  

  useEffect(() => {
    setMounted(true)
  }, [])

  const adminName= useSelector<rootState>((state)=>state.auth.name) as string
  const adminEmail= useSelector<rootState>((state)=>state.auth.email) as string


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

  const [userAlreadyError,setUserAlreadyError]=useState(false)
  const [isOtherError,setIsOtherError]=useState(false)
  const [otherError,setOtherError]=useState<unknown>()
  type data={
    message:string
  }
  useEffect(()=>{

    if(isError && error as FetchBaseQueryError){
      console.log(error)
        if((error as FetchBaseQueryError).status==409){
          setUserAlreadyError(true)
        }
        if('error' in error){
          console.log(typeof error)
          setIsOtherError(true)
          setOtherError(error.error)
        }
    }
  },[error,isError])

  if (!mounted) return null // or show a loader

  const path= usePathname()
  const managerRegistration=path.startsWith('/admin')
  const customerRegistration=path.startsWith('/register')
  

  return (
    employeeLoading ? (
        
      <Loading text='Please wait, while we check availability.' />
    ) : isLoading? (
        
        <Loading text='Please wait, while we send you confirmation mail.' />
      ): employeeIsError && userAlreadyError ? (
      <RequestFailedError 
        text={`Oops! this email is already registered as a manager.`}
        onClose={() => { setUserAlreadyError(false); reset(); }} 
      />
    ) :   employeeIsError && isOtherError ? (
      <RequestFailedError 
        text={otherError as string}
        onClose={() => { setIsOtherError(false); setOtherError(undefined); reset(); }} 
      />
    
    ): isError && isOtherError ? (
        <RequestFailedError 
          text={otherError as string}
          onClose={() => { setIsOtherError(false); setOtherError(undefined); reset(); }} 
        />
      
      ): employeedata? (
      <EmailSent registerManager/>
    ): data? (
        <EmailSent register/>
      ) :managerRegistration?(
      <main className="flex justify-center items-center min-h-screen">
        <div className={`pt-10 pb-20 flex flex-col justify-center items-center w-md rounded-2xl border-2 shadow-2xl ${theme === "dark" ? " text-white" : ""}`}>
          {theme === 'dark' ? <Image src={DarkModeLogo} alt='Tech Stop' height='100' width='100'></Image> : <Image src={whiteModeLogo} alt='Tech Stop' height='100' width='100'></Image>}
          <h1 className={`${font.className} font-bold text-2xl pt-8`}>{`Employee Registration`}</h1>
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
                onClick={() =>  sendEmployeeRegisterMail({email:emailState,adminEmail:adminEmail,adminName:adminName,roles:{
                    admin:false,
                    manager:true,
                    customer:false
                }})} 
                className={`${font.className} border-1 border-black mt-7 w-xs h-12 text-md bg-white text-black hover:bg-gray-300`}
              >
                Continue
              </Button>
            ) : (
              <Button 
              onClick={() =>  sendEmployeeRegisterMail({email:emailState,adminEmail,adminName,roles:{
                admin:false,
                manager:true,
                customer:false
            }})} 
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
    ):(
        <main className="flex justify-center items-center min-h-screen">
          <div className={`pt-10 pb-20 flex flex-col justify-center items-center w-md rounded-2xl border-2 shadow-2xl ${theme === "dark" ? " text-white" : ""}`}>
            {theme === 'dark' ? <Image src={DarkModeLogo} alt='Tech Stop' height='100' width='100'></Image> : <Image src={whiteModeLogo} alt='Tech Stop' height='100' width='100'></Image>}
            <h1 className={`${font.className} font-bold text-2xl pt-8`}>{`Hello There!`}</h1>
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
                  onClick={() =>  sendCustomerRegisterMail({email:emailState,roles:{
                      admin:false,
                      manager:false,
                      customer:true
                  }})} 
                  className={`${font.className} border-1 border-black mt-7 w-xs h-12 text-md bg-white text-black hover:bg-gray-300`}
                >
                  Continue
                </Button>
              ) : (
                <Button 
                onClick={() =>  sendCustomerRegisterMail({email:emailState,roles:{
                  admin:false,
                  manager:false,
                  customer:true
              }})} 
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
