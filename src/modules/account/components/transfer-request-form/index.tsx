"use client"

import { useActionState } from "react"
import { createTransferRequest } from "@lib/data/orders"
import { Text, Heading, Input, Button, IconButton, Toaster } from "@medusajs/ui"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { CheckCircleMiniSolid, XCircleSolid } from "@medusajs/icons"
import { useEffect, useState } from "react"

export default function TransferRequestForm() {
  const [showSuccess, setShowSuccess] = useState(false)

  const [state, formAction] = useActionState(createTransferRequest, {
    success: false,
    error: null,
    order: null,
  })

  useEffect(() => {
    if (state.success && state.order) {
      setShowSuccess(true)
    }
  }, [state.success, state.order])

  return (
    <div className="flex flex-col gap-y-4 w-full bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
      <div className="grid sm:grid-cols-2 items-center gap-x-8 gap-y-4 w-full">
        <div className="flex flex-col gap-y-1">
          <Heading level="h3" className="text-lg font-bold text-gray-900">
            Sipariş Aktarımı
          </Heading>
          <Text className="text-sm font-medium text-gray-500">
            Aradığınız siparişi bulamıyor musunuz?
            <br /> Bir siparişi hesabınıza bağlayın.
          </Text>
        </div>
        <form
          action={formAction}
          className="flex flex-col gap-y-1 sm:items-end w-full"
        >
          <div className="flex flex-col gap-y-3 w-full">
            <Input
              className="w-full h-12 rounded-xl border-gray-200 focus:border-[#003d29] focus:ring-[#003d29]"
              name="order_id"
              placeholder="Sipariş ID (ör: order_...)"
            />
            <SubmitButton
              variant="secondary"
              className="w-full sm:w-fit whitespace-nowrap self-end rounded-full font-bold border-[#003d29] text-[#003d29] hover:bg-green-50"
            >
              Aktarım Talebi Oluştur
            </SubmitButton>
          </div>
        </form>
      </div>
      {!state.success && state.error && (
        <Text className="text-xs font-bold text-red-500 text-right">
          {state.error}
        </Text>
      )}
      {showSuccess && (
        <div className="flex justify-between p-4 bg-green-50 rounded-2xl border border-green-100 w-full self-stretch items-center animate-fade-in-top">
          <div className="flex gap-x-3 items-center">
            <CheckCircleMiniSolid className="w-5 h-5 text-green-600" />
            <div className="flex flex-col gap-y-0.5">
              <Text className="text-sm font-bold text-gray-900">
                Sipariş #{state.order?.display_id || state.order?.id} için aktarım talep edildi
              </Text>
              <Text className="text-xs font-medium text-gray-600">
                Aktarım talebi e-postası {state.order?.email} adresine gönderildi.
              </Text>
            </div>
          </div>
          <IconButton
            variant="transparent"
            className="h-fit hover:bg-green-100 rounded-full transition-colors"
            onClick={() => setShowSuccess(false)}
          >
            <XCircleSolid className="w-4 h-4 text-gray-400" />
          </IconButton>
        </div>
      )}
    </div>
  )
}
