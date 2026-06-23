import express from 'express';
import Loan from '../models/Loan.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail.js';

const router = express.Router();

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Apply for a new loan
router.post('/apply', authMiddleware, async (req, res) => {
  try {
    const { amount, purpose, tenure } = req.body;
    
    const newLoan = new Loan({
      userId: req.userId,
      amount,
      purpose,
      tenure
    });

    await newLoan.save();

    // Fetch user details to send email
    const user = await User.findById(req.userId);
    if (user) {
      sendEmail(
        user.email,
        'Loan Application Received - AgriPay',
        `<h2>Hello ${user.name},</h2>
         <p>We have successfully received your loan application for <strong>₹${amount}</strong> for the purpose of <strong>${purpose}</strong>.</p>
         <p>Our admin team will review your documents and update the status shortly.</p>
         <br/>
         <p>Regards,<br/>AgriPay Team</p>`
      );
    }

    res.status(201).json({ message: 'Loan application submitted successfully!', loan: newLoan });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error while applying for loan.' });
  }
});

// Get user's loans
router.get('/my-loans', authMiddleware, async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.userId }).sort({ appliedAt: -1 });
    res.json(loans);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error while fetching loans.' });
  }
});

// Admin: Get all loans
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    const loans = await Loan.find().populate('userId', 'name email phone').sort({ appliedAt: -1 });
    res.json(loans);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error while fetching all loans.' });
  }
});

// Admin: Update loan status
router.put('/update-status/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    const { status } = req.body;
    const loan = await Loan.findByIdAndUpdate(
      req.params.id, 
      { status, approvedAt: status === 'approved' ? Date.now() : null },
      { new: true }
    ).populate('userId', 'name email');

    if (!loan) return res.status(404).json({ error: 'Loan not found.' });

    // Log transaction if approved
    if (status === 'approved') {
      const transaction = new Transaction({
        userId: loan.userId._id,
        type: 'loan_disbursement',
        amount: loan.amount,
        description: `Loan Disbursement for: ${loan.purpose}`,
        referenceId: loan._id.toString()
      });
      await transaction.save();
    }

    // Send email notification based on status
    if (loan.userId && loan.userId.email) {
      const subject = status === 'approved' ? 'Loan Approved! - AgriPay' : 'Loan Update - AgriPay';
      const message = status === 'approved' 
        ? `<p>Congratulations! Your loan of <strong>₹${loan.amount}</strong> has been approved.</p><p>You can now withdraw funds from your dashboard.</p>`
        : `<p>Your loan application status has been updated to: <strong>${status}</strong>.</p>`;

      sendEmail(
        loan.userId.email,
        subject,
        `<h2>Hello ${loan.userId.name},</h2>
         ${message}
         <br/>
         <p>Regards,<br/>AgriPay Team</p>`
      );
    }

    res.json({ message: `Loan status updated to ${status}`, loan });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error while updating loan status.' });
  }
});

// Process EMI Payment
router.post('/pay-emi/:id', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const loan = await Loan.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!loan) return res.status(404).json({ error: 'Loan not found.' });
    if (loan.status !== 'approved') return res.status(400).json({ error: 'Loan is not approved.' });

    loan.amountPaid += Number(amount);
    await loan.save();

    const transaction = new Transaction({
      userId: req.userId,
      type: 'emi_payment',
      amount: Number(amount),
      description: 'EMI Repayment',
      referenceId: loan._id.toString()
    });
    await transaction.save();

    res.json({ message: 'EMI paid successfully', loan });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error while paying EMI.' });
  }
});

// Process Withdrawal
router.post('/withdraw/:id', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const loan = await Loan.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!loan) return res.status(404).json({ error: 'Loan not found.' });
    if (loan.status !== 'approved') return res.status(400).json({ error: 'Loan is not approved.' });

    const availableBalance = loan.amount - loan.withdrawnAmount;
    if (amount > availableBalance) {
      return res.status(400).json({ error: 'Withdrawal amount exceeds available balance.' });
    }

    loan.withdrawnAmount += Number(amount);
    await loan.save();

    const transaction = new Transaction({
      userId: req.userId,
      type: 'wallet_withdrawal',
      amount: Number(amount),
      description: 'Wallet Withdrawal to Bank Account',
      referenceId: loan._id.toString()
    });
    await transaction.save();

    res.json({ message: 'Amount withdrawn successfully', loan });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error while processing withdrawal.' });
  }
});

export default router;
