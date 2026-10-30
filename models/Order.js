import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  size: { type: Number, required: true },
  color: { type: String, default: 'Default' },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  image: { type: String }
}, { _id: false });

const CustomerSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  address: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  pincode: { type: String, required: true, trim: true }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  orderId: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  customer: { 
    type: CustomerSchema, 
    required: true 
  },
  items: [OrderItemSchema],
  subtotal: { 
    type: Number, 
    default: 0 
  },
  discountAmount: { 
    type: Number, 
    default: 0 
  },
  shippingFee: { 
    type: Number, 
    default: 0 
  },
  totalAmount: { 
    type: Number, 
    required: true 
  },
  paymentMethod: { 
    type: String, 
    enum: ['UPI_QR_DIRECT', 'RAZORPAY_CARD', 'COD'], 
    required: true 
  },
  paymentId: { 
    type: String, 
    required: true, 
    trim: true 
  },
  status: { 
    type: String, 
    enum: ['VERIFIED_PAID', 'COD_PENDING', 'CANCELLED', 'REFUNDED'], 
    default: 'VERIFIED_PAID' 
  },
  verifiedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true 
});

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

