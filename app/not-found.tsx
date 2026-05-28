// app/not-found.tsx
// This page shows when any URL doesn't exist — fixes the 404 errors

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl mb-4">🔍</p>
        <h1 className="text-4xl font-black text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-700 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-orange-500 text-white font-bold px-8 py-3 rounded-full hover:bg-orange-600 transition"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="border-2 border-orange-500 text-orange-600 font-bold px-8 py-3 rounded-full hover:bg-orange-50 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}
