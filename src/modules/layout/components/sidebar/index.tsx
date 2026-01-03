"use client"

import { useMainLayout } from "@lib/context/main-layout-context"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { useParams, usePathname } from "next/navigation"
import { useEffect } from "react"

interface SidebarProps {
    product_categories: HttpTypes.StoreProductCategory[]
}

const categoryIcons: Record<string, React.ReactNode> = {
    "store": (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
    ),
    "gozluk": (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5"><path d="M22 12s-4-4.5-10-4.5S2 12 2 12s4 4.5 10 4.5 10-4.5 10-4.5zM12 15a3 3 0 110-6 3 3 0 010 6z" /></svg>
    ),
    "shirts": (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5"><path d="M11 4.5a2.5 2.5 0 00-5 0v3.25a.25.25 0 01-.154.23l-3.5 1.4A.25.25 0 002.25 9.61v11.14a.25.25 0 00.342.232l18.5-6.938a.25.25 0 00.158-.232V3a1 1 0 00-1-1h-6.25a1 1 0 00-1 1v1.5z" /></svg>
    ),
    "pants": (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19 4v16a1 1 0 01-1 1h-3a1 1 0 01-1-1V9l-1-1-1 1v11a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1z" /></svg>
    ),
    "bag": (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
    ),
    "default": (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
    )
}

const Sidebar = ({ product_categories }: SidebarProps) => {
    const { isSidebarOpen, closeSidebar } = useMainLayout()
    const pathname = usePathname()

    useEffect(() => {
        closeSidebar()
    }, [pathname])

    const getStandardizedName = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const getIcon = (handle: string) => {
        const h = handle.toLowerCase()
        if (h.includes("gozluk") || h.includes("sunglasses")) return categoryIcons["gozluk"]
        if (h.includes("shirt")) return categoryIcons["shirts"]
        if (h.includes("pant")) return categoryIcons["pants"]
        if (h.includes("canta") || h.includes("bag")) return categoryIcons["bag"]
        return categoryIcons["default"]
    }

    return (
        <>
            <div
                className={`fixed inset-0 bg-[#003d29]/20 backdrop-blur-md z-[60] transition-opacity duration-500 ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={closeSidebar}
            />

            <aside
                className={`fixed top-0 left-0 h-full w-[320px] bg-white z-[70] transform transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[20px_0_60px_rgba(0,61,41,0.08)] ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Sidebar Header */}
                <div className="h-24 flex items-center justify-between px-8 border-b border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">Navigasyon</span>
                        <span className="font-black text-2xl text-[#003d29] tracking-tighter italic">MENÜ</span>
                    </div>
                    <button
                        onClick={closeSidebar}
                        className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-[#003d29] hover:text-white rounded-xl transition-all duration-300 shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Sidebar Content */}
                <div className="flex flex-col h-[calc(100vh-96px)] overflow-y-auto px-4 py-8 custom-scrollbar">
                    <div className="mb-10">
                        <h3 className="px-5 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-6 flex items-center gap-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#003d29]"></span>
                            Kategoriler
                        </h3>
                        <nav className="flex flex-col gap-y-2">
                            <LocalizedClientLink
                                href="/store"
                                className={`group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${pathname === "/store"
                                    ? "bg-[#003d29] text-white shadow-lg shadow-green-900/20"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-[#003d29]"
                                    }`}
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={`p-2 rounded-xl bg-current opacity-10 group-hover:opacity-100 transition-opacity`}>
                                        {categoryIcons["store"]}
                                    </div>
                                    <span className="font-bold text-sm tracking-tight">Tüm Ürünler</span>
                                </div>
                                {pathname === "/store" && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                            </LocalizedClientLink>

                            {product_categories?.map((category) => {
                                const active = pathname.includes(category.handle)
                                return (
                                    <LocalizedClientLink
                                        key={category.id}
                                        href={`/categories/${category.handle}`}
                                        className={`group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${active
                                            ? "bg-[#003d29] text-white shadow-lg shadow-green-900/20"
                                            : "text-gray-500 hover:bg-gray-50 hover:text-[#003d29]"
                                            }`}
                                    >
                                        <div className="flex items-center gap-x-4">
                                            <div className={`p-2 rounded-xl transition-all duration-300 ${active ? "bg-white/10 text-white" : "bg-gray-100 text-gray-400 group-hover:bg-[#003d29]/10 group-hover:text-[#003d29]"}`}>
                                                {getIcon(category.handle)}
                                            </div>
                                            <span className="font-bold text-sm tracking-tight">{getStandardizedName(category.name)}</span>
                                        </div>
                                        {active && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>}
                                    </LocalizedClientLink>
                                )
                            })}
                        </nav>
                    </div>

                    <div className="mt-auto px-5 pt-10 border-t border-gray-50">
                        <div className="flex flex-col gap-y-6">
                            <div className="flex flex-col gap-y-3">
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">Hızlı Erişim</span>
                                <div className="grid grid-cols-2 gap-3">
                                    <LocalizedClientLink href="/account" className="flex items-center justify-center p-4 bg-gray-50 rounded-2xl hover:bg-[#003d29] hover:text-white text-gray-600 transition-all duration-300 font-bold text-xs">
                                        Hesabım
                                    </LocalizedClientLink>
                                    <LocalizedClientLink href="/cart" className="flex items-center justify-center p-4 bg-gray-50 rounded-2xl hover:bg-[#003d29] hover:text-white text-gray-600 transition-all duration-300 font-bold text-xs">
                                        Sepetim
                                    </LocalizedClientLink>
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <span className="text-[9px] font-bold text-gray-300 leading-relaxed uppercase tracking-widest text-center">
                                    © {new Date().getFullYear()} Shopcart Global. Tüm Hakları Saklıdır.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
