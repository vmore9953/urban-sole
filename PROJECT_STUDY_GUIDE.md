# Urban Sole — Technical Study & Architecture Guide 👟

> **A comprehensive deep-dive into the architectural patterns, technology stack, UI/UX design systems, API endpoints, payment engineering, authentication models, and component hierarchy of the Urban Sole e-commerce platform.**

---

## 📑 Table of Contents
1. [Executive Summary & Purpose](#1-executive-summary--purpose)
2. [Complete Technology Stack & Dependencies](#2-complete-technology-stack--dependencies)
3. [System Architecture & Data Flow](#3-system-architecture--data-flow)
4. [UI & Design System Specifications](#4-ui--design-system-specifications)
5. [Frontend Component Breakdown & Hierarchy](#5-frontend-component-breakdown--hierarchy)
6. [State Management Architecture (CartContext)](#6-state-management-architecture-cartcontext)
7. [Data Models & Schema Reference](#7-data-models--schema-reference)
8. [Backend Server & API Endpoint Reference](#8-backend-server--api-endpoint-reference)
9. [Payment Gateway Engineering (UPI & Razorpay)](#9-payment-gateway-engineering-upi--razorpay)
10. [Authentication, Security & Cryptographic Verification Architecture](#10-authentication-security--cryptographic-verification-architecture)
11. [Local Development, Build & Run Procedures](#11-local-development-build--run-procedures)
12. [Study Questions & Self-Evaluation Checklist](#12-study-questions--self-evaluation-checklist)

---

## 1. Executive Summary & Purpose

### What is Urban Sole?
**Urban Sole** is a direct-to-consumer (D2C) e-commerce web application specifically built for architectural footwear, athletic performance runners, and luxury leather sneakers. It mimics high-end design houses (reminiscent of Balenciaga, Fear of God, On Running, and Yeezy) while catering specifically to the Indian consumer market with Indian Rupee (`₹`) pricing, UK footwear sizing, and native payment mechanisms.

### Core Business & Technical Goals
- **Frictionless Shopping Journey**: No forced login walls before purchase; customers can browse, select, customize sizing/colors, and complete checkout seamlessly.
- **Dual Payment Engine**: Combines **Direct NPCI UPI QR Code (Real-Time Scan & Pay)** for Indian mobile apps (GPay, PhonePe, Paytm, BHIM, Cred) and **Razorpay Standard Gateway** for Credit/Debit cards & NetBanking, with a fallback **Cash on Delivery (COD)** option.
- **Client Persistence**: Carts and wishlists survive browser refreshes and tab closures using serialized `localStorage`.
- **Architectural Modularity**: Clear separation of presentation components, shared application context, simulated backend data, and micro-backend Express services.

---

## 2. Complete Technology Stack & Dependencies

```
urban-sole/
 ├── Frontend Engine: React 19 + Vite 8
 ├── Styling: Modern Vanilla CSS (Design Tokens, Glassmorphism, Flex/Grid)
 ├── Icons: Lucide React (Tree-shakeable SVG system)
 ├── Backend: Node.js 22 + Express 5 (ES Modules)
 ├── Security & Crypto: Node.js Native Crypto (HMAC SHA-256)
 └── Gateway SDKs: Razorpay Node SDK + NPCI UPI Protocol
```

### 2.1 Core Runtime & Frameworks

| Technology | Exact Version | Role in Application |
| :--- | :--- | :--- |
| **Node.js** | `>= 18.0.0` (v22 used) | Server runtime supporting ECMAScript Modules (`"type": "module"`) |
| **React** | `^19.2.8` | Declarative UI component library with concurrent rendering features |
| **React DOM** | `^19.2.8` | React DOM renderer binding components to `#root` in `index.html` |
| **Vite** | `^8.3.0` | Ultra-fast build tool, Hot Module Replacement (HMR), and dev server |
| **Express** | `^5.3.0` | Node.js micro-framework powering backend payment APIs |

### 2.2 Production Dependencies (`dependencies` in `package.json`)

| Package | Version | Usage |
| :--- | :--- | :--- |
| **`lucide-react`** | `^1.57.0` | Over 30 clean, customizable SVG icons (e.g. `ShoppingBag`, `Heart`, `QrCode`, `ShieldCheck`, `CheckCircle2`) |
| **`razorpay`** | `^2.9.8` | Official Razorpay Node.js SDK for server-side order generation and status checks |
| **`cors`** | `^2.8.6` | Express middleware allowing secure cross-origin requests between Vite (`:5173`) and Express (`:5000`) |
| **`dotenv`** | `^18.0.9` | Loads secrets from `.env` into `process.env` |

### 2.3 Developer & Build Tooling (`devDependencies`)

| Package | Version | Usage |
| :--- | :--- | :--- |
| **`concurrently`** | `^10.0.6` | Orchestrates running `node server.js` and `vite` simultaneously via single command (`npm run dev:all`) |
| **`@vitejs/plugin-react`** | `^6.1.1` | Vite plugin providing Babel/Fast Refresh transforms for JSX |
| **`oxlint`** | `^1.81.0` | Next-generation Rust-based high-speed JavaScript linter |
| **`@types/react`** | `^19.2.18` | TypeScript IntelliSense definitions for React 19 |
| **`@types/react-dom`**| `^19.2.7` | TypeScript IntelliSense definitions for React DOM |

---

## 3. System Architecture & Data Flow

### 3.1 High-Level Architecture Diagram

```mermaid
flowchart TD
    subgraph Browser ["Client Browser (Port 5173)"]
        UI["React 19 View Components\n(Navbar, Shop, ProductModal, Checkout)"]
        Context["CartContext (State Engine)\n• Cart Items • Wishlist • Promo Engine • Toasts"]
        LocalStorage[("Browser LocalStorage\n• urbansole_cart\n• urbansole_wishlist")]
        UPIModal["Real-Time UPI Terminal\nDynamic QR • 10m Timer • Deep-Links"]
        RzpScript["Razorpay Checkout.js SDK\n(Dynamically Injected)"]
    end

    subgraph ViteServer ["Vite Dev Server (Port 5173)"]
        Proxy["Vite Proxy Server\nRewrites /api/* -> localhost:5000"]
    end

    subgraph ExpressServer ["Express Backend (Port 5000)"]
        Router["Express App (server.js)"]
        ConfigRoute["GET /api/config"]
        OrderRoute["POST /api/create-order"]
        VerifyRzpRoute["POST /api/verify-payment\n(HMAC SHA-256 Crypto)"]
        VerifyUPIRoute["POST /api/verify-upi\n(UTR Parsing & Audit)"]
        CODRoute["POST /api/orders/cod"]
    end

    subgraph ExternalServices ["External Services & Banking"]
        QRService["QRServer API\n(Vector QR Generator)"]
        RzpAPI["Razorpay Cloud Banking API"]
        CustomerPhone["Customer Mobile Phone\n(GPay, PhonePe, Paytm, BHIM, Cred)"]
    end

    UI <--> Context
    Context <--> LocalStorage
    UI --> UPIModal
    UI --> RzpScript

    UPIModal -- Generates URI --> QRService
    UPIModal -- Scanned By --> CustomerPhone
    UPIModal -- Sends UTR --> Proxy
    RzpScript -- Real-Time Card/Bank Transaction --> RzpAPI
    RzpScript -- Callback with Signature --> Proxy

    Proxy --> Router
    Router --> ConfigRoute
    Router --> OrderRoute
    Router --> VerifyRzpRoute
    Router --> VerifyUPIRoute
    Router --> CODRoute
    OrderRoute --> RzpAPI
```

### 3.2 Client Request & State Synchronization Lifecycle
1. **App Mount**: `main.jsx` wraps `<App />` with `<CartProvider>`.
2. **Persistence Rehydration**: `CartProvider` reads `localStorage.getItem('urbansole_cart')` and `localStorage.getItem('urbansole_wishlist')`. If found, existing items populate state; otherwise, curated initial footwear items load.
3. **Reactive Updates**: Whenever `cart` or `wishlist` changes, an internal `useEffect` serializes the current state back to `localStorage`.
4. **Checkout Trigger**: Clicking checkout mounts `CheckoutModal.jsx`, which queries `/api/config` via the Vite proxy to determine live merchant details (`merchantUpiId`, `keyId`).
5. **Payment Execution**:
   - For **UPI**: User scans QR or taps mobile link, pays on mobile bank app, and submits the 12-digit UTR to `/api/verify-upi`.
   - For **Card**: `loadRazorpayScript()` loads the Razorpay window, collects funds, returns signature to `/api/verify-payment` for SHA-256 HMAC cryptographic verification.
   - For **COD**: `/api/orders/cod` records delivery details.
6. **Order Fulfillment & Cart Reset**: Once verified, `clearCart()` empties the bag, stores order receipt, and transitions the modal to the confirmation screen.

---

## 4. UI & Design System Specifications

The visual identity of Urban Sole follows an **architectural, minimalist brutalist aesthetic** tempered with warm luxury tones.

### 4.1 Typography

The application imports two Google Fonts in `index.html`:
1. **Display & Headings**: `'Syne', sans-serif;` (Weights: `600, 700, 800`)
   - Distinctive geometric proportions, tight letter-spacing (`-0.02em`), architectural flair.
   - Applied to all `h1, h2, h3, h4, h5, h6`, brand logos, and section banners.
2. **Body & UI**: `'Plus Jakarta Sans', sans-serif;` (Weights: `300, 400, 500, 600, 700, 800`)
   - High legibility, clean grotesque sans-serif with neutral geometry.
   - Applied to all buttons, input fields, tables, prices, and paragraphs.

### 4.2 CSS Design Tokens (`src/index.css`)

```css
:root {
  /* Dark / Obsidian Tones */
  --bg-dark: #0e0e10;               /* Primary obsidian dark */
  --bg-dark-secondary: #17171a;     /* Secondary dark surface */
  --bg-dark-tertiary: #222226;      /* Card & drawer accents */
  --bg-card-dark: #1b1b1f;

  /* Warm Cream & Stone Tones */
  --bg-light: #f7f4ee;              /* Primary warm paper background */
  --bg-light-secondary: #eee8de;    /* Secondary contrast surface */
  --bg-beige-card: #fdfbf8;         /* High-contrast product cards */
  --bg-beige-muted: #e5ddd0;

  /* Accent Metallics */
  --accent-beige: #d8c8b2;          /* Subtle borders & badges */
  --accent-beige-deep: #bca68c;
  --accent-gold: #c5a059;           /* Premium rating stars */
  --accent-warm: #a67c52;           /* Primary brand leather accent */

  /* Text Colors */
  --text-primary: #121214;          /* High-contrast readable charcoal */
  --text-muted: #6b6761;            /* Secondary metadata */
  --text-light: #f5f2eb;            /* Light text on dark headers/buttons */
  --text-light-muted: #9b9890;
  --text-pure-white: #ffffff;

  /* Borders & Shadows */
  --border-light: rgba(0, 0, 0, 0.08);
  --border-dark: rgba(255, 255, 255, 0.1);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 6px 20px rgba(0, 0, 0, 0.09);
  --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.14);
  --shadow-dark-lg: 0 20px 50px rgba(0, 0, 0, 0.45);

  /* Border Radii */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-full: 9999px;
}
```

### 4.3 UI Design Techniques Used
- **Glassmorphism / Backdrop Filter**: Used in modals and sticky headers (`backdrop-filter: blur(12px)` and `background: rgba(247, 244, 238, 0.85)`).
- **Subtle Elevation & Hover Scaling**: Product cards and action buttons feature smooth micro-transitions (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Pill Badges**: Semantic tags (`section-tag`, `badge-popular`, `rzp-gateway-pill`, `live-realtime-badge`) provide visual hierarchy.
- **Responsive Breakpoints**:
  - Desktop: `> 1024px` (4-column grid, persistent sidebars)
  - Tablet: `768px – 1023px` (2/3-column grid, stacked layouts)
  - Mobile: `< 767px` (1-column grid, off-canvas drawers, mobile search header)

---

## 5. Frontend Component Breakdown & Hierarchy

The application follows a modular component tree under `src/components/`:

### Detailed Component Inventory

| Component | Files | Primary Responsibility |
| :--- | :--- | :--- |
| **Navbar** | `src/components/Navbar.jsx`, `.css` | Persistent sticky header, top promo banner, quick navigation, search field, live cart count badge, wishlist count badge, mobile drawer toggle. |
| **Hero** | `src/components/Hero.jsx`, `.css` | High-impact visual landing screen with typography, brand tagline, CTA button linking directly to shop, quick category jump pills. |
| **CategoryShowcase** | `src/components/CategoryShowcase.jsx`, `.css` | Editorial photographic grid of 4 core departments (Men, Women, Sports, Kids) with model counters. |
| **Shop** | `src/components/Shop.jsx`, `.css` | Product archive engine: multi-faceted filtering (category, size UK 5-12, price brackets, query string search) and sorting (Featured, Price Low/High, Rating, Newest). |
| **ProductCard** | `src/components/ProductCard.jsx`, `.css` | Renders shoe item with badge (Bestseller/New), title, price, quick-add hover trigger, wishlist heart toggle, and click-to-open detail modal. |
| **ProductDetailModal**| `src/components/ProductDetailModal.jsx`, `.css` | Deep-dive product inspection modal: high-res gallery switcher, UK size selector, color palette pills, quantity stepper, Size Guide conversion table, tabbed specs, and "Buy Now". |
| **CartDrawer** | `src/components/CartDrawer.jsx`, `.css` | Off-canvas side drawer showing bag contents, item quantity steppers, interactive free shipping progress bar, promo code validation, itemized totals. |
| **WishlistDrawer** | `src/components/WishlistDrawer.jsx`, `.css` | Off-canvas side drawer displaying bookmarked footwear with quick "Move to Bag" action. |
| **CheckoutModal** | `src/components/CheckoutModal.jsx`, `.css` | Multi-step payment terminal: address capture, real-time UPI QR scanner with 10-minute countdown, Razorpay Checkout trigger, COD confirmation, order receipt. |
| **AboutSection** | `src/components/AboutSection.jsx`, `.css` | Brand story, artisan craftsmanship philosophy, and atelier workshop photography. |
| **CustomerReviewsSection** | `src/components/CustomerReviewsSection.jsx`, `.css` | Customer ratings, verified review cards, star filtering (All / 5 Stars / 4 Stars), helpful upvoting, and an interactive "Write a Review" modal. |
| **ContactSection** | `src/components/ContactSection.jsx`, `.css` | Store address (Yeola Flagship), contact email (`vmore9953@gmail.com`), store hours, concierge phone, inquiry form, and FAQ accordion. |
| **Newsletter** | `src/components/Newsletter.jsx`, `.css` | Email subscription card with instant reward voucher code (`URBANFIRST` for 15% off). |
| **Footer** | `src/components/Footer.jsx`, `.css` | Footwear brand links, customer care, payment accepted badges, back-to-top button, copyright. |
| **ToastContainer** | `src/components/ToastContainer.jsx` | Floating toast notification manager providing visual feedback for user actions. |

---

## 6. State Management Architecture (`CartContext`)

Located in `src/context/CartContext.jsx`, the application uses React's native Context API combined with custom hooks (`useCart()`).

### Key Functions Exposed by `useCart()`:
- `addToCart(product, size, color, quantity)`: Appends an item or increments existing matching item.
- `removeFromCart(productId, size, color)`: Deletes item matching compound key.
- `updateQuantity(productId, size, color, delta)`: Modifies quantity; if quantity drops to 0, item is removed.
- `toggleWishlist(product)`: Adds or removes product ID from saved list.
- `applyPromo(code)`: Validates coupon:
  - `URBANFIRST` &rarr; 15% discount
  - `SOLE20` &rarr; 20% discount
- `addToast(message, type)`: Dispatches auto-dismissing toast notifications (duration: 3.2s).

---

## 7. Data Models & Schema Reference

### 7.1 Product Schema (`src/data/products.js`)
```javascript
{
  id: 'us-01',                               // String: Unique SKU identifier
  name: 'Phantom Stealth Runner',             // String: Marketing title
  series: 'Apex Series 01',                  // String: Product drop line
  category: 'Men',                           // 'Men' | 'Women' | 'Sports' | 'Kids'
  subcategory: 'Performance Running',        // String: Styling tag
  price: 7499,                               // Number: INR Selling Price
  originalPrice: 9999,                       // Number: INR MSRP for discount calculation
  rating: 4.9,                               // Number: 1.0 - 5.0
  reviewsCount: 142,                         // Number: Review volume
  isNew: true,                               // Boolean: Badging flag
  isBestseller: true,                        // Boolean: Badging flag
  isFeatured: true,                          // Boolean: Homepage featured flag
  description: 'Constructed with aerospace...',// String: Product narrative
  features: [                                // Array<String>: Bulleted highlights
    'Dual-density Supercritical SoleTech™ foam',
    'Ultra-breathable micro-knit engineered upper'
  ],
  specs: {                                   // Object: Technical craftsmanship attributes
    sole: 'Carbon-infused SoleTech™ Foam',
    upper: 'Recycled Poly-Mesh Knit',
    weight: '245 grams (UK 8)',
    origin: 'Designed in Mumbai, Engineered in Italy'
  },
  colors: [                                  // Array<{name: string, hex: string}>
    { name: 'Onyx Carbon', hex: '#111111' },
    { name: 'Stone Beige', hex: '#D7CEC7' }
  ],
  sizes: [6, 7, 8, 9, 10, 11],               // Array<Number>: UK Footwear sizing
  image: 'https://images.unsplash.com/...',  // String: Primary cover image
  gallery: ['https://...', 'https://...']     // Array<String>: Angle variations
}
```

### 7.2 Cart Item Schema (Stored in `localStorage`)
```javascript
{
  product: { ... },  // Full Product object reference
  size: 9,           // Selected UK size
  color: 'Onyx Carbon', // Selected colorway string
  quantity: 1        // Integer count
}
```

### 7.3 Verified Order Record Schema
```javascript
{
  orderId: 'US-505561',                      // String: Internal unique tracking code
  amount: 7499,                              // Number: Total amount in INR
  paymentMethod: 'UPI_QR_DIRECT',            // 'UPI_QR_DIRECT' | 'RAZORPAY_CARD' | 'COD'
  paymentId: '987654321012',                 // String: 12-digit Bank UTR or Razorpay pay_id
  status: 'VERIFIED_PAID',                   // 'VERIFIED_PAID' | 'COD_PENDING'
  verifiedAt: '2026-10-29T05:14:40.106Z',    // String: ISO Timestamp
  customer: {
    fullName: 'Vishal More',
    phone: '9876543210',
    email: 'vmore9953@gmail.com',
    address: 'Old Nagar Palika, Near Dusne Jewellers',
    city: 'Yeola',
    state: 'Maharashtra',
    pincode: '423401'
  }
}
```

---

## 8. Backend Server & API Endpoint Reference

The backend runs on **Express 5** via `server.js` on Port `5000` (or `process.env.PORT`).

### 8.1 API Endpoints Summary

```
GET   /api/config          -> Fetch gateway credentials & merchant UPI ID
POST  /api/create-order    -> Create order token on Razorpay Cloud
POST  /api/verify-payment  -> Verify Razorpay cryptographic HMAC SHA-256 signature
POST  /api/verify-upi      -> Validate 12-digit Indian Banking UPI UTR reference
POST  /api/orders/cod      -> Register Cash on Delivery doorstep order
```

---

## 9. Payment Gateway Engineering (UPI & Razorpay)

### 9.1 The NPCI UPI URI Specification
The dynamic QR terminal constructs official National Payments Corporation of India (NPCI) URI strings:
```text
upi://pay?pa={MERCHANT_UPI_ID}&pn={MERCHANT_NAME}&am={TOTAL_AMOUNT}&cu=INR&tn={TRANSACTION_NOTE}
```
Example:
```text
upi://pay?pa=urbansole.pay@okaxis&pn=Urban%20Sole%20Yeola&am=7499&cu=INR&tn=Urban%20Sole%20Order%20US-505561
```
- **`pa`** (Payee Address): Beneficiary VPA/UPI ID.
- **`pn`** (Payee Name): Official legal display name.
- **`am`** (Amount): Exact price dynamically populated from cart state.
- **`cu`** (Currency): Hardcoded to Indian Rupee (`INR`).
- **`tn`** (Transaction Note): Ties the transaction directly to the unique Urban Sole order ID for reconciliation.

---

## 10. Authentication, Security & Cryptographic Verification Architecture

Understanding how authentication and security work in an e-commerce platform is critical. Urban Sole implements a **multi-tiered security and authentication model** tailored for direct-to-consumer (D2C) transactions:

```mermaid
flowchart TD
    subgraph Tier1 ["Tier 1: Customer Identity Model"]
        Guest["Guest-First Frictionless Checkout\n(Zero Pre-Purchase Password Wall)"]
        Capture["Order Identity Capture\n• Verified 10-Digit Phone\n• Contact Email • Delivery Pincode"]
        Session["Browser Session Identity\n• LocalStorage Key Serialization\n• Client Session Tokens"]
    end

    subgraph Tier2 ["Tier 2: Payment Authentication (2FA)"]
        UPI2FA["UPI 2-Factor Authentication\nNPCI MPIN on Mobile Device\n(Handled inside Google Pay / PhonePe)"]
        Card2FA["Card 3D-Secure 2.0\nBank OTP Verification\n(Delegated to Razorpay Cloud)"]
    end

    subgraph Tier3 ["Tier 3: Cryptographic Server Integrity"]
        HMAC["HMAC SHA-256 Signature\nPayload = order_id + '|' + payment_id\nSecret = RAZORPAY_KEY_SECRET"]
        UTR["NPCI Bank UTR Validation\n12-Digit Numeric Checksum & Audit"]
        Env["Secrets Isolation\n.env gitignored • Client/Server Separation"]
    end

    Tier1 --> Tier2 --> Tier3
```

### 10.1 Customer Authentication Model: Guest-First Architecture
- **Why Guest Checkout?**
  In modern high-fashion and sneaker e-commerce (such as Shopify Plus stores, Nike SNKRS, and Yeezy drops), forcing users to create an account, verify an email link, and create passwords before checkout results in a **30%–35% cart abandonment rate**. 
- **How Identity is Handled**:
  1. The user's shopping state (Cart, Wishlist, Active Promo Voucher) is bound to the client instance via persistent `localStorage` (`urbansole_cart` and `urbansole_wishlist`).
  2. At checkout, the user provides their authoritative contact identity:
     - **Full Name**
     - **10-Digit Mobile Number** (Used for courier SMS dispatch updates)
     - **Email Address** (Used for digital order receipts and dispatch tracking)
     - **Delivery Address & PIN Code**
  3. This identity is cryptographically tied to the unique generated Order ID (`#US-XXXXXX` or `#US-COD-XXXXXX`).

### 10.2 Payment Authentication: Delegated 2-Factor Authentication (2FA)
The application never handles or stores sensitive credit card numbers, CVVs, bank passwords, or UPI PINs directly on the application server. Authentication is delegated to regulated financial institutions:

1. **UPI Two-Factor Authentication**:
   - Factor 1 (Possession): The customer's physical smartphone running an authorized UPI application (GPay, PhonePe, Paytm, BHIM, Cred).
   - Factor 2 (Knowledge): The customer's secret 4-digit or 6-digit **NPCI UPI MPIN** entered directly into their bank's encrypted keyboard interface.
2. **Card Two-Factor Authentication (3D Secure 2.0)**:
   - When paying via Razorpay, the cardholder is authenticated via an SMS One-Time Password (OTP) or bank biometric approval mandated by the Reserve Bank of India (RBI).

### 10.3 Cryptographic Server-to-Server Authentication: HMAC SHA-256
To prevent payment tampering (e.g. an attacker modifying a client-side JavaScript file to report a successful transaction for ₹1 instead of ₹7,499), Urban Sole enforces **server-side cryptographic verification**:

1. When a transaction completes on Razorpay, Razorpay sends back three fields to the frontend:
   - `razorpay_order_id`
   - `razorpay_payment_id`
   - `razorpay_signature`
2. The frontend sends these three values to `server.js`: `POST /api/verify-payment`.
3. The Express backend uses Node's native `crypto` library to recalculate the expected signature using the private `RAZORPAY_KEY_SECRET`:
   ```javascript
   const body = razorpay_order_id + '|' + razorpay_payment_id;
   const expectedSignature = crypto
     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
     .update(body.toString())
     .digest('hex');

   const isAuthentic = (expectedSignature === razorpay_signature);
   ```
4. If `isAuthentic === true`, the order status transitions to `VERIFIED_PAID`. If the payload was tampered with, the HMAC hash does not match, and the transaction is immediately rejected with HTTP 400.

### 10.4 Secrets Isolation & Frontend-Backend Boundary
The codebase strictly separates public environment variables from private server secrets:
- **Client-Safe Keys (`VITE_` prefix)**:
  - `VITE_MERCHANT_UPI_ID`: Public receiving UPI address displayed in the QR code.
  - `VITE_MERCHANT_NAME`: Public store name displayed in the QR code and checkout header.
  - `VITE_RAZORPAY_KEY_ID`: Public gateway identifier used by the client-side Razorpay SDK modal.
- **Server-Only Secrets (Never bundled into frontend JavaScript)**:
  - `RAZORPAY_KEY_SECRET`: Private merchant secret used solely by Express in `server.js` to sign and verify HMAC signatures.
  - Excluded from version control via `.gitignore` (`.env`, `*.env`, `.env*.local`).

### 10.5 Production Roadmap: How to Add Full User Login / JWT Accounts
If you choose to extend the project with traditional registered user accounts, here is the recommended architecture pattern:

```mermaid
flowchart LR
    subgraph ClientAuth ["Frontend Client"]
        LoginForm["Login / Register Form\n(Email + Password / Phone OTP)"]
        JWTStorage["Stores JWT Token in\nhttpOnly Cookie or Memory"]
        AuthContext["AuthContext.Provider\n(currentUser, isAuthenticated)"]
    end

    subgraph BackendAuth ["Express Server"]
        AuthRoute["POST /api/auth/register\nPOST /api/auth/login"]
        Bcrypt["bcrypt.hash()\nbcrypt.compare()"]
        JWTIssuer["jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })"]
        AuthMiddleware["authenticateToken(req, res, next)"]
    end

    subgraph Database ["Database (MongoDB / PostgreSQL)"]
        UsersTable[("Users Table\n• id • email • password_hash • role")]
        OrdersTable[("Orders Table\n• id • user_id • items • amount • status")]
    end

    LoginForm --> AuthRoute
    AuthRoute --> Bcrypt --> UsersTable
    AuthRoute --> JWTIssuer --> JWTStorage
    JWTStorage --> AuthContext
    AuthContext -- Authorization: Bearer JWT --> AuthMiddleware
    AuthMiddleware --> OrdersTable
```

1. **Password Hashing**: Use `bcrypt` or `argon2` to hash user passwords before storing in a `users` table or MongoDB collection (salt rounds: 10–12).
2. **Token Generation**: Upon successful authentication, the server signs a **JSON Web Token (JWT)** containing `{ userId, email, role }` signed with a secure `JWT_SECRET`.
3. **Protected Routes Middleware**:
   ```javascript
   export const verifyToken = (req, res, next) => {
     const authHeader = req.headers['authorization'];
     const token = authHeader && authHeader.split(' ')[1];
     if (!token) return res.status(401).json({ error: 'Access token required' });

     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
       if (err) return res.status(403).json({ error: 'Invalid or expired token' });
       req.user = user;
       next();
     });
   };
   ```
4. **Order History Association**: When `req.user` is present during checkout, orders are linked to `user.id`, allowing customers to view past purchases and track ongoing deliveries in an "Account / My Orders" dashboard.

---

## 11. Local Development, Build & Run Procedures

### 11.1 Environment Configuration (`.env`)
The project reads configurations from `.env`:
```env
PORT=5000

# Direct UPI Receiver (Google Pay, PhonePe, Paytm, BHIM)
MERCHANT_UPI_ID=urbansole.pay@okaxis
VITE_MERCHANT_UPI_ID=urbansole.pay@okaxis
VITE_MERCHANT_NAME=Urban Sole Yeola
CONTACT_EMAIL=vmore9953@gmail.com

# Razorpay Credentials (Optional for Card & NetBanking)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
VITE_RAZORPAY_KEY_ID=
```

### 11.2 NPM Scripts Reference
| Command | Action |
| :--- | :--- |
| **`npm run dev:all`** | Runs both backend Express server (`node server.js`) and Vite client concurrently using `concurrently`. |
| **`npm run dev`** | Starts only the frontend Vite development server on `http://localhost:5173/`. |
| **`npm run server`** | Starts only the Express payment backend on `http://localhost:5000/`. |
| **`npm run build`** | Runs `vite build` to compile minified production bundles into `dist/`. |
| **`npm run preview`**| Runs `vite preview` to test the production bundle locally. |
| **`npm run lint`** | Runs high-speed `oxlint` against all JSX/JS files. |

---

## 12. Study Questions & Self-Evaluation Checklist

Use these questions to test and solidify your understanding of the codebase:

1. **Architecture**: Why does the project use `concurrently` in `npm run dev:all` instead of running two separate terminal commands?
2. **State Management**: Why is `CartContext` placed at the top level of `App.jsx`, and how does `localStorage` prevent cart loss on page refresh?
3. **Vite Proxy**: In `vite.config.js`, what does `server.proxy['/api']` do when the React client makes a call to `fetch('/api/create-order')`?
4. **Authentication**: Why do modern luxury D2C footwear platforms often choose a **Guest-First checkout** model over mandatory pre-checkout password registration?
5. **Security & Cryptography**: How does the Express backend use Node's native `crypto.createHmac` with SHA-256 to ensure that a customer cannot tamper with the order amount returned by Razorpay?
6. **Payment 2FA**: Where does the 2-Factor Authentication (2FA) take place when a customer scans the dynamic UPI QR code on their phone?
7. **Design System**: Where are global colors and font definitions stored, and what CSS variable controls the warm cream paper background?
8. **Pricing Engine**: How does `subtotal >= 2999` dynamically recalculate the free shipping progress meter, shipping fee waiver, and final total?

---

*Authored for the Urban Sole Codebase Study & Documentation Archive.*
