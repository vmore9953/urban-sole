import React, { useState } from 'react';
import { Heart, Star, Eye, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setActiveProductDetail } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 8);
  const [isAddedAnim, setIsAddedAnim] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize);
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 1400);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCardClick = () => {
    setActiveProductDetail(product);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      {/* Top Media Container */}
      <div className="product-media">
        {/* Badges */}
        <div className="product-badges">
          {product.isNew && <span className="badge badge-dark">NEW</span>}
          {product.isBestseller && <span className="badge badge-accent">HOT</span>}
          {discountPercent > 0 && <span className="badge badge-sale">-{discountPercent}%</span>}
        </div>

        {/* Wishlist Button */}
        <button 
          className={`product-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={isWishlisted ? "#ff4d6d" : "transparent"} color={isWishlisted ? "#ff4d6d" : "#121214"} />
        </button>

        {/* Product Image */}
        <div className="product-img-wrap">
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy" 
            className="product-img"
          />
        </div>

        {/* Hover Quick Actions */}
        <div className="product-hover-actions">
          <button 
            className="quick-action-btn quick-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              setActiveProductDetail(product);
            }}
          >
            <Eye size={16} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="product-info">
        <div className="product-meta-row">
          <span className="product-category-tag">{product.category} • {product.subcategory}</span>
          <div className="product-rating">
            <Star size={13} fill="#C5A059" color="#C5A059" />
            <span className="rating-value">{product.rating}</span>
            <span className="rating-count">({product.reviewsCount})</span>
          </div>
        </div>

        <h3 className="product-title" title={product.name}>{product.name}</h3>
        <p className="product-series">{product.series}</p>

        {/* Size Selector Strip */}
        <div className="product-sizes-strip" onClick={(e) => e.stopPropagation()}>
          <span className="sizes-label">UK Size:</span>
          <div className="size-pills">
            {product.sizes && product.sizes.map((sz) => (
              <button 
                key={sz} 
                className={`size-pill ${selectedSize === sz ? 'active' : ''}`}
                onClick={() => setSelectedSize(sz)}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & Add to Cart Button */}
        <div className="product-bottom-row">
          <div className="product-pricing">
            <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>

          <button 
            className={`btn-add-card ${isAddedAnim ? 'added' : ''}`}
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to bag`}
          >
            {isAddedAnim ? (
              <>
                <Check size={16} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
