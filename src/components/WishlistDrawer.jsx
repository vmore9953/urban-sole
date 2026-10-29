import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import './WishlistDrawer.css';

export const WishlistDrawer = () => {
  const { 
    wishlist, 
    isWishlistOpen, 
    setIsWishlistOpen, 
    toggleWishlist, 
    addToCart,
    setActiveProductDetail 
  } = useCart();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (product) => {
    addToCart(product, product.sizes ? product.sizes[0] : 8);
    toggleWishlist(product);
  };

  return (
    <div className="wishlist-backdrop" onClick={() => setIsWishlistOpen(false)}>
      <div className="wishlist-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="wishlist-header">
          <div className="wishlist-title-wrap">
            <Heart size={20} fill="#ff4d6d" color="#ff4d6d" />
            <h2 className="wishlist-title">Saved Footwear</h2>
            <span className="wishlist-count-badge">{savedProducts.length}</span>
          </div>

          <button 
            className="wishlist-close-btn"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="wishlist-items-scroll">
          {savedProducts.length > 0 ? (
            <div className="wishlist-items-list">
              {savedProducts.map((product) => (
                <div key={product.id} className="wishlist-item-card">
                  <div 
                    className="wishlist-img-box"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setActiveProductDetail(product);
                    }}
                  >
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="wishlist-info">
                    <span className="wishlist-cat">{product.category} • {product.subcategory}</span>
                    <h4 
                      className="wishlist-name"
                      onClick={() => {
                        setIsWishlistOpen(false);
                        setActiveProductDetail(product);
                      }}
                    >
                      {product.name}
                    </h4>
                    <span className="wishlist-price">₹{product.price.toLocaleString('en-IN')}</span>

                    <div className="wishlist-actions">
                      <button 
                        className="btn btn-sm btn-dark wishlist-add-cart-btn"
                        onClick={() => handleMoveToCart(product)}
                      >
                        <ShoppingBag size={14} />
                        <span>Move To Bag</span>
                      </button>

                      <button 
                        className="wishlist-remove-btn"
                        onClick={() => toggleWishlist(product)}
                        title="Remove from saved"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="wishlist-empty-state">
              <div className="empty-heart-icon">
                <Heart size={44} />
              </div>
              <h3>No Saved Footwear Yet</h3>
              <p>Click the heart icon on any shoe card to curate your personal wishlist.</p>
              <button 
                className="btn btn-dark"
                onClick={() => setIsWishlistOpen(false)}
              >
                Explore Footwear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
