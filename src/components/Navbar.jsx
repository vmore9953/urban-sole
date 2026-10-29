import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import './Navbar.css';

export const Navbar = ({ activeSection, onNavigate, onSearchQuery, searchQuery }) => {
  const { cartCount, wishlistCount, setIsCartOpen, setIsWishlistOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section, category = null) => {
    setIsMobileMenuOpen(false);
    onNavigate(section, category);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleNavClick('shop');
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <Sparkles size={14} className="announcement-icon" />
          <span>Complimentary Express Shipping across India on orders above ₹2,999 | Code: <strong>URBANFIRST</strong> for 15% OFF</span>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          {/* Mobile Menu Button */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Brand Logo */}
          <div className="brand-logo" onClick={() => handleNavClick('home')}>
            <div className="brand-icon">
              <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
                <rect x="2" y="14" width="28" height="12" rx="6" fill="#121214" />
                <path d="M4 16C4 10 9 6 16 6C23 6 28 10 28 16" stroke="#D8C8B2" strokeWidth="3" strokeLinecap="round" />
                <circle cx="16" cy="18" r="3" fill="#D8C8B2" />
                <line x1="8" y1="21" x2="24" y2="21" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-name">URBAN SOLE</span>
              <span className="brand-sub">STUDIO</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <button 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>
            <button 
              className={`nav-link ${activeSection === 'shop' ? 'active' : ''}`}
              onClick={() => handleNavClick('shop')}
            >
              Shop
            </button>
            
            {/* Categories Dropdown */}
            <div className="nav-dropdown">
              <button 
                className={`nav-link ${activeSection === 'categories' ? 'active' : ''}`}
                onClick={() => handleNavClick('categories')}
              >
                Categories
              </button>
              <div className="dropdown-menu">
                <button onClick={() => handleNavClick('shop', 'Men')}>
                  <span>Men's Footwear</span>
                  <ChevronRight size={14} />
                </button>
                <button onClick={() => handleNavClick('shop', 'Women')}>
                  <span>Women's Footwear</span>
                  <ChevronRight size={14} />
                </button>
                <button onClick={() => handleNavClick('shop', 'Sports')}>
                  <span>Sports & Athletic</span>
                  <ChevronRight size={14} />
                </button>
                <button onClick={() => handleNavClick('shop', 'Kids')}>
                  <span>Kids & Youth</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <button 
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => handleNavClick('about')}
            >
              About
            </button>
            <button 
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => handleNavClick('contact')}
            >
              Contact
            </button>
          </nav>

          {/* Action Icons */}
          <div className="nav-actions">
            {/* Live Search Trigger & Bar */}
            <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
              <form onSubmit={handleSearchSubmit} className="search-form">
                <input 
                  type="text" 
                  placeholder="Search sneakers, boots, runners..." 
                  value={searchQuery}
                  onChange={(e) => onSearchQuery(e.target.value)}
                  className="search-input"
                  id="nav-search-input"
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="search-clear-btn"
                    onClick={() => onSearchQuery('')}
                  >
                    <X size={14} />
                  </button>
                )}
              </form>
              <button 
                className="action-icon-btn search-toggle"
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (!isSearchOpen) {
                    setTimeout(() => document.getElementById('nav-search-input')?.focus(), 100);
                  }
                }}
                aria-label="Toggle Search"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Wishlist Button */}
            <button 
              className="action-icon-btn wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              aria-label="View Saved Items"
            >
              <Heart size={20} />
              {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
            </button>

            {/* Cart Button */}
            <button 
              className="action-icon-btn cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-search-box">
            <Search size={18} className="search-icon-muted" />
            <input 
              type="text" 
              placeholder="Search footwear..." 
              value={searchQuery}
              onChange={(e) => onSearchQuery(e.target.value)}
            />
          </div>

          <div className="mobile-nav-links">
            <button onClick={() => handleNavClick('home')} className="mobile-nav-item">
              Home
            </button>
            <button onClick={() => handleNavClick('shop')} className="mobile-nav-item">
              Shop All Footwear
            </button>
            
            <div className="mobile-category-group">
              <span className="mobile-group-title">Collections</span>
              <button onClick={() => handleNavClick('shop', 'Men')} className="mobile-subnav-item">
                Men's Footwear <ArrowRight size={14} />
              </button>
              <button onClick={() => handleNavClick('shop', 'Women')} className="mobile-subnav-item">
                Women's Footwear <ArrowRight size={14} />
              </button>
              <button onClick={() => handleNavClick('shop', 'Sports')} className="mobile-subnav-item">
                Sports & Athletics <ArrowRight size={14} />
              </button>
              <button onClick={() => handleNavClick('shop', 'Kids')} className="mobile-subnav-item">
                Kids & Juniors <ArrowRight size={14} />
              </button>
            </div>

            <button onClick={() => handleNavClick('about')} className="mobile-nav-item">
              About Urban Sole
            </button>
            <button onClick={() => handleNavClick('contact')} className="mobile-nav-item">
              Contact & Studios
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
