"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text, useToggleState } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
      <div className="flex flex-row items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Teslimat Bilgileri
        </h2>
        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="text-[#003d29] font-bold hover:underline"
            data-testid="edit-address-button"
          >
            Düzenle
          </button>
        )}
      </div>
      {isOpen ? (
        <form action={formAction} id="checkout-address-form">
          <div className="pb-4">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div className="mt-12 pt-12 border-t border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Fatura Adresi
                </h2>

                <BillingAddress cart={cart} />
              </div>
            )}

            <SubmitButton className="w-full mt-10 bg-[#003d29] hover:bg-[#002a1c] text-white h-14 rounded-full text-lg font-bold" data-testid="submit-address-button">
              Teslimata Devam Et
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && cart.shipping_address ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col gap-y-2">
                  <p className="font-bold text-gray-900">Teslimat Adresi</p>
                  <div className="text-gray-600 font-medium">
                    <p>{cart.shipping_address.first_name} {cart.shipping_address.last_name}</p>
                    <p>{cart.shipping_address.address_1} {cart.shipping_address.address_2}</p>
                    <p>{cart.shipping_address.postal_code}, {cart.shipping_address.city}</p>
                    <p>{cart.shipping_address.country_code?.toUpperCase()}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-y-2">
                  <p className="font-bold text-gray-900">İletişim</p>
                  <div className="text-gray-600 font-medium">
                    <p>{cart.shipping_address.phone}</p>
                    <p>{cart.email}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-y-2">
                  <p className="font-bold text-gray-900">Fatura Adresi</p>
                  <div className="text-gray-600 font-medium font-normal">
                    {sameAsBilling ? (
                      <p>Teslimat adresiyle aynı</p>
                    ) : (
                      <>
                        <p>{cart.billing_address?.first_name} {cart.billing_address?.last_name}</p>
                        <p>{cart.billing_address?.address_1} {cart.billing_address?.address_2}</p>
                        <p>{cart.billing_address?.postal_code}, {cart.billing_address?.city}</p>
                        <p>{cart.billing_address?.country_code?.toUpperCase()}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center p-8">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Addresses
