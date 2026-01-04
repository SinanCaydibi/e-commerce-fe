import { Container } from "@medusajs/ui"
import ChevronDown from "@modules/common/icons/chevron-down"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper">
      <div className="flex flex-col gap-y-8">
        {/* Karşılama ve Mail Bilgisi */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-testid="welcome-message">
              Merhaba, {customer?.first_name}
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Hikari & Co. üyelik sayfasına hoş geldiniz.
            </p>
          </div>
          <div className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Oturum Açılan E-posta</span>
            <span className="text-sm font-bold text-gray-700" data-testid="customer-email">{customer?.email}</span>
          </div>
        </div>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative overflow-hidden bg-[#003d29] rounded-[32px] p-8 text-white shadow-xl shadow-green-900/10 group">
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Profil Tamamlama</span>
              <div className="flex items-baseline gap-x-2 mt-4">
                <span className="text-5xl font-black italic">%{getProfileCompletion(customer)}</span>
                <span className="text-sm font-bold opacity-60">Tamamlandı</span>
              </div>
              <div className="mt-6 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full group-hover:w-full transition-all duration-1000" style={{ width: `${getProfileCompletion(customer)}%` }}></div>
              </div>
            </div>
            {/* Dekoratif Element */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>

          <div className="relative overflow-hidden bg-white border-2 border-gray-50 rounded-[32px] p-8 text-gray-900 shadow-sm group hover:border-green-100 transition-colors">
            <div className="relative z-10 flex flex-col justify-between h-full">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kayıtlı Adresler</span>
              <div className="flex items-center gap-x-6 mt-4">
                <span className="text-5xl font-black text-[#003d29] italic">{customer?.addresses?.length || 0}</span>
                <span className="text-sm font-bold text-gray-400 leading-tight">
                  Sistemimize kayıtlı<br />adres sayısı
                </span>
              </div>
            </div>
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
              <MapPin className="w-48 h-48" />
            </div>
          </div>
        </div>

        {/* Son Siparişler */}
        <div className="flex flex-col gap-y-8 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900">Son Siparişleriniz</h2>
            <LocalizedClientLink
              href="/account/orders"
              className="group flex items-center gap-x-2 text-sm font-bold text-[#003d29]"
            >
              <span>Tümünü Gör</span>
              <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-[#003d29] group-hover:text-white transition-all">
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </div>
            </LocalizedClientLink>
          </div>

          {orders && orders.length > 0 ? (
            <div className="grid grid-cols-1 gap-y-4">
              {orders.slice(0, 3).map((order) => (
                <LocalizedClientLink key={order.id} href={`/account/orders/details/${order.id}`} className="group">
                  <div className="bg-gray-50/50 rounded-[24px] border border-gray-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-x-6">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center ring-1 ring-gray-100 shadow-sm overflow-hidden flex-shrink-0">
                        {order.items?.[0]?.thumbnail ? (
                          <img src={order.items[0].thumbnail} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                      <div className="flex flex-col gap-y-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest line-clamp-1">Sipariş No: #{order.display_id}</span>
                        <span className="text-sm font-bold text-gray-900">
                          {new Date(order.created_at).toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-x-12">
                      <div className="flex flex-col items-start md:items-end">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Toplam</span>
                        <span className="text-lg font-black text-[#003d29]">
                          {convertToLocale({
                            amount: order.total,
                            currency_code: order.currency_code,
                          })}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:bg-[#003d29] group-hover:text-white group-hover:border-transparent transition-all">
                        <ChevronDown className="w-5 h-5 -rotate-90" />
                      </div>
                    </div>
                  </div>
                </LocalizedClientLink>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50/50 rounded-[32px] border-2 border-dashed border-gray-100 p-16 flex flex-col items-center justify-center text-center gap-y-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Package className="w-10 h-10 text-gray-200" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Henüz siparişiniz bulunmuyor.</h3>
                <p className="text-gray-500 font-medium">İlk siparişinizi oluşturun ve Hikari & Co. kalitesini keşfedin.</p>
              </div>
              <LocalizedClientLink href="/store">
                <button className="mt-4 px-10 py-4 bg-[#003d29] text-white rounded-full font-bold hover:bg-[#002a1c] transition-all shadow-lg shadow-green-900/10">
                  Alışverişe Başla
                </button>
              </LocalizedClientLink>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
