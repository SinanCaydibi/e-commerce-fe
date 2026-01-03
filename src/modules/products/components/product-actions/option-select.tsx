import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const colorMap: Record<string, string> = {
  "Black": "#000000",
  "White": "#FFFFFF",
  "Red": "#EF4444",
  "Blue": "#3B82F6",
  "Green": "#10B981",
  "Yellow": "#F59E0B",
  "Pink": "#EC4899",
  "Purple": "#8B5CF6",
  "Gray": "#9CA3AF",
  "Orange": "#F97316",
  "Silver": "#C0C0C0",
  "Gold": "#FFD700",
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)
  const isColor = title.toLowerCase().includes("color")

  const titleMap: Record<string, string> = {
    "Color": "Renk",
    "Size": "Beden",
    "Material": "Materyal",
    "Style": "Stil",
  }

  const turkishTitle = titleMap[title] || title

  return (
    <div className="flex flex-col gap-y-4">
      <span className="text-lg font-bold text-gray-900">{turkishTitle} Seçin</span>
      <div
        className="flex flex-wrap gap-4"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          const colorHex = isColor ? (colorMap[v] || "#F3F4F6") : null

          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              title={v}
              className={clx(
                "transition-all duration-200 border-2 flex items-center justify-center",
                {
                  // Color circle style
                  "w-12 h-12 rounded-full": isColor,
                  "px-6 py-2 rounded-full border-gray-200 text-sm font-medium": !isColor,
                  // Selection state
                  "border-[#003d29] ring-2 ring-[#003d29] ring-offset-2": v === current && isColor,
                  "bg-[#003d29] text-white border-[#003d29]": v === current && !isColor,
                  "border-gray-200 hover:border-gray-400": v !== current,
                }
              )}
              style={isColor && colorHex ? { backgroundColor: colorHex } : {}}
              disabled={disabled}
              data-testid="option-button"
            >
              {!isColor && v}
              {isColor && v === current && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={clx("w-5 h-5", v.toLowerCase() === "white" || v.toLowerCase() === "silver" ? "text-black" : "text-white")}><path d="M20 6 9 17l-5-5" /></svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
