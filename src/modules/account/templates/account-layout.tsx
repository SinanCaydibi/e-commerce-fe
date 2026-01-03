import React from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 py-16 bg-gray-50/50" data-testid="account-page">
      <div className="content-container h-full max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 xl:gap-20">
          {/* Sol Navigasyon */}
          <aside className="lg:sticky lg:top-24 h-fit">
            {customer && <AccountNav customer={customer} />}
          </aside>

          {/* Sağ İçerik */}
          <main className="flex-1">
            <div className="bg-white rounded-[32px] p-8 md:p-12 border border-gray-100 shadow-sm min-h-[700px]">
              {children}
            </div>

            {/* Alt Bilgi Alanı */}
            <div className="mt-12 group">
              <div className="flex flex-col md:flex-row items-center justify-between p-10 bg-white rounded-[32px] border border-gray-100 shadow-sm gap-8 hover:shadow-md transition-all duration-300">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Sorunuz mu var?</h3>
                  <p className="text-gray-500 font-medium">
                    Müşteri hizmetleri sayfamızda sıkça sorulan soruların yanıtlarını bulabilirsiniz.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <LocalizedClientLink
                    href="/customer-service"
                    className="inline-flex items-center justify-center px-10 py-4 bg-[#003d29] text-white rounded-full font-bold hover:bg-[#002a1c] transition-all shadow-lg shadow-green-900/10 hover:shadow-xl hover:-translate-y-1"
                  >
                    Müşteri Hizmetleri
                  </LocalizedClientLink>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
