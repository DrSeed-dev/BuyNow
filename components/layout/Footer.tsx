// components/layout/Footer.tsx
// Fix: Added pb-20 md:pb-0 so BottomNav does not cover footer on mobile

import Link from 'next/link'
import { Truck, Lock, ArrowLeftRight, Phone } from 'lucide-react'

const BG     = '#FDFAF6'
const BG_TOP = '#F7F3EE'
const BG_BOT = '#F0EBE3'

const SHOP_LINKS = [
  { label: 'All Products',    href: '/products'                 },
  { label: 'Flash Deals',     href: '/products?sort=rating'     },
  { label: 'Electronics',     href: '/category/electronics'     },
  { label: 'Fashion',         href: '/category/fashion-men'     },
  { label: 'Motors & Bikes',  href: '/category/motors-bikes'    },
  { label: 'Nigerian Market', href: '/category/nigerian-market' },
]
const ACCOUNT_LINKS = [
  { label: 'Login',       href: '/auth/login'     },
  { label: 'Register',    href: '/auth/register'  },
  { label: 'My Orders',   href: '/account/orders' },
  { label: 'My Wishlist', href: '/wishlist'        },
  { label: 'My Profile',  href: '/account'         },
]
const HELP_LINKS = [
  { label: 'Contact Support', href: '/help/contact'   },
  { label: 'Track My Order',  href: '/account/orders' },
  { label: 'Returns Policy',  href: '/help/returns'   },
  { label: 'Shipping Info',   href: '/help/shipping'  },
  { label: 'FAQ',             href: '/help/faq'       },
]

export default function Footer() {
  return (
    // pb-20 on mobile = clears the fixed BottomNav bar | md:pb-0 = no padding on desktop
    <footer style={{ backgroundColor: BG }} className="mt-16 border-t border-orange-100 pb-20 md:pb-0">

      {/* Trust strip */}
      <div style={{ backgroundColor: BG_TOP }} className="border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { Icon: Truck, title: 'Fast Delivery',  sub: 'Same-day Lagos & Abuja' },
              { Icon: Lock, title: 'Secure Payment', sub: 'SSL encrypted checkout' },
              { Icon: ArrowLeftRight, title: '7-Day Returns',  sub: 'Hassle-free policy'    },
              { Icon: Phone, title: '24/7 Support',   sub: '0800-BUYNOW-NG'        },
            ].map((b) => (
              <div key={b.title} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                  <b.Icon size={18} className="text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{b.title}</p>
                  <p className="text-xs text-gray-500">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <span className="text-2xl font-black text-gray-900">
                Buy<span className="text-orange-500">Now</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Nigeria&apos;s fastest growing marketplace. Electronics, Fashion,
              Motors &amp; more delivered nationwide.
            </p>
            <div className="flex items-center gap-2 mb-6">
              {[
                { label: 'F', title: 'Facebook'  },
                { label: 'I', title: 'Instagram' },
                { label: 'X', title: 'Twitter'   },
                { label: 'T', title: 'TikTok'    },
                { label: '▶', title: 'YouTube'   },
              ].map((s) => (
                <a key={s.label} href="#" title={s.title}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
                  {s.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#000000', maxWidth: '160px' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <p className="text-gray-400 leading-none mb-0.5" style={{ fontSize: '9px' }}>Download on the</p>
                  <p className="text-white font-bold leading-none" style={{ fontSize: '14px' }}>App Store</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#000000', maxWidth: '160px' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
                  <path d="M3.18 23.76c.3.17.64.24.99.2l12.6-7.27-2.79-2.79-10.8 9.86zm-1.5-20.7C1.46 3.4 1.37 3.76 1.37 4.2v15.6c0 .44.09.8.31 1.13l.06.05 8.73-8.73v-.21L1.74 3.01l-.06.05zM20.12 10.5l-2.54-1.46-3.1 3.1 3.1 3.1 2.56-1.48c.73-.42.73-1.1 0-1.52l-.02-.74zM4.17.46L16.77 7.73l-2.79 2.79L3.18.66a1.17 1.17 0 0 1 .99-.2z"/>
                </svg>
                <div>
                  <p className="text-gray-400 leading-none mb-0.5" style={{ fontSize: '9px' }}>Get it on</p>
                  <p className="text-white font-bold leading-none" style={{ fontSize: '14px' }}>Google Play</p>
                </div>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Account</h4>
            <ul className="space-y-2.5">
              {ACCOUNT_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Help</h4>
            <ul className="space-y-2.5">
              {HELP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ backgroundColor: BG_BOT }} className="border-t border-orange-100">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center gap-2 flex-wrap justify-center mb-3">
            <span className="text-xs text-gray-400 font-medium">We accept:</span>
            {['Visa', 'Mastercard', 'Verve', 'Bank Transfer', 'USSD'].map((p) => (
              <span key={p} className="bg-white border border-gray-200 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                {p}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mb-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
              SSL Secured
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-orange-400 rounded-full inline-block" />
              CAC Registered
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 flex-wrap">
            <span>© {new Date().getFullYear()} BuyNow Nigeria Ltd.</span>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-orange-500 transition underline underline-offset-2">Privacy Policy</a>
            <span className="text-gray-300">·</span>
            <a href="#" className="hover:text-orange-500 transition underline underline-offset-2">Terms of Service</a>
          </div>
        </div>
      </div>

    </footer>
  )
}
