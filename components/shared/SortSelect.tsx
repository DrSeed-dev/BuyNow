'use client'
// components/shared/SortSelect.tsx
// Fixes: "Event handlers cannot be passed to Client Component props"
// The <select onChange> must live in a 'use client' component

import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  defaultValue: string
}

export default function SortSelect({ defaultValue }: Props) {
  const router       = useRouter()
  const searchParams = useSearchParams()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value) {
      params.set('sort', e.target.value)
    } else {
      params.delete('sort')
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <select
      defaultValue={defaultValue}
      onChange={handleChange}
      className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-orange-300 cursor-pointer"
    >
      <option value="">Sort: Default</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating">Top Rated</option>
      <option value="newest">Newest First</option>
    </select>
  )
}
