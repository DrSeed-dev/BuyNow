// lib/hooks/useHydrated.ts
// Tells components "the page has fully loaded in the browser".
// Needed because Zustand reads from localStorage (browser-only),
// but Next.js first renders on the server where localStorage doesn't exist.
// Without this: cart/wishlist/login state flashes wrong on first load.

'use client'

import { useEffect, useState } from 'react'

export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // setTimeout(0) pushes this to the next browser paint cycle,
    // which avoids the React 19 "setState in effect body" warning
    const id = setTimeout(() => setHydrated(true), 0)
    return () => clearTimeout(id)
  }, [])

  return hydrated
}
