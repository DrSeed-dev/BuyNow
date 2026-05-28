'use client'
// components/shared/DarkModeToggle.tsx
// Drop this anywhere in your Navbar or layout to enable dark mode

import { useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/lib/store/themeStore'

export default function DarkModeToggle() {
  const { isDark, toggle } = useThemeStore()

  // Apply saved theme on first load
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-9 h-9 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition text-white"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
