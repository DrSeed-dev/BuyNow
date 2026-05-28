// lib/types/index.ts
// These are your data blueprints.
// Every product, category, cart item and order follows these exact shapes.
// TypeScript will warn you immediately if you try to use a field that doesn't exist.

export interface Product {
  id: string
  name: string
  slug: string
  category: string
  brand: string
  price: number           // In Naira — always whole numbers e.g. 285000
  originalPrice: number
  rating: number          // 0 to 5
  reviewCount: number
  stock: number
  isFlashDeal: boolean
  isFeatured: boolean
  images: string[]        // Array — first image is the main display image
  description: string
  tags: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  productCount: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface ShippingAddress {
  fullName: string
  phone: string
  street: string
  city: string
  state: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  address: ShippingAddress
}

// ─── Utility functions ────────────────────────────────────────
// These live here because they work directly with the types above.

// formatPrice(285000) → "₦285,000"
export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`
}

// getDiscount(285000, 320000) → 11
export function getDiscount(price: number, original: number): number {
  return Math.round(((original - price) / original) * 100)
}