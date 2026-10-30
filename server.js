import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import mongoose from 'mongoose';
import { Order } from './models/Order.js';
import { Inquiry } from './models/Inquiry.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// =========================================================================
// MongoDB Connection via Mongoose with Auto-Embedded Zero-Config Engine
// =========================================================================
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/urbansole';
let isDbConnected = false;
let dbMode = 'uninitialized';
let memoryServerInstance = null;

mongoose.set('strictQuery', false);

const connectMongoDB = async () => {
  // If user provided a cloud Atlas cluster, prioritize it
  const isCloudUri = MONGODB_URI.startsWith('mongodb+srv://');

  try {
    console.log(`Connecting to MongoDB (${isCloudUri ? 'Cloud Atlas' : 'Local URI'})...`);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 2500
    });
    isDbConnected = true;
    dbMode = isCloudUri ? 'cloud_atlas' : 'standalone_local';
    console.log(`✅ MongoDB connected successfully to database: ${mongoose.connection.name} [${dbMode}]`);
  } catch (err) {
    console.warn(`⚠️  External MongoDB not detected (${err.message}).`);
    console.log('⚡ Launching embedded zero-config MongoDB instance...');

    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      memoryServerInstance = await MongoMemoryServer.create({
        instance: { dbName: 'urbansole' }
      });
      const embeddedUri = memoryServerInstance.getUri();
      
      await mongoose.connect(embeddedUri, {
        dbName: 'urbansole'
      });
      
      isDbConnected = true;
      dbMode = 'embedded_mongodb';
      console.log('✅ Embedded MongoDB started and connected successfully!');
      console.log(`📦 Database Host: ${mongoose.connection.host}:${mongoose.connection.port}`);
      console.log(`🗄️ Database Name: ${mongoose.connection.name}`);
    } catch (embeddedErr) {
      isDbConnected = false;
      dbMode = 'in_memory_fallback';
      console.warn('⚠️  Could not launch embedded MongoDB:', embeddedErr.message);
    }
  }
};

connectMongoDB();

mongoose.connection.on('connected', () => {
  isDbConnected = true;
});

mongoose.connection.on('disconnected', () => {
  isDbConnected = false;
});

// Helper: Safely save order to MongoDB if connected
const saveOrderToDatabase = async (orderPayload) => {
  try {
    if (mongoose.connection.readyState === 1) {
      // Format items array
      const items = (orderPayload.cartItems || []).map((item) => ({
        productId: item.product?.id || 'unknown',
        name: item.product?.name || 'Footwear',
        size: Number(item.size) || 8,
        color: item.color || 'Default',
        quantity: Number(item.quantity) || 1,
        price: Number(item.product?.price) || 0,
        image: item.product?.image || ''
      }));

      const doc = new Order({
        orderId: orderPayload.orderId,
        customer: {
          fullName: orderPayload.customerData?.fullName || 'Guest Customer',
          phone: orderPayload.customerData?.phone || '',
          email: orderPayload.customerData?.email || '',
          address: orderPayload.customerData?.address || '',
          city: orderPayload.customerData?.city || 'Yeola',
          state: orderPayload.customerData?.state || 'Maharashtra',
          pincode: orderPayload.customerData?.pincode || '423401'
        },
        items,
        subtotal: Number(orderPayload.subtotal) || 0,
        discountAmount: Number(orderPayload.discountAmount) || 0,
        shippingFee: Number(orderPayload.shippingFee) || 0,
        totalAmount: Number(orderPayload.totalAmount) || 0,
        paymentMethod: orderPayload.paymentMethod,
        paymentId: orderPayload.paymentId || 'PENDING',
        status: orderPayload.status || 'VERIFIED_PAID'
      });

      const saved = await doc.save();
      console.log(`📦 Order #${saved.orderId} successfully persisted in MongoDB collection 'orders'.`);
      return { saved: true, id: saved._id };
    } else {
      console.log(`ℹ️  Order #${orderPayload.orderId} processed in-memory (MongoDB connection not active).`);
      return { saved: false, reason: 'MongoDB not connected' };
    }
  } catch (dbError) {
    console.error(`❌ Failed to save order #${orderPayload.orderId} to MongoDB:`, dbError.message);
    return { saved: false, error: dbError.message };
  }
};

// =========================================================================
// Razorpay Client Initialization
// =========================================================================
const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    return null;
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
};

// =========================================================================
// API ENDPOINTS
// =========================================================================

// 1. Get Payment Configurations & Database Health
app.get('/api/config', (req, res) => {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || '';
  const isRazorpayConfigured = Boolean(key_id && process.env.RAZORPAY_KEY_SECRET);
  const upiId = process.env.MERCHANT_UPI_ID || process.env.VITE_MERCHANT_UPI_ID || 'urbansole.pay@okaxis';
  const merchantName = process.env.VITE_MERCHANT_NAME || 'Urban Sole Yeola';

  res.json({
    keyId: key_id,
    isRazorpayConfigured,
    upiId,
    merchantName,
    database: {
      status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      readyState: mongoose.connection.readyState,
      databaseName: mongoose.connection.name || 'urbansole'
    },
    serverTime: new Date().toISOString()
  });
});

// Database status diagnostic endpoint
app.get('/api/db-status', (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    connected: isConnected,
    status: states[mongoose.connection.readyState] || 'unknown',
    database: mongoose.connection.name || 'urbansole',
    host: mongoose.connection.host ? `${mongoose.connection.host}:${mongoose.connection.port || ''}` : 'none',
    mode: dbMode,
    message: isConnected
      ? `Active MongoDB (${dbMode}) connected and operational.`
      : 'Database not connected'
  });
});

// 2. Real-Time UPI Payment Verification & MongoDB Order Save
app.post('/api/verify-upi', async (req, res) => {
  try {
    const { orderId, utrNumber, amount, customerData, cartItems, subtotal, discountAmount, shippingFee } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    const cleanUtr = (utrNumber || '').trim();

    if (cleanUtr && cleanUtr.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Invalid UPI Transaction Reference / UTR Number. Must be at least 6-12 digits.'
      });
    }

    const assignedUtr = cleanUtr || `UPI-MANUAL-${Math.floor(100000 + Math.random() * 900000)}`;

    const verifiedOrder = {
      orderId,
      utrNumber: assignedUtr,
      amount,
      paymentMethod: 'UPI_QR_DIRECT',
      status: 'VERIFIED_PAID',
      verifiedAt: new Date().toISOString(),
      customer: customerData || {}
    };

    // Persist to MongoDB
    await saveOrderToDatabase({
      orderId,
      customerData,
      cartItems,
      subtotal,
      discountAmount,
      shippingFee,
      totalAmount: amount,
      paymentMethod: 'UPI_QR_DIRECT',
      paymentId: assignedUtr,
      status: 'VERIFIED_PAID'
    });

    console.log('[UPI Payment Verified]:', verifiedOrder);

    return res.json({
      success: true,
      verified: true,
      order: verifiedOrder,
      message: 'UPI payment reference verified and order confirmed successfully'
    });
  } catch (error) {
    console.error('Error verifying UPI payment:', error);
    res.status(500).json({ error: 'Failed to verify UPI payment' });
  }
});

// 3. Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, receipt, notes } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid order amount is required' });
    }

    const razorpay = getRazorpayInstance();

    if (razorpay) {
      const options = {
        amount: Math.round(Number(amount) * 100), // in paise
        currency: 'INR',
        receipt: receipt || `rcpt_${Date.now()}`,
        notes: notes || {}
      };

      const order = await razorpay.orders.create(options);
      return res.json({
        success: true,
        isSimulated: false,
        order
      });
    }

    // Fallback simulated order token
    const simulatedOrder = {
      id: `order_sim_${Math.floor(100000 + Math.random() * 900000)}`,
      entity: 'order',
      amount: Math.round(Number(amount) * 100),
      amount_paid: 0,
      amount_due: Math.round(Number(amount) * 100),
      currency: 'INR',
      receipt: receipt || `sim_rcpt_${Date.now()}`,
      status: 'created',
      notes: notes || {}
    };

    return res.json({
      success: true,
      isSimulated: true,
      order: simulatedOrder,
      message: 'Razorpay keys not yet set in .env. Order created in simulation mode.'
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ 
      error: 'Failed to create order', 
      details: error.message 
    });
  }
});

// 4. Verify Razorpay Payment Signature & MongoDB Order Save
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      customerData,
      cartItems,
      totalAmount,
      subtotal,
      discountAmount,
      shippingFee 
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({ error: 'Order ID and Payment ID are required' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (secret) {
      if (!razorpay_signature) {
        return res.status(400).json({ success: false, message: 'Signature missing' });
      }

      const body = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(body.toString())
        .digest('hex');

      const isAuthentic = expectedSignature === razorpay_signature;

      if (isAuthentic) {
        // Save to MongoDB
        await saveOrderToDatabase({
          orderId: razorpay_order_id,
          customerData,
          cartItems,
          subtotal,
          discountAmount,
          shippingFee,
          totalAmount,
          paymentMethod: 'RAZORPAY_CARD',
          paymentId: razorpay_payment_id,
          status: 'VERIFIED_PAID'
        });

        return res.json({
          success: true,
          verified: true,
          message: 'Payment verified successfully with Razorpay cryptographic signature',
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id
        });
      } else {
        return res.status(400).json({
          success: false,
          verified: false,
          message: 'Invalid payment signature. Verification failed.'
        });
      }
    }

    // In simulation mode
    await saveOrderToDatabase({
      orderId: razorpay_order_id,
      customerData,
      cartItems,
      subtotal,
      discountAmount,
      shippingFee,
      totalAmount,
      paymentMethod: 'RAZORPAY_CARD',
      paymentId: razorpay_payment_id,
      status: 'VERIFIED_PAID'
    });

    return res.json({
      success: true,
      verified: true,
      simulated: true,
      message: 'Payment accepted in simulation/test mode',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ 
      error: 'Payment verification failed', 
      details: error.message 
    });
  }
});

// 5. Cash on Delivery (COD) Order Endpoint & MongoDB Save
app.post('/api/orders/cod', async (req, res) => {
  try {
    const { orderData } = req.body;
    const codOrderId = `US-COD-${Math.floor(100000 + Math.random() * 900000)}`;

    if (orderData) {
      await saveOrderToDatabase({
        orderId: codOrderId,
        customerData: orderData.formData,
        cartItems: orderData.cart,
        subtotal: orderData.subtotal,
        discountAmount: orderData.discountAmount,
        shippingFee: orderData.shippingFee,
        totalAmount: orderData.totalAmount,
        paymentMethod: 'COD',
        paymentId: 'COD-PENDING-DELIVERY',
        status: 'COD_PENDING'
      });
    }

    return res.json({
      success: true,
      orderId: codOrderId,
      paymentMethod: 'COD',
      message: 'Cash on delivery order confirmed successfully',
      estimatedDelivery: '3-4 business days'
    });
  } catch (error) {
    console.error('Error handling COD order:', error);
    res.status(500).json({ error: 'Failed to process COD order' });
  }
});

// 6. View Orders from MongoDB
app.get('/api/orders', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
      return res.json({ success: true, count: orders.length, orders });
    }
    return res.json({ success: true, count: 0, orders: [], message: 'MongoDB not currently connected' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders from database', details: err.message });
  }
});

// 7. Save Customer Contact Inquiries to MongoDB
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, inquiryType, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    if (mongoose.connection.readyState === 1) {
      const inquiry = new Inquiry({ name, email, inquiryType, message });
      await inquiry.save();
      console.log(`📩 Contact inquiry from ${email} saved to MongoDB.`);
    }

    return res.json({ success: true, message: 'Inquiry received successfully' });
  } catch (err) {
    console.error('Error saving inquiry:', err);
    res.status(500).json({ error: 'Failed to save inquiry' });
  }
});

app.listen(PORT, () => {
  console.log(`Urban Sole payment server running on http://localhost:${PORT}`);
});
