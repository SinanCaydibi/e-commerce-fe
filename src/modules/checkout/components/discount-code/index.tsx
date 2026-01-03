"use client"

import { Badge, Heading, Text } from "@medusajs/ui"
import React from "react"

import { applyPromotions } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [errorMessage, setErrorMessage] = React.useState("")

  const { promotions = [] } = cart
  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )

    await applyPromotions(
      validPromotions.filter((p) => p.code !== undefined).map((p) => p.code!)
    )
  }

  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage("")

    const code = formData.get("code")
    if (!code) {
      return
    }
    const input = document.getElementById("promotion-input") as HTMLInputElement
    const codes = promotions
      .filter((p) => p.code !== undefined)
      .map((p) => p.code!)
    codes.push(code.toString())

    try {
      await applyPromotions(codes)
    } catch (e: any) {
      setErrorMessage(e.message)
    }

    if (input) {
      input.value = ""
    }
  }

  return (
    <div className="w-full bg-white flex flex-col">
      <div className="txt-medium">
        <form action={(a) => addPromotionCode(a)} className="w-full">
          <div className="flex w-full gap-x-2 bg-[#f6f6f6] p-1.5 rounded-full border border-gray-100 items-center">
            <input
              className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-2 text-sm placeholder:text-gray-400 placeholder:font-medium"
              id="promotion-input"
              name="code"
              type="text"
              placeholder="Kupon Kodu Giriniz"
              data-testid="discount-input"
            />
            <SubmitButton
              className="px-6 py-3 bg-[#003d29] hover:bg-[#002a1c] text-white rounded-full text-sm font-bold transition-all"
              data-testid="discount-apply-button"
            >
              Kuponu Uygula
            </SubmitButton>
          </div>

          <div className="mt-2 ml-4">
            <ErrorMessage
              error={errorMessage}
              data-testid="discount-error-message"
            />
          </div>
        </form>

        {promotions.length > 0 && (
          <div className="w-full flex items-center mt-6">
            <div className="flex flex-col w-full">
              <Heading className="txt-medium mb-2">
                Uygulanan Promosyonlar:
              </Heading>

              {promotions.map((promotion) => {
                return (
                  <div
                    key={promotion.id}
                    className="flex items-center justify-between w-full max-w-full mb-2"
                    data-testid="discount-row"
                  >
                    <Text className="flex gap-x-1 items-baseline txt-small-plus w-4/5 pr-1">
                      <span className="truncate" data-testid="discount-code">
                        <Badge
                          color={promotion.is_automatic ? "green" : "grey"}
                          size="small"
                        >
                          {promotion.code}
                        </Badge>{" "}
                        (
                        {promotion.application_method?.value !== undefined &&
                          promotion.application_method.currency_code !==
                          undefined && (
                            <>
                              {promotion.application_method.type ===
                                "percentage"
                                ? `%${promotion.application_method.value}`
                                : convertToLocale({
                                  amount: +promotion.application_method.value,
                                  currency_code:
                                    promotion.application_method
                                      .currency_code,
                                })}
                            </>
                          )}
                        )
                      </span>
                    </Text>
                    {!promotion.is_automatic && (
                      <button
                        className="flex items-center text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
                        onClick={() => {
                          if (!promotion.code) {
                            return
                          }

                          removePromotionCode(promotion.code)
                        }}
                        data-testid="remove-discount-button"
                      >
                        <Trash size={14} />
                        <span className="sr-only">
                          İndirim kodunu siparişten kaldır
                        </span>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiscountCode
