'use client'
// components/layout/BottomNav.tsx
// Fix: useHydrated prevents hydration mismatch error on badges

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Grid, ShoppingCart, Heart, User } from 'lucide-react'
import { useCartStore }     from '@/lib/store/cartStore'
import { useWishlistStore } from '@/lib/store/wishlistStore'
import { useHydrated }      from '@/lib/hooks/useHydrated'

const NAV = [
  { href: '/',         label: 'Home',    Icon: Home         },
  { href: '/products', label: 'Shop',    Icon: Grid         },
  { href: '/cart',     label: 'Cart',    Icon: ShoppingCart },
  { href: '/wishlist', label: 'Saved',   Icon: Heart        },
  { href: '/account',  label: 'Account', Icon: User         },
]

export default function BottomNav() {
  const pathname   = usePathname()
  const hydrated   = useHydrated()
  const totalItems = useCartStore((s) => s.totalItems)
  const wishItems  = useWishlistStore((s) => s.items.length)

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex">
      {NAV.map(({ href, label, Icon }) => {
        const active = pathname === href

        // Only show badges after hydration to prevent mismatch
        const badge =
          !hydrated          ? 0 :
          href === '/cart'   ? totalItems() :
          href === '/wishlist'? wishItems   : 0

        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center flex-1 py-2 relative transition-colors ${
              active ? 'text-orange-500' : 'text-gray-500 hover:text-orange-400'
            }`}
          >
            <div className="relative">
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              {badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
            </div>
            <span className={`text-[10px] mt-0.5 font-medium ${active ? 'text-orange-500' : ''}`}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}