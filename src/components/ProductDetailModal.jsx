import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Ruler, 
  Share2,
  ChevronRight
} from 'lucide-react';
import './ProductDetailModal.css';

export const ProductDetailModal = () => {
  const { 
    activeProductDetail, 
    setActiveProductDetail, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    setIsCheckoutOpen,
    addToast
  } = useCart();

  if (!activeProductDetail) return null;

  const product = activeProductDetail;
  const isWishlisted = isInWishlist(product.id);

  const [selectedImage, setSelectedImage] = useState(
    product.gallery && product.gallery.length > 0 ? product.gallery[0] : product.image
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 8);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : 'Default'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('features'); // 'features', 'specs', 'shipping'
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 1400);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setActiveProductDetail(null);
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Urban Sole — ${product.name}`,
        text: `Check out ${product.name} on Urban Sole`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      addToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="product-modal-backdrop" onClick={() => setActiveProductDetail(null)}>
      <div className="product-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="modal-close-btn"
          onClick={() => setActiveProductDetail(null)}
          aria-label="Close details"
        >
          <X size={22} />
        </button>

        <div className="product-modal-grid">
          {/* Left Column: Image Gallery */}
          <div className="modal-gallery-column">
            <div className="modal-main-image-wrap">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="modal-main-image"
              />
              {discountPercent > 0 && (
                <span className="modal-discount-tag">-{discountPercent}% OFF</span>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="modal-thumbnails-strip">
                {product.gallery.map((img, index) => (
                  <button 
                    key={index} 
                    className={`modal-thumb-btn ${selectedImage === img ? 'active' : ''}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt={`View angle ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Quality & Sustainability Guarantees */}
            <div className="modal-trust-mini">
              <div className="trust-mini-item">
                <Truck size={16} />
                <span>Complimentary Express Delivery in 2-4 Days</span>
              </div>
              <div className="trust-mini-item">
                <RotateCcw size={16} />
                <span>30-Day Doorstep Returns & Size Exchange</span>
              </div>
              <div className="trust-mini-item">
                <ShieldCheck size={16} />
                <span>100% Verified Authentic Urban Sole Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Controls */}
          <div className="modal-details-column">
            {/* Top Category & Wishlist */}
            <div className="modal-header-row">
              <div className="modal-category-group">
                <span className="modal-cat-name">{product.category} Footwear</span>
                <span className="modal-cat-divider">•</span>
                <span className="modal-series-name">{product.series}</span>
              </div>

              <div className="modal-action-row">
                <button 
                  className="modal-icon-action" 
                  onClick={handleShare}
                  aria-label="Share product"
                >
                  <Share2 size={18} />
                </button>
                <button 
                  className={`modal-icon-action ${isWishlisted ? 'wishlisted' : ''}`}
                  onClick={() => toggleWishlist(product)}
                  aria-label="Toggle wishlist"
                >
                  <Heart size={18} fill={isWishlisted ? "#ff4d6d" : "transparent"} color={isWishlisted ? "#ff4d6d" : "currentColor"} />
                </button>
              </div>
            </div>

            {/* Title & Rating */}
            <h1 className="modal-product-title">{product.name}</h1>

            <div className="modal-rating-row">
              <div className="modal-stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={15} 
                    fill={i < Math.floor(product.rating) ? "#C5A059" : "none"} 
                    color="#C5A059" 
                  />
                ))}
              </div>
              <span className="modal-rating-score">{product.rating}</span>
              <span className="modal-reviews-link">({product.reviewsCount} customer reviews)</span>
              <span className="modal-badge-stock">In Stock — Ready to Dispatch</span>
            </div>

            {/* Pricing Section */}
            <div className="modal-pricing-box">
              <div className="modal-pricing-row">
                <span className="modal-price">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <span className="modal-original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                )}
                {discountPercent > 0 && (
                  <span className="modal-save-pill">Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}</span>
                )}
              </div>
              <span className="modal-tax-note">Inclusive of all local taxes & GST. Zero hidden charges.</span>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="modal-color-section">
                <div className="color-section-header">
                  <span className="option-label">Color:</span>
                  <span className="selected-color-name">{selectedColor}</span>
                </div>
                <div className="color-swatches-list">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      className={`color-swatch-circle ${selectedColor === c.name ? 'active' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <Check size={12} color={c.hex === '#FFFFFF' || c.hex === '#F0EFEA' || c.hex === '#FAF9F6' ? '#000000' : '#FFFFFF'} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="modal-size-section">
              <div className="size-section-header">
                <span className="option-label">Select UK Size:</span>
                <button 
                  className="size-guide-trigger"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                >
                  <Ruler size={14} />
                  <span>Size & Measurement Guide</span>
                </button>
              </div>

              <div className="modal-sizes-grid">
                {product.sizes && product.sizes.map((sz) => (
                  <button
                    key={sz}
                    className={`modal-size-btn ${selectedSize === sz ? 'active' : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    <span>UK {sz}</span>
                  </button>
                ))}
              </div>

              {/* Inline Size Guide Drawer */}
              {showSizeGuide && (
                <div className="inline-size-guide">
                  <div className="size-guide-table-wrap">
                    <table className="size-guide-table">
                      <thead>
                        <tr>
                          <th>UK/India</th>
                          <th>US Men</th>
                          <th>US Women</th>
                          <th>EU</th>
                          <th>Length (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>6</td><td>7</td><td>8.5</td><td>40</td><td>25.0 cm</td></tr>
                        <tr><td>7</td><td>8</td><td>9.5</td><td>41</td><td>25.8 cm</td></tr>
                        <tr><td>8</td><td>9</td><td>10.5</td><td>42</td><td>26.7 cm</td></tr>
                        <tr><td>9</td><td>10</td><td>11.5</td><td>43.5</td><td>27.5 cm</td></tr>
                        <tr><td>10</td><td>11</td><td>12.5</td><td>45</td><td>28.3 cm</td></tr>
                        <tr><td>11</td><td>12</td><td>13.5</td><td>46</td><td>29.2 cm</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="size-guide-hint">💡 Tip: Footwear fits true to standard Indian footwear sizing. For wider feet, consider half a size up.</p>
                </div>
              )}
            </div>

            {/* Quantity and Action Buttons */}
            <div className="modal-purchase-actions">
              <div className="quantity-stepper">
                <button 
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-number">{quantity}</span>
                <button 
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button 
                className={`btn btn-dark modal-add-btn ${isAddedAnim ? 'success' : ''}`}
                onClick={handleAddToCart}
              >
                {isAddedAnim ? (
                  <>
                    <Check size={18} />
                    <span>Added To Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add To Bag</span>
                  </>
                )}
              </button>

              <button 
                className="btn btn-beige modal-buy-btn"
                onClick={handleBuyNow}
              >
                <span>Instant Checkout</span>
              </button>
            </div>

            {/* Tabbed Specs & Details */}
            <div className="modal-tabs-wrap">
              <div className="modal-tabs-nav">
                <button 
                  className={`modal-tab-link ${activeTab === 'features' ? 'active' : ''}`}
                  onClick={() => setActiveTab('features')}
                >
                  Features & Design
                </button>
                <button 
                  className={`modal-tab-link ${activeTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specs')}
                >
                  Technical Specs
                </button>
                <button 
                  className={`modal-tab-link ${activeTab === 'shipping' ? 'active' : ''}`}
                  onClick={() => setActiveTab('shipping')}
                >
                  Shipping & Returns
                </button>
              </div>

              <div className="modal-tab-body">
                {activeTab === 'features' && (
                  <div className="tab-pane">
                    <p className="tab-desc">{product.description}</p>
                    {product.features && (
                      <ul className="modal-features-list">
                        {product.features.map((feat, idx) => (
                          <li key={idx}>
                            <ChevronRight size={14} className="feature-bullet" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="tab-pane">
                    <div className="specs-table">
                      {product.specs && Object.entries(product.specs).map(([key, val]) => (
                        <div key={key} className="spec-row">
                          <span className="spec-key">{key.toUpperCase()}:</span>
                          <span className="spec-val">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="tab-pane shipping-pane">
                    <p><strong>• India Express Shipping:</strong> Orders are dispatched from Mumbai/Bengaluru fulfillment centers within 24 hours.</p>
                    <p><strong>• Delivery Timeframe:</strong> 2-3 business days for tier 1 metro cities; 4-6 days for all other pin codes.</p>
                    <p><strong>• 30-Day Hassle Free Returns:</strong> Free doorstep pickup. Full refund or size exchange with zero questions asked.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
