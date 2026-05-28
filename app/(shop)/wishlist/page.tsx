'use client'

// app/(shop)/wishlist/page.tsx
// ✅ useHydrated prevents empty wishlist flash on first load

import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useWishlistStore } from '@/lib/store/wishlistStore'
import { useCartStore }     from '@/lib/store/cartStore'
import { useHydrated }      from '@/lib/hooks/useHydrated'
import { formatPrice }      from '@/lib/types'
import { toast } from 'sonner'

export default function WishlistPage() {
  const hydrated = useHydrated()
  const { items, removeItem, clear } = useWishlistStore()
  const addToCart = useCartStore((s) => s.addItem)

  // Skeleton while hydrating
  if (!hydrated) return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  )

  function handleMoveToCart(product: (typeof items)[0]) {
    addToCart(product)
    removeItem(product.id)
    toast.success('Moved to cart!')
  }

  if (items.length === 0) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <Heart size={64} className="mx-auto text-gray-200 mb-4" />
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Your wishlist is empty</h2>
      <p className="text-gray-500 mb-6">Tap the ❤️ on any product to save it here.</p>
      <Link href="/products" className="inline-block bg-orange-500 text-white font-bold px-8 py-3 rounded-full hover:bg-orange-600 transition">
        Explore Products
      </Link>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          My Wishlist
          <span className="text-gray-400 font-normal text-lg ml-2">({items.length})</span>
        </h1>
        <button onClick={clear} className="text-sm text-red-400 hover:text-red-600 transition">
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
            <Link href={`/products/${product.id}`}>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <div className="p-3">
              <p className="text-xs text-gray-400 uppercase tracking-wide">{product.brand}</p>
              <p className="text-sm font-medium text-gray-800 line-clamp-2 mt-0.5">{product.name}</p>
              <p className="text-orange-600 font-bold mt-1">{formatPrice(product.price)}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleMoveToCart(product)}
                  className="flex-1 flex items-center justify-center gap-1 bg-orange-500 text-white text-xs font-medium py-2 rounded-full hover:bg-orange-600 transition"
                >
                  <ShoppingCart size={13} /> Add to Cart
                </button>
                <button
                  onClick={() => { removeItem(product.id); toast('Removed from wishlist') }}
                  className="p-2 text-red-400 hover:text-red-600 border border-gray-200 rounded-full hover:border-red-300 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
