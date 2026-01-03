import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-[#fcfcfc] relative min-h-screen">
      <div className="h-20 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <nav className="flex h-full items-center content-container justify-between max-w-[1440px] mx-auto px-6">
          <LocalizedClientLink
            href="/cart"
            className="flex items-center gap-x-2 text-gray-500 hover:text-[#003d29] transition-colors group flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
              <ChevronDown className="rotate-90 text-gray-400 group-hover:text-[#003d29]" size={16} />
            </div>
            <span className="text-sm font-bold hidden small:block">
              Sepete Dön
            </span>
            <span className="text-sm font-bold block small:hidden">
              Geri
            </span>
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/"
            className="flex items-center gap-x-2 text-2xl font-extrabold tracking-tight text-[#003d29] uppercase"
            data-testid="store-link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
            <span className="hidden small:block">Shopcart</span>
          </LocalizedClientLink>

          <div className="flex-1 basis-0 flex justify-end">
            <div className="flex items-center gap-x-2 text-gray-400 text-xs font-bold uppercase transition-all">
              <span className="hidden md:block">Güvenli Ödeme</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>
          </div>
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
    </div>
  )
}
