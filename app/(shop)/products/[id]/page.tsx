'use client'
// app/(shop)/products/[id]/page.tsx
// Product detail page with ReviewSection added

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ShoppingCart, Heart, Star, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { getProductById }          from '@/lib/api'
import { useCartStore }            from '@/lib/store/cartStore'
import { useWishlistStore }        from '@/lib/store/wishlistStore'
import { formatPrice, getDiscount } from '@/lib/types'
import type { Product }            from '@/lib/types'
import ReviewSection               from '@/components/product/ReviewSection'

export default function ProductDetailPage() {
  const { id }  = useParams<{ id: string }>()
  const router  = useRouter()
  const [product,       setProduct]       = useState<Product | null>(null)
  const [loading,       setLoading]       = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity,      setQuantity]      = useState(1)
  const addItem                           = useCartStore((s) => s.addItem)
  const { toggleItem, isInWishlist }      = useWishlistStore()

  useEffect(() => {
    if (!id) return
    getProductById(id)
      .then((p) => { setProduct(p); setLoading(false) })
      .catch(() => { toast.error('Product not found'); setLoading(false) })
  }, [id])

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-200 rounded-2xl h-96" />
        <div className="space-y-4">
          {[1,2,3,4].map(i => <div key={i} className="h-8 bg-gray-200 rounded" />)}
        </div>
      </div>
    </div>
  )

  if (!product) return (
    <div className="text-center py-20">
      <p className="text-5xl mb-4">404</p>
      <p className="text-gray-600 text-lg">Product not found.</p>
      <Link href="/" className="text-orange-500 hover:underline mt-2 inline-block">Back to home</Link>
    </div>
  )

  const discount = getDiscount(product.price, product.originalPrice)
  const wished   = isInWishlist(product.id)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 text-sm">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="bg-gray-100 rounded-2xl overflow-hidden mb-3">
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-80 md:h-96 object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${selectedImage === i ? 'border-orange-500' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-xs text-orange-500 uppercase tracking-widest font-semibold">{product.brand}</span>
            <h1 className="text-2xl font-bold text-gray-900 mt-1 leading-snug">{product.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={16}
                  className={s <= Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'} />
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.rating} · {product.reviewCount} reviews</span>
          </div>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-3xl font-bold text-orange-600">{formatPrice(product.price)}</span>
            {discount > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded-full">-{discount}% OFF</span>
              </>
            )}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          <p className={`text-sm font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-500' : 'text-red-500'}`}>
            {product.stock > 10 ? '✓ In stock' : product.stock > 0 ? `Only ${product.stock} left!` : 'Out of stock'}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Qty:</span>
            <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-gray-100 font-bold text-lg">−</button>
              <span className="px-4 py-2 font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-4 py-2 hover:bg-gray-100 font-bold text-lg">+</button>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { addItem(product, quantity); toast.success('Added to cart!') }}
              disabled={product.stock === 0}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 transition">
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button onClick={() => { toggleItem(product); toast(wished ? 'Removed from wishlist' : 'Saved!') }}
              className={`border-2 rounded-full p-3 transition ${wished ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}>
              <Heart size={20} className={wished ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
            </button>
            <button onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success('Link copied!') }}
              className="border-2 border-gray-200 rounded-full p-3 hover:border-gray-300 transition">
              <Share2 size={20} className="text-gray-400" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t">
            {[{ emoji: '🚚', text: 'Fast Delivery' }, { emoji: '🔒', text: 'Secure Pay' }, { emoji: '↩️', text: '7-Day Return' }].map((b) => (
              <div key={b.text} className="text-center p-2 bg-gray-50 rounded-xl">
                <p className="text-lg">{b.emoji}</p>
                <p className="text-xs text-gray-500 mt-0.5">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews section injected here */}
      <ReviewSection productId={product.id} productName={product.name} />
    </div>
  )
}
