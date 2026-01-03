import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-[#f5f5f5]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-bg.png" alt="Hero Background" className="w-full h-full object-cover object-center" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 content-container mx-auto h-full flex flex-col justify-center px-6">
        <div className="max-w-2xl sm:pl-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#003d29] leading-tight mb-4 md:mb-6">
            Alışverişin Yeni <br /> Adresi Shopcart.
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 max-w-lg leading-relaxed">
            Stilinizi yansıtan en yeni ürünler, en uygun fiyatlarla şimdi burada. Alışverişe başlamak için keşfetmeye başlayın.
          </p>
          <LocalizedClientLink href="/store">
            <button className="bg-[#003d29] text-white px-8 py-3 md:py-4 rounded-full font-bold hover:bg-[#002a1c] transition-colors shadow-lg shadow-green-900/20">
              Hemen Keşfet
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
