import {
  Activity,
  BookOpen,
  Flag,
  Home,
  LucideIcon,
  Monitor,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Shirt,
  Truck,
} from 'lucide-react'

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  electronics: Monitor,
  'fashion-men': Shirt,
  'fashion-women': ShoppingBag,
  'home-kitchen': Home,
  sports: Activity,
  beauty: Sparkles,
  books: BookOpen,
  groceries: ShoppingCart,
  'motors-bikes': Truck,
  'nigerian-market': Flag,
}

export function getCategoryIcon(slug: string) {
  return CATEGORY_ICON_MAP[slug] ?? ShoppingCart
}
