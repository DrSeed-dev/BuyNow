'use client'
// components/shared/NotificationBanner.tsx
// Promotional push notification — appears after 5 seconds, dismissable

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Bell } from 'lucide-react'

const NOTIFICATIONS = [
  { message: '⚡ Flash Deal ending soon! Samsung Galaxy A55 — save 11%',    href: '/products/1'  },
  { message: '🔥 New arrivals in Motors & Bikes — Honda, Bajaj, TVS!',       href: '/category/motors-bikes' },
  { message: '🇳🇬 Nigerian Market now live — Ankara, Shea Butter & more!',   href: '/category/nigerian-market' },
  { message: '🎟️ Use code BUYNOW10 for 10% off your first order!',           href: '/cart' },
]

export default function NotificationBanner() {
  const [visible,     setVisible]     = useState(false)
  const [dismissed,   setDismissed]   = useState(false)
  const [notifIndex,  setNotifIndex]  = useState(0)

  useEffect(() => {
    // Don't show if already dismissed this session
    const dismissed = sessionStorage.getItem('notif-dismissed')
    if (dismissed) return

    const timer = setTimeout(() => setVisible(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  // Rotate notifications every 8 seconds
  useEffect(() => {
    if (!visible) return
    const id = setInterval(() => {
      setNotifIndex((i) => (i + 1) % NOTIFICATIONS.length)
    }, 8000)
    return () => clearInterval(id)
  }, [visible])

  function dismiss() {
    setVisible(false)
    setDismissed(true)
    sessionStorage.setItem('notif-dismissed', '1')
  }

  if (!visible || dismissed) return null

  const notif = NOTIFICATIONS[notifIndex]

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 animate-in slide-in-from-bottom-4">
      <div className="bg-gray-900 text-white rounded-2xl p-4 shadow-2xl border border-gray-700">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <Bell size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-orange-400 mb-0.5">BuyNow Notification</p>
            <p className="text-sm text-gray-200 leading-snug">{notif.message}</p>
            <Link href={notif.href} onClick={dismiss}
              className="inline-block mt-2 text-xs font-bold text-orange-400 hover:text-orange-300 transition">
              View now →
            </Link>
          </div>
          <button onClick={dismiss} className="text-gray-500 hover:text-white transition shrink-0 p-1">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
