'use client'

// components/product/ProductCard.tsx

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore }     from '@/lib/store/cartStore'
import { useWishlistStore } from '@/lib/store/wishlistStore'
import { formatPrice, getDiscount } from '@/lib/types'
import type { Product } from '@/lib/types'

// Shows when image URL is broken or slow to load
const FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='60' fill='%23d1d5db'%3E%F0%9F%9B%8D%EF%B8%8F%3C/text%3E%3C/svg%3E"

export default function ProductCard({ product }: { product: Product }) {
  const [imgSrc, setImgSrc]          = useState(product.images[0])
  const addItem                      = useCartStore((s) => s.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const wished                       = isInWishlist(product.id)
  const discount                     = getDiscount(product.price, product.originalPrice)

  function handleCart(e: React.MouseEvent) {
    e.preventDefault()
    if (product.stock === 0) return
    addItem(product)
    toast.success('Added to cart!', { description: product.name, duration: 2000 })
  }

  function handleWish(e: React.MouseEvent) {
    e.preventDefault()
    toggleItem(product)
    toast(wished ? 'Removed from wishlist' : 'Saved to wishlist', {
      icon: wished ? '💔' : '❤️',
    })
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={imgSrc}
          alt={product.name}
          loading="lazy"
          onError={() => setImgSrc(FALLBACK)}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}

        {/* Flash badge */}
        {product.isFlashDeal && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            Flash
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWish}
          className="absolute bottom-2 right-2 bg-white rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart
            size={14}
            className={wished ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500 transition-colors'}
          />
        </button>
      </div>

      {/* Product info */}
      <div className="p-3 flex flex-col flex-1">

        <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
          {product.brand}
        </span>

        <p className="text-sm font-medium text-gray-800 mt-0.5 line-clamp-2 flex-1">
          {product.name}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-2">
          {[1,2,3,4,5].map((s) => (
            <Star
              key={s}
              size={11}
              className={s <= Math.round(product.rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
        </div>

        {/* Price + cart button */}
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-orange-600 font-bold text-base">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice > product.price && (
              <p className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>

          <button
            onClick={handleCart}
            disabled={product.stock === 0}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-full p-2 transition-colors"
          >
            <ShoppingCart size={15} />
          </button>
        </div>

      </div>
    </Link>
  )
}