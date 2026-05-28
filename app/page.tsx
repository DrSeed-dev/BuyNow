// app/page.tsx

import Link from 'next/link'
import { getFeaturedProducts, getFlashDeals, getCategories, getProducts } from '@/lib/api'
import ProductCard    from '@/components/product/ProductCard'
import CountdownTimer from '@/components/shared/CountdownTimer'
import type { Product, Category } from '@/lib/types'

export const metadata = {
  title: "BuyNow — Nigeria's #1 Marketplace",
  description: 'Shop electronics, fashion, home essentials. Fast delivery across Nigeria.',
}

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  'electronics':     { bg: '#EFF6FF', text: '#2563EB' },
  'fashion-men':     { bg: '#EEF2FF', text: '#4338CA' },
  'fashion-women':   { bg: '#FDF2F8', text: '#BE185D' },
  'home-kitchen':    { bg: '#FFFBEB', text: '#B45309' },
  'sports':          { bg: '#F0FDF4', text: '#15803D' },
  'beauty':          { bg: '#FFF1F2', text: '#E11D48' },
  'books':           { bg: '#FAF5FF', text: '#7C3AED' },
  'groceries':       { bg: '#F7FEE7', text: '#4D7C0F' },
  'motors-bikes':    { bg: '#F1F5F9', text: '#475569' },
  'nigerian-market': { bg: '#FFF7ED', text: '#EA580C' },
}

export default async function HomePage() {
  const [featured, flashDeals, categories, allProducts] = await Promise.all([
    getFeaturedProducts().catch(() => [] as Product[]),
    getFlashDeals().catch(()      => [] as Product[]),
    getCategories().catch(()      => [] as Category[]),
    getProducts().catch(()        => [] as Product[]),
  ])

  const newArrivals = [...allProducts]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 8)

  return (
    <div className="max-w-7xl mx-auto px-4">

      {/* HERO */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl my-4 p-8 md:p-14 text-white">
        <p className="text-orange-200 text-sm font-medium mb-2 uppercase tracking-widest">
          Welcome to BuyNow
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          Shop Everything.<br />Ship Anywhere in Nigeria.
        </h1>
        <p className="text-orange-100 mb-6 text-lg max-w-md">
          Electronics, Fashion, Home &amp; More <br /> delivered fast.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/products"
            className="inline-block bg-white text-orange-600 font-bold px-8 py-3 rounded-full hover:bg-orange-50 transition">
            Shop Now →
          </Link>
          {/* <Link href="/category/motors-bikes"
            className="inline-block border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-orange-600 transition">
            🏍️ Motors &amp; Bikes
          </Link> */}
        </div>
      </section>

      {/* CATEGORIES — uses .category-grid CSS class from globals.css */}
      <section className="my-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Shop by Category</h2>
          <Link href="/products" className="text-orange-500 text-sm font-medium hover:underline">View all →</Link>
        </div>
        <div className="category-grid">
          {categories.map((cat) => {
            const c = CAT_COLORS[cat.slug] ?? { bg: '#F3F4F6', text: '#4B5563' }
            return (
              <Link key={cat.id} href={`/category/${cat.slug}`}
                className="group flex flex-col items-center gap-1.5 bg-white rounded-xl p-2.5 border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: c.bg, color: c.text }}
                >
                  {cat.icon}
                </div>
                <span className="text-[10px] font-semibold text-gray-700 text-center leading-tight">
                  {cat.name}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* FLASH DEALS */}
      {flashDeals.length > 0 && (
        <section className="my-8">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <h2 className="text-xl font-bold text-gray-900">Flash Deals</h2>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">Limited time</span>
            </div>
            <div className="flex items-center gap-4">
              <CountdownTimer label="Ends in" />
              <Link href="/products" className="text-orange-500 text-sm font-medium hover:underline">See all</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {flashDeals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* PROMO BANNERS */}
      <section className="grid sm:grid-cols-3 gap-4 my-8">
        {[
          { href: '/category/motors-bikes',    bg: ['#111827','#374151'], accent: '#fb923c', tag: 'New Arrivals', title: 'Motors & Bikes',  sub: 'Honda, Bajaj, TVS, Yamaha', icon: '🏍️' },
          { href: '/category/nigerian-market', bg: ['#14532d','#16a34a'], accent: '#fde047', tag: 'Authentic',    title: 'Nigerian Market', sub: 'Ankara, Shea Butter, Zobo', icon: '🇳🇬' },
          { href: '/category/electronics',     bg: ['#1e3a8a','#1d4ed8'], accent: '#93c5fd', tag: 'Top Deals',    title: 'Electronics',     sub: 'Samsung, Apple, Infinix',  icon: '💻'  },
        ].map((b) => (
          <Link key={b.href} href={b.href}
            className="rounded-2xl p-6 text-white hover:opacity-90 transition relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${b.bg[0]}, ${b.bg[1]})` }}>
            <span className="absolute right-3 top-3 text-6xl opacity-20">{b.icon}</span>
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: b.accent }}>{b.tag}</p>
            <h3 className="text-lg font-black mb-1">{b.title}</h3>
            <p className="text-sm opacity-60">{b.sub}</p>
            <span className="inline-block mt-3 text-sm font-bold" style={{ color: b.accent }}>Shop now →</span>
          </Link>
        ))}
      </section>

      {/* FEATURED */}
      <section className="my-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
          <Link href="/products" className="text-orange-500 text-sm font-medium hover:underline">See all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="my-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">New Arrivals</h2>
          <Link href="/products?sort=newest" className="text-orange-500 text-sm font-medium hover:underline">See all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

    </div>
  )
}
