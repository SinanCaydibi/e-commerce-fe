import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"
import Thumbnail from "@modules/products/components/thumbnail"
import { Text } from "@medusajs/ui"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <div className="w-full grid grid-cols-1 gap-y-12">
      {/* 1. Ürün ve Gönderim İncelemesi */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">Ürün ve Gönderim Bilgileri</h2>
        <div className="flex flex-col gap-y-10">
          {cart.items?.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-y-6 gap-x-6 sm:items-center">
              <div className="w-full sm:w-40 aspect-square bg-[#f6f6f6] rounded-2xl overflow-hidden p-6 flex items-center justify-center">
                <Thumbnail
                  thumbnail={item.thumbnail}
                  images={item.variant?.product?.images}
                  size="square"
                  className="!bg-transparent !shadow-none"
                />
              </div>
              <div className="flex-1 flex flex-col sm:flex-row justify-between sm:items-start gap-y-4">
                <div className="flex flex-col gap-y-1">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">{item.product_title}</h3>
                  <div className="text-gray-500 font-medium text-sm">
                    <LineItemOptions variant={item.variant} />
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-y-2">
                  <div className="text-lg md:text-xl font-bold text-gray-900">
                    <LineItemPrice item={item} currencyCode={cart.currency_code} style="tight" />
                  </div>
                  <Text className="text-gray-500 font-medium text-sm">Adet: {String(item.quantity).padStart(2, '0')}</Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Teslimat Bilgileri (Adresler) */}
      <Addresses cart={cart} customer={customer} />

      {/* 3. Kargo Yöntemleri */}
      <Shipping cart={cart} availableShippingMethods={shippingMethods} />
    </div>
  )
}
