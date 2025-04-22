import React from "react";
import Header from "@/components/header";
export default async function CSLayout({children,}:
    {children:React.ReactNode}){

    return (

        <>
            <Header/>
         {children}
         </>
    )
}