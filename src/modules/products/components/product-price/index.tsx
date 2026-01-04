import { clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center gap-x-2">
        <span
          className={clx("text-3xl font-bold text-gray-900", {
            "text-red-600": selectedPrice.price_type === "sale",
          })}
          data-testid="product-price"
        >
          {selectedPrice.calculated_price}
        </span>
        {selectedPrice.price_type === "sale" && (
          <span
            className="text-lg text-gray-400 line-through"
            data-testid="original-product-price"
          >
            {selectedPrice.original_price}
          </span>
        )}
      </div>
      {selectedPrice.price_type === "sale" && (
        <span className="text-sm font-bold text-red-600 bg-red-50 w-fit px-2 py-0.5 rounded-lg">
          %{selectedPrice.percentage_diff} İndirim
        </span>
      )}
    </div>
  )
}
