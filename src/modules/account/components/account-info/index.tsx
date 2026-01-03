import { Disclosure } from "@headlessui/react"
import { Badge, Button, clx } from "@medusajs/ui"
import { useEffect } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import { useFormStatus } from "react-dom"

type AccountInfoProps = {
  label: string
  currentInfo: string | React.ReactNode
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  clearState: () => void
  children?: React.ReactNode
  'data-testid'?: string
}

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage = "Bir hata oluştu, lütfen tekrar deneyin",
  children,
  'data-testid': dataTestid
}: AccountInfoProps) => {
  const { state, close, toggle } = useToggleState()

  const { pending } = useFormStatus()

  const handleToggle = () => {
    clearState()
    setTimeout(() => toggle(), 100)
  }

  useEffect(() => {
    if (isSuccess) {
      close()
    }
  }, [isSuccess, close])

  return (
    <div className="text-sm" data-testid={dataTestid}>
      <div className="flex items-center justify-between group">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</span>
          <div className="flex items-center gap-x-4">
            {typeof currentInfo === "string" ? (
              <span className="text-base font-bold text-gray-700" data-testid="current-info">{currentInfo}</span>
            ) : (
              <div className="text-base font-bold text-gray-700">{currentInfo}</div>
            )}
          </div>
        </div>
        <div>
          <Button
            variant="secondary"
            className="min-w-[80px] py-2 px-4 rounded-xl font-bold text-xs transition-all hover:bg-gray-100 border-gray-100"
            onClick={handleToggle}
            type={state ? "reset" : "button"}
            data-testid="edit-button"
            data-active={state}
          >
            {state ? "İptal" : "Düzenle"}
          </Button>
        </div>
      </div>

      {/* Başarı durumu */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
            {
              "max-h-[1000px] opacity-100": isSuccess,
              "max-h-0 opacity-0": !isSuccess,
            }
          )}
          data-testid="success-message"
        >
          <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-xl flex items-center gap-x-2 text-green-700 font-bold text-xs ring-1 ring-green-600/10">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{label} başarıyla güncellendi</span>
          </div>
        </Disclosure.Panel>
      </Disclosure>

      {/* Hata durumu */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
            {
              "max-h-[1000px] opacity-100": isError,
              "max-h-0 opacity-0": !isError,
            }
          )}
          data-testid="error-message"
        >
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-x-2 text-red-700 font-bold text-xs ring-1 ring-red-600/10">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-visible",
            {
              "max-h-[1000px] opacity-100": state,
              "max-h-0 opacity-0": !state,
            }
          )}
        >
          <div className="flex flex-col gap-y-4 py-6 mt-4 border-t border-gray-50 animate-fade-in-top">
            <div className="grid gap-y-4">{children}</div>
            <div className="flex items-center justify-end">
              <Button
                isLoading={pending}
                className="w-full md:w-auto md:min-w-[160px] bg-[#003d29] hover:bg-[#002a1c] text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-green-900/10 transition-all"
                type="submit"
                data-testid="save-button"
              >
                Değişiklikleri Kaydet
              </Button>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}

export default AccountInfo
