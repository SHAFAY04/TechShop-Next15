import React from "react";
import Header from "@/components/header";
import RequireAuth from "@/components/requireAuth";
import RequireRoles from "@/components/requireRoles";
export default async function CSLayout({children}:
    {children:React.ReactNode}){

    return (

        <>
           
            <Header/>
            {children}
         </>
    )
}