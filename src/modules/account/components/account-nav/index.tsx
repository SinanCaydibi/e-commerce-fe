"use client"

import { clx } from "@medusajs/ui"
import { ArrowRightOnRectangle } from "@medusajs/icons"
import { useParams, usePathname } from "next/navigation"

import ChevronDown from "@modules/common/icons/chevron-down"
import User from "@modules/common/icons/user"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  return (
    <div>
      {/* Mobil Navigasyon */}
      <div className="lg:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-x-2 text-sm font-bold text-gray-700 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-4"
            data-testid="account-main-link"
          >
            <ChevronDown className="transform rotate-90 w-4 h-4" />
            <span>Hesabım</span>
          </LocalizedClientLink>
        ) : (
          <div className="flex flex-col gap-y-4">
            <div className="px-4 py-2">
              <h2 className="text-2xl font-bold text-gray-900">Merhaba, {customer?.first_name}</h2>
              <p className="text-gray-500 text-sm font-medium">{customer?.email}</p>
            </div>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <ul className="divide-y divide-gray-50 text-base">
                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                    data-testid="profile-link"
                  >
                    <div className="flex items-center gap-x-3">
                      <div className="bg-green-50 text-[#003d29] p-2 rounded-xl">
                        <User size={20} />
                      </div>
                      <span className="font-bold text-gray-700">Profilim</span>
                    </div>
                    <ChevronDown className="transform -rotate-90 text-gray-400" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/addresses"
                    className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                    data-testid="addresses-link"
                  >
                    <div className="flex items-center gap-x-3">
                      <div className="bg-green-50 text-[#003d29] p-2 rounded-xl">
                        <MapPin size={20} />
                      </div>
                      <span className="font-bold text-gray-700">Adres Bilgilerim</span>
                    </div>
                    <ChevronDown className="transform -rotate-90 text-gray-400" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-3">
                      <div className="bg-green-50 text-[#003d29] p-2 rounded-xl">
                        <Package size={20} />
                      </div>
                      <span className="font-bold text-gray-700">Siparişlerim</span>
                    </div>
                    <ChevronDown className="transform -rotate-90 text-gray-400" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors w-full text-left"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-3">
                      <div className="bg-red-50 text-red-500 p-2 rounded-xl">
                        <ArrowRightOnRectangle className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-gray-700">Çıkış Yap</span>
                    </div>
                    <ChevronDown className="transform -rotate-90 text-gray-400" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Masaüstü Navigasyon */}
      <div className="hidden lg:block bg-white rounded-[32px] p-2 border border-gray-100 shadow-sm overflow-hidden" data-testid="account-nav">
        <div className="flex flex-col">
          <div className="p-6 pb-2">
            <h2 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em] mb-4">Hesabım</h2>
            <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-x-3 mb-6">
              <div className="w-10 h-10 bg-[#003d29] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                {customer?.first_name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-gray-900 truncate">
                  {customer?.first_name} {customer?.last_name}
                </span>
                <span className="text-[10px] font-bold text-gray-400 truncate">
                  Üyesiniz
                </span>
              </div>
            </div>
          </div>

          <nav className="p-2 pt-0">
            <ul className="flex flex-col gap-y-1">
              <li>
                <AccountNavLink
                  href="/account"
                  route={route!}
                  data-testid="overview-link"
                >
                  <div className="flex items-center gap-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#003d29]/10 flex items-center justify-center">
                      <ChevronDown className="-rotate-90 w-4 h-4" />
                    </div>
                    <span>Genel Bakış</span>
                  </div>
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/profile"
                  route={route!}
                  data-testid="profile-link"
                >
                  <div className="flex items-center gap-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <span>Profil Bilgilerim</span>
                  </div>
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/addresses"
                  route={route!}
                  data-testid="addresses-link"
                >
                  <div className="flex items-center gap-x-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                      <MapPin size={16} />
                    </div>
                    <span>Adres Defteri</span>
                  </div>
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/orders"
                  route={route!}
                  data-testid="orders-link"
                >
                  <div className="flex items-center gap-x-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Package size={16} />
                    </div>
                    <span>Siparişlerim</span>
                  </div>
                </AccountNavLink>
              </li>
              <li className="px-2 pt-4 mt-4 border-t border-gray-50">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-x-3 px-4 py-4 rounded-2xl text-red-500 font-bold hover:bg-red-50 transition-all text-sm group"
                  data-testid="logout-button"
                >
                  <div className="p-2 bg-red-100 text-red-600 rounded-xl group-hover:scale-110 transition-transform">
                    <ArrowRightOnRectangle className="w-4 h-4" />
                  </div>
                  Çıkış Yap
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({
  href,
  route,
  children,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()

  const active = route.split(countryCode)[1] === href
  return (
    <LocalizedClientLink
      href={href}
      className={clx(
        "group flex items-center px-4 py-3 rounded-2xl transition-all duration-300 text-sm font-bold",
        {
          "bg-white shadow-md shadow-gray-200/50 text-[#003d29] ring-1 ring-gray-100": active,
          "text-gray-400 hover:text-gray-900 hover:bg-gray-50": !active,
        }
      )}
      data-testid={dataTestId}
    >
      <div className="w-full flex items-center justify-between">
        {children}
        {active && (
          <div className="w-1.5 h-1.5 rounded-full bg-[#003d29]"></div>
        )}
      </div>
    </LocalizedClientLink>
  )
}

export default AccountNav
