import LoginTemplate from "@modules/account/templates/login-template"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen w-full font-sans">
            {/* Sol: Motto Alanı */}
            <div className="hidden lg:flex flex-1 flex-col justify-between bg-[#003d29] text-white p-16 relative overflow-hidden">
                {/* Dekoratif Esintiler */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-green-900/40 rounded-full blur-[120px]"></div>

                {/* Logo */}
                <div className="flex items-center gap-x-2 text-3xl font-bold tracking-tight uppercase z-10 transition-transform hover:scale-105 duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                    <span>Shopcart</span>
                </div>

                {/* Motto */}
                <div className="max-w-lg z-10 space-y-6">
                    <h1 className="text-6xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
                        Alışverişin<br />
                        <span className="text-white/60">En Şık</span><br />
                        Hali.
                    </h1>
                    <p className="text-green-50/70 text-xl leading-relaxed max-w-md">
                        Modern, sürdürülebilir ve zamansız parçalarla dolu koleksiyonumuzu keşfedin. Shopcart ile ayrıcalığı hissedin.
                    </p>
                </div>

                {/* Footer */}
                <div className="text-sm text-green-100/40 z-10 font-medium">
                    © {new Date().getFullYear()} Shopcart Storefront. Tüm hakları saklıdır.
                </div>
            </div>

            {/* Sağ: Form Alanı */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#fcfcfc] animate-fade-in">
                <div className="w-full max-w-md">
                    <LoginTemplate />
                </div>
            </div>
        </div>
    )
}
