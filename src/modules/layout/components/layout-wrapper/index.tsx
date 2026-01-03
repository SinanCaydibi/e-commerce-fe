"use client"

import { useState } from "react"
import Sidebar from "@modules/layout/components/sidebar"
import { HttpTypes } from "@medusajs/types"

type LayoutWrapperProps = {
    children: React.ReactNode
    categories: HttpTypes.StoreProductCategory[]
}

const LayoutWrapper = ({ children, categories }: LayoutWrapperProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Sidebar */}
            <Sidebar
                categories={categories}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <main className="flex-1 lg:ml-0">
                {children}
            </main>

            {/* Mobile Menu Toggle Button - Floating */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-30 w-14 h-14 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full shadow-2xl shadow-violet-500/50 flex items-center justify-center hover:shadow-violet-500/70 transition-all duration-200 hover:scale-110"
                aria-label="Open menu"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
        </div>
    )
}

export default LayoutWrapper
