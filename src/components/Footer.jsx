import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Heart, ArrowUp } from 'lucide-react';
import './Footer.css';

export const Footer = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="footer-logo" onClick={() => onNavigate('home')}>
              <div className="footer-icon">
                <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
                  <rect x="2" y="14" width="28" height="12" rx="6" fill="#D8C8B2" />
                  <path d="M4 16C4 10 9 6 16 6C23 6 28 10 28 16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="16" cy="18" r="2.5" fill="#121214" />
                </svg>
              </div>
              <span className="footer-brand-title">URBAN SOLE</span>
            </div>

            <p className="footer-tagline">
              Architectural footwear atelier engineered with supercritical nitrogen cushioning and ethically sourced materials for the modern commuter and athlete.
            </p>

            <div className="footer-trust-chips">
              <span className="trust-chip"><Truck size={13} /> Free Shipping India</span>
              <span className="trust-chip"><RotateCcw size={13} /> 30-Day Returns</span>
              <span className="trust-chip"><ShieldCheck size={13} /> 100% Authentic</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => onNavigate('home')}>Home</button></li>
              <li><button onClick={() => onNavigate('shop')}>Shop All Footwear</button></li>
              <li><button onClick={() => onNavigate('categories')}>Categories Showcase</button></li>
              <li><button onClick={() => onNavigate('about')}>About The Atelier</button></li>
              <li><button onClick={() => onNavigate('contact')}>Contact & Flagships</button></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Collections</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => onNavigate('shop', 'Men')}>Men's Footwear</button></li>
              <li><button onClick={() => onNavigate('shop', 'Women')}>Women's Footwear</button></li>
              <li><button onClick={() => onNavigate('shop', 'Sports')}>Sports & Performance</button></li>
              <li><button onClick={() => onNavigate('shop', 'Kids')}>Kids & Youth</button></li>
              <li><button onClick={() => onNavigate('shop')}>Limited Drops</button></li>
            </ul>
          </div>

          {/* Customer Care & Studios */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Customer Care</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => onNavigate('contact')}>Size & Measurement Guide</button></li>
              <li><button onClick={() => onNavigate('contact')}>Doorstep Return Policy</button></li>
              <li><button onClick={() => onNavigate('contact')}>Track Your Order</button></li>
              <li><button onClick={() => onNavigate('contact')}>Mumbai Flagship (BKC)</button></li>
              <li><button onClick={() => onNavigate('contact')}>Bengaluru Studio (100ft)</button></li>
            </ul>
          </div>
        </div>

        {/* Accepted Payment Methods & Badges */}
        <div className="footer-payment-strip">
          <span className="strip-title">Accepted Payment Methods:</span>
          <div className="payment-badges-row">
            <span className="pay-badge">Instant UPI (GPay / PhonePe)</span>
            <span className="pay-badge">RuPay</span>
            <span className="pay-badge">Visa</span>
            <span className="pay-badge">Mastercard</span>
            <span className="pay-badge">Net Banking</span>
            <span className="pay-badge">Cash on Delivery</span>
          </div>
        </div>

        {/* Bottom Copyright & Scroll Up */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © 2026 Urban Sole Studio Pvt. Ltd. All rights reserved. Crafted for urban strides.
          </p>

          <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Back to top">
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
