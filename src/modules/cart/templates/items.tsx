import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div className="flex flex-col gap-y-6">
      <div className="pb-6 flex items-center border-b border-gray-100 justify-between">
        <Heading className="text-3xl font-bold text-gray-900 tracking-tight">Sepetim</Heading>
        <div className="text-gray-400 text-sm font-medium">
          {items?.length || 0} Ürün
        </div>
      </div>
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-12 bg-[#f9f9f9] rounded-xl -z-10 border border-gray-50"></div>
        <Table className="border-none">
          <Table.Header className="border-none relative">
            <Table.Row className="border-none hover:bg-transparent h-12">
              <Table.HeaderCell className="!pl-6 w-32 align-middle">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Görsel</span>
              </Table.HeaderCell>
              <Table.HeaderCell className="align-middle text-left">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Ürün Bilgisi</span>
              </Table.HeaderCell>
              <Table.HeaderCell className="align-middle text-center w-40">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Adet</span>
              </Table.HeaderCell>
              <Table.HeaderCell className="hidden small:table-cell align-middle text-center w-32">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Birim Fiyat</span>
              </Table.HeaderCell>
              <Table.HeaderCell className="!pr-6 align-middle text-right w-32">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Toplam</span>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items
              ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={cart?.currency_code}
                    />
                  )
                })
              : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default ItemsTemplate
