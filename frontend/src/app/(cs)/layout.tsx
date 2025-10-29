import React from "react";
import Header from "@/components/header";
import LayoutWrapper from "@/components/layout-wrapper";
import RequireAuth from "@/components/requireAuth";
import RequireRoles from "@/components/requireRoles";

export default async function CSLayout({ children }:
    { children: React.ReactNode }) {

    return (
        <>
            <RequireAuth>
            <RequireRoles>
            <LayoutWrapper>
                <Header />
                {children}
            </LayoutWrapper>
            </RequireRoles>
            </RequireAuth>
        </>
    )
}