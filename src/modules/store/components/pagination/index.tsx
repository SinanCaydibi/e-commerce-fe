"use client"

import { clx } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function Pagination({
  page,
  totalPages,
  "data-testid": dataTestid,
}: {
  page: number
  totalPages: number
  "data-testid"?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const renderPageButton = (p: number, label: string | number, isCurrent: boolean) => (
    <button
      key={p}
      className={clx(
        "flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-200",
        {
          "bg-[#003d29] text-white": isCurrent,
          "bg-gray-100 text-gray-700 hover:bg-gray-200": !isCurrent,
        }
      )}
      onClick={() => handlePageChange(p)}
    >
      {label}
    </button>
  )

  const renderEllipsis = (key: string) => (
    <span key={key} className="flex items-center justify-center w-10 h-10 text-gray-400">
      ...
    </span>
  )

  const renderPageButtons = () => {
    const buttons = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(renderPageButton(i, i, i === page))
      }
    } else {
      buttons.push(renderPageButton(1, 1, 1 === page))
      if (page > 3) buttons.push(renderEllipsis("start-ellipsis"))

      const start = Math.max(2, page - 1)
      const end = Math.min(totalPages - 1, page + 1)

      for (let i = start; i <= end; i++) {
        buttons.push(renderPageButton(i, i, i === page))
      }

      if (page < totalPages - 2) buttons.push(renderEllipsis("end-ellipsis"))
      buttons.push(renderPageButton(totalPages, totalPages, totalPages === page))
    }

    return buttons
  }

  return (
    <div className="flex items-center justify-center gap-x-2 mt-16" data-testid={dataTestid}>
      <div className="flex items-center gap-x-2">
        {renderPageButtons()}
      </div>

      {page < totalPages && (
        <button
          onClick={() => handlePageChange(page + 1)}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:border-[#003d29] hover:text-[#003d29] transition-all duration-200 ml-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      )}
    </div>
  )
}
