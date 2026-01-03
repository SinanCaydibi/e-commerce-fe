"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { addToCart } from "@lib/data/cart"
import { useParams } from "next/navigation"

type ProductCardProps = {
    product: HttpTypes.StoreProduct
    region: HttpTypes.StoreRegion
}

const ProductCard = ({ product, region }: ProductCardProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const { countryCode } = useParams()

    // Get the cheapest variant price
    const variant = product.variants?.[0]
    const calculatedPrice = variant?.calculated_price
    const price = typeof calculatedPrice === 'object' && calculatedPrice ? calculatedPrice.calculated_amount : null
    const originalPrice = typeof calculatedPrice === 'object' && calculatedPrice ? calculatedPrice.original_amount : null

    const formatPrice = (amount: number | null | undefined) => {
        if (!amount) return null
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: region.currency_code?.toUpperCase() || "USD",
        }).format(amount / 100)
    }

    const hasDiscount = originalPrice && price && originalPrice > price

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (!variant?.id || isAdding) return

        setIsAdding(true)

        try {
            await addToCart({
                variantId: variant.id,
                quantity: 1,
                countryCode: countryCode as string,
            })
        } catch (error) {
            console.error(error)
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <LocalizedClientLink
            href={`/products/${product.handle}`}
            className="group block h-full"
        >
            <div
                className="bg-white dark:bg-gray-900 overflow-hidden h-full group border border-transparent hover:border-zinc-200 transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container */}
                <div className="relative aspect-[3/4] bg-zinc-50 dark:bg-gray-800 overflow-hidden">
                    <Thumbnail
                        thumbnail={product.thumbnail}
                        images={product.images}
                        size="full"
                        className={`object-cover w-full h-full transition-transform duration-700 ease-in-out ${isHovered ? "scale-105" : "scale-100"
                            }`}
                    />

                    {/* Sale Badge */}
                    {hasDiscount && (
                        <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-[10px] uppercase font-bold tracking-wider z-10">
                            Sale
                        </div>
                    )}

                    {/* Quick Add Button - Appears on Hover */}
                    <div
                        className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-300 z-10 ${isHovered
                                ? "translate-y-0 opacity-100"
                                : "translate-y-4 opacity-0"
                            }`}
                    >
                        <button
                            onClick={handleAddToCart}
                            disabled={isAdding}
                            className="w-full bg-white text-black border border-black font-bold py-3 px-4 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
                        >
                            {isAdding ? "Ekleniyor..." : "Sepete Ekle"}
                        </button>
                    </div>

                    {/* Dark Overlay on Hover */}
                    <div className={`absolute inset-0 bg-black/5 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
                </div>

                {/* Product Info */}
                <div className="pt-4 pb-2 px-1">
                    {/* Brand / Collection Name */}
                    {product.collection && (
                        <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">
                            {product.collection.title}
                        </p>
                    )}

                    {/* Product Title */}
                    <h3 className="font-medium text-zinc-900 text-sm mb-1 truncate">
                        {product.title}
                    </h3>

                    {/* Price Section */}
                    <div className="flex items-center gap-2">
                        {hasDiscount && (
                            <span className="text-xs text-zinc-400 line-through">
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                        <span className={`text-sm font-bold text-zinc-900 ${hasDiscount ? 'text-red-600' : ''}`}>
                            {formatPrice(price)}
                        </span>
                    </div>
                </div>
            </div>
        </LocalizedClientLink>
    )
}

export default ProductCard
