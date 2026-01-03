import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Adres Defteri",
  description: "Kayıtlı adreslerinizi görüntüleyin ve yönetin.",
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-12 flex flex-col gap-y-3">
        <h1 className="text-3xl font-black text-gray-900">Adres Bilgilerim</h1>
        <p className="text-gray-500 font-medium">
          Teslimat adreslerinizi buradan görüntüleyebilir ve güncelleyebilirsiniz. Birden fazla adres ekleyerek ödeme aşamasında dilediğinizi seçebilirsiniz.
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
