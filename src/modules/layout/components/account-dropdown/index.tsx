"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signout } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"

type AccountDropdownProps = {
    customer: HttpTypes.StoreCustomer | null
}

const AccountDropdown = ({ customer }: AccountDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { countryCode } = useParams() as { countryCode: string }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleLogout = async () => {
        await signout(countryCode)
    }

    if (!customer) {
        // Kullanıcı giriş yapmamışsa, login sayfasına yönlendir
        return (
            <LocalizedClientLink
                href="/account"
                className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#003d29] text-white hover:bg-[#002a1c] transition-all duration-300 shadow-lg shadow-green-900/10 hover:shadow-xl hover:-translate-y-0.5 group"
                data-testid="nav-account-link"
            >
                <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
                <span className="text-xs font-black uppercase tracking-widest">
                    Giriş Yap
                </span>
            </LocalizedClientLink>
        )
    }

    // Kullanıcı giriş yapmışsa, dropdown menü göster
    return (
        <div className="relative hidden sm:block" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-green-100 transition-all duration-300 group"
                data-testid="account-dropdown-button"
            >
                <div className="w-9 h-9 bg-[#003d29] rounded-full flex items-center justify-center text-white font-black text-sm shadow-inner group-hover:scale-105 transition-transform duration-300">
                    {customer.first_name?.[0]?.toUpperCase() || customer.email?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="flex flex-col items-start min-w-[60px]">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Hesabım</span>
                    <span className="text-sm font-bold text-gray-700 group-hover:text-[#003d29] transition-colors duration-200 truncate max-w-[100px]">
                        {customer.first_name || "Üye"}
                    </span>
                </div>
                <svg
                    className={`w-4 h-4 text-gray-400 group-hover:text-[#003d29] transition-all duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,61,41,0.15)] border border-gray-50 py-3 z-50 animate-fade-in-top overflow-hidden">
                    {/* User Info Section */}
                    <div className="px-6 py-4 bg-gray-50/50 mb-2 border-b border-gray-100">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Oturum Açık</span>
                        </div>
                        <p className="text-sm font-black text-gray-900 leading-tight">
                            {customer.first_name} {customer.last_name}
                        </p>
                        <p className="text-xs font-bold text-gray-400 truncate mt-1">
                            {customer.email}
                        </p>
                    </div>

                    {/* Menu Items */}
                    <div className="px-2 space-y-1">
                        <LocalizedClientLink
                            href="/account"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-gray-600 hover:text-[#003d29] hover:bg-green-50 transition-all duration-200 group"
                            data-testid="account-overview-link"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-[#003d29] group-hover:text-white transition-all duration-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </div>
                                <span>Genel Bakış</span>
                            </div>
                            <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </LocalizedClientLink>

                        <LocalizedClientLink
                            href="/account/orders"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-gray-600 hover:text-[#003d29] hover:bg-green-50 transition-all duration-200 group"
                            data-testid="account-orders-link"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-[#003d29] group-hover:text-white transition-all duration-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <span>Siparişlerim</span>
                            </div>
                            <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </LocalizedClientLink>

                        <LocalizedClientLink
                            href="/account/addresses"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-gray-600 hover:text-[#003d29] hover:bg-green-50 transition-all duration-200 group"
                            data-testid="account-addresses-link"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-[#003d29] group-hover:text-white transition-all duration-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                </div>
                                <span>Adreslerim</span>
                            </div>
                            <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </LocalizedClientLink>
                    </div>

                    {/* Logout Button Section */}
                    <div className="mt-2 px-2 pt-2 border-t border-gray-100">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 w-full group"
                            data-testid="logout-button"
                        >
                            <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </div>
                            Çıkış Yap
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AccountDropdown
