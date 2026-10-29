import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';
import './Shop.css';

export const Shop = ({ 
  selectedCategory, 
  onSelectCategory, 
  searchQuery, 
  onSearchQuery 
}) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [priceRange, setPriceRange] = useState('all'); // 'all', 'under5k', '5k-9k', 'above9k'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating', 'newest'
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = ['All', 'Men', 'Women', 'Sports', 'Kids'];
  const sizes = [5, 6, 7, 8, 9, 10, 11, 12];

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category Filter
      if (selectedCategory && selectedCategory !== 'All') {
        if (item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesSub = item.subcategory.toLowerCase().includes(q);
        const matchesSeries = item.series.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesSub && !matchesSeries && !matchesDesc) {
          return false;
        }
      }

      // Size Filter
      if (selectedSize !== null) {
        if (!item.sizes || !item.sizes.includes(selectedSize)) {
          return false;
        }
      }

      // Price Range Filter
      if (priceRange === 'under5k' && item.price >= 5000) return false;
      if (priceRange === '5k-9k' && (item.price < 5000 || item.price > 9000)) return false;
      if (priceRange === 'above9k' && item.price <= 9000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default order
    });
  }, [selectedCategory, searchQuery, selectedSize, priceRange, sortBy]);

  const handleResetFilters = () => {
    onSelectCategory('All');
    onSearchQuery('');
    setSelectedSize(null);
    setPriceRange('all');
    setSortBy('featured');
  };

  const hasActiveFilters = 
    (selectedCategory && selectedCategory !== 'All') ||
    searchQuery.trim() !== '' ||
    selectedSize !== null ||
    priceRange !== 'all' ||
    sortBy !== 'featured';

  return (
    <section className="section shop-section" id="shop-section">
      <div className="container">
        {/* Shop Header */}
        <div className="shop-header">
          <div>
            <span className="section-tag">CATALOG ARCHIVE</span>
            <h1 className="shop-title">THE FOOTWEAR COLLECTION</h1>
            <p className="shop-desc">
              Precision engineered running shoes, architectural sneakers, handcrafted leather boots, and athletic footwear.
            </p>
          </div>

          <div className="shop-count-badge">
            <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} Models
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <div className="filter-controls-bar">
          {/* Category Tabs */}
          <div className="category-pill-group">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${
                  (selectedCategory === cat || (!selectedCategory && cat === 'All')) ? 'active' : ''
                }`}
                onClick={() => onSelectCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="filter-bar-right">
            {/* Search Input */}
            <div className="shop-search-input-wrap">
              <Search size={16} className="search-icon-inside" />
              <input
                type="text"
                placeholder="Search by model, style, series..."
                value={searchQuery}
                onChange={(e) => onSearchQuery(e.target.value)}
                className="shop-search-field"
              />
              {searchQuery && (
                <button 
                  className="shop-search-clear"
                  onClick={() => onSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="sort-dropdown-wrap">
              <ArrowUpDown size={15} className="sort-icon" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
                aria-label="Sort Footwear"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Drops</option>
              </select>
              <ChevronDown size={14} className="sort-chevron" />
            </div>

            {/* Mobile Filter Toggle */}
            <button 
              className={`mobile-filter-trigger ${hasActiveFilters ? 'has-active' : ''}`}
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Extended Secondary Filters Strip (Sizes & Price) */}
        <div className={`secondary-filters ${showMobileFilters ? 'mobile-visible' : ''}`}>
          {/* Size Filter */}
          <div className="filter-group">
            <span className="filter-group-label">Size (UK):</span>
            <div className="filter-sizes-list">
              <button 
                className={`size-filter-btn ${selectedSize === null ? 'active' : ''}`}
                onClick={() => setSelectedSize(null)}
              >
                All
              </button>
              {sizes.map((sz) => (
                <button
                  key={sz}
                  className={`size-filter-btn ${selectedSize === sz ? 'active' : ''}`}
                  onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                >
                  UK {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <span className="filter-group-label">Price Bracket:</span>
            <div className="price-bracket-group">
              <button 
                className={`price-bracket-btn ${priceRange === 'all' ? 'active' : ''}`}
                onClick={() => setPriceRange('all')}
              >
                All Prices
              </button>
              <button 
                className={`price-bracket-btn ${priceRange === 'under5k' ? 'active' : ''}`}
                onClick={() => setPriceRange('under5k')}
              >
                Under ₹5,000
              </button>
              <button 
                className={`price-bracket-btn ${priceRange === '5k-9k' ? 'active' : ''}`}
                onClick={() => setPriceRange('5k-9k')}
              >
                ₹5,000 – ₹9,000
              </button>
              <button 
                className={`price-bracket-btn ${priceRange === 'above9k' ? 'active' : ''}`}
                onClick={() => setPriceRange('above9k')}
              >
                Above ₹9,000
              </button>
            </div>
          </div>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <button className="reset-filters-btn" onClick={handleResetFilters}>
              <RotateCcw size={14} />
              <span>Reset All</span>
            </button>
          )}
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="active-chips-row">
            <span className="active-chips-label">Applied:</span>
            {selectedCategory && selectedCategory !== 'All' && (
              <span className="filter-chip">
                Category: {selectedCategory}
                <X size={12} onClick={() => onSelectCategory('All')} />
              </span>
            )}
            {searchQuery && (
              <span className="filter-chip">
                Search: "{searchQuery}"
                <X size={12} onClick={() => onSearchQuery('')} />
              </span>
            )}
            {selectedSize !== null && (
              <span className="filter-chip">
                UK Size: {selectedSize}
                <X size={12} onClick={() => setSelectedSize(null)} />
              </span>
            )}
            {priceRange !== 'all' && (
              <span className="filter-chip">
                Price: {priceRange === 'under5k' ? 'Under ₹5k' : priceRange === '5k-9k' ? '₹5k - ₹9k' : 'Above ₹9k'}
                <X size={12} onClick={() => setPriceRange('all')} />
              </span>
            )}
            <button className="clear-all-chips" onClick={handleResetFilters}>
              Clear all filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="empty-products-state">
            <div className="empty-icon-wrap">
              <Search size={36} />
            </div>
            <h3 className="empty-title">No Footwear Matches Your Filters</h3>
            <p className="empty-desc">
              We couldn't find any shoes matching your current selection of search terms or size brackets.
            </p>
            <button className="btn btn-dark" onClick={handleResetFilters}>
              <RotateCcw size={16} />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
