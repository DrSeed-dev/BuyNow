'use client'
// app/account/orders/page.tsx
// Fix: Custom reason selector — no native dropdown popup on mobile

import { useState } from 'react'
import Link from 'next/link'
import { Package, ShoppingBag, X, CheckCircle } from 'lucide-react'
import { useAuthStore } from '@/lib/store/authStore'
import { toast } from 'sonner'

const DEMO_ORDERS = [
  {
    id: 'BN98231456', date: '2026-05-19', status: 'delivered', total: 470000, canReturn: true,
    items: [
      { name: 'Samsung Galaxy A55 5G',  image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100', qty: 1 },
      { name: 'Oraimo FreePods 4 TWS',  image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100', qty: 1 },
    ],
  },
  {
    id: 'BN72019834', date: '2026-05-12', status: 'shipped', total: 65000, canReturn: false,
    items: [
      { name: "Nike Air Force 1 '07", image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=100', qty: 1 },
    ],
  },
  {
    id: 'BN60112233', date: '2026-04-28', status: 'processing', total: 850000, canReturn: false,
    items: [
      { name: 'Honda CB125F Motorcycle', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100', qty: 1 },
    ],
  },
]

const STATUS_STYLE: Record<string, string> = {
  delivered:  'bg-green-100 text-green-700',
  shipped:    'bg-blue-100 text-blue-700',
  processing: 'bg-orange-100 text-orange-700',
  pending:    'bg-yellow-100 text-yellow-700',
  cancelled:  'bg-red-100 text-red-600',
}

const RETURN_REASONS = [
  'Item received damaged',
  'Wrong item delivered',
  'Item does not match description',
  'Item is defective',
  'Changed my mind',
  'Other',
]

function ReturnModal({ orderId, onClose, onSubmit }: {
  orderId: string
  onClose: () => void
  onSubmit: (reason: string) => void
}) {
  const [reason, setReason] = useState('')

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pb-20 sm:pb-0 px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      {/* Sheet slides up from bottom on mobile, centered on desktop */}
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl p-6 shadow-2xl">

        {/* Handle bar — mobile only */}
        <div className="w-15 h-1 bg-gray-200 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Request a Return</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">Order #{orderId} · Select your reason below</p>

        {/* Custom button list — no native dropdown */}
        <div className="space-y-2 mb-5">
          {RETURN_REASONS.map((r) => (
            <button
              key={r}
              onClick={() => setReason(r)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition border ${
                reason === r
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-gray-50 text-gray-700 border-gray-100 hover:border-orange-300 hover:bg-orange-50'
              }`}
            >
              {reason === r ? '✓ ' : ''}{r}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border-2 border-gray-200 text-gray-600 font-medium py-3 rounded-full text-sm hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => reason && onSubmit(reason)}
            disabled={!reason}
            className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 rounded-full text-sm transition"
          >
            Submit Return
          </button>
        </div>

      </div>
    </div>
  )
}

export default function OrdersPage() {
  const { isLoggedIn } = useAuthStore()
  const [returnOrderId,  setReturnOrderId]  = useState<string | null>(null)
  const [returnedOrders, setReturnedOrders] = useState<string[]>([])

  if (!isLoggedIn) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <p className="text-gray-500 mb-4">Please log in to view your orders.</p>
      <Link href="/auth/login"
        className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-medium hover:bg-orange-600 transition">
        Login
      </Link>
    </div>
  )

  function handleReturnSubmit(reason: string) {
    if (!returnOrderId) return
    setReturnedOrders((prev) => [...prev, returnOrderId])
    setReturnOrderId(null)
    toast.success('Return request submitted!', {
      description: 'We will arrange free pickup within 24 hours.',
      duration: 5000,
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

      {DEMO_ORDERS.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag size={56} className="mx-auto text-gray-200 mb-3" />
          <p className="text-gray-500">You have not placed any orders yet.</p>
          <Link href="/products" className="text-orange-500 mt-2 inline-block hover:underline font-medium">
            Start Shopping →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {DEMO_ORDERS.map((order) => {
            const returned = returnedOrders.includes(order.id)
            return (
              <div key={order.id} className="bg-white rounded-xl shadow-sm p-5">

                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Order #{order.id}</p>
                    <p className="text-xs text-gray-500">
                      Placed on {new Date(order.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${STATUS_STYLE[order.status] || 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                </div>

                <div className="flex gap-2 mb-3 flex-wrap">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 flex-1 min-w-[160px]">
                      <img src={item.image} alt="" className="w-10 h-10 object-cover rounded-lg bg-gray-200 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-700 line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t flex-wrap gap-2">
                  <p className="font-bold text-gray-900">
                    ₦{order.total.toLocaleString('en-NG')}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button className="flex items-center gap-1 text-orange-500 text-sm font-medium hover:underline">
                      <Package size={14} /> Track Order
                    </button>
                    {order.canReturn && !returned && (
                      <button
                        onClick={() => setReturnOrderId(order.id)}
                        className="flex items-center gap-1 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full transition">
                        ↩️ Return Item
                      </button>
                    )}
                    {returned && (
                      <span className="flex items-center gap-1 bg-green-50 text-green-600 text-xs font-medium px-3 py-1.5 rounded-full">
                        <CheckCircle size={12} /> Return Requested
                      </span>
                    )}
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      )}

      {returnOrderId && (
        <ReturnModal
          orderId={returnOrderId}
          onClose={() => setReturnOrderId(null)}
          onSubmit={handleReturnSubmit}
        />
      )}
    </div>
  )
}
