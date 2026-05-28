'use client'

// app/admin/products/page.tsx — Admin: Manage Products

import { useEffect, useState } from 'react'
import { getProducts } from '@/lib/api'
import type { Product } from '@/lib/types'
import { formatPrice } from '@/lib/types'
import { Pencil, Trash2, Plus, Search, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search,   setSearch]   = useState('')
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState('all')

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => toast.error('Failed to load products'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.brand.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all'      ? true
                        : filter === 'flash'    ? p.isFlashDeal
                        : filter === 'low'      ? p.stock <= 10
                        : filter === 'featured' ? p.isFeatured
                        : true
    return matchesSearch && matchesFilter
  })

  function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"?`)) return
    setProducts((prev) => prev.filter((p) => p.id !== id))
    toast.success('Product deleted (demo — not saved to db.json)')
  }


  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm">{products.length} total products in BuyNow</p>
        </div>
        <button
          onClick={() => toast.info('Add product form — coming in next phase!')}
          className="flex items-center gap-2 bg-orange-500 text-white font-medium px-4 py-2.5 rounded-full hover:bg-orange-600 transition text-sm"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Filters + Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or brand..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { key: 'all',      label: 'All' },
            { key: 'featured', label: '⭐ Featured' },
            { key: 'flash',    label: '⚡ Flash' },
            { key: 'low',      label: '⚠️ Low Stock' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${filter === key ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-600">Product</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Category</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Price</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Stock</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Status</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt=""
                          className="w-10 h-10 object-cover rounded-lg bg-gray-100 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-gray-400">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                        {product.category.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-orange-600">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={`flex items-center gap-1 text-xs font-medium ${product.stock <= 10 ? 'text-red-500' : 'text-green-600'}`}>
                        {product.stock <= 10 && <AlertCircle size={12} />}
                        {product.stock} left
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        {product.isFeatured && (
                          <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">Featured</span>
                        )}
                        {product.isFlashDeal && (
                          <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">Flash</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toast.info(`Edit form for "${product.name}" — coming soon!`)}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No products match your search.
            </div>
          )}

          {/* Table footer */}
          <div className="px-4 py-3 border-t text-xs text-gray-400">
            Showing {filtered.length} of {products.length} products
          </div>
        </div>
      )}
    </div>
  )
}
