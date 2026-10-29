import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Zap, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Hero.css';

export const Hero = ({ onShopNow, onSelectCategory }) => {
  const { addToCart, setActiveProductDetail } = useCart();

  // Featured hero shoe
  const heroShoe = {
    id: 'us-01',
    name: 'Phantom Stealth Runner',
    series: 'Apex Series 01',
    category: 'Men',
    subcategory: 'Performance Running',
    price: 7499,
    originalPrice: 9999,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    description: 'Constructed with aerospace-grade carbon fiber shank and dual-density supercritical foam midsole.',
    sizes: [7, 8, 9, 10, 11]
  };

  return (
    <section className="hero-section">
      <div className="hero-background-art">
        <div className="hero-circle circle-1"></div>
        <div className="hero-circle circle-2"></div>
        <div className="hero-grid-lines"></div>
      </div>

      <div className="container hero-container">
        {/* Left Column: Typography & CTAs */}
        <div className="hero-content">
          <div className="hero-badge-pill">
            <Sparkles size={14} className="hero-sparkle" />
            <span>DROP 04 / AUTUMN WINTER 2026</span>
          </div>

          <h1 className="hero-title">
            ENGINEERED FOR THE <span className="title-highlight">MODERN STRIDE</span>.
          </h1>

          <p className="hero-subtitle">
            Urban Sole merges brutalist architectural design with supercritical nitrogen foam. Handcrafted footwear built for concrete landscapes and all-day endurance.
          </p>

          <div className="hero-cta-group">
            <button 
              className="btn btn-dark hero-btn-main"
              onClick={onShopNow}
              id="hero-shop-now-btn"
            >
              <span>Explore Collection</span>
              <ArrowRight size={18} />
            </button>

            <button 
              className="btn btn-outline-dark"
              onClick={() => onSelectCategory('Sports')}
            >
              <span>Sports & Running</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="hero-metrics">
            <div className="metric-item">
              <span className="metric-number">75K+</span>
              <span className="metric-label">Pairs On Streets</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">4.9★</span>
              <span className="metric-label">Verified Rating</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">245g</span>
              <span className="metric-label">Ultralight Chassis</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Shoe Showcase */}
        <div className="hero-showcase">
          <div className="hero-card">
            <div className="hero-card-header">
              <span className="hero-shoe-series">APEX SERIES • EDITION 01</span>
              <span className="hero-shoe-badge">NEW RELEASE</span>
            </div>

            <div className="hero-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80" 
                alt="Urban Sole Phantom Stealth Runner" 
                className="hero-shoe-image"
              />
              <div className="hero-image-glow"></div>
            </div>

            {/* Floating Specs Pill */}
            <div className="floating-spec-tag spec-1">
              <Zap size={15} className="spec-icon" />
              <div>
                <strong>CarbonBlade™</strong>
                <span>84% Energy Rebound</span>
              </div>
            </div>

            <div className="floating-spec-tag spec-2">
              <div className="spec-indicator"></div>
              <div>
                <strong>Supercritical Foam</strong>
                <span>Cloud Comfort Core</span>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="hero-card-footer">
              <div className="hero-shoe-info">
                <h3 className="hero-shoe-name">Phantom Stealth Runner</h3>
                <div className="hero-shoe-pricing">
                  <span className="hero-price">₹7,499</span>
                  <span className="hero-original-price">₹9,999</span>
                  <span className="hero-discount-pill">25% OFF</span>
                </div>
              </div>

              <div className="hero-card-actions">
                <button 
                  className="btn btn-sm btn-white"
                  onClick={() => setActiveProductDetail(heroShoe)}
                >
                  Quick View
                </button>
                <button 
                  className="btn btn-sm btn-dark"
                  onClick={() => addToCart(heroShoe, 9)}
                >
                  Add To Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="hero-trust-bar">
        <div className="container trust-container">
          <div className="trust-item">
            <Truck size={20} className="trust-icon" />
            <div>
              <strong>Complimentary Express Delivery</strong>
              <p>Dispatched within 24h across India</p>
            </div>
          </div>

          <div className="trust-item">
            <RotateCcw size={20} className="trust-icon" />
            <div>
              <strong>30-Day Hassle-Free Returns</strong>
              <p>Free doorstep pickup & instant exchange</p>
            </div>
          </div>

          <div className="trust-item">
            <ShieldCheck size={20} className="trust-icon" />
            <div>
              <strong>100% Authentic Craftsmanship</strong>
              <p>Engineered with sustainable luxury materials</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
