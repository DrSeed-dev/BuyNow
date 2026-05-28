'use client'

// app/(shop)/checkout/confirm/page.tsx — Step 3: Order Confirmation

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/store/cartStore'
import { formatPrice } from '@/lib/types'
import { CheckCircle, MapPin, CreditCard } from 'lucide-react'
import { toast } from 'sonner'

export default function ConfirmPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCartStore()
  const [address, setAddress] = useState<Record<string,string> | null>(null)
  const [placing, setPlacing] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem('buynow-address')
    if (saved) setAddress(JSON.parse(saved))
  }, [])

  function handlePlaceOrder() {
    setPlacing(true)
    setTimeout(() => {
      clearCart()
      sessionStorage.removeItem('buynow-address')
      router.push('/checkout/success')
    }, 1500)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8">
        {['Shipping', 'Payment', 'Confirm'].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${i < 2 ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
              {i < 2 ? '✓' : i + 1}
            </div>
            <span className={`text-sm font-medium ${i === 2 ? 'text-orange-600' : 'text-green-600'}`}>{step}</span>
            {i < 2 && <div className="w-8 h-px bg-green-400" />}
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Review Your Order</h2>

      <div className="space-y-4">

        {/* Shipping address */}
        {address && (
          <div className="bg-white rounded-xl p-4 shadow-sm flex gap-3">
            <MapPin className="text-orange-500 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-gray-900 text-sm mb-0.5">Delivery Address</p>
              <p className="text-sm text-gray-600">{address.fullName} · {address.phone}</p>
              <p className="text-sm text-gray-600">{address.street}, {address.city}, {address.state}</p>
            </div>
          </div>
        )}

        {/* Items */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="font-semibold text-gray-900 text-sm mb-3">
            Items ({items.length})
          </p>
          <div className="space-y-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-3">
                <img src={product.images[0]} alt="" className="w-12 h-12 object-cover rounded-lg bg-gray-100 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 line-clamp-1">{product.name}</p>
                  <p className="text-xs text-gray-500">Qty: {quantity}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900 shrink-0">
                  {formatPrice(product.price * quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Total + CTA */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-1 text-sm text-gray-600">
            <span>Subtotal</span><span>{formatPrice(totalPrice())}</span>
          </div>
          <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
            <span>Delivery</span><span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between items-center font-bold text-lg border-t pt-3">
            <span>Total</span>
            <span className="text-orange-600">{formatPrice(totalPrice())}</span>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={placing}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 rounded-full transition text-lg flex items-center justify-center gap-2"
        >
          {placing ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Placing Order...
            </>
          ) : '✓ Place Order'}
        </button>

      </div>
    </div>
  )
}
