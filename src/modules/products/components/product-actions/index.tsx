"use client"

import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button, clx } from "@medusajs/ui"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import ProductPrice from "../product-price"
import { useRouter } from "next/navigation"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [isBuying, setIsBuying] = useState(false)

  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }
    if (selectedVariant?.allow_backorder) {
      return true
    }
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }
    return false
  }, [selectedVariant])

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity,
      countryCode,
    })

    setIsAdding(false)
  }

  const handleBuyNow = async () => {
    if (!selectedVariant?.id) return null
    setIsBuying(true)
    await addToCart({
      variantId: selectedVariant.id,
      quantity,
      countryCode,
    })
    router.push("/cart")
  }

  return (
    <div className="flex flex-col gap-y-8">
      {/* Product Title & Info */}
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
        <p className="text-gray-600 leading-relaxed max-w-lg">
          {product.description || "A perfect balance of exhilarating high-fidelity audio and the effortless magic of Airpods."}
        </p>

        {/* Rating Display */}
        <div className="flex items-center gap-x-1 mt-2">
          <div className="flex text-green-600">
            {[...Array(5)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
            ))}
          </div>
          <span className="text-sm text-gray-500 font-medium">(121)</span>
        </div>
      </div>

      <div className="h-px bg-gray-200 w-full" />

      {/* Pricing */}
      <div className="flex flex-col gap-y-1">
        <div className="text-3xl font-bold text-gray-900 flex items-baseline gap-x-2">
          <ProductPrice product={product} variant={selectedVariant} />
          <span className="text-lg font-medium text-gray-400 font-normal">veya 99.99/ay</span>
        </div>
        <p className="text-sm text-gray-500 font-medium font-normal">6 ay taksit imkanıyla seçili ödeme yöntemleri</p>
      </div>

      <div className="h-px bg-gray-200 w-full" />

      {/* Options */}
      <div>
        {(product.variants?.length ?? 0) > 1 && (
          <div className="flex flex-col gap-y-6">
            {(product.options || []).map((option) => (
              <div key={option.id}>
                <OptionSelect
                  option={option}
                  current={options[option.id]}
                  updateOption={setOptionValue}
                  title={option.title ?? ""}
                  data-testid="product-options"
                  disabled={!!disabled || isAdding}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-px bg-gray-200 w-full" />

      {/* Quantity & Stock */}
      <div className="flex items-center gap-x-8">
        <div className="flex items-center bg-[#f6f6f6] rounded-full px-4 py-2 border border-gray-100">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-gray-500 hover:text-black transition-colors p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M5 12h14" /></svg>
          </button>
          <span className="w-12 text-center text-lg font-bold text-[#003d29]">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="text-gray-500 hover:text-black transition-colors p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M5 12h14m7 0v7m0-14v7" /></svg>
          </button>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold text-gray-700">
            {selectedVariant?.manage_inventory ? (
              <>Sadece <span className="text-orange-500">{selectedVariant.inventory_quantity || 0} Adet</span> Kaldı!</>
            ) : (
              <>Stokta Var</>
            )}
          </p>
          <p className="text-xs text-gray-500 font-medium font-normal">Bu fırsatı kaçırmayın</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-x-4">
        <button
          onClick={handleBuyNow}
          disabled={!inStock || !selectedVariant || !!disabled || isBuying || !isValidVariant}
          className="flex-1 bg-[#003d29] text-white py-4 rounded-full font-bold hover:bg-[#002a1c] transition-colors disabled:opacity-50"
        >
          {isBuying ? "İşleniyor..." : "Hemen Al"}
        </button>
        <button
          onClick={handleAddToCart}
          disabled={!inStock || !selectedVariant || !!disabled || isAdding || !isValidVariant}
          className="flex-1 border-2 border-[#003d29] text-[#003d29] py-4 rounded-full font-bold hover:bg-[#003d29] hover:text-white transition-all disabled:opacity-50"
        >
          {isAdding ? "Ekleniyor..." : "Sepete Ekle"}
        </button>
      </div>

      {/* Trust Items */}
      <div className="border border-gray-200 rounded-3xl overflow-hidden">
        <div className="p-6 flex items-start gap-x-4 border-b border-gray-200">
          <div className="bg-orange-50 text-orange-500 p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>
          </div>
          <div>
            <p className="font-bold text-gray-900">Ücretsiz Teslimat</p>
            <button className="text-sm text-gray-600 underline font-medium hover:text-black">Posta kodunuzu girerek teslimat uygunluğunu kontrol edin</button>
          </div>
        </div>
        <div className="p-6 flex items-start gap-x-4">
          <div className="bg-orange-50 text-orange-500 p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 10H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10" /><path d="M21 17V7a2 2 0 0 0-2-2H9" /><path d="m15 13-3-3 3-3" /></svg>
          </div>
          <div>
            <p className="font-bold text-gray-900">Kolay İade</p>
            <p className="text-sm text-gray-600 font-medium">30 gün içinde ücretsiz iade imkanı. <button className="underline hover:text-black">Detaylar</button></p>
          </div>
        </div>
      </div>
    </div>
  )
}
