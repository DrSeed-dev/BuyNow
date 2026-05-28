'use client'

// app/(shop)/checkout/page.tsx — Step 1: Shipping Address

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/store/cartStore'
import { formatPrice }  from '@/lib/types'
import Link from 'next/link'

const NIGERIAN_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
  'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa',
  'Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba',
  'Yobe','Zamfara',
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice } = useCartStore()

  const [form, setForm] = useState({
    fullName: '', phone: '', street: '', city: '', state: '',
  })
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
        <Link href="/" className="text-orange-500 mt-2 inline-block hover:underline">Go shopping</Link>
      </div>
    )
  }

  function validate() {
    const e: Partial<typeof form> = {}
    if (!form.fullName.trim())  e.fullName = 'Full name is required'
    if (!form.phone.trim())     e.phone    = 'Phone number is required'
    if (!form.street.trim())    e.street   = 'Address is required'
    if (!form.city.trim())      e.city     = 'City is required'
    if (!form.state)            e.state    = 'State is required'
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    // Save address to sessionStorage — simple for now, Zustand later
    sessionStorage.setItem('buynow-address', JSON.stringify(form))
    router.push('/checkout/payment')
  }

  function field(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8">
        {['Shipping', 'Payment', 'Confirm'].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {i + 1}
            </div>
            <span className={`text-sm font-medium ${i === 0 ? 'text-orange-600' : 'text-gray-400'}`}>{step}</span>
            {i < 2 && <div className="w-8 h-px bg-gray-300" />}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* ── Address form ── */}
        <form onSubmit={handleSubmit} className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>

          {/* Full name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              value={form.fullName}
              onChange={(e) => field('fullName', e.target.value)}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 ${errors.fullName ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="e.g. Emeka Okafor"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              value={form.phone}
              onChange={(e) => field('phone', e.target.value)}
              type="tel"
              className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="e.g. 08012345678"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Street */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
            <input
              value={form.street}
              onChange={(e) => field('street', e.target.value)}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 ${errors.street ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="e.g. 12 Adeola Odeku Street"
            />
            {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
          </div>

          {/* City + State */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                value={form.city}
                onChange={(e) => field('city', e.target.value)}
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 ${errors.city ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="e.g. Victoria Island"
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <select
                value={form.state}
                onChange={(e) => field('state', e.target.value)}
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 bg-white ${errors.state ? 'border-red-400' : 'border-gray-200'}`}
              >
                <option value="">Select state</option>
                {NIGERIAN_STATES.map((s) => <option key={s}>{s}</option>)}
              </select>
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full transition mt-2"
          >
            Continue to Payment →
          </button>
        </form>

        {/* ── Order summary ── */}
        <div className="bg-white rounded-xl p-5 shadow-sm h-fit">
          <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-2 text-sm">
                <img src={product.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg bg-gray-100 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="line-clamp-1 text-gray-700">{product.name}</p>
                  <p className="text-gray-500 text-xs">x{quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span className="text-orange-600">{formatPrice(totalPrice())}</span>
          </div>
        </div>

      </div>
    </div>
  )
}
