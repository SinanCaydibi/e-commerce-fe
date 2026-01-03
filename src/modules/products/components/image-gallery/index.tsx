"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState } from "react"
import { clx } from "@medusajs/ui"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images.length) return null

  return (
    <div className="flex flex-col gap-y-6">
      {/* Main Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f6f6f6] rounded-[2rem]">
        <Image
          src={images[selectedImage]?.url || ""}
          alt={`Product image ${selectedImage + 1}`}
          fill
          priority
          className="object-contain p-8"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-x-4 overflow-x-auto pb-2 no-scrollbar">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={clx(
              "relative aspect-square w-24 flex-shrink-0 overflow-hidden bg-[#f6f6f6] rounded-2xl transition-all duration-200 border-2",
              {
                "border-[#003d29]": selectedImage === index,
                "border-transparent": selectedImage !== index,
              }
            )}
          >
            <Image
              src={image.url || ""}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-contain p-2"
              sizes="96px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
