'use client'
// app/help/contact/page.tsx

import { useState } from 'react'
import { toast } from 'sonner'
import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      toast.success('Message sent! We will respond within 24 hours.')
    }, 1200)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Contact Support</h1>
        <p className="text-gray-500 max-w-md mx-auto">
          We are here to help. Reach us through any channel below or send us a message.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">

        {/* Contact channels */}
        <div className="md:col-span-2 space-y-4">
          {[
            {
              Icon: Phone,
              color: 'bg-green-50 text-green-600',
              title: 'Phone',
              value: '0800-BUYNOW-NG',
              sub: 'Mon – Sat, 8am – 8pm',
              href: 'tel:09168172-546',
            },
            {
              Icon: MessageCircle,
              color: 'bg-green-50 text-green-600',
              title: 'WhatsApp',
              value: '+234 916 817 2546',
              sub: 'Chat with us anytime',
              href: 'https://wa.me/2349168172546',
            },
            {
              Icon: Mail,
              color: 'bg-blue-50 text-blue-600',
              title: 'Email',
              value: 'support@buynow.ng',
              sub: 'We reply within 24 hours',
              href: 'mailto:support@buynow.ng',
            },
            {
              Icon: MapPin,
              color: 'bg-orange-50 text-orange-600',
              title: 'Office',
              value: 'Odeda LGA, Abeokuta, Ogun State',
              sub: 'Obantoko Street',
              href: '#',
            },
            {
              Icon: Clock,
              color: 'bg-purple-50 text-purple-600',
              title: 'Working Hours',
              value: 'Mon – Sat: 8am – 8pm',
              sub: 'Sun: 10am – 5pm',
              href: '#',
            },
          ].map(({ Icon, color, title, value, sub, href }) => (
            <a key={title} href={href}
              className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition border border-gray-100 group">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{title}</p>
                <p className="font-bold text-gray-900 text-sm mt-0.5 group-hover:text-orange-600 transition">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Contact form */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required placeholder="Oluwatoyin Olamide"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="09168172546" type="tel"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required type="email" placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 bg-white">
                  <option value="">Select a topic</option>
                  <option>Order Issue</option>
                  <option>Payment Problem</option>
                  <option>Delivery Question</option>
                  <option>Return / Refund</option>
                  <option>Product Question</option>
                  <option>Account Problem</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required rows={4} placeholder="Describe your issue or question..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 resize-none" />
              </div>
              <button type="submit" disabled={sending}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 rounded-full transition">
                {sending ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
