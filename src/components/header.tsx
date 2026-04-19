'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingCart, Search, User, Heart, LogOut, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Header() {
  const { data: session, status } = useSession()

  return (
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

          <nav className="flex items-center gap-2">
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

            {status === 'loading' ? (
              <Button variant="ghost" size="icon" disabled>
                <User className="h-5 w-5 animate-pulse" />
              </Button>
            ) : session ? (
              <div className="flex items-center gap-2">
                {session.user.role === 'ADMIN' && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Shield className="h-4 w-4" />
                      Admin
                    </Button>
                  </Link>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <span className="hidden md:inline text-gray-600">
                    {session.user.name || session.user.email}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => signOut({ callbackUrl: '/' })}
                    title="Sign out"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ) : (
              <Link href="/auth/signin">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
