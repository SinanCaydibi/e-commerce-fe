import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-16 gap-x-12">
          {/* Kolon 1: Kategoriler */}
          <div className="flex flex-col gap-y-4">
            <Text className="txt-compact-small-plus text-zinc-900 font-bold">Kategoriler</Text>
            <ul className="grid grid-cols-1 gap-y-3 text-zinc-500 text-sm">
              <li>
                <LocalizedClientLink href="/store" className="hover:text-black transition-colors duration-200">
                  Tüm Ürünler
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/collections/new-arrivals" className="hover:text-black transition-colors duration-200">
                  Yeni Gelenler
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/collections/specials" className="hover:text-black transition-colors duration-200">
                  Özel Koleksiyonlar
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store?category=accessories" className="hover:text-black transition-colors duration-200">
                  Aksesuarlar
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Kolon 2: Kurumsal */}
          <div className="flex flex-col gap-y-4">
            <Text className="txt-compact-small-plus text-zinc-900 font-bold">Kurumsal</Text>
            <ul className="grid grid-cols-1 gap-y-3 text-zinc-500 text-sm">
              <li>
                <LocalizedClientLink href="/about" className="hover:text-black transition-colors duration-200">
                  Hakkımızda
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/careers" className="hover:text-black transition-colors duration-200">
                  Kariyer
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/press" className="hover:text-black transition-colors duration-200">
                  Basın
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/blog" className="hover:text-black transition-colors duration-200">
                  Blog
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Kolon 3: Yardım */}
          <div className="flex flex-col gap-y-4">
            <Text className="txt-compact-small-plus text-zinc-900 font-bold">Yardım</Text>
            <ul className="grid grid-cols-1 gap-y-3 text-zinc-500 text-sm">
              <li>
                <LocalizedClientLink href="/contact" className="hover:text-black transition-colors duration-200">
                  İletişim
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/faq" className="hover:text-black transition-colors duration-200">
                  Sıkça Sorulan Sorular
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/shipping" className="hover:text-black transition-colors duration-200">
                  Kargo ve Teslimat
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/returns" className="hover:text-black transition-colors duration-200">
                  İade ve Değişim
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Kolon 4: Sosyal Medya */}
          <div className="flex flex-col gap-y-4">
            <Text className="txt-compact-small-plus text-zinc-900 font-bold">Takip Edin</Text>
            <ul className="grid grid-cols-1 gap-y-3 text-zinc-500 text-sm">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors duration-200">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors duration-200">
                  Twitter (X)
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors duration-200">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors duration-200">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="flex flex-col md:flex-row w-full mb-8 justify-between items-center gap-4 border-t border-zinc-100 pt-8">
          <Text className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Medusa Store. Tüm hakları saklıdır.
          </Text>

          <div className="flex items-center gap-x-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Basit Ödeme İkonları CSS ile */}
            <div className="h-6 w-10 bg-zinc-100 border border-zinc-200 rounded flex items-center justify-center text-[10px] font-bold text-zinc-400">VISA</div>
            <div className="h-6 w-10 bg-zinc-100 border border-zinc-200 rounded flex items-center justify-center text-[10px] font-bold text-zinc-400">MC</div>
            <div className="h-6 w-10 bg-zinc-100 border border-zinc-200 rounded flex items-center justify-center text-[10px] font-bold text-zinc-400">AMEX</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
