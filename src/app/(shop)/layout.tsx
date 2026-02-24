import Link from 'next/link'
import { ShoppingCart, Search, User, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="text-2xl font-bold">
              ShopFlow
            </Link>
            
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10"
                />
              </div>
            </div>

            <nav className="flex items-center gap-4">
              <Link href="/products">
                <Button variant="ghost">Products</Button>
              </Link>
              <Link href="/wishlist">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

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
