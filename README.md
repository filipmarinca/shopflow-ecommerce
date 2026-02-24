# ShopFlow E-Commerce Platform

A full-stack, production-ready e-commerce platform built with Next.js 14, TypeScript, and modern web technologies.

## Features

### Customer Features
- Product catalog with search and filtering
- Product detail pages with variants
- Shopping cart with persistent storage
- Stripe Checkout integration
- Order tracking and history
- User authentication and accounts
- Product reviews and ratings
- Wishlist functionality
- Related products
- Fully responsive design

### Admin Panel Features
- Dashboard with real-time analytics
- Product management (CRUD operations)
- Order management with status updates
- Customer management
- Low stock alerts
- Sales reports and analytics
- Bulk operations support
- Data export capabilities

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui components
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js with JWT
- **Payments:** Stripe Checkout + Webhooks
- **Image Upload:** UploadThing (or Cloudinary)
- **Email:** Resend
- **Deployment:** Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Stripe account (for payments)
- UploadThing account (for images)
- Resend account (for emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/filipmarinca/shopflow-ecommerce.git
   cd shopflow-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and fill in your values:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/shopflow"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-here"
   STRIPE_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   UPLOADTHING_SECRET="sk_live_..."
   UPLOADTHING_APP_ID="your_app_id"
   RESEND_API_KEY="re_..."
   EMAIL_FROM="noreply@yourdomain.com"
   ADMIN_EMAIL="admin@shopflow.com"
   ADMIN_PASSWORD="Admin123!"
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Default Credentials

### Admin Access
- **URL:** http://localhost:3000/admin
- **Email:** admin@shopflow.com
- **Password:** Admin123!

### Test Customer
- **Email:** customer@example.com
- **Password:** customer123

## Stripe Setup (Test Mode)

1. Create a Stripe account at https://stripe.com
2. Get your test API keys from the Stripe Dashboard
3. Add them to your `.env` file
4. Set up webhook endpoint:
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`
5. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

### Test Cards
- **Success:** 4242 4242 4242 4242
- **Requires Authentication:** 4000 0025 0000 3155
- **Declined:** 4000 0000 0000 9995

## Database Schema

The application uses Prisma with the following models:
- User (authentication and profiles)
- Product (inventory management)
- ProductVariant (product variations)
- Category (product organization)
- Order & OrderItem (purchase records)
- Cart & CartItem (shopping cart)
- Review (product reviews)
- Wishlist (saved items)
- Coupon (discount codes)

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Import your repository at https://vercel.com
   - Add environment variables
   - Deploy

3. **Set up PostgreSQL**
   - Use Vercel Postgres, Neon, or Supabase
   - Update `DATABASE_URL` in Vercel environment variables

4. **Run migrations**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

### Docker

```bash
docker-compose up -d
```

The application will be available at http://localhost:3000

## Project Structure

```
shopflow-ecommerce/
├── src/
│   ├── app/
│   │   ├── (shop)/              # Customer-facing pages
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── products/        # Product catalog
│   │   │   ├── cart/            # Shopping cart
│   │   │   ├── checkout/        # Checkout flow
│   │   │   └── orders/          # Order history
│   │   ├── admin/               # Admin panel
│   │   │   ├── page.tsx         # Dashboard
│   │   │   ├── products/        # Product management
│   │   │   ├── orders/          # Order management
│   │   │   ├── customers/       # Customer management
│   │   │   └── analytics/       # Analytics
│   │   └── api/                 # API routes
│   ├── components/              # React components
│   │   └── ui/                  # shadcn/ui components
│   ├── lib/                     # Utilities
│   │   ├── prisma.ts           # Database client
│   │   ├── stripe.ts           # Stripe client
│   │   └── utils.ts            # Helper functions
│   └── types/                   # TypeScript types
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Seed data
├── public/                      # Static assets
└── package.json
```

## API Routes

- `POST /api/auth/[...nextauth]` - Authentication
- `POST /api/products` - Create product
- `GET /api/products/[id]` - Get product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product
- `POST /api/cart` - Add to cart
- `POST /api/checkout` - Create checkout session
- `POST /api/webhooks/stripe` - Stripe webhooks

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## Features Roadmap

- [ ] Advanced analytics with charts
- [ ] Inventory management system
- [ ] Email notifications for orders
- [ ] PDF invoice generation
- [ ] Multi-currency support
- [ ] Advanced search with filters
- [ ] Product recommendations
- [ ] Coupon system implementation
- [ ] Wishlist functionality
- [ ] Customer reviews moderation

## Contributing

This is a portfolio project. Feel free to fork and customize for your own use.

## License

MIT License - See LICENSE file for details

## Author

**Filip Marinca**
- GitHub: [@filipmarinca](https://github.com/filipmarinca)
- Portfolio: [filipmarinca.com](https://filipmarinca.com)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Payments by [Stripe](https://stripe.com/)
