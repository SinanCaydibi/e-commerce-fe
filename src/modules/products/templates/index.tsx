import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div className="content-container mx-auto py-12 max-w-[1440px]">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-x-2 text-sm text-gray-500 mb-12">
        {product.categories?.map((category, index) => (
          <React.Fragment key={category.id}>
            <LocalizedClientLink href={`/categories/${category.handle}`} className="hover:text-[#003d29]">
              {category.name}
            </LocalizedClientLink>
            <span>/</span>
          </React.Fragment>
        ))}
        <span className="text-gray-900 font-bold">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-start" data-testid="product-container">
        {/* Left Column: Image Gallery */}
        <div className="w-full">
          <ImageGallery images={images} />
        </div>

        {/* Right Column: Information & Actions */}
        <div className="w-full">
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>

      {/* Related Products Section */}
      <div
        className="my-24"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductTemplate
