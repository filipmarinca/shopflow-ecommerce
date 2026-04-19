import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ClipboardList } from 'lucide-react'

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <ClipboardList className="mx-auto h-16 w-16 text-gray-300 mb-4" />
      <h1 className="text-2xl font-bold mb-2">No orders yet</h1>
      <p className="text-gray-600 mb-6">Once you place an order, it will appear here.</p>
      <Link href="/products">
        <Button>Start Shopping</Button>
      </Link>
    </div>
  )
}
