// app/help/shipping/page.tsx — Mobile responsive fix

import Link from 'next/link'
import { Truck, MapPin, Clock, Package } from 'lucide-react'

export const metadata = { title: 'Shipping Information' }

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Truck size={32} className="text-blue-500" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Shipping Information</h1>
        <p className="text-gray-500">Fast and reliable delivery across Nigeria.</p>
      </div>

      <div className="space-y-3 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Delivery Options</h2>
        {[
          {
            icon: '⚡', border: 'border-yellow-200',
            badge: 'Fastest', badgeBg: 'bg-yellow-400 text-yellow-900',
            title: 'Express Delivery',
            locations: 'Lagos Island, VI, Lekki, Ikeja',
            time: 'Same Day (orders before 2PM)',
            price: '₦1,500',
          },
          {
            icon: '🚚', border: 'border-orange-200',
            badge: 'Most Popular', badgeBg: 'bg-orange-500 text-white',
            title: 'Standard Delivery',
            locations: 'All Lagos, Abeokuta, Ibadan, Abuja, Port Harcourt, Kano',
            time: '1–3 Business Days',
            price: '₦1,000',
          },
          {
            icon: '📦', border: 'border-blue-200',
            badge: 'All Nigeria', badgeBg: 'bg-blue-500 text-white',
            title: 'Nationwide Delivery',
            locations: 'All 36 States + FCT Abuja',
            time: '3–7 Business Days',
            price: '₦1,500 – ₦3,000',
          },
          {
            icon: '🎁', border: 'border-green-200',
            badge: 'Free', badgeBg: 'bg-green-500 text-white',
            title: 'Free Delivery',
            locations: 'Abeokuta, Lagos & Abuja',
            time: '1–2 Business Days',
            price: 'FREE above ₦50,000',
          },
        ].map((d) => (
          <div key={d.title} className={`bg-white rounded-2xl p-4 border ${d.border} shadow-sm`}>
            {/* Top row: icon + title + badge + price */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl shrink-0">{d.icon}</span>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-bold text-gray-900 text-sm">{d.title}</h3>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${d.badgeBg}`}>
                      {d.badge}
                    </span>
                  </div>
                </div>
              </div>
              {/* Price always top right — no overflow */}
              <p className="font-black text-orange-600 text-xs shrink-0 text-right whitespace-nowrap">
                {d.price}
              </p>
            </div>
            {/* Bottom row: location + time */}
            <div className="pl-8 space-y-0.5">
              <p className="text-xs text-gray-500">📍 {d.locations}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Clock size={10} className="shrink-0" /> {d.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin size={20} className="text-orange-500" /> Coverage by State
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { state: 'Abeokuta/Lagos', time: 'Same Day / 1–3 Days', hot: true  },
            { state: 'Abuja (FCT)',    time: '1–3 Days',            hot: true  },
            { state: 'Port Harcourt', time: '2–4 Days',            hot: true  },
            { state: 'Kano',          time: '3–5 Days',            hot: false },
            { state: 'Ibadan',        time: '2–3 Days',            hot: false },
            { state: 'Benin City',    time: '2–4 Days',            hot: false },
            { state: 'Enugu',         time: '3–5 Days',            hot: false },
            { state: 'Kaduna',        time: '3–5 Days',            hot: false },
            { state: 'Other States',  time: '4–7 Days',            hot: false },
          ].map((s) => (
            <div key={s.state}
              className={`rounded-xl p-2.5 border ${s.hot ? 'border-orange-200 bg-orange-50' : 'border-gray-100 bg-gray-50'}`}>
              <p className={`font-semibold text-xs ${s.hot ? 'text-orange-700' : 'text-gray-700'}`}>{s.state}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.time}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Package size={18} className="text-blue-500" /> Important Notes
        </h3>
        <ul className="space-y-2">
          {[
            'Orders placed after 2PM are processed the next business day.',
            'Delivery times exclude Sundays and public holidays.',
            'You will receive an SMS and email when your order ships.',
            'Someone must be available to receive the package.',
            'For bulk or fragile items, extra packaging fee may apply.',
          ].map((note) => (
            <li key={note} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-blue-500 shrink-0 mt-0.5">•</span> {note}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <p className="text-gray-500 text-sm mb-3">Questions about your delivery?</p>
        <Link href="/help/contact"
          className="inline-block bg-orange-500 text-white font-bold px-8 py-3 rounded-full hover:bg-orange-600 transition">
          Contact Support →
        </Link>
      </div>

    </div>
  )
}
