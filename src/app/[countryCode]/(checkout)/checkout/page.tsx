import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Ödeme",
}

export default async function Checkout() {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <div className="content-container py-12 max-w-[1440px] mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-x-2 text-sm text-gray-500 mb-8 px-4 md:px-0">
          <LocalizedClientLink href="/" className="hover:text-[#003d29]">Anasayfa</LocalizedClientLink>
          <span>/</span>
          <span className="text-gray-900 font-bold">Ödeme</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-x-12 gap-y-12 px-4 md:px-0">
          <PaymentWrapper cart={cart}>
            <CheckoutForm cart={cart} customer={customer} />
          </PaymentWrapper>
          <CheckoutSummary cart={cart} />
        </div>
      </div>
    </div>
  )
}
