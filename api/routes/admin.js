import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify JWT token and check if admin
const adminAuthMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    req.userId = decoded.userId;
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Admin: Get all users
router.get('/users', adminAuthMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error while fetching users.' });
  }
});

// Admin: Update User KYC status
router.put('/users/:id/kyc', adminAuthMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'verified', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid KYC status.' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { kycStatus: status }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json({ message: 'KYC status updated', user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error while updating KYC.' });
  }
});

// Admin: Get all contacts
router.get('/contacts', adminAuthMiddleware, async (req, res) => {
  try {
    // Currently no contact model in DB, returning empty array
    res.json([]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error while fetching contacts.' });
  }
});

export default router;
