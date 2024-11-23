import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['completed', 'pending', 'failed'],
    required: true 
  },
  items: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Transaction = mongoose.model('Transaction', transactionSchema);