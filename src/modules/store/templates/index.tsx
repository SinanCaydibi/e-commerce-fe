import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-6"
      data-testid="category-container"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Page Header */}
        <div className="mb-12 border-b border-gray-100 pb-8">
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center gap-x-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <LocalizedClientLink href="/" className="hover:text-[#003d29] transition-colors">Anasayfa</LocalizedClientLink>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900">Mağaza</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="flex flex-col gap-y-1">
                <h1
                  className="text-3xl font-black text-gray-900"
                  data-testid="store-page-title"
                >
                  Tüm <span className="text-[#003d29]">Ürünler</span>
                </h1>
                <p className="text-sm font-medium text-gray-500">
                  Shopcart kalitesiyle seçilmiş ürün koleksiyonumuzu keşfedin.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
