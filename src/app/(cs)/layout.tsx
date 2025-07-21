import React from "react";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
export default async function CSLayout({children,}:
    {children:React.ReactNode}){

    return (

        <>
        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header/>
         {children}
         </ThemeProvider>
         </>
    )
}