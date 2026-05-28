'use client'
// app/(shop)/cart/page.tsx — Cart with promo code system

import { useState } from 'react'
import Link from 'next/link'
import { Trash2, ShoppingBag, Tag, X } from 'lucide-react'
import { useCartStore }  from '@/lib/store/cartStore'
import { usePromoStore } from '@/lib/store/promoStore'
import { useHydrated }   from '@/lib/hooks/useHydrated'
import { formatPrice }   from '@/lib/types'
import { toast } from 'sonner'

export default function CartPage() {
  const hydrated = useHydrated()
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore()
  const { code, discount, label, applyCode, removeCode, getTotal }    = usePromoStore()
  const [promoInput, setPromoInput] = useState('')
  const [applying,   setApplying]   = useState(false)

  if (!hydrated) return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
      {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />)}
    </div>
  )

  if (items.length === 0) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <ShoppingBag size={64} className="mx-auto text-gray-200 mb-4" />
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">Add products to get started.</p>
      <Link href="/" className="inline-block bg-orange-500 text-white font-bold px-8 py-3 rounded-full hover:bg-orange-600 transition">
        Start Shopping
      </Link>
    </div>
  )

  function handleApplyPromo() {
    if (!promoInput.trim()) return
    setApplying(true)
    setTimeout(() => {
      const result = applyCode(promoInput, totalPrice())
      if (result.success) {
        toast.success(result.message)
        setPromoInput('')
      } else {
        toast.error(result.message)
      }
      setApplying(false)
    }, 600)
  }

  const subtotal  = totalPrice()
  const finalTotal = getTotal(subtotal)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        My Cart <span className="text-gray-400 font-normal text-lg">({totalItems()} items)</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="bg-white rounded-xl p-4 flex gap-4 shadow-sm">
              <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover rounded-lg bg-gray-100 shrink-0" />
              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.id}`}>
                  <p className="font-medium text-gray-800 line-clamp-2 text-sm hover:text-orange-600 transition">{product.name}</p>
                </Link>
                <p className="text-orange-600 font-bold mt-1">{formatPrice(product.price)}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-gray-200 rounded-full overflow-hidden text-sm">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="px-3 py-1.5 hover:bg-gray-100 font-bold">−</button>
                    <span className="px-3 py-1.5 font-semibold">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="px-3 py-1.5 hover:bg-gray-100 font-bold">+</button>
                  </div>
                  <button onClick={() => removeItem(product.id)} className="text-red-400 hover:text-red-600 transition p-1">
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm h-fit space-y-4">
          <h3 className="font-bold text-gray-900 text-lg">Order Summary</h3>

          {/* Promo code input */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Tag size={14} className="text-orange-500" /> Promo Code
            </p>
            {code ? (
              <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
                <div>
                  <p className="text-green-700 font-bold text-sm">{code}</p>
                  <p className="text-green-600 text-xs">{label}</p>
                </div>
                <button onClick={() => { removeCode(); toast('Promo code removed') }}
                  className="text-green-500 hover:text-red-500 transition">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                  placeholder="Enter code..."
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300 uppercase font-mono"
                />
                <button onClick={handleApplyPromo} disabled={applying}
                  className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange-600 disabled:bg-orange-300 transition">
                  {applying ? '...' : 'Apply'}
                </button>
              </div>
            )}
            <p className="text-xs text-gray-400 mt-1">Try: BUYNOW10 · NIGERIA20 · SAVE5000</p>
          </div>

          {/* Price breakdown */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems()} items)</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Promo discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-gray-900 text-base">
              <span>Total</span>
              <span className="text-orange-600">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          <Link href="/checkout"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full text-center transition">
            Proceed to Checkout →
          </Link>
          <Link href="/products" className="block text-center text-orange-500 text-sm hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
