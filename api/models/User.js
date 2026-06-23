import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  kycStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  resetOtp: { type: String },
  resetOtpExpiry: { type: Date },
  referralCode: { type: String, unique: true },
  referredBy: { type: String }
}, { timestamps: true });

// Prevent mongoose from recreating the model in serverless environments
export default mongoose.models.User || mongoose.model('User', userSchema);
