import { Button } from "@medusajs/ui"
import { useMemo } from "react"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0
    )
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0
  }, [order])

  return (
    <div className="bg-white flex flex-col group ring-1 ring-gray-100 p-6 rounded-3xl hover:shadow-md transition-all hover:ring-green-100" data-testid="order-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-4 mb-6">
        <div>
          <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
            Sipariş No
          </div>
          <div className="text-xl font-black text-gray-900 leading-none">
            #<span data-testid="order-display-id">{order.display_id}</span>
          </div>
        </div>
        <div className="flex items-center gap-x-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Tarih</span>
            <span className="text-sm font-bold text-gray-700" data-testid="order-created-at">
              {new Date(order.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Toplam</span>
            <span className="text-sm font-bold text-[#003d29]" data-testid="order-amount">
              {convertToLocale({
                amount: order.total,
                currency_code: order.currency_code,
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        {order.items?.slice(0, 3).map((i) => {
          return (
            <div
              key={i.id}
              className="flex flex-col gap-y-3"
              data-testid="order-item"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] ring-1 ring-gray-100">
                <Thumbnail thumbnail={i.thumbnail} images={[]} size="full" />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-xs font-bold text-gray-700 line-clamp-1"
                  data-testid="item-title"
                >
                  {i.title}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                  {i.quantity} Adet
                </span>
              </div>
            </div>
          )
        })}
        {numberOfProducts > 3 && (
          <div className="w-full aspect-[3/4] flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
            <span className="text-lg font-black text-[#003d29]">
              + {numberOfLines - 3}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Diğer</span>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-50">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button
            data-testid="order-details-link"
            variant="secondary"
            className="rounded-full border-[#003d29] text-[#003d29] hover:bg-green-50 font-bold px-8 py-2 transition-all"
          >
            Detayları Görüntüle
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderCard
