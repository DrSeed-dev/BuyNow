// app/(shop)/products/page.tsx
// Fixed: uses SortSelect client component instead of inline onChange

import { getProducts, getCategories } from '@/lib/api'
import ProductCard  from '@/components/product/ProductCard'
import SortSelect   from '@/components/shared/SortSelect'
import { getCategoryIcon } from '@/lib/categoryIcons'
import type { Product } from '@/lib/types'
import Link from 'next/link'

interface Props {
  searchParams: Promise<{ category?: string; sort?: string; min?: string; max?: string }>
}

export const metadata = { title: 'All Products' }

export default async function ProductsPage({ searchParams }: Props) {
  const { category, sort, min, max } = await searchParams

  const [allProducts, categories] = await Promise.all([
    getProducts().catch(() => [] as Product[]),
    getCategories().catch(() => []),
  ])

  let products = [...allProducts]
  if (category) products = products.filter((p) => p.category === category)
  if (min)      products = products.filter((p) => p.price >= Number(min))
  if (max)      products = products.filter((p) => p.price <= Number(max))
  if (sort === 'price-asc')  products.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') products.sort((a, b) => b.price - a.price)
  if (sort === 'rating')     products.sort((a, b) => b.rating - a.rating)
  if (sort === 'newest')     products.sort((a, b) => Number(b.id) - Number(a.id))

  const activeCategory = category || ''
  const activeCatName  = categories.find((c) => c.slug === activeCategory)?.name

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {activeCatName ?? 'All Products'}
      </h1>
      <p className="text-gray-500 text-sm mb-6">{products.length} products found</p>

      <div className="flex flex-col md:flex-row gap-6">

        {/* Sidebar */}
        <aside className="md:w-56 shrink-0">
          <div className="bg-white rounded-xl p-4 shadow-sm md:sticky md:top-24">
            <h3 className="font-bold text-gray-900 mb-3">Categories</h3>
            <ul className="space-y-0.5 mb-5">
              <li>
                <Link href="/products"
                  className={`block text-sm px-3 py-2 rounded-lg transition ${!activeCategory ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                  All Products
                </Link>
              </li>
              {categories.map((c) => {
                const Icon = getCategoryIcon(c.slug)
                return (
                  <li key={c.slug}>
                    <Link href={`/products?category=${c.slug}`}
                      className={`block text-sm px-3 py-2 rounded-lg transition ${activeCategory === c.slug ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                      <Icon size={14} className="inline-block mr-2 text-orange-500" />
                      {c.name}
                      <span className="text-gray-400 text-xs ml-1">({c.productCount})</span>
                    </Link>
                  </li>
                )
              })}
            </ul>

            <h3 className="font-bold text-gray-900 mb-3">Price Range</h3>
            <ul className="space-y-0.5">
              {[
                { label: 'Under ₦10k',    mn: '',       mx: '10000'   },
                { label: '₦10k – ₦50k',  mn: '10000',  mx: '50000'   },
                { label: '₦50k – ₦200k', mn: '50000',  mx: '200000'  },
                { label: '₦200k – ₦500k',mn: '200000', mx: '500000'  },
                { label: 'Above ₦500k',  mn: '500000', mx: ''        },
              ].map(({ label, mn, mx }) => {
                const p = new URLSearchParams()
                if (activeCategory) p.set('category', activeCategory)
                if (mn) p.set('min', mn)
                if (mx) p.set('max', mx)
                return (
                  <li key={label}>
                    <Link href={`/products?${p}`}
                      className="block text-sm px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-orange-600 rounded-lg transition">
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="text-sm text-gray-500">{products.length} results</span>
            <SortSelect defaultValue={sort || ''} />
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-gray-500 text-lg">No products found.</p>
              <Link href="/products" className="text-orange-500 text-sm mt-2 inline-block hover:underline">Clear filters</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
