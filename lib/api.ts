// lib/api.ts
// Works BOTH locally and on Vercel:
// - Local dev:  calls /api (Next.js API routes, same port)
// - Vercel:     calls /api (same — works automatically)
// No more localhost:3001 needed — JSON Server is dev-only

import type { Product, Category } from '@/lib/types'

// Empty string = relative URL = works on any domain/port automatically
const BASE_URL = ''

async function get<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Failed: ${endpoint}`)
  return res.json()
}

// Products
export const getProducts = () =>
  get<Product[]>('/api/products')

export const getProductById = (id: string) =>
  get<Product>(`/api/products/${id}`)

export const getFeaturedProducts = () =>
  get<Product[]>('/api/products?isFeatured=true')

export const getFlashDeals = () =>
  get<Product[]>('/api/products?isFlashDeal=true')

export const getProductsByCategory = (cat: string) =>
  get<Product[]>(`/api/products?category=${cat}`)

// Categories
export const getCategories = () =>
  get<Category[]>('/api/categories')
