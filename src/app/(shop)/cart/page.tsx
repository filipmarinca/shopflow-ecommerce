'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  // TODO: integrate with cart store (zustand)
  const cartItems: any[] = []

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {/* Cart items will render here once store is connected */}
    </div>
  )
}
