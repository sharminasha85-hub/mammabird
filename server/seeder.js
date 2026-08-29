import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';
import Order from './models/Order.js';
import { initialProducts } from './data/seedProducts.js';

dotenv.config();

const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;

const importData = async () => {
  if (!mongoURI) {
    console.error('❌ Error: MONGO_URI is not defined in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);
    console.log('🍃 Connected to MongoDB Atlas for seeding...');

    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Create sample users (Admin and Regular Customer)
    const adminUser = await User.create({
      name: 'mammaBird Admin',
      email: 'admin@mammabird.com',
      password: 'password123',
      role: 'admin',
      phone: '+1 (555) 019-2834',
      vipMember: true,
      vipDiscountCode: 'NESTLING25',
    });

    const sampleUser = await User.create({
      name: 'Jessica Reynolds',
      email: 'customer@mammabird.com',
      password: 'password123',
      role: 'user',
      phone: '+1 (555) 382-9912',
      vipMember: true,
      vipDiscountCode: 'NESTLING25',
      addresses: [
        {
          fullName: 'Jessica Reynolds',
          street: '742 Evergreen Meadow Way',
          apartment: 'Suite 4B',
          city: 'Portland',
          state: 'OR',
          zipCode: '97201',
          country: 'United States',
          phone: '+1 (555) 382-9912',
          isDefault: true,
        },
      ],
    });

    console.log('✅ Created Demo Admin (admin@mammabird.com / password123)');
    console.log('✅ Created Demo Customer (customer@mammabird.com / password123)');

    // Insert initial products
    await Product.insertMany(initialProducts);
    console.log(`✅ Successfully seeded ${initialProducts.length} organic mammaBird products into Atlas!`);

    process.exit();
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  if (!mongoURI) {
    console.error('❌ Error: MONGO_URI is not defined in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('🗑️ All data destroyed from MongoDB Atlas!');
    process.exit();
  } catch (error) {
    console.error(`❌ Data destroy failed: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
