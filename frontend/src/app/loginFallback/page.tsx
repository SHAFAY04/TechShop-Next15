"use client"

import { useGetUserQuery } from '@/redux/authFallbackApiSlice'
import { useSearchParams, useRouter } from 'next/navigation' // Use consistent imports
import React, { useEffect } from 'react'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import { useDispatch, useSelector } from 'react-redux'
import { rootState, storeDispatch } from '@/components/store'
import { setUserState } from '@/redux/authSlice'

export default function LoginFallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const redirect = searchParams.get('redirect') || '/home' // default fallback

  const { data, isLoading, isSuccess, isError } = useGetUserQuery(token as string)
  const dispatch = useDispatch<storeDispatch>()

  useEffect(() => {
    if (isSuccess && data) {
      console.log('data ', data)
      dispatch(setUserState({ ...data }))   
      
      setTimeout(()=>{
        router.replace(redirect)
      },1500)
    }


  }, [isSuccess, data])

  return (
    <>
      {isLoading ? (
        <Loading text='Please wait!' />
      ) : isError ? (
        <Error text='Oops! the link expired please try logging in again'/>
      ) : isSuccess ? (
        <Loading text='redirecting you to the Techstop!'/>
      ) : null}
    </>
  )
}