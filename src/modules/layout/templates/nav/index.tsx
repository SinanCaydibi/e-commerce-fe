import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { retrieveCustomer } from "@lib/data/customer"
import { listCategories } from "@lib/data/categories"
import { StoreRegion, HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import AccountDropdown from "@modules/layout/components/account-dropdown"
import MenuTrigger from "@modules/layout/components/menu-trigger"

export default async function Nav() {
  const [regions, locales, currentLocale, customer, categories] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    retrieveCustomer(),
    listCategories(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group bg-white">
      <header className="relative h-20 mx-auto duration-200 border-b border-gray-200 bg-white">
        <nav className="content-container flex items-center justify-between w-full h-full text-sm font-medium max-w-[1440px] mx-auto px-6">

          {/* Logo Section */}
          <div className="flex items-center gap-x-2">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-x-2 text-2xl font-bold tracking-tight text-[#003d29]"
              data-testid="nav-store-link"
            >
              {/* Shopping Cart Icon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#003d29]"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
              Shopcart
            </LocalizedClientLink>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex flex-1 items-center justify-start ml-12 gap-x-8">
            <div className="flex items-center gap-x-6 text-gray-700">
              {/* Category Dropdown */}
              <div className="relative group/category">
                <div className="flex items-center gap-x-1.5 cursor-pointer text-gray-700 hover:text-[#003d29] py-4 font-bold transition-all duration-300">
                  <span>Kategoriler</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3 transition-transform duration-300 group-hover/category:rotate-180"><path d="m6 9 6 6 6-6" /></svg>
                </div>
                {/* Dropdown Menu */}
                <div className="absolute top-[calc(100%-10px)] left-0 invisible opacity-0 translate-y-2 group-hover/category:visible group-hover/category:opacity-100 group-hover/category:translate-y-0 transition-all duration-300 bg-white shadow-[0_20px_40px_rgba(0,61,41,0.12)] border border-gray-50 rounded-[20px] min-w-[240px] z-50 py-3 overflow-hidden">
                  <div className="px-4 pb-2 mb-2 border-b border-gray-50">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Koleksiyonlar</span>
                  </div>
                  <div className="px-2 space-y-1">
                    {categories?.map((cat: HttpTypes.StoreProductCategory) => {
                      // Standardize name (Capitalize first letter)
                      const standardizedName = cat.name.charAt(0).toUpperCase() + cat.name.slice(1)

                      // Icon logic based on common handles or keywords
                      const getIcon = (handle: string) => {
                        const h = handle.toLowerCase()
                        if (h.includes("gozluk") || h.includes("sunglass") || h.includes("goz")) return <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4"><path d="M22 12s-4-4.5-10-4.5S2 12 2 12s4 4.5 10 4.5 10-4.5 10-4.5zM12 15a3 3 0 110-6 3 3 0 010 6z" /></svg>
                        if (h.includes("shirt") || h.includes("gomlek") || h.includes("ust")) return <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4"><path d="M11 4.5a2.5 2.5 0 00-5 0v3.25a.25.25 0 01-.154.23l-3.5 1.4A.25.25 0 002.25 9.61v11.14a.25.25 0 00.342.232l18.5-6.938a.25.25 0 00.158-.232V3a1 1 0 00-1-1h-6.25a1 1 0 00-1 1v1.5z" /></svg>
                        if (h.includes("pant") || h.includes("alt") || h.includes("jean")) return <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4"><path d="M19 4v16a1 1 0 01-1 1h-3a1 1 0 01-1-1V9l-1-1-1 1v11a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1z" /></svg>
                        if (h.includes("bag") || h.includes("canta") || h.includes("aksesuar")) return <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        return <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      }

                      return (
                        <LocalizedClientLink
                          key={cat.id}
                          href={`/categories/${cat.handle}`}
                          className="flex items-center gap-x-3 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:text-[#003d29] hover:bg-green-50 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#003d29] group-hover:text-white transition-all duration-300">
                            {getIcon(cat.handle)}
                          </div>
                          <span>{standardizedName}</span>
                        </LocalizedClientLink>
                      )
                    })}
                  </div>

                  {/* View All Categoriy Link */}
                  <div className="mt-2 px-2 pt-2 border-t border-gray-50">
                    <LocalizedClientLink
                      href="/store"
                      className="flex items-center justify-center gap-x-2 px-4 py-3 rounded-xl text-xs font-black text-[#003d29] hover:bg-green-50 transition-all duration-200 uppercase tracking-widest"
                    >
                      Tümünü Gör
                      <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                    </LocalizedClientLink>
                  </div>

                  {(!categories || categories.length === 0) && (
                    <div className="px-6 py-4 text-gray-400 text-xs text-center italic">Kategori bulunamadı</div>
                  )}
                </div>
              </div>

              <LocalizedClientLink href="/deals" className="hover:text-[#003d29] transition-colors">Fırsatlar</LocalizedClientLink>
              <LocalizedClientLink href="/new" className="hover:text-[#003d29] transition-colors">Yeni Gelenler</LocalizedClientLink>
            </div>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-x-6 ml-8 text-gray-800">
            <div className="flex items-center gap-x-2">
              <div className="hidden sm:flex items-center gap-x-2">
                <AccountDropdown customer={customer} />
              </div>
            </div>

            <div className="flex items-center gap-x-2 hover:text-[#003d29]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base"
                    href="/cart"
                  >
                    Sepet (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>

            {/* Mobile Menu */}
            <div className="flex lg:hidden items-center ml-2">
              <MenuTrigger />
            </div>
          </div>

        </nav>
      </header>
    </div>
  )
}
