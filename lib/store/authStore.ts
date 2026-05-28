// lib/store/authStore.ts
// Simulates auth — no real backend yet.
// When you add Supabase/NextAuth later, only this file changes.

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthUser {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthStore {
  user: AuthUser | null
  isLoggedIn: boolean
  login:    (user: AuthUser) => void
  logout:   () => void
  update:   (data: Partial<AuthUser>) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: (user) => set({ user, isLoggedIn: true }),

      logout: () => set({ user: null, isLoggedIn: false }),

      update: (data) =>
        set((s) => ({
          user: s.user ? { ...s.user, ...data } : null,
        })),
    }),
    { name: 'buynow-auth' }
  )
)
