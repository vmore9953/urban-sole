import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  inquiryType: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true, trim: true },
  status: { type: String, enum: ['NEW', 'IN_REVIEW', 'RESOLVED'], default: 'NEW' },
  submittedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);

