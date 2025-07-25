// Load environment variables as early as possible
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');

// Route imports
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');
const couponRoutes = require('./routes/coupons');  // <-- Import coupons routes
const payment = require('./routes/payment');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS setup with credentials support
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Mount routes
console.log('Mounting uploadRoutes:', uploadRoutes);
app.use('/api/upload', uploadRoutes);

console.log('Mounting authRoutes:', authRoutes);
app.use('/api/v1/auth', authRoutes);

console.log('Mounting productRoutes:', productRoutes);
app.use('/api/v1/products', productRoutes);

console.log('Mounting payment routes:', payment);
app.use('/api/v1/payment', payment);

console.log('Mounting orderRoutes:', orderRoutes);
app.use('/api/v1/orders', orderRoutes);

console.log('Mounting reviewRoutes:', reviewRoutes);
app.use('/api/v1/reviews', reviewRoutes);

console.log('Mounting couponRoutes:', couponRoutes);
app.use('/api/v1/coupons', couponRoutes);

// Global error handler (after all routes)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections gracefully
process.on('unhandledRejection', err => {
  console.error(`💥 Unhandled Error: ${err.message}`);
  server.close(() => process.exit(1));
});
