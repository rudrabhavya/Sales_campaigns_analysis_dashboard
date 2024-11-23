import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['active', 'completed', 'scheduled'],
    required: true 
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  budget: { type: Number, required: true },
  spent: { type: Number, default: 0 },
  reach: { type: Number, default: 0 },
  conversions: { type: Number, default: 0 }
});

export const Campaign = mongoose.model('Campaign', campaignSchema);