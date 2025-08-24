import React from "react";
import Header from "@/components/header";
import RequireAuth from "@/components/requireAuth";
export default async function CSLayout({children}:
    {children:React.ReactNode}){

    return (

        <>
            <RequireAuth>
            <Header/>
            {children}
            </RequireAuth>
         </>
    )
}