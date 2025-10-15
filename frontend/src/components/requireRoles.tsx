'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { rootState } from './store'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import Loading from './Loading'
import RequestFailedError from './requestFailedError';

export default function RequireRoles({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
     const router = useRouter()
     const isAdmin= useSelector<rootState>((state)=>state.auth.roles.admin===true)
     const isManager= useSelector<rootState>((state)=>state.auth.roles.manager===true)
     const isCustomer= useSelector<rootState>((state)=>state.auth.roles.customer===true)

     function onclose(){
          //wrote this logic but still the admin will have all three roles
          //manager will have only manager 
          //customer will have only customer 
          if(isAdmin){
               router.replace('/admin')
          }
          else if(isManager){
               router.replace('/manager')
          }
          else if(isCustomer){
               router.replace('/home')
          }
     }
     const [hasAccess, setHasAccess]=useState(false)
     const isAdminPath=usePathname().startsWith('/admin')
   const isManagerPath=usePathname().startsWith('/manager')
   const isCustomerPath=usePathname().startsWith('/home')

     useEffect(()=>{

          if(isAdmin && isAdminPath){
               setHasAccess(true)
          }
          
         else if(isManager && isManagerPath){
               setHasAccess(true)
          }
          
         else if(isCustomer && isCustomerPath){
               setHasAccess(true)
          }
          

     },[isAdmin,isManager,isCustomer,isAdminPath,isManagerPath,isCustomerPath])


   if(hasAccess){
     
            return children
   }
   return <RequestFailedError text={`Stop! you dont't have access to this route. `} onClose={onclose}/>

}

