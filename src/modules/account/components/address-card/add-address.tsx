"use client"

import { Plus } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import { useEffect, useState, useActionState } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { HttpTypes } from "@medusajs/types"
import { addCustomerAddress } from "@lib/data/customer"

const AddAddress = ({
  region,
  addresses,
}: {
  region: HttpTypes.StoreRegion
  addresses: HttpTypes.StoreCustomerAddress[]
}) => {
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(addCustomerAddress, {
    isDefaultShipping: addresses.length === 0,
    success: false,
    error: null,
  })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  return (
    <>
      <button
        className="border-2 border-dashed border-gray-100 rounded-3xl p-6 min-h-[200px] h-full w-full flex flex-col items-center justify-center gap-y-4 hover:border-[#003d29]/30 hover:bg-green-50/10 transition-all group"
        onClick={open}
        data-testid="add-address-button"
      >
        <div className="bg-green-50 text-[#003d29] p-3 rounded-2xl group-hover:scale-110 transition-transform">
          <Plus className="w-6 h-6" />
        </div>
        <span className="text-base font-bold text-gray-700">Yeni Adres Ekle</span>
      </button>

      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <Modal.Title>
          <Heading className="text-2xl font-bold text-gray-900 mb-2">Yeni Adres Ekle</Heading>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="flex flex-col gap-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Ad"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                />
                <Input
                  label="Soyad"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                />
              </div>
              <Input
                label="Şirket"
                name="company"
                autoComplete="organization"
                data-testid="company-input"
              />
              <Input
                label="Adres"
                name="address_1"
                required
                autoComplete="address-line1"
                data-testid="address-1-input"
              />
              <Input
                label="Daire, kat, vb."
                name="address_2"
                autoComplete="address-line2"
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Posta Kodu"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                />
                <Input
                  label="Şehir"
                  name="city"
                  required
                  autoComplete="locality"
                  data-testid="city-input"
                />
              </div>
              <Input
                label="Bölge / Eyalet"
                name="province"
                autoComplete="address-level1"
                data-testid="state-input"
              />
              <CountrySelect
                region={region}
                name="country_code"
                required
                autoComplete="country"
                data-testid="country-select"
              />
              <Input
                label="Telefon"
                name="phone"
                type="tel"
                autoComplete="tel"
                data-testid="phone-input"
              />
            </div>
            {formState.error && (
              <div
                className="mt-4 p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-100"
                data-testid="address-error"
              >
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex items-center gap-x-4 mt-8">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="flex-1 h-12 rounded-full font-bold text-gray-500"
                data-testid="cancel-button"
              >
                İptal
              </Button>
              <SubmitButton className="flex-1 h-12 rounded-full bg-[#003d29] hover:bg-[#002a1c] text-white font-bold" data-testid="save-button">Kaydet</SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AddAddress
