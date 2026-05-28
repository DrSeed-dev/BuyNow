// lib/store/cartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/lib/types'

interface CartStore {
  items: CartItem[]
  addItem:        (product: Product, qty?: number) => void
  removeItem:     (productId: string) => void
  updateQuantity: (productId: string, qty: number) => void
  clearCart:      () => void
  totalItems:     () => number
  totalPrice:     () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, qty = 1) => set((state) => {
        const existing = state.items.find(i => i.product.id === product.id)
        if (existing) {
          return {
            items: state.items.map(i =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + qty }
                : i
            )
          }
        }
        return { items: [...state.items, { product, quantity: qty }] }
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i.product.id !== id)
      })),

      updateQuantity: (id, qty) => {
        if (qty < 1) { get().removeItem(id); return }
        set((state) => ({
          items: state.items.map(i =>
            i.product.id === id ? { ...i, quantity: qty } : i
          )
        }))
      },

      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    { name: 'buynow-cart' }  // saves to localStorage automatically
  )
)