import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
      <p className="text-gray-600 mb-6">Save products you love for later.</p>
      <Link href="/products">
        <Button>Browse Products</Button>
      </Link>
    </div>
  )
}
