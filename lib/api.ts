// lib/api.ts
// ALL data fetching for BuyNow goes through this file.
// No component should ever call fetch() directly.

import type { Product, Category } from '@/lib/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Generic reusable fetch function
async function get<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`)
  return res.json()
}

// ─── Products ─────────────────────────────────────────────────
export const getProducts = ()                    => get<Product[]>('/products')
export const getProductById = (id: string)       => get<Product>(`/products/${id}`)
export const getFeaturedProducts = ()            => get<Product[]>('/products?isFeatured=true')
export const getFlashDeals = ()                  => get<Product[]>('/products?isFlashDeal=true')
export const getProductsByCategory = (cat: string) => get<Product[]>(`/products?category=${cat}`)

// ─── Categories ───────────────────────────────────────────────
export const getCategories = () => get<Category[]>('/categories')