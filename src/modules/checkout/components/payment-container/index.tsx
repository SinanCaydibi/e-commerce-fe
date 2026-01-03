import { Radio as RadioGroupOption } from "@headlessui/react"
import { Text, clx } from "@medusajs/ui"
import React, { useContext, useMemo, type JSX } from "react"

import Radio from "@modules/common/components/radio"

import { isManual } from "@lib/constants"
import SkeletonCardDetails from "@modules/skeletons/components/skeleton-card-details"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"
import PaymentTest from "../payment-test"
import { StripeContext } from "../payment-wrapper/stripe-wrapper"

type PaymentContainerProps = {
  paymentProviderId: string
  selectedPaymentOptionId: string | null
  disabled?: boolean
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>
  children?: React.ReactNode
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  children,
}) => {
  const isDevelopment = process.env.NODE_ENV === "development"

  return (
    <RadioGroupOption
      key={paymentProviderId}
      value={paymentProviderId}
      disabled={disabled}
      className={clx(
        "flex flex-col gap-y-2 text-small-regular cursor-pointer py-4 border rounded-2xl px-6 transition-all duration-200",
        {
          "border-[#003d29] bg-gray-50 bg-opacity-50 ring-2 ring-[#003d29] ring-offset-2":
            selectedPaymentOptionId === paymentProviderId,
          "border-gray-200 hover:border-gray-300": selectedPaymentOptionId !== paymentProviderId,
        }
      )}
    >
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-x-4">
          <div className={clx("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all", {
            "border-[#003d29]": selectedPaymentOptionId === paymentProviderId,
            "border-gray-300": selectedPaymentOptionId !== paymentProviderId,
          })}>
            {selectedPaymentOptionId === paymentProviderId && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#003d29]" />
            )}
          </div>
          <Text className="text-gray-900 font-bold">
            {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
          </Text>
          {isManual(paymentProviderId) && isDevelopment && (
            <PaymentTest className="hidden small:block" />
          )}
        </div>
        <span className="justify-self-end text-gray-400">
          {paymentInfoMap[paymentProviderId]?.icon}
        </span>
      </div>
      {isManual(paymentProviderId) && isDevelopment && (
        <PaymentTest className="small:hidden text-[10px]" />
      )}
      {children}
    </RadioGroupOption>
  )
}

export default PaymentContainer

export const StripeCardContainer = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  setCardBrand,
  setError,
  setCardComplete,
}: Omit<PaymentContainerProps, "children"> & {
  setCardBrand: (brand: string) => void
  setError: (error: string | null) => void
  setCardComplete: (complete: boolean) => void
}) => {
  const stripeReady = useContext(StripeContext)

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#000",
          fontWeight: "500",
          fontSize: "16px",
          "::placeholder": {
            color: "rgb(156 163 175)",
          },
        },
      },
      classes: {
        base: "block w-full h-12 px-4 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#003d29] focus:border-transparent transition-all duration-300 ease-in-out flex items-center",
      },
    }
  }, [])

  return (
    <PaymentContainer
      paymentProviderId={paymentProviderId}
      selectedPaymentOptionId={selectedPaymentOptionId}
      paymentInfoMap={paymentInfoMap}
      disabled={disabled}
    >
      {selectedPaymentOptionId === paymentProviderId &&
        (stripeReady ? (
          <div className="my-6 border-t border-gray-100 pt-6 transition-all duration-150 ease-in-out flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Kart Üzerindeki İsim</label>
              <input
                type="text"
                placeholder="AD SOYAD"
                className="h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003d29] focus:border-transparent transition-all uppercase placeholder:font-medium text-sm font-bold"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Kart Numarası</label>
              <CardElement
                options={useOptions as StripeCardElementOptions}
                onChange={(e) => {
                  setCardBrand(
                    e.brand && e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                  )
                  setError(e.error?.message || null)
                  setCardComplete(e.complete)
                }}
              />
            </div>

            <p className="text-[11px] text-gray-400 mt-2 px-1">
              Ödemeniz güvenli altyapımız üzerinden şifrelenerek gerçekleştirilir.
            </p>
          </div>
        ) : (
          <SkeletonCardDetails />
        ))}
    </PaymentContainer>
  )
}
