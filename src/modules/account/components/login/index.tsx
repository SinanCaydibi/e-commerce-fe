import { login } from "@lib/data/customer"
import Image from "next/image"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"
import { useParams } from "next/navigation"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)
  const { countryCode } = useParams()

  return (
    <div
      className="w-full flex flex-col items-center animate-fade-in-top"
      data-testid="login-page"
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
        Tekrar Hoş Geldiniz
      </h1>
      <p className="text-center text-base text-gray-500 mb-8 max-w-sm">
        Hesabınıza giriş yaparak alışverişe kaldığınız yerden devam edin.
      </p>

      <form className="w-full space-y-5" action={formAction}>
        <input type="hidden" name="country_code" value={countryCode} />
        <div className="space-y-4">
          <Input
            label="E-posta"
            name="email"
            type="email"
            title="Geçerli bir e-posta adresi girin."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Şifre"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>

        <ErrorMessage error={message} data-testid="login-error-message" />

        <SubmitButton
          data-testid="sign-in-button"
          className="w-full mt-6 bg-[#003d29] hover:bg-[#002a1c] text-white font-bold py-4 px-6 rounded-full shadow-lg shadow-green-900/20 hover:shadow-xl transition-all duration-200"
        >
          <span className="flex items-center justify-center gap-2">
            Giriş Yap
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

      {/* Register Link */}
      <div className="text-center">
        <span className="text-gray-500 text-sm font-medium">
          Henüz hesabınız yok mu?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className="text-[#003d29] font-bold hover:text-[#002a1c] transition-all duration-200 underline decoration-green-900/30 hover:decoration-green-900 underline-offset-4"
            data-testid="register-button"
          >
            Hemen Kayıt Olun
          </button>
        </span>
      </div>
    </div>
  )
}

export default Login
