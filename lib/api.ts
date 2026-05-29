// lib/api.ts
// FIXED: Reads db.json directly — no HTTP calls needed.
// Works perfectly in Server Components, Client Components, AND on Vercel.
// No localhost:3001, no /api fetch, no URL issues ever.

import dbData from '@/data/db.json'
import type { Product, Category } from '@/lib/types'

// Cast once at the top — no TypeScript "any" warnings
const ALL_PRODUCTS   = dbData.products   as Product[]
const ALL_CATEGORIES = dbData.categories as Category[]

// Wrap in Promise.resolve so the API stays async
// (pages use await — this keeps them compatible)

export const getProducts = () =>
  Promise.resolve([...ALL_PRODUCTS])

export const getProductById = (id: string) => {
  const product = ALL_PRODUCTS.find((p) => p.id === id)
  if (!product) return Promise.reject(new Error('Product not found'))
  return Promise.resolve(product)
}

export const getFeaturedProducts = () =>
  Promise.resolve(ALL_PRODUCTS.filter((p) => p.isFeatured === true))

export const getFlashDeals = () =>
  Promise.resolve(ALL_PRODUCTS.filter((p) => p.isFlashDeal === true))

export const getProductsByCategory = (category: string) =>
  Promise.resolve(ALL_PRODUCTS.filter((p) => p.category === category))

export const getCategories = () =>
  Promise.resolve([...ALL_CATEGORIES])