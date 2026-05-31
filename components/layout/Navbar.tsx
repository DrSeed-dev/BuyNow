'use client'

// components/layout/Navbar.tsx
// ✅ All Categories dropdown — click-based, guaranteed to work
// ✅ Logo image support — reads from /public/logo.png
// ✅ Mega menu with category icons
// ✅ Mobile full-screen menu with collapsible categories
// ✅ Search bar submits to /search?q=
// ✅ Cart + wishlist badges
// ✅ Auth-aware account menu

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Home, ShoppingBag, ShoppingCart, Heart, Search, Menu, X,
  User, LogOut, Package, ChevronDown,
  ChevronRight, Grid3x3,
} from 'lucide-react'
import { getCategoryIcon } from '@/lib/categoryIcons'
import { useCartStore }     from '@/lib/store/cartStore'
import { useWishlistStore } from '@/lib/store/wishlistStore'
import { useAuthStore }     from '@/lib/store/authStore'
import { useHydrated }      from '@/lib/hooks/useHydrated'
import { toast } from 'sonner'

const CATEGORIES = [
  { name: 'Electronics',     slug: 'electronics',     desc: 'Phones, Laptops, TVs' },
  { name: 'Fashion Men',     slug: 'fashion-men',     desc: 'Shirts, Suits, Shoes'  },
  { name: 'Fashion Women',   slug: 'fashion-women',   desc: 'Dresses, Bags, Heels'  },
  { name: 'Home & Kitchen',  slug: 'home-kitchen',    desc: 'Appliances, Cookware'  },
  { name: 'Sports',          slug: 'sports',          desc: 'Jerseys, Equipment'    },
  { name: 'Beauty',          slug: 'beauty',           desc: 'Skincare, Makeup'       },
  { name: 'Books',           slug: 'books',            desc: 'Fiction, Business'      },
  { name: 'Groceries',       slug: 'groceries',        desc: 'Rice, Oil, Beverages'  },
  { name: 'Motors & Bikes',  slug: 'motors-bikes',    desc: 'Honda, Bajaj, TVS'     },
  { name: 'Nigerian Market', slug: 'nigerian-market', desc: 'Ankara, Shea, Zobo'   },
]

export default function Navbar() {
  const hydrated  = useHydrated()
  const router    = useRouter()

  const [menuOpen,   setMenuOpen]   = useState(false)
  const [catsOpen,   setCatsOpen]   = useState(false)
  const [mobileCats, setMobileCats] = useState(false)
  const [query,      setQuery]      = useState('')
  const [logoError,  setLogoError]  = useState(false)

  // Ref for click-outside detection on the mega menu
  const megaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setCatsOpen(false)
      }
    }
    if (catsOpen) {
      document.addEventListener('mousedown', onClickOutside)
    }
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [catsOpen])

  // Zustand — safe after hydration
  const cartCount  = hydrated ? useCartStore.getState().totalItems()         : 0
  const wishCount  = hydrated ? useWishlistStore.getState().items.length     : 0
  const { user, isLoggedIn, logout } = useAuthStore()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    setMenuOpen(false)
    setCatsOpen(false)
    router.push(`/search?q=${encodeURIComponent(q)}`)
    setQuery('')
  }

  function handleLogout() {
    logout()
    toast.success('Logged out')
    setMenuOpen(false)
    setCatsOpen(false)
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 shadow-md">

      {/* ══ Main bar ══════════════════════════════════════════ */}
      <div className="bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            {!logoError ? (
              <Image
                src="/logo.png"
                alt="BuyNow"
                width={110}
                height={34}
                priority
                onError={() => setLogoError(true)}
                className="object-contain"
              />
            ) : (
              // Fallback text logo if no logo.png yet
              <span className="text-2xl font-black text-white tracking-tight">
                Buy<span className="text-yellow-300">Now</span>
              </span>
            )}
          </Link>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 justify-center">
            <form
              onSubmit={handleSearch}
              className="w-full max-w-2xl flex items-center bg-white rounded-full overflow-hidden shadow-sm ring-1 ring-slate-200"
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search products, brands, categories..."
                className="flex-1 px-4 py-3 text-gray-800 text-sm outline-none"
              />
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 transition px-4 py-3 flex items-center text-white"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1 ml-auto text-white">

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex flex-col items-center p-2 hover:bg-orange-600 rounded-lg transition min-w-[44px]"
            >
              <ShoppingCart size={22} />
              {hydrated && cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-yellow-400 text-orange-900 text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
              <span className="text-[10px] hidden sm:block mt-0.5 opacity-90">Cart</span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative flex flex-col items-center p-2 hover:bg-orange-600 rounded-lg transition min-w-[44px] hidden sm:flex"
            >
              <Heart size={22} />
              {hydrated && wishCount > 0 && (
                <span className="absolute top-1 right-1 bg-yellow-400 text-orange-900 text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                  {wishCount}
                </span>
              )}
              <span className="text-[10px] mt-0.5 opacity-90">Saved</span>
            </Link>

            {/* Account */}
            {hydrated && isLoggedIn ? (
              <div className="relative group hidden sm:block">
                <Link
                  href="/account"
                  className="flex flex-col items-center p-2 hover:bg-orange-600 rounded-lg transition min-w-[44px]"
                >
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-orange-600 font-black text-xs">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[10px] mt-0.5 opacity-90 max-w-[60px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                </Link>
                {/* Hover dropdown */}
                <div className="absolute right-0 top-full pt-1 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 bg-orange-50 border-b">
                      <p className="font-bold text-sm text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <Link href="/account"        className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-sm transition"><User size={15} /> My Account</Link>
                    <Link href="/account/orders" className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-sm transition"><Package size={15} /> My Orders</Link>
                    <Link href="/wishlist"       className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-sm transition"><Heart size={15} /> Wishlist</Link>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 hover:bg-red-50 text-sm text-red-500 w-full transition border-t">
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="flex flex-col items-center p-2 hover:bg-orange-600 rounded-lg transition min-w-[44px] hidden sm:flex"
              >
                <User size={22} />
                <span className="text-[10px] mt-0.5 opacity-90">Login</span>
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col items-center p-2 hover:bg-orange-600 rounded-lg transition min-w-[44px]"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
              <span className="text-[10px] mt-0.5 opacity-90">Menu</span>
            </button>

          </div>
        </div>
      </div>

      {/* ══ Category nav bar (desktop) ════════════════════════ */}
      <div className="hidden md:block bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 flex items-center">

          {/* ✅ ALL CATEGORIES — click-based mega menu */}
          <div ref={megaRef} className="relative">
            <button
              onClick={() => setCatsOpen((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2.5 text-white text-sm font-semibold transition ${
                catsOpen ? 'bg-orange-700' : 'hover:bg-orange-700'
              }`}
            >
              {catsOpen ? <X size={16} /> : <Menu size={16} />}
              All Categories
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${catsOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Mega dropdown */}
            {catsOpen && (
              <div className="absolute top-full left-0 w-72 bg-white shadow-2xl rounded-b-xl z-50 border border-gray-100 overflow-hidden">
                {CATEGORIES.map((c) => {
                  const Icon = getCategoryIcon(c.slug)
                  return (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      onClick={() => setCatsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 hover:text-orange-600 transition group border-b border-gray-50 last:border-0"
                    >
                      <Icon size={18} className="text-orange-500" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-600">{c.name}</p>
                        <p className="text-xs text-gray-400">{c.desc}</p>
                      </div>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-orange-400" />
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Divider */}
          <span className="text-orange-500 text-lg mx-1">|</span>

          {/* Quick category links */}
          <div className="flex items-center overflow-x-auto scrollbar-none">
            {CATEGORIES.slice(0, 8).map((c) => {
              const Icon = getCategoryIcon(c.slug)
              return (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-white text-sm whitespace-nowrap hover:bg-orange-700 transition shrink-0"
                >
                  <Icon size={16} className="text-white opacity-90" />
                  {c.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* ══ Mobile search ═════════════════════════════════════ */}
      <form onSubmit={handleSearch} className="md:hidden bg-orange-500 px-4 pb-3">
        <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-sm">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search BuyNow..."
            className="flex-1 px-4 py-2.5 text-gray-800 text-sm outline-none"
          />
          <button type="submit" className="bg-orange-600 px-4 py-2.5 text-white">
            <Search size={17} />
          </button>
        </div>
      </form>

      {/* ══ Mobile full menu ══════════════════════════════════ */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl max-h-[85vh] overflow-y-auto">

          {/* Quick links */}
          <div className="grid grid-cols-4 border-b border-gray-100">
            {[
              { href: '/',         icon: <Home size={18} className="text-orange-500" />, label: 'Home'    },
              { href: '/products', icon: <ShoppingBag size={18} className="text-orange-500" />, label: 'Shop'    },
              { href: '/cart',     icon: <ShoppingCart size={18} className="text-orange-500" />, label: `Cart${hydrated && cartCount > 0 ? ` (${cartCount})` : ''}` },
              { href: '/wishlist', icon: <Heart size={18} className="text-orange-500" />, label: `Saved${hydrated && wishCount > 0 ? ` (${wishCount})` : ''}` },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex flex-col items-center gap-1 py-3 hover:bg-orange-50 transition text-center"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-[11px] text-gray-600 font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Categories toggle */}
          <button
            onClick={() => setMobileCats((v) => !v)}
            className="flex items-center justify-between w-full px-4 py-3.5 border-b border-gray-100 font-semibold text-gray-800"
          >
            <span className="flex items-center gap-2">
              <Grid3x3 size={18} className="text-orange-500" />
              Shop by Category
            </span>
            <ChevronDown
              size={18}
              className={`text-gray-400 transition-transform ${mobileCats ? 'rotate-180' : ''}`}
            />
          </button>

          {mobileCats && (
            <div className="bg-gray-50 border-b border-gray-100">
              {CATEGORIES.map((c) => {
                const Icon = getCategoryIcon(c.slug)
                return (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-6 py-3 hover:bg-orange-50 transition border-b border-gray-100 last:border-0"
                  >
                    <Icon size={20} className="text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.desc}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Account section */}
          <div className="border-b border-gray-100">
            {hydrated && isLoggedIn ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 bg-orange-50">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <Link href="/account"        onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700">
                  <User size={16} className="text-gray-400" /> My Account
                </Link>
                <Link href="/account/orders" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700">
                  <Package size={16} className="text-gray-400" /> My Orders
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-sm text-red-500 w-full">
                  <LogOut size={16} /> Sign Out
                </button>
              </>
            ) : (
              <div className="p-4 flex gap-3">
                <Link href="/auth/login"    onClick={() => setMenuOpen(false)} className="flex-1 bg-orange-500 text-white font-bold py-2.5 rounded-lg text-center text-sm hover:bg-orange-600 transition">
                  Login
                </Link>
                <Link href="/auth/register" onClick={() => setMenuOpen(false)} className="flex-1 border-2 border-orange-500 text-orange-600 font-bold py-2.5 rounded-lg text-center text-sm hover:bg-orange-50 transition">
                  Register
                </Link>
              </div>
            )}
          </div>

        </div>
      )}

    </header>
  )
}
