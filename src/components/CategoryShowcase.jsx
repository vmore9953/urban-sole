import React from 'react';
import { CATEGORIES } from '../data/products';
import { ArrowUpRight } from 'lucide-react';
import './CategoryShowcase.css';

export const CategoryShowcase = ({ onSelectCategory }) => {
  return (
    <section className="section category-showcase-section" id="categories-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">CURATED DIVISIONS</span>
          <h2 className="section-title">ENGINEERED FOR EVERY DISCIPLINE</h2>
          <p className="section-desc">
            Explore our architectural silhouettes designed with purposeful materials tailored for daily commute, track mastery, and fearless expression.
          </p>
        </div>

        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className="category-card"
              onClick={() => onSelectCategory(cat.name)}
            >
              <div className="category-image-wrap">
                <img src={cat.image} alt={cat.name} className="category-img" />
                <div className="category-overlay"></div>
              </div>

              <div className="category-content">
                <div className="category-header-row">
                  <span className="category-count">{cat.count}</span>
                  <div className="category-arrow-circle">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div className="category-text-bottom">
                  <h3 className="category-name">{cat.name}'s Footwear</h3>
                  <p className="category-tagline">{cat.tagline}</p>
                  <button className="category-link-btn">
                    <span>Explore Collection</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
