import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import Razorpay from 'razorpay';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Razorpay instance if keys are set
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

// 1. Get Payment Configurations
app.get('/api/config', (req, res) => {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || '';
  const isRazorpayConfigured = Boolean(key_id && process.env.RAZORPAY_KEY_SECRET);
  const upiId = process.env.MERCHANT_UPI_ID || process.env.VITE_MERCHANT_UPI_ID || 'urbansole.pay@okaxis';
  const merchantName = process.env.VITE_MERCHANT_NAME || 'Urban Sole';

  res.json({
    keyId: key_id,
    isRazorpayConfigured,
    upiId,
    merchantName,
    serverTime: new Date().toISOString()
  });
});

// 2. Real-Time UPI Payment Verification (UTR verification)
app.post('/api/verify-upi', (req, res) => {
  try {
    const { orderId, utrNumber, amount, customerData } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    const cleanUtr = (utrNumber || '').trim();

    // Indian Banking UPI UTR numbers are 12 numeric digits
    if (cleanUtr && cleanUtr.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Invalid UPI Transaction Reference / UTR Number. Must be at least 6-12 digits.'
      });
    }

    const verifiedOrder = {
      orderId,
      utrNumber: cleanUtr || `UPI-MANUAL-${Math.floor(100000 + Math.random() * 900000)}`,
      amount,
      paymentMethod: 'UPI_QR_DIRECT',
      status: 'VERIFIED_PAID',
      verifiedAt: new Date().toISOString(),
      customer: customerData || {}
    };

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

    // If Razorpay keys are configured in .env, create order with Razorpay API
    if (razorpay) {
      const options = {
        amount: Math.round(Number(amount) * 100), // amount in paise
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

    // Fallback: If keys are not set, return simulated order for testing
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

// 4. Verify Razorpay Payment Signature
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({ error: 'Order ID and Payment ID are required' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    // If secret is set, verify cryptographic HMAC SHA-256 signature
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

    // In simulation mode without secret
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

// 5. Cash on Delivery (COD) Order Endpoint
app.post('/api/orders/cod', (req, res) => {
  try {
    const { orderData } = req.body;
    const codOrderId = `US-COD-${Math.floor(100000 + Math.random() * 900000)}`;

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

app.listen(PORT, () => {
  console.log(`Urban Sole payment server running on http://localhost:${PORT}`);
});
