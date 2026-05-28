// app/(shop)/search/page.tsx — Advanced search with filter sidebar

import { getProducts, getCategories } from '@/lib/api'
import ProductCard from '@/components/product/ProductCard'
import type { Product } from '@/lib/types'
import { Search, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'

interface Props {
  searchParams: Promise<{ q?: string; category?: string; min?: string; max?: string; rating?: string; sort?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, category, min, max, rating, sort } = await searchParams
  const query = q?.toLowerCase().trim() ?? ''

  const [products, categories] = await Promise.all([
    getProducts().catch(() => [] as Product[]),
    getCategories().catch(() => []),
  ])

  let results = query
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
      )
    : [...products]

  if (category) results = results.filter((p) => p.category === category)
  if (min)      results = results.filter((p) => p.price >= Number(min))
  if (max)      results = results.filter((p) => p.price <= Number(max))
  if (rating)   results = results.filter((p) => p.rating >= Number(rating))
  if (sort === 'price-asc')  results.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') results.sort((a, b) => b.price - a.price)
  if (sort === 'rating')     results.sort((a, b) => b.rating - a.rating)

  const activeCategory = category || ''

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-400 mb-1 text-sm">
          <Search size={16} />
          <span>{query ? `Results for "${q}"` : 'All Products'}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          {results.length} product{results.length !== 1 ? 's' : ''} found
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">

        {/* Filter sidebar */}
        <aside className="md:w-56 shrink-0">
          <div className="bg-white rounded-xl p-4 shadow-sm md:sticky md:top-24">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal size={16} className="text-orange-500" />
              <h3 className="font-bold text-gray-900">Filters</h3>
            </div>

            {/* Category */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Category</p>
              <ul className="space-y-0.5">
                <li>
                  <Link href={`/search?q=${q || ''}`}
                    className={`block text-sm px-2 py-1.5 rounded-lg transition ${!activeCategory ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    All Categories
                  </Link>
                </li>
                {categories.map((c) => {
                  const params = new URLSearchParams()
                  if (q) params.set('q', q)
                  params.set('category', c.slug)
                  if (min) params.set('min', min)
                  if (max) params.set('max', max)
                  return (
                    <li key={c.slug}>
                      <Link href={`/search?${params}`}
                        className={`block text-sm px-2 py-1.5 rounded-lg transition ${activeCategory === c.slug ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                        {c.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Price range */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Price Range</p>
              <ul className="space-y-0.5">
                {[
                  { label: 'Under 10k',     min: '',       max: '10000'   },
                  { label: '10k – 50k',     min: '10000',  max: '50000'   },
                  { label: '50k – 200k',    min: '50000',  max: '200000'  },
                  { label: '200k – 500k',   min: '200000', max: '500000'  },
                  { label: 'Above 500k',    min: '500000', max: ''        },
                ].map(({ label, min: mn, max: mx }) => {
                  const params = new URLSearchParams()
                  if (q) params.set('q', q)
                  if (activeCategory) params.set('category', activeCategory)
                  if (mn) params.set('min', mn)
                  if (mx) params.set('max', mx)
                  const active = min === mn && max === mx
                  return (
                    <li key={label}>
                      <Link href={`/search?${params}`}
                        className={`block text-sm px-2 py-1.5 rounded-lg transition ${active ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                        ₦{label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Min rating */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Min Rating</p>
              <ul className="space-y-0.5">
                {[4, 3, 2].map((r) => {
                  const params = new URLSearchParams()
                  if (q) params.set('q', q)
                  if (activeCategory) params.set('category', activeCategory)
                  params.set('rating', String(r))
                  return (
                    <li key={r}>
                      <Link href={`/search?${params}`}
                        className={`flex items-center gap-1 text-sm px-2 py-1.5 rounded-lg transition ${rating === String(r) ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                        {'★'.repeat(r)}{'☆'.repeat(5 - r)} & up
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Clear all */}
            {(category || min || max || rating) && (
              <Link href={`/search?q=${q || ''}`}
                className="block text-center text-xs text-red-500 hover:text-red-700 font-medium py-2 border border-red-200 rounded-lg transition">
                Clear all filters
              </Link>
            )}
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="text-sm text-gray-500">{results.length} results</span>
            <form method="GET" action="/search">
              {q && <input type="hidden" name="q" value={q} />}
              {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
              {min && <input type="hidden" name="min" value={min} />}
              {max && <input type="hidden" name="max" value={max} />}
              <select name="sort" defaultValue={sort || ''}
                onChange={(e) => (e.target.closest('form') as HTMLFormElement).submit()}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-orange-300 cursor-pointer">
                <option value="">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </form>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-gray-600 font-medium text-lg mb-2">No results found</p>
              <Link href="/products" className="text-orange-500 hover:underline font-medium">Browse all products →</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
