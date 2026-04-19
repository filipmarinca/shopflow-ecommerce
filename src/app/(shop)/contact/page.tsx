import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      <div className="grid gap-6 mb-8">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-gray-500" />
          <span>support@shopflow.com</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-gray-500" />
          <span>+1 (555) 123-4567</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-gray-500" />
          <span>123 Commerce St, Shop City, SC 12345</span>
        </div>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input type="email" placeholder="your@email.com" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="How can we help?"
          />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  )
}
