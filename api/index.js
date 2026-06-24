import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import loanRoutes from './routes/loans.js';
import adminRoutes from './routes/admin.js';
import transactionRoutes from './routes/transactions.js';
import chatbotRoutes from './routes/chatbot.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Use environment variables instead of hardcoded secrets
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_local_dev';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Database Connection
mongoose.connect(MONGO_URI)
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Export the express app for Vercel Serverless Function
export default app;
