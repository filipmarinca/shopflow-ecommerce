import Stripe from 'stripe'

let stripe: Stripe | null = null

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
    typescript: true,
  })
} else {
  console.warn('STRIPE_SECRET_KEY not set – Stripe features disabled')
}

export { stripe }
