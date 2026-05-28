'use client'

// app/(shop)/checkout/payment/page.tsx — Step 2: Payment

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Building2, CheckCircle } from 'lucide-react'
import { useCartStore } from '@/lib/store/cartStore'
import { formatPrice } from '@/lib/types'

type Method = 'card' | 'transfer'

export default function PaymentPage() {
  const router = useRouter()
  const { totalPrice } = useCartStore()
  const [method, setMethod] = useState<Method>('card')
  const [processing, setProcessing] = useState(false)

  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' })

  function formatCardNumber(val: string) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }

  function formatExpiry(val: string) {
    const clean = val.replace(/\D/g, '').slice(0, 4)
    return clean.length >= 2 ? `${clean.slice(0,2)}/${clean.slice(2)}` : clean
  }

  function handlePay(e: React.FormEvent) {
    e.preventDefault()
    setProcessing(true)
    // Simulate payment processing — 2 second delay
    setTimeout(() => {
      setProcessing(false)
      router.push('/checkout/confirm')
    }, 2000)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8">
        {['Shipping', 'Payment', 'Confirm'].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 ? 'bg-green-500 text-white' : i === 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {i === 0 ? '✓' : i + 1}
            </div>
            <span className={`text-sm font-medium ${i === 1 ? 'text-orange-600' : i === 0 ? 'text-green-600' : 'text-gray-400'}`}>{step}</span>
            {i < 2 && <div className="w-8 h-px bg-gray-300" />}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>

          {/* Method selector */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMethod('card')}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition ${method === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              <CreditCard size={22} className={method === 'card' ? 'text-orange-500' : 'text-gray-400'} />
              <div className="text-left">
                <p className="font-semibold text-sm text-gray-900">Debit/Credit Card</p>
                <p className="text-xs text-gray-500">Visa, Mastercard</p>
              </div>
            </button>
            <button
              onClick={() => setMethod('transfer')}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition ${method === 'transfer' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              <Building2 size={22} className={method === 'transfer' ? 'text-orange-500' : 'text-gray-400'} />
              <div className="text-left">
                <p className="font-semibold text-sm text-gray-900">Bank Transfer</p>
                <p className="text-xs text-gray-500">Direct bank payment</p>
              </div>
            </button>
          </div>

          {/* Card form */}
          {method === 'card' && (
            <form onSubmit={handlePay} className="bg-white rounded-xl p-6 shadow-sm space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Card Number</label>
                <input
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                  placeholder="1234 5678 9012 3456"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 font-mono"
                  maxLength={19}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Cardholder Name</label>
                <input
                  value={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                  placeholder="EMEKA OKAFOR"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 uppercase"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Expiry Date</label>
                  <input
                    value={card.expiry}
                    onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                    placeholder="MM/YY"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 font-mono"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">CVV</label>
                  <input
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g,'').slice(0,4) })}
                    placeholder="123"
                    type="password"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 font-mono"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 rounded-full transition flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Processing...
                  </>
                ) : `Pay ${formatPrice(totalPrice())} →`}
              </button>
              <p className="text-xs text-gray-400 text-center">🔒 This is a demo — no real payment is taken.</p>
            </form>
          )}

          {/* Bank transfer */}
          {method === 'transfer' && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
                <p className="font-semibold text-gray-900 mb-1">Bank Transfer Details</p>
                <p className="text-sm text-gray-600">Bank: <strong>Zenith Bank</strong></p>
                <p className="text-sm text-gray-600">Account No: <strong>2012345678</strong></p>
                <p className="text-sm text-gray-600">Account Name: <strong>BuyNow Nigeria Ltd</strong></p>
                <p className="text-sm text-orange-600 font-medium mt-2">Amount: {formatPrice(totalPrice())}</p>
              </div>
              <p className="text-sm text-gray-500 mb-4">Transfer the exact amount and click confirm below.</p>
              <button
                onClick={() => router.push('/checkout/confirm')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full transition"
              >
                I've Made the Transfer →
              </button>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl p-5 shadow-sm h-fit">
          <h3 className="font-bold text-gray-900 mb-3">Amount Due</h3>
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {formatPrice(totalPrice())}
          </div>
          <p className="text-xs text-gray-400">Includes free delivery in Nigeria.</p>
        </div>

      </div>
    </div>
  )
}
