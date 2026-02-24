import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { Mail, Calendar, ShoppingBag } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: {
      role: 'CUSTOMER',
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      orders: {
        select: {
          total: true,
        },
      },
    },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Customers</h1>
        <div className="text-sm text-gray-600">
          {customers.length} total customers
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold">Customer</th>
                  <th className="text-left p-4 font-semibold">Email</th>
                  <th className="text-left p-4 font-semibold">Joined</th>
                  <th className="text-left p-4 font-semibold">Orders</th>
                  <th className="text-left p-4 font-semibold">Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => {
                  const totalSpent = customer.orders.reduce((sum, order) => sum + order.total, 0)
                  
                  return (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-semibold">{customer.name || 'No name'}</div>
                        <div className="text-sm text-gray-600">ID: {customer.id.slice(0, 8)}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {customer.email}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {formatDate(customer.createdAt)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="h-4 w-4 text-gray-400" />
                          {customer.orders.length}
                        </div>
                      </td>
                      <td className="p-4 font-semibold">
                        ${totalSpent.toFixed(2)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
