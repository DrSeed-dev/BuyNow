// app/help/returns/page.tsx

import Link from 'next/link'
import { RotateCcw, CheckCircle, XCircle, Clock } from 'lucide-react'

export const metadata = { title: 'Returns & Refunds Policy' }

export default function ReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <RotateCcw size={32} className="text-orange-500" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Returns & Refunds</h1>
        <p className="text-gray-500">Easy returns within 7 days. Your satisfaction is guaranteed.</p>
      </div>

      {/* Quick overview */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: '📦', title: '7-Day Returns',   sub: 'From delivery date'     },
          { icon: '💳', title: 'Full Refund',      sub: 'To original payment'    },
          { icon: '🚚', title: 'Free Pickup',      sub: 'We collect from you'    },
        ].map((b) => (
          <div key={b.title} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <span className="text-3xl">{b.icon}</span>
            <p className="font-bold text-gray-900 text-sm mt-2">{b.title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{b.sub}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">

        {/* How to return */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={20} className="text-orange-500" /> How to Start a Return
          </h2>
          <div className="space-y-3">
            {[
              { step: '1', text: 'Go to My Account → My Orders and find the item you want to return.' },
              { step: '2', text: 'Click "Return Item" and select your reason from the list.' },
              { step: '3', text: 'We will send a confirmation and schedule a free pickup within 24 hours.' },
              { step: '4', text: 'Once we receive and inspect the item, your refund is processed in 3–5 business days.' },
            ].map((s) => (
              <div key={s.step} className="flex gap-3">
                <div className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  {s.step}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What can be returned */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" /> Eligible for Return
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                'Item received damaged or broken',
                'Wrong item was delivered',
                'Item does not match description',
                'Item is defective or not working',
                'Sealed item unopened (all categories)',
                'Clothing — unworn with original tags',
              ].map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span> {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <XCircle size={18} className="text-red-400" /> Not Eligible
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                'Items returned after 7 days',
                'Used or worn clothing/footwear',
                'Perishable groceries & food items',
                'Digital products & software',
                'Items damaged by misuse',
                'Missing original packaging',
              ].map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 shrink-0">✕</span> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Refund timeline */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">Refund Timeline</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between py-2 border-b border-orange-100">
              <span>Debit/Credit Card</span><span className="font-semibold text-gray-800">3–5 business days</span>
            </div>
            <div className="flex justify-between py-2 border-b border-orange-100">
              <span>Bank Transfer</span><span className="font-semibold text-gray-800">1–3 business days</span>
            </div>
            <div className="flex justify-between py-2">
              <span>BuyNow Wallet Credit</span><span className="font-semibold text-green-600">Instant</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm mb-3">Need help with a return?</p>
          <Link href="/help/contact"
            className="inline-block bg-orange-500 text-white font-bold px-8 py-3 rounded-full hover:bg-orange-600 transition">
            Contact Support →
          </Link>
        </div>

      </div>
    </div>
  )
}
