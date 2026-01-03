"use client"

import { Button } from "@medusajs/ui"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-6 w-full">
        {orders.map((o) => (
          <div
            key={o.id}
            className="pb-6 border-b border-gray-50 last:border-none last:pb-0"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center justify-center py-20 px-4 text-center"
      data-testid="no-orders-container"
    >
      <div className="bg-gray-50 p-6 rounded-full mb-6">
        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Henüz Siparişiniz Yok</h2>
      <p className="text-gray-500 font-medium max-w-xs mx-auto mb-8">
        Görünüşe göre henüz bir sipariş vermemişsiniz. Harika ürünlerimize göz atmaya ne dersiniz?
      </p>
      <LocalizedClientLink href="/store">
        <Button
          className="bg-[#003d29] hover:bg-[#002a1c] text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-green-900/10 transition-all"
          data-testid="continue-shopping-button"
        >
          Alışverişe Başla
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default OrderOverview
