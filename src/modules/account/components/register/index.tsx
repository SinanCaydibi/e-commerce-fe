"use client"

import { useActionState } from "react"
import Image from "next/image"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"
import { useParams } from "next/navigation"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)
  const { countryCode } = useParams()

  return (
    <div
      className="w-full flex flex-col items-center animate-fade-in-top"
      data-testid="register-page"
    >
      {/* Logo/Icon */}
      <div className="mb-8 relative">
        <Image
          src="/logo.png"
          alt="Hikari & Co."
          width={240}
          height={80}
          className="h-20 w-auto object-contain transform hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Hesap Oluşturun
      </h1>
      <p className="text-center text-base text-gray-500 mb-6 max-w-sm">
        Hikari & Co. dünyasına katılarak avantajlı alışverişin keyfini çıkarın.
      </p>

      <form className="w-full space-y-4" action={formAction}>
        <input type="hidden" name="country_code" value={countryCode} />
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
          label="E-posta"
          name="email"
          required
          type="email"
          autoComplete="email"
          data-testid="email-input"
        />

        <Input
          label="Telefon"
          name="phone"
          type="tel"
          autoComplete="tel"
          data-testid="phone-input"
        />

        <Input
          label="Şifre"
          name="password"
          required
          type="password"
          autoComplete="new-password"
          data-testid="password-input"
        />

        <ErrorMessage error={message} data-testid="register-error" />

        {/* Terms */}
        <p className="text-center text-xs text-gray-400 mt-4 px-2 font-medium">
          Hesap oluşturarak,{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="text-[#003d29] hover:underline underline-offset-2 transition-colors duration-200"
          >
            Gizlilik Politikası
          </LocalizedClientLink>{" "}
          ve{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="text-[#003d29] hover:underline underline-offset-2 transition-colors duration-200"
          >
            Kullanım Koşulları
          </LocalizedClientLink>
          'nı kabul etmiş olursunuz.
        </p>

        <SubmitButton
          className="w-full mt-6 bg-[#003d29] hover:bg-[#002a1c] text-white font-bold py-4 px-6 rounded-full shadow-lg shadow-green-900/20 hover:shadow-xl transition-all duration-200"
          data-testid="register-button"
        >
          <span className="flex items-center justify-center gap-2">
            Kayıt Ol
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </SubmitButton>
      </form>

      {/* Divider */}
      <div className="relative w-full my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[#fcfcfc] text-gray-400 font-medium">
            veya
          </span>
        </div>
      </div>

      {/* Sign In Link */}
      <div className="text-center">
        <span className="text-gray-500 text-sm font-medium">
          Zaten üye misiniz?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="text-[#003d29] font-bold hover:text-[#002a1c] transition-all duration-200 underline decoration-green-900/30 hover:decoration-green-900 underline-offset-4"
          >
            Giriş Yapın
          </button>
        </span>
      </div>
    </div>
  )
}

export default Register
