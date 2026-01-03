"use client"

import React, { createContext, useContext, useState } from "react"

interface MainLayoutContextType {
    isSidebarOpen: boolean
    toggleSidebar: () => void
    closeSidebar: () => void
}

const MainLayoutContext = createContext<MainLayoutContextType | undefined>(undefined)

export const MainLayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)
    const closeSidebar = () => setIsSidebarOpen(false)

    return (
        <MainLayoutContext.Provider value={{ isSidebarOpen, toggleSidebar, closeSidebar }}>
            {children}
        </MainLayoutContext.Provider>
    )
}

export const useMainLayout = () => {
    const context = useContext(MainLayoutContext)
    if (!context) {
        throw new Error("useMainLayout must be used within a MainLayoutProvider")
    }
    return context
}
