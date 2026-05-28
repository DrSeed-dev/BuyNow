'use client'

// components/layout/AnnouncementBar.tsx
// The top orange strip you see on Temu/Jumia — rotating offers.
// Uses a simple fade-in/out cycle between messages.

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const MESSAGES = [
  '🚚 Free delivery on orders above ₦50,000 — Lagos & Abuja',
  '⚡ Flash deals refresh every 24 hours — Don\'t miss out!',
  '🔒 100% secure checkout — Pay with card or bank transfer',
  '📦 Same-day dispatch on orders placed before 2PM',
  '🇳🇬 Proudly Nigerian — Supporting local sellers nationwide',
]

export default function AnnouncementBar() {
  const [index,   setIndex]   = useState(0)
  const [visible, setVisible] = useState(true)
  const [closed,  setClosed]  = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  if (closed) return null

  return (
    <div className="bg-gray-900 text-white text-xs py-2 px-4 flex items-center justify-between">
      <div className="flex-1 text-center font-medium tracking-wide">
        {MESSAGES[index]}
      </div>
      <button
        onClick={() => setClosed(true)}
        className="ml-3 text-gray-400 hover:text-white transition shrink-0"
      >
        <X size={14} />
      </button>
    </div>
  )
}
