import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <div className="group flex flex-col h-full bg-white transition-all duration-200">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#f5f6f6] mb-4">
        {/* Wishlist Icon */}
        <button className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-sm hover:text-red-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
        </button>

        <LocalizedClientLink href={`/products/${product.handle}`} className="w-full h-full">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="!bg-transparent !shadow-none !rounded-none hover:scale-105 transition-transform duration-300"
          />
        </LocalizedClientLink>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <LocalizedClientLink href={`/products/${product.handle}`} className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 hover:text-[#003d29]">
              {product.title}
            </h3>
          </LocalizedClientLink>
          <div className="text-lg font-bold text-gray-900 ml-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3 h-10">
          {product.description || "Organic Cotton, fairtrade certified"}
        </p>

        {/* Rating Stars */}
        <div className="flex items-center gap-x-1 mb-4">
          <div className="flex text-green-600">
            {[...Array(5)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">(121)</span>
        </div>

        <LocalizedClientLink href={`/products/${product.handle}`} className="mt-auto">
          <button className="w-fit px-6 py-2 border-2 border-gray-200 rounded-full text-sm font-bold text-gray-700 hover:bg-[#003d29] hover:text-white hover:border-[#003d29] transition-all duration-200">
            Sepete Ekle
          </button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

