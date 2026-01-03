"use client"

import { useMainLayout } from "@lib/context/main-layout-context"

const MenuTrigger = () => {
    const { toggleSidebar } = useMainLayout()

    return (
        <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors duration-200 group"
            aria-label="Toggle menu"
        >
            <svg
                className="w-6 h-6 text-zinc-700 block group-hover:scale-110 transition-transform"
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
    )
}

export default MenuTrigger
