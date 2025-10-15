"use client"

import { useRegisterEmployeeMutation } from '@/redux/authFallbackApiSlice'
import { useSearchParams, useRouter } from 'next/navigation' // Use consistent imports
import React, { useEffect } from 'react'
import Loading from '@/components/Loading'
import Error from '@/components/Error'

export default function RegisterEmployeeFallback() {
    const router= useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [registerEmployee, { data, isLoading, isSuccess, isError, isUninitialized }] = useRegisterEmployeeMutation()

  useEffect(() => {
    if (token && isUninitialized) {
      registerEmployee(token)
    }
  }, [token, isUninitialized, registerEmployee])

  useEffect(() => {
    if (isSuccess && data) {
      console.log('data ', data)
      
      setTimeout(()=>{
        router.replace('/admin')
      },1500)
    }


  }, [isSuccess, data])

  return (
    <>
      {isLoading ? (
        <Loading text='Please wait!' />
      ) : isError ? (
        <Error text='Oops! the link expired please try again.'/>
      ) : isSuccess ? (
        <Loading text='Employee registered, redirecting back to Techstop!'/>
      ) : null}
    </>
  )
}