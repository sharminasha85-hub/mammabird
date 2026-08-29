import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Setup environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static images and uploads
app.use('/images', express.static(path.join(rootDir, 'public', 'images')));
app.use('/uploads', express.static(path.join(rootDir, 'public', 'uploads')));

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'mammaBird Luxury Kids Fashion API',
    version: '1.0.0',
    mongoStatus: process.env.MONGO_URI ? 'Configured' : 'Fallback / Standalone Mode',
    cloudinaryStatus: process.env.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'Local Disk Fallback',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Serve production frontend if built
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(rootDir, 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(rootDir, 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('mammaBird API server is running smoothly in development mode...');
  });
}

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🪺 [mammaBird Server] Running on http://localhost:${PORT}`);
  console.log(`📦 [API Health] http://localhost:${PORT}/api/health`);
  console.log(`🛍️ [Products API] http://localhost:${PORT}/api/products\n`);
});
