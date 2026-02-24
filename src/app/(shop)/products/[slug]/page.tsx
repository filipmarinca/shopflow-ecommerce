import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { Star, Heart, Share2, Truck, Shield, ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: PageProps) {
  const product = await prisma.product.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      variants: true,
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
      },
    },
  })

  if (!product) {
    notFound()
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: {
        not: product.id,
      },
      active: true,
    },
    take: 4,
  })

  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
            <Image
              src={product.images[0] || '/placeholder.png'}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(averageRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviews.length} reviews)
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              {product.compareAtPrice && (
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-semibold">
                  Save {Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                </span>
              )}
            </div>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="font-semibold">SKU:</span>
              <span className="text-gray-600">{product.sku}</span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="font-semibold">Category:</span>
              <Link href={`/products?category=${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 hover:underline">
                {product.category}
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">Availability:</span>
              <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <Button size="lg" className="flex-1" disabled={product.stock === 0}>
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1" disabled={product.stock === 0}>
              Buy Now
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 flex items-center gap-3">
              <Truck className="h-8 w-8 text-blue-600" />
              <div>
                <div className="font-semibold">Free Shipping</div>
                <div className="text-sm text-gray-600">On orders over $50</div>
              </div>
            </Card>
            <Card className="p-4 flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <div className="font-semibold">Secure Payment</div>
                <div className="text-sm text-gray-600">100% protected</div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold">{review.user.name}</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((related) => (
              <Link key={related.id} href={`/products/${related.slug}`}>
                <Card className="group hover:shadow-lg transition-shadow">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={related.images[0] || '/placeholder.png'}
                      alt={related.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {related.name}
                    </h3>
                    <div className="text-lg font-bold">{formatPrice(related.price)}</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
