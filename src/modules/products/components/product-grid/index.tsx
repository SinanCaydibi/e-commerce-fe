import { HttpTypes } from "@medusajs/types"
import ProductCard from "@modules/products/components/product-card"

type ProductGridProps = {
    products: HttpTypes.StoreProduct[]
    region: HttpTypes.StoreRegion
}

const ProductGrid = ({ products, region }: ProductGridProps) => {
    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900/20 dark:to-fuchsia-900/20 rounded-2xl flex items-center justify-center mb-6">
                    <svg
                        className="w-12 h-12 text-violet-600 dark:text-violet-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Ürün Bulunamadı
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                    Bu kategoride henüz ürün bulunmamaktadır. Lütfen başka bir kategori deneyin.
                </p>
            </div>
        )
    }

    return (
        <div className="w-full">
            {/* Grid Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        Ürünler
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {products.length} ürün bulundu
                    </p>
                </div>

                {/* Sort/Filter Options - Placeholder */}
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <svg
                            className="w-4 h-4 inline mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                            />
                        </svg>
                        Filtrele
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} region={region} />
                ))}
            </div>
        </div>
    )
}

export default ProductGrid
