import React from "react";
import Header from "@/components/header";
import LayoutWrapper from "@/components/layout-wrapper";

export default async function CSLayout({ children }:
    { children: React.ReactNode }) {

    return (
        <>
            {/* <RequireAuth>
            <RequireRoles> */}
            <LayoutWrapper>
                <Header />
                {children}
            </LayoutWrapper>
            {/* </RequireRoles>
            </RequireAuth> */}
        </>
    )
}