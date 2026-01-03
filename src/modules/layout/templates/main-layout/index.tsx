"use client"

import { MainLayoutProvider } from "@lib/context/main-layout-context"
import React from "react"

interface MainLayoutProps {
    children: React.ReactNode
    sidebar: React.ReactNode
    nav: React.ReactNode
    footer: React.ReactNode
}

// Bu bileşen uygulamanın ana iskeletini oluşturur
export default function MainLayout({ children, sidebar, nav, footer }: MainLayoutProps) {
    return (
        <MainLayoutProvider>
            <div className="flex flex-col min-h-screen">
                {nav}

                {sidebar}

                <main className="flex-1 w-full max-w-[1440px] mx-auto">
                    {children}
                </main>

                {footer}
            </div>
        </MainLayoutProvider>
    )
}
