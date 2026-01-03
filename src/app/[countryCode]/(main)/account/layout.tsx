import { retrieveCustomer } from "@lib/data/customer"
import { Toaster } from "@medusajs/ui"
import AccountLayout from "@modules/account/templates/account-layout"
import { redirect } from "next/navigation"

export default async function AccountPageLayout({
  dashboard,
  login,
  params,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const customer = await retrieveCustomer().catch(() => null)

  if (!customer) {
    redirect(`/${countryCode}/login`)
  }

  return (
    <AccountLayout customer={customer}>
      {dashboard}
      <Toaster />
    </AccountLayout>
  )
}
