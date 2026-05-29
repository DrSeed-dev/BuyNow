// app/api/categories/route.ts
// Next.js API route — serves all categories from db.json

import { NextResponse } from 'next/server'
import dbData from '@/data/db.json'
import type { Category } from '@/lib/types'

export async function GET() {
  const categories = dbData.categories as Category[]
  return NextResponse.json(categories)
}
