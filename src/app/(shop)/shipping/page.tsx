import { Truck, Clock, DollarSign, Package } from 'lucide-react'

export default function ShippingPage() {
  const options = [
    { icon: Truck, title: 'Standard Shipping', time: '5-7 business days', price: '$4.99', note: 'Free on orders over $50' },
    { icon: Clock, title: 'Express Shipping', time: '2-3 business days', price: '$12.99', note: '' },
    { icon: Package, title: 'Overnight Shipping', time: 'Next business day', price: '$24.99', note: 'Order by 2pm EST' },
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Shipping Information</h1>

      <div className="space-y-6">
        {options.map((opt) => (
          <div key={opt.title} className="flex items-start gap-4 p-4 border rounded-lg">
            <opt.icon className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">{opt.title}</h3>
              <p className="text-sm text-gray-600">{opt.time} &mdash; {opt.price}</p>
              {opt.note && <p className="text-sm text-green-600 mt-1">{opt.note}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Tracking Your Order</h3>
        <p className="text-sm text-gray-600">
          Once your order ships, you&apos;ll receive a confirmation email with a tracking number.
          You can also track your order from the &quot;My Orders&quot; page.
        </p>
      </div>
    </div>
  )
}
