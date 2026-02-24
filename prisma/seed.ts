import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const categories = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports & Outdoors',
  'Books',
  'Toys',
  'Beauty',
  'Automotive',
];

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    slug: 'wireless-bluetooth-headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Crystal clear audio and comfortable fit for all-day wear.',
    price: 149.99,
    compareAtPrice: 199.99,
    category: 'Electronics',
    stock: 45,
    sku: 'ELEC-HEAD-001',
    featured: true,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
  },
  {
    name: 'Smart Watch Pro',
    slug: 'smart-watch-pro',
    description: 'Advanced fitness tracking, heart rate monitor, GPS, and smartphone notifications. Water-resistant up to 50m.',
    price: 299.99,
    compareAtPrice: 399.99,
    category: 'Electronics',
    stock: 32,
    sku: 'ELEC-WATCH-001',
    featured: true,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
  },
  {
    name: 'Premium Cotton T-Shirt',
    slug: 'premium-cotton-tshirt',
    description: '100% organic cotton, soft and breathable. Perfect fit with reinforced stitching. Available in multiple colors.',
    price: 29.99,
    category: 'Clothing',
    stock: 120,
    sku: 'CLOTH-SHIRT-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'],
  },
  {
    name: 'Running Shoes - Performance',
    slug: 'running-shoes-performance',
    description: 'Lightweight running shoes with advanced cushioning and breathable mesh. Ideal for marathon training.',
    price: 89.99,
    compareAtPrice: 129.99,
    category: 'Sports & Outdoors',
    stock: 67,
    sku: 'SPORT-SHOE-001',
    featured: true,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
  },
  {
    name: 'Stainless Steel Water Bottle',
    slug: 'stainless-steel-water-bottle',
    description: 'Insulated water bottle keeps drinks cold for 24h or hot for 12h. BPA-free, leak-proof design.',
    price: 24.99,
    category: 'Sports & Outdoors',
    stock: 88,
    sku: 'SPORT-BOTTLE-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800'],
  },
  {
    name: 'Laptop Backpack - Travel Edition',
    slug: 'laptop-backpack-travel',
    description: 'Durable backpack with padded laptop compartment, USB charging port, and multiple pockets. TSA-friendly.',
    price: 59.99,
    category: 'Electronics',
    stock: 54,
    sku: 'ELEC-BAG-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'],
  },
  {
    name: 'Mechanical Gaming Keyboard',
    slug: 'mechanical-gaming-keyboard',
    description: 'RGB backlit mechanical keyboard with customizable keys. Blue switches for tactile feedback.',
    price: 119.99,
    category: 'Electronics',
    stock: 28,
    sku: 'ELEC-KEY-001',
    featured: true,
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800'],
  },
  {
    name: 'Yoga Mat Premium',
    slug: 'yoga-mat-premium',
    description: 'Extra thick, non-slip yoga mat with carrying strap. Eco-friendly materials, perfect for home workouts.',
    price: 39.99,
    category: 'Sports & Outdoors',
    stock: 76,
    sku: 'SPORT-YOGA-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800'],
  },
  {
    name: 'Ceramic Coffee Mug Set',
    slug: 'ceramic-coffee-mug-set',
    description: 'Set of 4 elegant ceramic mugs. Microwave and dishwasher safe. Perfect for coffee, tea, or hot chocolate.',
    price: 34.99,
    category: 'Home & Garden',
    stock: 92,
    sku: 'HOME-MUG-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800'],
  },
  {
    name: 'LED Desk Lamp',
    slug: 'led-desk-lamp',
    description: 'Adjustable LED lamp with touch controls and USB charging port. Energy-efficient and eye-friendly.',
    price: 44.99,
    category: 'Home & Garden',
    stock: 41,
    sku: 'HOME-LAMP-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800'],
  },
  {
    name: 'Portable Bluetooth Speaker',
    slug: 'portable-bluetooth-speaker',
    description: 'Waterproof Bluetooth speaker with 360-degree sound. 12-hour battery life and built-in microphone.',
    price: 79.99,
    category: 'Electronics',
    stock: 58,
    sku: 'ELEC-SPEAK-001',
    featured: true,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800'],
  },
  {
    name: 'Fitness Resistance Bands Set',
    slug: 'fitness-resistance-bands',
    description: 'Set of 5 resistance bands with different strength levels. Includes carrying bag and workout guide.',
    price: 19.99,
    category: 'Sports & Outdoors',
    stock: 104,
    sku: 'SPORT-BAND-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800'],
  },
  {
    name: 'Sunglasses - Polarized',
    slug: 'sunglasses-polarized',
    description: 'UV400 protection polarized sunglasses. Lightweight frame with anti-glare coating.',
    price: 69.99,
    category: 'Clothing',
    stock: 73,
    sku: 'CLOTH-GLASS-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800'],
  },
  {
    name: 'Wireless Mouse - Ergonomic',
    slug: 'wireless-mouse-ergonomic',
    description: 'Comfortable ergonomic design, precise tracking, long battery life. Compatible with all operating systems.',
    price: 34.99,
    category: 'Electronics',
    stock: 95,
    sku: 'ELEC-MOUSE-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800'],
  },
  {
    name: 'Plant Pot Set - Ceramic',
    slug: 'plant-pot-set-ceramic',
    description: 'Set of 3 modern ceramic plant pots with drainage holes and saucers. Perfect for succulents and herbs.',
    price: 29.99,
    category: 'Home & Garden',
    stock: 63,
    sku: 'HOME-POT-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800'],
  },
  {
    name: 'Notebook Set - Hardcover',
    slug: 'notebook-set-hardcover',
    description: 'Set of 3 premium hardcover notebooks with dotted pages. Perfect for journaling or note-taking.',
    price: 24.99,
    category: 'Books',
    stock: 87,
    sku: 'BOOK-NOTE-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800'],
  },
  {
    name: 'Aromatherapy Diffuser',
    slug: 'aromatherapy-diffuser',
    description: 'Ultrasonic essential oil diffuser with LED lights. Quiet operation and automatic shut-off.',
    price: 39.99,
    category: 'Home & Garden',
    stock: 48,
    sku: 'HOME-DIFF-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1583912267550-bc82a66d4a2d?w=800'],
  },
  {
    name: 'Dumbbell Set - Adjustable',
    slug: 'dumbbell-set-adjustable',
    description: 'Adjustable dumbbell set from 5 to 25 lbs. Space-saving design with quick-change mechanism.',
    price: 159.99,
    category: 'Sports & Outdoors',
    stock: 22,
    sku: 'SPORT-DUMB-001',
    featured: true,
    images: ['https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800'],
  },
  {
    name: 'Phone Case - Protective',
    slug: 'phone-case-protective',
    description: 'Shockproof phone case with raised edges for screen protection. Slim profile with grip-friendly texture.',
    price: 19.99,
    category: 'Electronics',
    stock: 142,
    sku: 'ELEC-CASE-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800'],
  },
  {
    name: 'Kitchen Knife Set - Professional',
    slug: 'kitchen-knife-set',
    description: 'High-carbon stainless steel knife set with wooden block. Includes chef, bread, utility, and paring knives.',
    price: 129.99,
    category: 'Home & Garden',
    stock: 31,
    sku: 'HOME-KNIFE-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800'],
  },
  {
    name: 'USB-C Hub Adapter',
    slug: 'usbc-hub-adapter',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery. Compact aluminum design.',
    price: 49.99,
    category: 'Electronics',
    stock: 68,
    sku: 'ELEC-HUB-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800'],
  },
  {
    name: 'Canvas Wall Art Set',
    slug: 'canvas-wall-art-set',
    description: 'Set of 3 modern canvas prints. Ready to hang with mounting hardware included. Abstract design.',
    price: 89.99,
    category: 'Home & Garden',
    stock: 36,
    sku: 'HOME-ART-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800'],
  },
  {
    name: 'Travel Toiletry Bag',
    slug: 'travel-toiletry-bag',
    description: 'Waterproof hanging toiletry bag with multiple compartments. TSA-approved size for carry-on.',
    price: 27.99,
    category: 'Clothing',
    stock: 79,
    sku: 'CLOTH-BAG-001',
    featured: false,
    images: ['https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800'],
  },
];

async function main() {
  console.log('Starting seed...');

  // Create categories
  console.log('Creating categories...');
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        name: cat,
        slug: cat.toLowerCase().replace(/\s+/g, '-'),
        description: `Browse our selection of ${cat.toLowerCase()}`,
      },
    });
  }

  // Create admin user
  console.log('Creating admin user...');
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin123!', 10);
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@shopflow.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@shopflow.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create sample customer
  console.log('Creating sample customer...');
  const customerPassword = await bcrypt.hash('customer123', 10);
  await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      name: 'John Doe',
      password: customerPassword,
      role: 'CUSTOMER',
    },
  });

  // Create products
  console.log('Creating products...');
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  // Create sample coupons
  console.log('Creating coupons...');
  await prisma.coupon.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: {
      code: 'WELCOME10',
      type: 'PERCENTAGE',
      value: 10,
      maxUses: 100,
      active: true,
    },
  });

  await prisma.coupon.upsert({
    where: { code: 'SAVE20' },
    update: {},
    create: {
      code: 'SAVE20',
      type: 'FIXED',
      value: 20,
      minPurchase: 100,
      maxUses: 50,
      active: true,
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
