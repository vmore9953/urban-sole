# Urban Sole 👟

> **Architectural Footwear & Streetwear E-Commerce Platform**  
> Engineered with React 19, Vite, Express, Dynamic NPCI UPI QR Payments, and Razorpay Standard Gateway.

---

## ✨ Features

- **Dynamic Catalog & Filtering**:
  - Filter by Category (Men, Women, Sports, Kids), UK Shoe Size, Price Range, and keyword search.
  - Sort by Featured, Price (Low to High / High to Low), Customer Rating, and Newest Drops.
- **Product Inspection Quick-View Modal**:
  - High-res photo gallery switcher.
  - Interactive UK Size selector with stock check.
  - Colorway palette selector.
  - Sizing & Fit Guide table (UK / US / EU / CM).
  - Specifications and craftsmanship details.
- **Shopping Bag & Coupon Engine**:
  - Slide-in Cart Drawer with localStorage persistence.
  - Real-time **Free Shipping Progress Tracker** (threshold ₹2,999).
  - Promo code discounts (`URBANFIRST` for 15% OFF, `SOLE20` for 20% OFF).
- **Saved Footwear (Wishlist)**:
  - Slide-in wishlist drawer with one-click "Move to Bag" capability.
- **Real-Time Dual Payment Gateway**:
  - **Instant UPI QR (Scan & Pay)**: Generates real-time NPCI dynamic UPI QR codes with a 10-minute timer, mobile deep-linking, customizable merchant UPI ID, and 12-digit bank UTR verification.
  - **Razorpay Standard Gateway**: Embedded modal for Credit/Debit Cards (Visa, Mastercard, RuPay, Amex) and NetBanking with cryptographic HMAC SHA-256 signature verification.
  - **Cash on Delivery (COD)**: Doorstep delivery confirmation.
- **Interactive Customer Testimonials & Reviews**:
  - Verified reviews filterable by star ratings, helpfulness upvotes, and review submission modal.
- **Concierge & Experiential Studios**:
  - Interactive FAQ accordion, studio locations, and concierge inquiry form.
- **Toast Notifications**:
  - Floating alerts for bag updates, promo codes, and payment status.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Lucide React, CSS3 (Glassmorphism & Flex/Grid)
- **Backend**: Node.js (ES Modules), Express 5, Razorpay SDK, Crypto, CORS, Dotenv
- **State Management**: React Context API (`CartContext`) with `localStorage` persistence
- **Payments**: NPCI UPI Protocol & Razorpay REST API

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### 2. Installation
```bash
git clone <your-repo-url>
cd urban-sole
npm install
```

### 3. Environment Configuration
Copy the template environment file:
```bash
cp .env.example .env
```
Open `.env` and set your payment details:
```env
PORT=5000

# Your UPI ID to receive direct payments (Google Pay, PhonePe, Paytm)
MERCHANT_UPI_ID=yourname@okaxis
VITE_MERCHANT_UPI_ID=yourname@okaxis
VITE_MERCHANT_NAME=Urban Sole

# Razorpay API Keys (Optional for Card & NetBanking)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
VITE_RAZORPAY_KEY_ID=
```

### 4. Run Development Server
Run both the frontend and backend payment server together:
```bash
npm run dev:all
```
Or run separately:
```bash
npm run server  # Backend on http://localhost:5000
npm run dev     # Frontend on http://localhost:5173
```

---

## 📁 Project Structure

```
urban-sole/
├── server.js              # Express payment & order verification backend
├── vite.config.js         # Vite configuration with /api reverse proxy
├── src/
│   ├── components/        # UI components (Navbar, Shop, ProductModal, Checkout, etc.)
│   ├── context/           # CartContext (cart, wishlist, promos, toasts)
│   ├── data/              # Product catalog & reviews dataset
│   ├── utils/             # Razorpay script loader
│   ├── App.jsx            # Main app router
│   └── main.jsx           # React DOM entry
└── public/
```

---

## 📄 License
MIT License. Created for Urban Sole.
