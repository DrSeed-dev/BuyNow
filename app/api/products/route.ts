// app/api/products/route.ts
// Next.js API route — serves products from db.json
// Works on Vercel (no JSON Server needed)

import { NextResponse } from 'next/server'
import dbData from '@/data/db.json'
import type { Product } from '@/lib/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Cast db.json data properly — fixes TypeScript "unexpected any" error
  const products = dbData.products as Product[]

  let result = [...products]

  // Filter by category
  const category = searchParams.get('category')
  if (category) {
    result = result.filter((p) => p.category === category)
  }

  // Filter by isFeatured
  const isFeatured = searchParams.get('isFeatured')
  if (isFeatured === 'true') {
    result = result.filter((p) => p.isFeatured === true)
  }

  // Filter by isFlashDeal
  const isFlashDeal = searchParams.get('isFlashDeal')
  if (isFlashDeal === 'true') {
    result = result.filter((p) => p.isFlashDeal === true)
  }

  // Price range
  const min = searchParams.get('min')
  const max = searchParams.get('max')
  if (min) result = result.filter((p) => p.price >= Number(min))
  if (max) result = result.filter((p) => p.price <= Number(max))

  return NextResponse.json(result)
}
