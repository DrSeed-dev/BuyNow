'use client'
// app/help/faq/page.tsx

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'

const FAQS = [
  {
    category: 'Orders',
    icon: '📦',
    questions: [
      {
        q: 'How do I place an order on BuyNow?',
        a: 'Browse our products, click "Add to Cart", then go to your cart and click "Proceed to Checkout". Fill in your delivery address, choose a payment method, and confirm your order. You will receive an SMS and email confirmation immediately.',
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'You can cancel or modify your order within 1 hour of placing it. After that, the order goes into processing and cannot be changed. Go to My Account → My Orders and click "Cancel Order" if it is still within the window.',
      },
      {
        q: 'How do I track my order?',
        a: 'Go to My Account → My Orders. Click on any order to see its live tracking status — from "Processing" to "Shipped" to "Delivered". You will also receive SMS updates at each stage.',
      },
      {
        q: 'What happens if my item is out of stock after I order?',
        a: 'If an item goes out of stock after your order, we will notify you immediately via SMS and email. You can choose a full refund or a replacement product of equal or higher value.',
      },
    ],
  },
  {
    category: 'Payments',
    icon: '💳',
    questions: [
      {
        q: 'What payment methods does BuyNow accept?',
        a: 'We accept Debit/Credit Cards (Visa, Mastercard, Verve), Bank Transfer, and USSD payments. All payments are secured with SSL encryption. We do not store your card details.',
      },
      {
        q: 'Is it safe to pay on BuyNow?',
        a: 'Yes, 100%. We use SSL encryption and comply with PCI DSS payment security standards. Your card information is never stored on our servers. All transactions are processed by verified Nigerian payment gateways.',
      },
      {
        q: 'How do promo codes work?',
        a: 'On the Cart page, enter your promo code in the "Promo Code" field and click Apply. The discount will be deducted from your order total immediately. Only one promo code can be applied per order.',
      },
      {
        q: 'When will I be charged for my order?',
        a: 'Payment is taken immediately when you place your order. If your order is cancelled or an item becomes unavailable, a full refund is processed within 3–5 business days.',
      },
    ],
  },
  {
    category: 'Delivery',
    icon: '🚚',
    questions: [
      {
        q: 'How long does delivery take?',
        a: 'Lagos express orders placed before 2PM are delivered same day. Standard delivery within Lagos, Abuja, and Port Harcourt takes 1–3 business days. Other states take 3–7 business days depending on location.',
      },
      {
        q: 'Do you deliver to my location?',
        a: 'We deliver to all 36 states in Nigeria plus FCT Abuja. Some remote areas may have longer delivery times. Check the Shipping Info page for your state\'s estimated delivery time.',
      },
      {
        q: 'What if nobody is home at delivery time?',
        a: 'Our delivery agent will call you 30 minutes before arrival. If nobody is available, they will attempt delivery again the next business day. After 2 failed attempts, your order is returned and refunded.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    icon: '↩️',
    questions: [
      {
        q: 'How do I return a product?',
        a: 'Go to My Account → My Orders, find the item, and click "Return Item". Select your reason and we will arrange a free pickup within 24 hours. Refunds are processed after we inspect the returned item.',
      },
      {
        q: 'How long do I have to return an item?',
        a: 'You have 7 days from the delivery date to initiate a return. Items must be in their original condition with all tags and packaging intact.',
      },
      {
        q: 'When will I receive my refund?',
        a: 'Card refunds take 3–5 business days. Bank transfers take 1–3 business days. BuyNow wallet credit is instant. You will receive an email confirmation once your refund is processed.',
      },
    ],
  },
  {
    category: 'Account',
    icon: '👤',
    questions: [
      {
        q: 'How do I create a BuyNow account?',
        a: 'Click "Register" in the top navigation. Enter your full name, email, Nigerian phone number, and a password. Your account is created instantly — no waiting for verification.',
      },
      {
        q: 'I forgot my password. How do I reset it?',
        a: 'On the Login page, click "Forgot Password?" and enter your email address. We will send you a reset link within 5 minutes. Check your spam folder if you do not see it.',
      },
      {
        q: 'Can I shop without creating an account?',
        a: 'You can browse and add items to your cart without an account. However, you will need to create a free account to complete a purchase and track your orders.',
      },
    ],
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex]   = useState<string | null>(null)
  const [search, setSearch]         = useState('')

  const filtered = FAQS.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(search.toLowerCase()) ||
        q.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.questions.length > 0)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-500 mb-6">Find quick answers to common questions about BuyNow.</p>

        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-orange-300 text-sm"
          />
        </div>
      </div>

      {/* FAQ categories */}
      <div className="space-y-6">
        {filtered.map((cat) => (
          <div key={cat.category}>
            <h2 className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-lg">
              <span>{cat.icon}</span> {cat.category}
            </h2>
            <div className="space-y-2">
              {cat.questions.map((faq, i) => {
                const key  = `${cat.category}-${i}`
                const open = openIndex === key
                return (
                  <div key={key} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(open ? null : key)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
                    >
                      <span className="font-medium text-gray-800 text-sm pr-4">{faq.q}</span>
                      {open
                        ? <ChevronUp size={18} className="text-orange-500 shrink-0" />
                        : <ChevronDown size={18} className="text-gray-400 shrink-0" />
                      }
                    </button>
                    {open && (
                      <div className="px-5 pb-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600 leading-relaxed pt-3">{faq.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-gray-500">No results for "{search}"</p>
        </div>
      )}

      {/* Still need help */}
      <div className="mt-10 bg-orange-50 border border-orange-100 rounded-2xl p-6 text-center">
        <p className="text-xl font-bold text-gray-900 mb-1">Still have questions?</p>
        <p className="text-gray-500 text-sm mb-4">Our support team is available 7 days a week.</p>
        <Link href="/help/contact"
          className="inline-block bg-orange-500 text-white font-bold px-8 py-3 rounded-full hover:bg-orange-600 transition">
          Contact Support →
        </Link>
      </div>

    </div>
  )
}
