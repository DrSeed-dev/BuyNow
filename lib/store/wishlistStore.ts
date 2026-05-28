// lib/store/wishlistStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/lib/types'

interface WishlistStore {
  items: Product[]
  addItem:      (product: Product) => void
  removeItem:   (productId: string) => void
  toggleItem:   (product: Product) => void
  isInWishlist: (productId: string) => boolean
  clear:        () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (!get().isInWishlist(product.id)) {
          set((s) => ({ items: [...s.items, product] }))
        }
      },

      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((p) => p.id !== id) })),

      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      },

      isInWishlist: (id) => get().items.some((p) => p.id === id),

      clear: () => set({ items: [] }),
    }),
    { name: 'buynow-wishlist' }
  )
)
