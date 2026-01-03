"use client"

import { RadioGroup } from "@headlessui/react"
import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Button, Container, Heading, Text, clx } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer, {
  StripeCardContainer,
} from "@modules/checkout/components/payment-container"
import PaymentButton from "@modules/checkout/components/payment-button"
import Divider from "@modules/common/components/divider"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
    if (isStripeLike(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      })
    }
  }

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard =
        isStripeLike(selectedPaymentMethod) && !activeSession

      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        )
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-white">
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <div className="flex flex-col gap-y-4">
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setPaymentMethod(value)}
                className="flex flex-col gap-y-4"
              >
                {availablePaymentMethods.map((paymentMethod) => (
                  <div key={paymentMethod.id}>
                    {isStripeLike(paymentMethod.id) ? (
                      <StripeCardContainer
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                        paymentInfoMap={paymentInfoMap}
                        setCardBrand={setCardBrand}
                        setError={setError}
                        setCardComplete={setCardComplete}
                      />
                    ) : (
                      <PaymentContainer
                        paymentInfoMap={paymentInfoMap}
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                      />
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {paidByGiftcard && (
            <div className="flex flex-col w-full p-4 bg-gray-50 rounded-2xl">
              <Text className="text-gray-900 font-bold mb-1">
                Ödeme Yöntemi
              </Text>
              <Text
                className="text-gray-600 font-medium"
                data-testid="payment-method-summary"
              >
                Hediye Kartı
              </Text>
            </div>
          )}

          <div className="mt-4">
            <ErrorMessage
              error={error}
              data-testid="payment-method-error-message"
            />
          </div>

          {activeSession && (
            <div className="mt-8">
              <div className="flex items-start gap-x-1 w-full mb-6">
                <div className="w-full">
                  <Text className="txt-medium text-gray-500 mb-1 font-medium">
                    "Siparişi Tamamla" butonuna tıklayarak Kullanım Koşulları, Satış Koşulları ve İade Politikamızı okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.
                  </Text>
                </div>
              </div>
              <PaymentButton cart={cart} data-testid="submit-order-button" />
            </div>
          )}

          {!activeSession && isStripeLike(selectedPaymentMethod) && (
            <Button
              size="large"
              className="w-full mt-8 bg-[#003d29] hover:bg-[#002a1c] text-white h-14 rounded-full text-lg font-bold"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={!cardComplete}
              data-testid="submit-payment-button"
            >
              Kart bilgilerini doğrulayın
            </Button>
          )}
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="flex flex-col gap-y-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <Text className="text-gray-500 font-bold text-xs uppercase tracking-wider mb-1">
                    ÖDEME YÖNTEMİ
                  </Text>
                  <Text
                    className="text-gray-900 font-bold"
                    data-testid="payment-method-summary"
                  >
                    {paymentInfoMap[activeSession?.provider_id]?.title ||
                      activeSession?.provider_id}
                  </Text>
                </div>
                <button onClick={handleEdit} className="text-[#003d29] font-bold text-sm hover:underline">Düzenle</button>
              </div>
              <div className="flex flex-col border-t border-gray-200 pt-4">
                <Text className="text-gray-500 font-bold text-xs uppercase tracking-wider mb-2">
                  ÖDEME DETAYLARI
                </Text>
                <div
                  className="flex gap-2 text-gray-900 font-bold items-center"
                  data-testid="payment-details-summary"
                >
                  <div className="flex items-center h-8 w-fit bg-white border border-gray-200 rounded px-2">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard className="w-5 h-5" />
                    )}
                  </div>
                  <Text>
                    {isStripeLike(selectedPaymentMethod) && cardBrand
                      ? cardBrand
                      : "Sıradaki adımda kart bilgilerini gireceksiniz"}
                  </Text>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col p-4 bg-gray-50 rounded-2xl">
              <Text className="text-gray-500 font-bold text-xs uppercase tracking-wider mb-1">
                ÖDEME YÖNTEMİ
              </Text>
              <Text
                className="text-gray-900 font-bold"
                data-testid="payment-method-summary"
              >
                Hediye Kartı
              </Text>
            </div>
          ) : (
            <div className="flex flex-col gap-y-2 opacity-50 grayscale pointer-events-none">
              <div className="w-full h-14 border border-gray-200 rounded-2xl flex items-center px-6 gap-x-4">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                <div className="w-32 h-4 bg-gray-100 rounded" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Payment
