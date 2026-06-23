import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  purpose: { type: String, required: true },
  tenure: { type: Number, required: true }, // in months
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'disbursed'], default: 'pending' },
  appliedAt: { type: Date, default: Date.now },
  approvedAt: { type: Date },
  repaymentSchedule: [{
    dueDate: Date,
    amount: Number,
    status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' }
  }],
  withdrawnAmount: { type: Number, default: 0 },
  amountPaid: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Loan || mongoose.model('Loan', loanSchema);
