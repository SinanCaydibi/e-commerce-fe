import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row text-4xl font-bold gap-x-2 items-baseline text-gray-900"
      >
        Sepetiniz Boş
      </Heading>
      <Text className="text-xl text-gray-500 mt-4 mb-8 max-w-[32rem]">
        Sepetinizde şu an herhangi bir ürün bulunmuyor. Hadi bunu değiştirelim, aşağıdaki bağlantıyı kullanarak ürünlerimize göz atabilirsiniz.
      </Text>
      <div>
        <InteractiveLink href="/store">Ürünleri Keşfet</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
