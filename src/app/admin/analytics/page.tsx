import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { BarChart, TrendingUp, DollarSign, Eye } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
  const [totalOrders, totalRevenue, totalProducts, totalCustomers] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.product.count({ where: { active: true } }),
    prisma.user.count({ where: { role: 'CUSTOMER' } }),
  ])

  const stats = [
    { label: 'Total Orders', value: totalOrders, icon: BarChart },
    { label: 'Revenue', value: `$${(totalRevenue._sum.total || 0).toFixed(2)}`, icon: DollarSign },
    { label: 'Active Products', value: totalProducts, icon: Eye },
    { label: 'Customers', value: totalCustomers, icon: TrendingUp },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-gray-500">{stat.label}</span>
              <stat.icon className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
