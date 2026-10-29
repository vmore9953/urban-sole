import React from 'react';
import { BRAND_STATS } from '../data/reviews';
import { Feather, Compass, Layers, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import './AboutSection.css';

export const AboutSection = ({ onShopNow }) => {
  return (
    <section className="section about-section" id="about-section">
      <div className="container">
        {/* Top Story Header */}
        <div className="about-hero-grid">
          <div className="about-text-col">
            <span className="section-tag">BRAND MANIFESTO</span>
            <h2 className="about-main-title">
              WHERE ARCHITECTURAL GEOMETRY MEETS HUMAN STRIDE.
            </h2>
            <p className="about-lead">
              Urban Sole was founded with a singular conviction: footwear should neither sacrifice sculptural sophistication for athletic cushioning nor compromise biological posture for runway silhouettes.
            </p>
            <p className="about-paragraph">
              Born amidst the concrete rhythm of Mumbai and crafted with heritage master-cobblers across India and Italy, every silhouette we produce balances minimalist tension with nitrogen-infused kinetic response. We treat shoes as wearable structural architecture.
            </p>

            <div className="about-cta-row">
              <button className="btn btn-dark" onClick={onShopNow}>
                <span>Explore The Archive</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="about-visual-col">
            <div className="about-image-stack">
              <div className="about-image-card img-card-1">
                <img 
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80" 
                  alt="Urban Sole Craftsmanship Workshop" 
                />
              </div>
              <div className="about-image-card img-card-2">
                <img 
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80" 
                  alt="Precision Sneaker Engineering" 
                />
                <div className="about-floating-quote">
                  <Sparkles size={16} />
                  <span>"Form is nothing without kinetic resonance."</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Innovation */}
        <div className="about-pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon-box">
              <Layers size={24} />
            </div>
            <h3 className="pillar-title">SoleTech™ Nitrogen Foam</h3>
            <p className="pillar-desc">
              Supercritical foam expanded with compressed nitrogen gas creates microcellular resilience delivering 84% rebound efficiency and lasting shock reduction.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <Feather size={24} />
            </div>
            <h3 className="pillar-title">Featherweight Ergonomics</h3>
            <p className="pillar-desc">
              Constructed with anatomical arch stabilization and carbon fiber shanks that distribute pressure evenly across the metatarsals for zero foot fatigue.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <Compass size={24} />
            </div>
            <h3 className="pillar-title">Circular Sustainability</h3>
            <p className="pillar-desc">
              Uppers woven from 100% recycled marine plastics, non-toxic water-based glues, and gold-rated LWG vegetable-tanned leathers with biodegradable packaging.
            </p>
          </div>
        </div>

        {/* Brand Numbers Strip */}
        <div className="about-stats-panel">
          <div className="stats-header">
            <h3>BY THE METRICS</h3>
            <p>Our commitment to precision craftsmanship across India</p>
          </div>

          <div className="stats-grid">
            {BRAND_STATS.map((stat, idx) => (
              <div key={idx} className="stat-box">
                <span className="stat-number">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
