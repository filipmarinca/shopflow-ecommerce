export default function FAQPage() {
  const faqs = [
    { q: 'How do I track my order?', a: 'Log in to your account and visit the "My Orders" page to see real-time tracking.' },
    { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery. Items must be in original condition.' },
    { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days.' },
    { q: 'Do you ship internationally?', a: 'Currently we ship within the US only. International shipping is coming soon.' },
    { q: 'How can I contact support?', a: 'You can reach us via our Contact page or email support@shopflow.com.' },
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b pb-4">
            <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
