import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import Divider from "@modules/common/components/divider"
import TransferRequestForm from "@modules/account/components/transfer-request-form"

export const metadata: Metadata = {
  title: "Siparişlerim",
  description: "Sipariş geçmişinize genel bakış.",
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-12 flex flex-col gap-y-3">
        <h1 className="text-3xl font-black text-gray-900">Siparişlerim</h1>
        <p className="text-gray-500 font-medium">
          Geçmiş siparişlerinizi ve durumlarını buradan takip edebilirsiniz. İhtiyaç halinde iade veya değişim talebi oluşturabilirsiniz.
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} />
        <Divider className="my-16" />
        <TransferRequestForm />
      </div>
    </div>
  )
}
