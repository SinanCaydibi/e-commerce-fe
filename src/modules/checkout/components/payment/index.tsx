"use client"

import { RadioGroup } from "@headlessui/react"
import { isStripeLike, isIyzico, paymentInfoMap } from "@lib/constants"
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

      let paymentSession = activeSession

      // İyzico için özel işlem
      if (isIyzico(selectedPaymentMethod)) {
        if (!checkActiveSession) {
          // Session henüz oluşturulmamış, oluştur ve URL'i al
          const response = await initiatePaymentSession(cart, {
            provider_id: selectedPaymentMethod,
          })

          // Response içinden paymentPageUrl'i çıkar
          const paymentPageUrl = response?.payment_collection?.payment_sessions?.find(
            (ps: any) => ps.provider_id === selectedPaymentMethod
          )?.data?.paymentPageUrl

          if (paymentPageUrl) {
            // İyzico ödeme sayfasına yönlendir
            window.location.href = paymentPageUrl
            return
          } else {
            setError("İyzico ödeme sayfası URL'si alınamadı")
            setIsLoading(false)
            return
          }
        } else {
          // Session zaten mevcut, direkt yönlendir
          if (paymentSession?.data?.paymentPageUrl) {
            window.location.href = paymentSession.data.paymentPageUrl
            return
          } else {
            setError("İyzico ödeme sayfası URL'si alınamadı")
            setIsLoading(false)
            return
          }
        }
      }

      // Stripe-like providerlar için
      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })

        // Session başlatıldıktan sonra sayfayı yenile - cart güncellenecek
        window.location.reload()
        return
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
    <div className={clx("bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm")}>
      <div className="flex flex-col mb-8">
        <Text className="text-xl md:text-2xl font-bold text-gray-900">Ödeme Bilgileri</Text>
      </div>
      <div>
          {!paidByGiftcard && availablePaymentMethods?.length ? (
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
          ) : (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 font-medium">
                ⚠️ Hiçbir ödeme yöntemi bulunamadı
              </p>
              <p className="text-sm text-yellow-600 mt-1">
                paidByGiftcard: {String(paidByGiftcard)} |
                availablePaymentMethods.length: {availablePaymentMethods?.length || 0}
              </p>
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

          {selectedPaymentMethod && isIyzico(selectedPaymentMethod) && (
            <Button
              size="large"
              className="w-full mt-8 bg-[#003d29] hover:bg-[#002a1c] text-white h-14 rounded-full text-lg font-bold"
              onClick={handleSubmit}
              isLoading={isLoading}
              data-testid="submit-iyzico-button"
            >
              İyzico ile Ödemeye Geç
            </Button>
          )}
      </div>
    </div>
  )
}

export default Payment
