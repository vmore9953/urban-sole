import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Check, 
  ShieldCheck, 
  Truck
} from 'lucide-react';
import './CartDrawer.css';

export const CartDrawer = () => {
  const { 
    cart, 
    cartCount, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    discountAmount, 
    shippingFee, 
    totalAmount, 
    isFreeShipping, 
    progressToFreeShipping, 
    remainingForFreeShipping,
    appliedPromo,
    applyPromo,
    removePromo,
    setIsCheckoutOpen
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromo(inputCode);
      setInputCode('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="cart-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="drawer-title-group">
            <ShoppingBag size={20} />
            <h2 className="drawer-title">Shopping Bag</h2>
            <span className="drawer-count-pill">{cartCount} items</span>
          </div>

          <button 
            className="drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="free-shipping-meter">
          <div className="meter-label-row">
            <div className="meter-icon-text">
              <Truck size={16} />
              {isFreeShipping ? (
                <span className="free-shipping-unlocked">
                  <strong>Unlocked!</strong> You qualify for <strong>FREE Express Shipping</strong>
                </span>
              ) : (
                <span>
                  Add <strong>₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more to claim <strong>FREE Express Delivery</strong>
                </span>
              )}
            </div>
          </div>
          <div className="meter-track">
            <div 
              className={`meter-bar ${isFreeShipping ? 'complete' : ''}`}
              style={{ width: `${progressToFreeShipping}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="cart-items-scroll">
          {cart.length > 0 ? (
            <div className="cart-items-list">
              {cart.map((item, index) => (
                <div key={`${item.product.id}-${item.size}-${item.color}-${index}`} className="cart-item-row">
                  <div className="cart-item-img-wrap">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>

                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <h4 className="cart-item-title">{item.product.name}</h4>
                      <button 
                        className="cart-item-remove-btn"
                        onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="cart-item-specs">
                      <span className="spec-tag">UK {item.size}</span>
                      <span className="spec-dot">•</span>
                      <span className="spec-tag">{item.color}</span>
                    </div>

                    <div className="cart-item-bottom">
                      <div className="cart-qty-control">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, -1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="item-qty">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-item-price">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="cart-empty-state">
              <div className="empty-cart-icon">
                <ShoppingBag size={48} />
              </div>
              <h3>Your Shopping Bag Is Empty</h3>
              <p>Explore our latest footwear drops and find your next stride.</p>
              <button 
                className="btn btn-dark"
                onClick={() => setIsCartOpen(false)}
              >
                Start Browsing
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout Calculations */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Promo Code Input */}
            <div className="promo-code-container">
              {appliedPromo ? (
                <div className="promo-applied-badge">
                  <div className="applied-left">
                    <Tag size={14} />
                    <span><strong>{appliedPromo.code}</strong> applied ({appliedPromo.discountPercent}% OFF)</span>
                  </div>
                  <button className="remove-promo-btn" onClick={removePromo}>
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCode} className="promo-form">
                  <Tag size={15} className="promo-input-icon" />
                  <input 
                    type="text" 
                    placeholder="Coupon code (e.g. URBANFIRST)" 
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                  />
                  <button type="submit" className="apply-code-btn">
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="order-summary-box">
              <div className="summary-line">
                <span>Bag Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="summary-line discount-line">
                  <span>Promo Discount ({appliedPromo?.code})</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="summary-line">
                <span>Estimated Express Shipping</span>
                <span>{shippingFee === 0 ? <strong className="free-tag">FREE</strong> : `₹${shippingFee}`}</span>
              </div>

              <div className="summary-line total-line">
                <span>Grand Total (INR)</span>
                <span className="total-price">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button 
              className="btn btn-dark btn-checkout-main"
              onClick={handleProceedCheckout}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div className="drawer-security-bar">
              <ShieldCheck size={14} />
              <span>256-Bit SSL Secured & Doorstep Verified Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
