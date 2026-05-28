// lib/store/promoStore.ts
// Promo code system — valid codes with discount amounts

import { create } from 'zustand'

const VALID_CODES: Record<string, { discount: number; type: 'percent' | 'fixed'; label: string }> = {
  'BUYNOW10':   { discount: 10, type: 'percent', label: '10% off your order'         },
  'NIGERIA20':  { discount: 20, type: 'percent', label: '20% off your order'         },
  'SAVE5000':   { discount: 5000, type: 'fixed', label: '₦5,000 off your order'      },
  'WELCOME15':  { discount: 15, type: 'percent', label: '15% off for new customers'  },
  'MOTORS10':   { discount: 10, type: 'percent', label: '10% off motors & bikes'     },
}

interface PromoStore {
  code:        string | null
  discount:    number
  type:        'percent' | 'fixed' | null
  label:       string | null
  applyCode:   (code: string, total: number) => { success: boolean; message: string }
  removeCode:  () => void
  getTotal:    (subtotal: number) => number
}

export const usePromoStore = create<PromoStore>()((set, get) => ({
  code:     null,
  discount: 0,
  type:     null,
  label:    null,

  applyCode: (inputCode, total) => {
    const key    = inputCode.trim().toUpperCase()
    const promo  = VALID_CODES[key]

    if (!promo) {
      return { success: false, message: 'Invalid promo code. Try BUYNOW10 or NIGERIA20' }
    }

    const saving = promo.type === 'percent'
      ? Math.round((promo.discount / 100) * total)
      : promo.discount

    if (saving > total) {
      return { success: false, message: 'Order total too low for this code' }
    }

    set({ code: key, discount: saving, type: promo.type, label: promo.label })
    return { success: true, message: `${promo.label} applied!` }
  },

  removeCode: () => set({ code: null, discount: 0, type: null, label: null }),

  getTotal: (subtotal) => Math.max(0, subtotal - get().discount),
}))
