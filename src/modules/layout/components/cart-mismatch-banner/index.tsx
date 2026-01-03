"use client"

import { transferCart } from "@lib/data/customer"
import { ExclamationCircleSolid } from "@medusajs/icons"
import { StoreCart, StoreCustomer } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { useRouter } from "next/navigation"
import { useState } from "react"

function CartMismatchBanner(props: {
  customer: StoreCustomer
  cart: StoreCart
}) {
  const { customer, cart } = props
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [actionText, setActionText] = useState("Transferi tekrarla")

  if (!customer || !!cart.customer_id) {
    return null
  }

  const handleSubmit = async () => {
    setIsPending(true)
    setActionText("Aktarılıyor...")

    try {
      await transferCart()
      router.refresh()
    } catch (err) {
      console.error("Cart transfer error:", err)
      setActionText("Tekrar dene")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex items-center justify-center small:p-4 p-2 text-center bg-amber-50 small:gap-2 gap-1 text-sm border-b border-amber-100 text-amber-900">
      <div className="flex flex-col small:flex-row small:gap-2 gap-1 items-center">
        <span className="flex items-center gap-2 font-medium">
          <ExclamationCircleSolid className="inline text-amber-600" />
          Sepetinizi hesabınıza aktarırken bir sorun oluştu.
        </span>

        <span className="hidden small:block text-amber-300">|</span>

        <Button
          variant="transparent"
          className="hover:bg-transparent active:bg-transparent focus:bg-transparent disabled:text-amber-400 text-amber-950 p-0 bg-transparent font-bold underline decoration-amber-300 underline-offset-4"
          size="base"
          disabled={isPending}
          onClick={handleSubmit}
        >
          {actionText}
        </Button>
      </div>
    </div>
  )
}

export default CartMismatchBanner
