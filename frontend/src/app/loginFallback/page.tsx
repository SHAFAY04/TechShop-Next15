import { useGetUserQuery } from '@/redux/authFallbackApiSlice'
import { useSearchParams, useRouter } from 'next/navigation' // Use consistent imports
import React, { useEffect } from 'react'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import { useDispatch } from 'react-redux'
import { storeDispatch } from '@/components/store'
import { setUserState } from '@/redux/authSlice'

export default function LoginFallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const redirect = searchParams.get('redirect') || '/home' // default fallback

  const { data, isLoading, isSuccess, isError } = useGetUserQuery(token as string)
  const dispatch = useDispatch<storeDispatch>()

  // Handle setting user data
  useEffect(() => {
    if (data) {
      console.log(data)
      dispatch(setUserState({ ...data }))
    }
  }, [data])

  // Handle redirect after successful login
  useEffect(() => {
    if (isSuccess && data) {
      const timer = setTimeout(() => {
        router.replace(redirect)
      }, 1000)
      
      return () => clearTimeout(timer) 
    }
  }, [isSuccess, data])

  return (
    <>
      {isLoading ? (
        <Loading text='Please wait while we redirect you to the Techstop!' />
      ) : isError ? (
        <Error text='Oops! the link expired please try logging in again'/>
      ) : isSuccess ? (
        <Loading text='Please wait while we redirect you to the Techstop!'/>
      ) : null}
    </>
  )
}