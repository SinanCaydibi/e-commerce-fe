"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { placeOrder } from "@lib/data/cart"
import { Loader } from "@medusajs/icons"

export default function IyzicoConfirmPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const token = searchParams.get("token")

  useEffect(() => {
    const confirmPayment = async () => {
      if (!token) {
        setError("Token bulunamadı")
        return
      }

      try {
        // Cart'ı tamamla - placeOrder fonksiyonu otomatik olarak redirect yapacak
        await placeOrder()

      } catch (err: any) {
        console.error("Payment confirmation error:", err)
        setError(err.message || "Ödeme onaylanamadı")
      }
    }

    confirmPayment()
  }, [token, router])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Hata!</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => router.push("/checkout")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Checkout'a Dön
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader className="animate-spin mb-4 w-8 h-8" />
      <p className="text-gray-600">Ödemeniz onaylanıyor...</p>
    </div>
  )
}
