'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { rootState } from './store'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import Loading from './Loading'

export default function requireAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


    const router= useRouter()

    const authenticated= useSelector((state:rootState)=>state.auth.name)
    const pathname=usePathname()


    useEffect(()=>{

      if(!authenticated){
        router.push(`/login?redirect=${pathname}`)
  
      }
  
    },[authenticated])

  if(authenticated){
    return <>
    {children}
    </>

  }
  
  return <Loading text={'Please wait while we redirect you to the authentication page!'}/>
   
  
    
    
}
