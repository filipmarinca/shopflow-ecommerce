export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  compareAtPrice: number | null
  images: string[]
  category: string
  stock: number
  sku: string | null
  featured: boolean
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  id: string
  productId: string
  quantity: number
  product: Product
}

export interface Order {
  id: string
  userId: string
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  total: number
  subtotal: number
  tax: number
  shipping: number
  discount: number
  couponCode: string | null
  stripePaymentId: string | null
  shippingAddress: any
  billingAddress: any
  trackingNumber: string | null
  notes: string | null
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string | null
  email: string
  role: 'CUSTOMER' | 'ADMIN'
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  comment: string | null
  createdAt: Date
  updatedAt: Date
}
