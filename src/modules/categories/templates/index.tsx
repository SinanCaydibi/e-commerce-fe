import React, { Suspense } from "react"
import { notFound } from "next/navigation"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  return (
    <div
      className="flex flex-col py-12 content-container max-w-[1440px] mx-auto min-h-[75vh]"
      data-testid="category-container"
    >
      <div className="w-full">
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-x-2 text-sm text-gray-500 mb-4">
            <LocalizedClientLink href="/" className="hover:text-[#003d29]">Home</LocalizedClientLink>
            <span>/</span>
            {parents &&
              parents.map((parent) => (
                <React.Fragment key={parent.id}>
                  <LocalizedClientLink
                    className="hover:text-[#003d29]"
                    href={`/categories/${parent.handle}`}
                  >
                    {parent.name}
                  </LocalizedClientLink>
                  <span>/</span>
                </React.Fragment>
              ))}
            <span className="text-[#003d29] font-medium">{category.name}</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="category-page-title">
            {category.name}
          </h1>

          {category.description && (
            <p className="text-gray-600 max-w-2xl">
              {category.description}
            </p>
          )}
        </div>

        {category.category_children && category.category_children.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold mb-4">Subcategories</h2>
            <div className="flex flex-wrap gap-3">
              {category.category_children?.map((c) => (
                <LocalizedClientLink
                  key={c.id}
                  href={`/categories/${c.handle}`}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-[#003d29] hover:text-white transition-colors"
                >
                  {c.name}
                </LocalizedClientLink>
              ))}
            </div>
          </div>
        )}

        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
