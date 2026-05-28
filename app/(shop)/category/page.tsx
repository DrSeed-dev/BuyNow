// app/(shop)/category/[slug]/page.tsx
//
// ✅ NEXT.JS 15 FIX: params is now a Promise — must be awaited.
// This was causing "No products in this category yet" on every category click.
// In Next.js 14 you could use params.slug directly.
// In Next.js 15 you MUST do: const { slug } = await params

import { getProductsByCategory, getCategories } from '@/lib/api'
import ProductCard from '@/components/product/ProductCard'
import type { Metadata } from 'next'
import type { Product } from '@/lib/types'
import Link from 'next/link'

// ✅ params is typed as a Promise in Next.js 15
interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params                             // ← await here
  const cats = await getCategories().catch(() => [])
  const cat  = cats.find((c) => c.slug === slug)
  return { title: cat?.name ?? 'Category' }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params                             // ← and here

  const [products, categories] = await Promise.all([
    getProductsByCategory(slug).catch(() => [] as Product[]),
    getCategories().catch(() => []),
  ])

  const category = categories.find((c) => c.slug === slug)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Hero header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 md:p-10 mb-6 text-white">
        <p className="text-orange-200 text-sm mb-1 uppercase tracking-widest">BuyNow</p>
        <h1 className="text-3xl md:text-4xl font-bold">{category?.name ?? slug}</h1>
        <p className="text-orange-100 mt-1">{products.length} products available</p>
      </div>

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-orange-500 transition">Home</Link>
        <span>›</span>
        <Link href="/products" className="hover:text-orange-500 transition">Products</Link>
        <span>›</span>
        <span className="text-gray-800 font-medium">{category?.name ?? slug}</span>
      </nav>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📦</p>
          <p className="text-gray-500 text-lg font-medium">No products in this category yet.</p>
          <p className="text-gray-400 text-sm mt-1 mb-6">
            Make sure your JSON Server is running: <code className="bg-gray-100 px-2 py-0.5 rounded">npm run api</code>
          </p>
          <Link
            href="/products"
            className="inline-block bg-orange-500 text-white font-bold px-6 py-2.5 rounded-full hover:bg-orange-600 transition"
          >
            Browse All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
