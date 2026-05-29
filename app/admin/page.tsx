'use client'
// app/admin/page.tsx — Admin dashboard with sales analytics

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Package, TrendingUp, ShoppingCart, Users, AlertCircle, DollarSign } from 'lucide-react'
import { getProducts } from '@/lib/api'
import { formatPrice } from '@/lib/types'

// Demo analytics data — replace with real API later
const MONTHLY_REVENUE = [
  { month: 'Jan', amount: 1250000 },
  { month: 'Feb', amount: 1840000 },
  { month: 'Mar', amount: 2100000 },
  { month: 'Apr', amount: 1750000 },
  { month: 'May', amount: 2800000 },
  { month: 'Jun', amount: 3200000 },
]

const TOP_PRODUCTS = [
  { name: 'Samsung Galaxy A55 5G',    sales: 23, revenue: 6555000  },
  { name: 'Sony WH-1000XM5',          sales: 18, revenue: 3330000  },
  { name: 'Honda CB125F',             sales: 7,  revenue: 5950000  },
  { name: 'Nike Air Zoom Pegasus 41', sales: 31, revenue: 2108000  },
  { name: 'HP Pavilion 15 Laptop',    sales: 12, revenue: 5820000  },
]

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(0)
  const [flashCount,   setFlashCount]   = useState(0)
  const [lowStock,     setLowStock]     = useState(0)

  useEffect(() => {
    getProducts().then((products) => {
      setProductCount(products.length)
      setFlashCount(products.filter((p) => p.isFlashDeal).length)
      setLowStock(products.filter((p) => p.stock <= 10).length)
    }).catch(() => {})
  }, [])

  const maxRevenue = Math.max(...MONTHLY_REVENUE.map((m) => m.amount))
  const totalRevenue = MONTHLY_REVENUE.reduce((sum, m) => sum + m.amount, 0)

  const STATS = [
    { label: 'Total Products', value: productCount, Icon: Package,      bg: 'bg-blue-50',   text: 'text-blue-600'   },
    { label: 'Total Revenue',  value: formatPrice(totalRevenue), Icon: DollarSign,   bg: 'bg-green-50',  text: 'text-green-600'  },
    { label: 'Flash Deals',    value: flashCount,   Icon: TrendingUp,   bg: 'bg-orange-50', text: 'text-orange-600' },
    { label: 'Low Stock',      value: lowStock,     Icon: AlertCircle,  bg: 'bg-red-50',    text: 'text-red-600'    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">BuyNow Nigeria — Management Panel</p>
        </div>
        <Link href="/admin/products"
          className="bg-orange-500 text-white font-medium px-4 py-2.5 rounded-full hover:bg-orange-600 transition text-sm">
          + Manage Products
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ label, value, Icon, bg, text }) => (
          <div key={label} className="bg-white rounded-xl p-5 shadow-sm">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${bg}`}>
              <Icon size={22} className={text} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">

        {/* Revenue chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-1">Monthly Revenue</h3>
          <p className="text-sm text-gray-500 mb-4">Last 6 months</p>
          <div className="flex items-end gap-2 h-40">
            {MONTHLY_REVENUE.map(({ month, amount }) => {
              const height = Math.round((amount / maxRevenue) * 100)
              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-gray-500 font-medium">{formatPrice(amount / 1000).replace('₦', '₦')}k</span>
                  <div className="w-full bg-orange-500 rounded-t-lg transition-all hover:bg-orange-600"
                    style={{ height: `${height}%` }} />
                  <span className="text-xs text-gray-500">{month}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {TOP_PRODUCTS.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  i === 0 ? 'bg-yellow-100 text-yellow-600' :
                  i === 1 ? 'bg-gray-100 text-gray-600' :
                  i === 2 ? 'bg-orange-100 text-orange-600' : 'bg-gray-50 text-gray-500'
                }`}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.sales} sales</p>
                </div>
                <span className="text-sm font-bold text-green-600 shrink-0">{formatPrice(p.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Recent Orders</h3>
          <Link href="/account/orders" className="text-orange-500 text-sm hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2 font-medium">Order ID</th>
                <th className="pb-2 font-medium">Customer</th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { id: 'BN98231456', customer: 'Emeka Okafor',  amount: 470000,  status: 'delivered',  color: 'bg-green-100 text-green-700'  },
                { id: 'BN72019834', customer: 'Amina Ibrahim',  amount: 65000,   status: 'shipped',    color: 'bg-blue-100 text-blue-700'    },
                { id: 'BN60112233', customer: 'Chukwudi Eze',   amount: 850000,  status: 'processing', color: 'bg-orange-100 text-orange-700' },
                { id: 'BN55871209', customer: 'Fatima Bello',   amount: 185000,  status: 'pending',    color: 'bg-yellow-100 text-yellow-700' },
              ].map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 font-mono text-xs text-gray-600">{order.id}</td>
                  <td className="py-3 text-gray-800">{order.customer}</td>
                  <td className="py-3 font-semibold text-gray-900">{formatPrice(order.amount)}</td>
                  <td className="py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${order.color}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
