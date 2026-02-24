import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <Link href="/admin" className="text-2xl font-bold">
            ShopFlow Admin
          </Link>
        </div>

        <nav className="flex-1 px-4">
          <div className="space-y-2">
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <Package className="mr-3 h-5 w-5" />
                Products
              </Button>
            </Link>
            <Link href="/admin/orders">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <ShoppingCart className="mr-3 h-5 w-5" />
                Orders
              </Button>
            </Link>
            <Link href="/admin/customers">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <Users className="mr-3 h-5 w-5" />
                Customers
              </Button>
            </Link>
            <Link href="/admin/analytics">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <BarChart className="mr-3 h-5 w-5" />
                Analytics
              </Button>
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="mb-4">
            <div className="text-sm text-gray-400">Signed in as</div>
            <div className="font-semibold">{session.user.email}</div>
          </div>
          <Link href="/">
            <Button variant="outline" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Back to Store
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
