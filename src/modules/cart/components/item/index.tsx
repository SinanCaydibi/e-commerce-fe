"use client"

import { Table, Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <Table.Row className="w-full border-b border-gray-50 hover:bg-[#fcfcfc] transition-colors group" data-testid="product-row">
      <Table.Cell className="!pl-0 py-8 w-32 align-top">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={clx("flex relative", {
            "w-20": type === "preview",
            "small:w-32 w-20": type === "full",
          })}
        >
          <div className="bg-[#f6f6f6] rounded-2xl overflow-hidden p-6 aspect-square w-full flex items-center justify-center group-hover:bg-gray-100 transition-colors">
            <Thumbnail
              thumbnail={item.thumbnail}
              images={item.variant?.product?.images}
              size="square"
              className="!bg-transparent !shadow-none"
            />
          </div>
          {updating && (
            <div className="absolute inset-0 bg-white/60 rounded-2xl flex items-center justify-center backdrop-blur-[1px]">
              <Spinner className="animate-spin text-[#003d29]" />
            </div>
          )}
        </LocalizedClientLink>
      </Table.Cell>

      <Table.Cell className="text-left py-8 align-top">
        <div className="flex flex-col gap-y-1">
          <LocalizedClientLink
            href={`/products/${item.product_handle}`}
            className="text-lg font-bold text-gray-900 hover:text-[#003d29] transition-colors"
            data-testid="product-title"
          >
            {item.product_title}
          </LocalizedClientLink>
          <div className="text-gray-500 font-medium text-sm">
            <LineItemOptions variant={item.variant} data-testid="product-variant" />
          </div>
        </div>
      </Table.Cell>

      {type === "full" && (
        <Table.Cell className="py-8 align-top">
          <div className="flex flex-col items-center gap-y-3">
            <div className="flex items-center bg-[#f6f6f6] rounded-full p-1 border border-gray-100">
              <button
                onClick={() => changeQuantity(Math.max(1, item.quantity - 1))}
                disabled={updating || item.quantity <= 1}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-gray-600 disabled:opacity-30 transition-all font-bold"
              >
                -
              </button>
              <div className="w-8 text-center text-sm font-bold text-gray-900">
                {item.quantity}
              </div>
              <button
                onClick={() => changeQuantity(Math.min(maxQuantity, item.quantity + 1))}
                disabled={updating || item.quantity >= maxQuantity}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-gray-600 disabled:opacity-30 transition-all font-bold"
              >
                +
              </button>
            </div>
            <DeleteButton
              id={item.id}
              className="text-gray-400 hover:text-red-500 text-xs font-bold transition-colors flex items-center gap-x-1"
              data-testid="product-delete-button"
            >
              <span>Sil</span>
            </DeleteButton>
          </div>
          <ErrorMessage error={error} data-testid="product-error-message" />
        </Table.Cell>
      )}

      {type === "full" && (
        <Table.Cell className="hidden small:table-cell py-8 align-top text-center text-gray-500 font-bold">
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </Table.Cell>
      )}

      <Table.Cell className="!pr-0 py-8 align-top text-right">
        <span
          className={clx("!pr-0", {
            "flex flex-col items-end h-full justify-center": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1 ">
              <Text className="text-ui-fg-muted font-bold text-sm">{item.quantity}x </Text>
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          )}
          <span className="text-xl font-black text-gray-900">
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </span>
        </span>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
