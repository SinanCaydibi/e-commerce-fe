import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-center justify-between p-6 border border-gray-100 rounded-3xl mb-4">
      <div>
        <Heading level="h2" className="text-xl font-bold text-gray-900">
          Zaten bir hesabınız var mı?
        </Heading>
        <Text className="text-gray-500 font-medium mt-1">
          Daha iyi bir deneyim için giriş yapın.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-12 px-8 rounded-full font-bold border-gray-200 hover:bg-gray-50 transition-colors" data-testid="sign-in-button">
            Giriş Yap
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
