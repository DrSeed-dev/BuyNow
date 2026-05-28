'use client'

// app/auth/register/page.tsx

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const login  = useAuthStore((s) => s.login)

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState<Partial<typeof form>>({})

  function validate() {
    const e: Partial<typeof form> = {}
    if (!form.name.trim())                         e.name     = 'Full name is required'
    if (!form.email.includes('@'))                  e.email    = 'Enter a valid email'
    if (form.phone.length < 11)                     e.phone    = 'Enter a valid Nigerian phone number'
    if (form.password.length < 6)                   e.password = 'Min 6 characters'
    if (form.password !== form.confirm)             e.confirm  = 'Passwords do not match'
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      login({ id: Date.now().toString(), name: form.name, email: form.email })
      toast.success('Account created! Welcome to BuyNow 🎉')
      router.push('/')
    }, 1000)
  }

  function f(key: keyof typeof form) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [key]: e.target.value }))
        setErrors((prev) => ({ ...prev, [key]: undefined }))
      },
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-orange-500">BuyNow</Link>
          <p className="text-gray-500 mt-2">Create your free account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            {[
              { key: 'name',  label: 'Full Name',      type: 'text',     placeholder: 'e.g. Amina Ibrahim' },
              { key: 'email', label: 'Email Address',  type: 'email',    placeholder: 'you@example.com' },
              { key: 'phone', label: 'Phone Number',   type: 'tel',      placeholder: '08012345678' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300 ${errors[key as keyof typeof form] ? 'border-red-400' : 'border-gray-200'}`}
                  {...f(key as keyof typeof form)}
                />
                {errors[key as keyof typeof form] && (
                  <p className="text-red-500 text-xs mt-1">{errors[key as keyof typeof form]}</p>
                )}
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min 6 characters"
                  className={`w-full border rounded-xl px-4 py-3 pr-12 text-sm outline-none focus:ring-2 focus:ring-orange-300 ${errors.password ? 'border-red-400' : 'border-gray-200'}`}
                  {...f('password')}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300 ${errors.confirm ? 'border-red-400' : 'border-gray-200'}`}
                {...f('confirm')}
              />
              {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 rounded-full transition flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : 'Create Account →'}
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-orange-500 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
