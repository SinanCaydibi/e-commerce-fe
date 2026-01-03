import { Heading, Text } from "@medusajs/ui"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import { listCartPaymentMethods } from "@lib/data/payment"
import Payment from "@modules/checkout/components/payment"

const CheckoutSummary = async ({ cart }: { cart: any }) => {
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  return (
    <div className="flex flex-col gap-y-12">
      {/* Sipariş Özeti Kutusu */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm lg:sticky lg:top-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 tracking-tight">Sipariş Özeti</h2>

        <div className="mb-8">
          <DiscountCode cart={cart} />
        </div>

        <div className="h-px bg-gray-100 w-full mb-8" />

        <CartTotals totals={cart} />

        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Ödeme Bilgileri</h2>
          <Payment cart={cart} availablePaymentMethods={paymentMethods || []} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
