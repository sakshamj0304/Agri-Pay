import express from 'express';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail.js';

const router = express.Router();

// Register API
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, role, referredBy } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate unique referral code
    const baseCode = name.substring(0, 4).toUpperCase().replace(/[^A-Z]/g, 'AGRI');
    const referralCode = baseCode + Math.floor(1000 + Math.random() * 9000);

    // Create new user
    user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      referralCode,
      referredBy
    });

    await user.save();

    // Process Referral Bonus for the Referrer
    if (referredBy) {
      const referrer = await User.findOne({ referralCode: referredBy });
      if (referrer) {
        const bonusTxn = new Transaction({
          userId: referrer._id,
          type: 'referral_bonus',
          amount: 100, // ₹100 bonus
          description: `Referral Bonus for inviting ${user.name}`
        });
        await bonusTxn.save();
      }
    }

    // Send Welcome Email asynchronously
    sendEmail(
      user.email,
      'Welcome to AgriPay!',
      `<h2>Hello ${user.name},</h2>
       <p>Welcome to the Agri Payment Platform! Your account has been successfully created.</p>
       <p>You can now log in and access your dashboard.</p>
       <br/>
       <p>Regards,<br/>AgriPay Team</p>`
    );

    // Create JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Login API
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        referralCode: user.referralCode
      }
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Forgot Password API
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User with this email does not exist.' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save OTP to user and set expiry to 15 mins
    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    // Send Email
    sendEmail(
      user.email,
      'Password Reset OTP - AgriPay',
      `<h2>Password Reset Request</h2>
       <p>Hello ${user.name},</p>
       <p>Your OTP for resetting your password is: <strong style="font-size:24px; color:#16a34a; letter-spacing:2px;">${otp}</strong></p>
       <p>This OTP is valid for 15 minutes. If you did not request this, please ignore this email.</p>
       <br/>
       <p>Regards,<br/>AgriPay Team</p>`
    );

    res.json({ message: 'OTP sent to your email.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Reset Password API
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP.' });
    }

    if (user.resetOtpExpiry < Date.now()) {
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetOtp = undefined;
    user.resetOtpExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully. You can now login with your new password.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

export default router;
