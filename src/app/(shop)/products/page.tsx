import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: {
    category?: string
    search?: string
    featured?: string
  }
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { category, search, featured } = searchParams

  const where: any = {
    active: true,
  }

  if (category) {
    where.category = category
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ]
  }

  if (featured === 'true') {
    where.featured = true
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
  })

  const categories = await prisma.category.findMany()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h2 className="font-bold text-lg mb-4">Categories</h2>
            <div className="space-y-2">
              <Link href="/products">
                <Button
                  variant={!category ? 'default' : 'ghost'}
                  className="w-full justify-start"
                >
                  All Products
                </Button>
              </Link>
              {categories.map((cat) => (
                <Link key={cat.id} href={`/products?category=${cat.slug}`}>
                  <Button
                    variant={category === cat.slug ? 'default' : 'ghost'}
                    className="w-full justify-start"
                  >
                    {cat.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              {category
                ? categories.find((c) => c.slug === category)?.name
                : 'All Products'}
            </h1>
            <p className="text-gray-600 mt-2">
              {products.length} products found
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <Card className="group hover:shadow-lg transition-all duration-200">
                    <CardHeader className="p-0">
                      <div className="relative aspect-square overflow-hidden rounded-t-lg">
                        <Image
                          src={product.images[0] || '/placeholder.png'}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        {product.compareAtPrice && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                            SALE
                          </div>
                        )}
                        {product.stock < 10 && product.stock > 0 && (
                          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-sm font-semibold">
                            Low Stock
                          </div>
                        )}
                        {product.stock === 0 && (
                          <div className="absolute top-2 left-2 bg-gray-500 text-white px-2 py-1 rounded text-sm font-semibold">
                            Out of Stock
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                          {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full" disabled={product.stock === 0}>
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
