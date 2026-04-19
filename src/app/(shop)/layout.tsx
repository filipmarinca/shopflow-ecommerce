import Link from 'next/link'
import Header from '@/components/header'

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-gray-50 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ShopFlow</h3>
              <p className="text-sm text-gray-600">
                Your one-stop shop for quality products at great prices.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/products" className="text-gray-600 hover:text-gray-900">All Products</Link></li>
                <li><Link href="/products?category=electronics" className="text-gray-600 hover:text-gray-900">Electronics</Link></li>
                <li><Link href="/products?category=clothing" className="text-gray-600 hover:text-gray-900">Clothing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link></li>
                <li><Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
                <li><Link href="/shipping" className="text-gray-600 hover:text-gray-900">Shipping Info</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/orders" className="text-gray-600 hover:text-gray-900">My Orders</Link></li>
                <li><Link href="/wishlist" className="text-gray-600 hover:text-gray-900">Wishlist</Link></li>
                <li><Link href="/admin" className="text-gray-600 hover:text-gray-900">Admin Panel</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            © {new Date().getFullYear()} ShopFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
