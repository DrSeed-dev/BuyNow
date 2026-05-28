'use client'

// app/(shop)/checkout/success/page.tsx

import Link from 'next/link'
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SuccessPage() {
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    // Generate a fake order ID — replace with real ID from API later
    setOrderId('BN' + Date.now().toString().slice(-8))
  }, [])

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">

      {/* Success icon */}
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={52} className="text-green-500" />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed! 🎉</h1>
      <p className="text-gray-500 mb-1">Thank you for shopping with BuyNow</p>
      <p className="text-sm text-orange-600 font-medium mb-8">Order ID: {orderId}</p>

      {/* Timeline */}
      <div className="bg-white rounded-2xl p-6 shadow-sm text-left mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
        <div className="space-y-4">
          {[
            { icon: '✅', title: 'Order confirmed',    sub: 'We received your order',                 done: true  },
            { icon: '📦', title: 'Packing',            sub: 'Your items are being packed',            done: false },
            { icon: '🚚', title: 'Out for delivery',   sub: 'Our rider is on the way',               done: false },
            { icon: '🏠', title: 'Delivered',          sub: 'Enjoy your BuyNow purchase!',           done: false },
          ].map((step) => (
            <div key={step.title} className="flex items-start gap-3">
              <span className="text-xl">{step.icon}</span>
              <div>
                <p className={`font-medium text-sm ${step.done ? 'text-green-600' : 'text-gray-700'}`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/account/orders"
          className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white font-bold py-3 rounded-full hover:bg-orange-600 transition"
        >
          <Package size={18} /> Track Order
        </Link>
        <Link
          href="/"
          className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-full hover:border-orange-300 hover:text-orange-600 transition"
        >
          <ShoppingBag size={18} /> Keep Shopping
        </Link>
      </div>
    </div>
  )
}
