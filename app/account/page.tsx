'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore }     from '@/lib/store/authStore'
import { useHydrated }      from '@/lib/hooks/useHydrated'
import { useCartStore }     from '@/lib/store/cartStore'
import { useWishlistStore } from '@/lib/store/wishlistStore'
import { User, Package, Heart, LogOut, Edit2, Check, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'

export default function AccountPage() {
  const router   = useRouter()
  const hydrated = useHydrated()
  const { user, isLoggedIn, logout, update } = useAuthStore()
  const cartCount = useCartStore((s) => s.totalItems)
  const wishCount = useWishlistStore((s) => s.items.length)
  const [editing, setEditing] = useState(false)
  const [name, setName]       = useState('')

  if (!hydrated) return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-4 animate-pulse">
      <div className="h-28 bg-gray-100 rounded-2xl" />
      <div className="h-16 bg-gray-100 rounded-xl" />
      <div className="h-16 bg-gray-100 rounded-xl" />
    </div>
  )

  if (!isLoggedIn) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <User size={36} className="text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">You are not logged in</h2>
      <p className="text-gray-500 mb-8">Sign in to view your account, orders and wishlist.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/auth/login" className="bg-orange-500 text-white font-bold px-8 py-3 rounded-full hover:bg-orange-600 transition">Login</Link>
        <Link href="/auth/register" className="border-2 border-gray-200 text-gray-700 font-bold px-8 py-3 rounded-full hover:border-orange-300 hover:text-orange-600 transition">Create Account</Link>
      </div>
    </div>
  )

  function saveName() {
    if (name.trim()) { update({ name: name.trim() }); toast.success('Name updated!') }
    setEditing(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold text-white shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            {editing ? (
              <div className="flex items-center gap-2">
                <input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && saveName()} autoFocus className="border border-orange-300 rounded-lg px-3 py-1.5 text-sm outline-none flex-1" />
                <button onClick={saveName} className="bg-orange-500 text-white rounded-lg p-1.5"><Check size={15} /></button>
                <button onClick={() => setEditing(false)} className="text-gray-400 p-1.5">X</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="font-bold text-gray-900 text-lg truncate">{user?.name}</p>
                <button onClick={() => { setName(user?.name ?? ''); setEditing(true) }} className="text-gray-400 hover:text-orange-500"><Edit2 size={14} /></button>
              </div>
            )}
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t">
          <div className="bg-orange-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-orange-600">{cartCount()}</p>
            <p className="text-xs text-gray-500 mt-0.5">Items in Cart</p>
          </div>
          <div className="bg-pink-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-pink-500">{wishCount}</p>
            <p className="text-xs text-gray-500 mt-0.5">Saved Items</p>
          </div>
        </div>
      </div>
      <div className="space-y-3 mb-5">
        {[
          { href: '/account/orders', Icon: Package,    label: 'My Orders',         sub: 'Track and manage your orders', color: 'bg-blue-50 text-blue-500'    },
          { href: '/wishlist',       Icon: Heart,       label: 'My Wishlist',       sub: `${wishCount} saved products`,  color: 'bg-pink-50 text-pink-500'    },
          { href: '/products',       Icon: ShoppingBag, label: 'Continue Shopping', sub: 'Browse all 101+ products',     color: 'bg-orange-50 text-orange-500' },
        ].map(({ href, Icon, label, sub, color }) => (
          <Link key={href} href={href} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition group">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}><Icon size={20} /></div>
            <div className="flex-1"><p className="font-semibold text-gray-900">{label}</p><p className="text-xs text-gray-500">{sub}</p></div>
            <span className="text-gray-300 group-hover:text-orange-400 text-xl">›</span>
          </Link>
        ))}
      </div>
      <button onClick={() => { logout(); toast.success('Logged out'); router.push('/') }}
        className="w-full flex items-center justify-center gap-2 border-2 border-red-200 text-red-500 py-3 rounded-full hover:bg-red-50 transition font-medium">
        <LogOut size={18} /> Sign Out
      </button>
    </div>
  )
}
