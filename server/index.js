import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import hpp from 'hpp';
import connectDB from './config/db.js';
import seedUser from './config/seed.js';
import authRoutes from './routes/authRoutes.js';
import batchRoutes from './routes/batchRoutes.js';

dotenv.config();

// Connect to MongoDB and seed user
connectDB().then(() => {
  seedUser();
});

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet()); // Basic security headers
app.use(hpp()); // Prevent parameter pollution
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // Restrict origin
  credentials: true,
}));
app.use(express.json({ limit: '10kb' })); // Limit body size to prevent DoS

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/batches', batchRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('FarmChainX Backend API with MongoDB is running...');
});

// Error handling for non-found routes
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
