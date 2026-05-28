// app/layout.tsx — Updated to include AnnouncementBar
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Navbar    from '@/components/layout/Navbar'
import Footer    from '@/components/layout/Footer'
import BottomNav from '@/components/layout/BottomNav'
import './globals.css'

export const metadata: Metadata = {
  title: { default: "BuyNow — Nigeria's #1 Marketplace", template: '%s | BuyNow' },
  description: 'Shop electronics, fashion, motors, home essentials. Fast delivery across Nigeria.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AnnouncementBar />
        <Navbar />
        <main className="min-h-screen bg-gray-50 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <BottomNav />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
