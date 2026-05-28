'use client'
// components/product/ReviewSection.tsx
// Star reviews system — add + display reviews per product

import { useState, useEffect } from 'react'
import { Star, User } from 'lucide-react'
import { useAuthStore } from '@/lib/store/authStore'
import { toast } from 'sonner'

interface Review {
  id: string
  productId: string
  userName: string
  rating: number
  comment: string
  date: string
}

export default function ReviewSection({ productId, productName }: { productId: string; productName: string }) {
  const { user, isLoggedIn } = useAuthStore()
  const [reviews,    setReviews]    = useState<Review[]>([])
  const [rating,     setRating]     = useState(0)
  const [hovered,    setHovered]    = useState(0)
  const [comment,    setComment]    = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Load reviews from localStorage (replace with API later)
  useEffect(() => {
    const stored = localStorage.getItem(`reviews-${productId}`)
    if (stored) setReviews(JSON.parse(stored))
  }, [productId])

  function saveReviews(updated: Review[]) {
    setReviews(updated)
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(updated))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating === 0) { toast.error('Please select a star rating'); return }
    if (comment.trim().length < 10) { toast.error('Review must be at least 10 characters'); return }

    setSubmitting(true)
    const newReview: Review = {
      id:       Date.now().toString(),
      productId,
      userName: user?.name ?? 'Anonymous',
      rating,
      comment:  comment.trim(),
      date:     new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }),
    }
    setTimeout(() => {
      saveReviews([newReview, ...reviews])
      setRating(0)
      setComment('')
      setSubmitting(false)
      toast.success('Review submitted!')
    }, 800)
  }

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <div className="mt-8 border-t pt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Customer Reviews
          {reviews.length > 0 && <span className="text-gray-400 font-normal text-base ml-2">({reviews.length})</span>}
        </h3>
        {avgRating && (
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-xl">
            <span className="text-2xl font-black text-orange-600">{avgRating}</span>
            <Star size={18} className="fill-yellow-400 text-yellow-400" />
          </div>
        )}
      </div>

      {/* Write a review */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-5 mb-6">
          <p className="font-semibold text-gray-800 mb-3">Write a Review</p>

          {/* Star selector */}
          <div className="flex items-center gap-1 mb-3">
            {[1,2,3,4,5].map((s) => (
              <button key={s} type="button"
                onMouseEnter={() => setHovered(s)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setRating(s)}
                className="focus:outline-none"
              >
                <Star size={28}
                  className={s <= (hovered || rating)
                    ? 'fill-yellow-400 text-yellow-400 scale-110 transition-transform'
                    : 'text-gray-300 transition-transform'}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm text-gray-500">
                {['','Terrible','Poor','Average','Good','Excellent'][rating]}
              </span>
            )}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder={`Share your experience with ${productName}...`}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300 resize-none"
          />
          <button type="submit" disabled={submitting}
            className="mt-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold px-6 py-2.5 rounded-full transition text-sm">
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      ) : (
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6 text-center">
          <p className="text-gray-600 text-sm mb-2">Login to write a review</p>
          <a href="/auth/login" className="text-orange-500 font-bold text-sm hover:underline">Login →</a>
        </div>
      )}

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <Star size={40} className="mx-auto mb-2 opacity-30" />
          <p>No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm shrink-0">
                    {r.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{r.userName}</p>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={11}
                          className={s <= r.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{r.date}</span>
              </div>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
