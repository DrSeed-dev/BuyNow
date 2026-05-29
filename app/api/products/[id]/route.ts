// app/api/products/[id]/route.ts
// Next.js API route — serves a single product by ID

import { NextResponse } from 'next/server'
import dbData from '@/data/db.json'
import type { Product } from '@/lib/types'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Next.js 15: params is a Promise — must await
  const { id } = await params

  // Cast db.json properly — fixes TypeScript "unexpected any" error
  const products = dbData.products as Product[]
  const product  = products.find((p) => p.id === id)

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(product)
}
