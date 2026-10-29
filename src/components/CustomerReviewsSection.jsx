import React, { useState } from 'react';
import { REVIEWS } from '../data/reviews';
import { Star, CheckCircle, ThumbsUp, MessageSquarePlus, X, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CustomerReviewsSection.css';

export const CustomerReviewsSection = () => {
  const { addToast } = useCart();
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', '5', '4'
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    city: '',
    productName: 'Phantom Stealth Runner',
    rating: 5,
    title: '',
    content: ''
  });

  const filteredReviews = reviewsList.filter((r) => {
    if (activeFilter === '5') return r.rating === 5;
    if (activeFilter === '4') return r.rating >= 4 && r.rating < 5;
    return true;
  });

  const handleLike = (id) => {
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: (r.likes || 0) + 1 } : r))
    );
    addToast('Marked review as helpful', 'info');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.title || !newReview.content) return;

    const created = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      city: newReview.city || 'India',
      productName: newReview.productName,
      rating: Number(newReview.rating),
      date: 'Just now',
      verified: true,
      title: newReview.title,
      content: newReview.content,
      fit: 'True to Size',
      likes: 1
    };

    setReviewsList([created, ...reviewsList]);
    setIsWriteModalOpen(false);
    setNewReview({
      name: '',
      city: '',
      productName: 'Phantom Stealth Runner',
      rating: 5,
      title: '',
      content: ''
    });
    addToast('Thank you! Your verified review has been posted.', 'success');
  };

  return (
    <section className="section reviews-section" id="reviews-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">TESTED ON STREETS</span>
          <h2 className="section-title">WHAT THE COLLECTIVE SAYS</h2>
          <p className="section-desc">
            Authentic experiences from marathoners, architects, doctors, and daily urban navigators across India.
          </p>
        </div>

        {/* Rating Overview Scorecard */}
        <div className="reviews-scorecard">
          <div className="scorecard-left">
            <span className="big-rating-number">4.9</span>
            <div className="scorecard-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#C5A059" color="#C5A059" />
              ))}
            </div>
            <span className="scorecard-based-on">Based on 850+ verified owners across India</span>
          </div>

          <div className="scorecard-bars">
            <div className="bar-row">
              <span className="bar-label">5 Stars</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: '92%' }}></div></div>
              <span className="bar-percent">92%</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">4 Stars</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: '7%' }}></div></div>
              <span className="bar-percent">7%</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">3 Stars</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: '1%' }}></div></div>
              <span className="bar-percent">1%</span>
            </div>
          </div>

          <div className="scorecard-right">
            <button 
              className="btn btn-dark btn-write-review"
              onClick={() => setIsWriteModalOpen(true)}
            >
              <MessageSquarePlus size={16} />
              <span>Write A Review</span>
            </button>
            <span className="scorecard-subtext">Verified purchases get 200 SolePoints</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="reviews-filter-bar">
          <span className="filter-label">Filter reviews:</span>
          <button 
            className={`review-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Reviews ({reviewsList.length})
          </button>
          <button 
            className={`review-filter-btn ${activeFilter === '5' ? 'active' : ''}`}
            onClick={() => setActiveFilter('5')}
          >
            5 Stars Only
          </button>
          <button 
            className={`review-filter-btn ${activeFilter === '4' ? 'active' : ''}`}
            onClick={() => setActiveFilter('4')}
          >
            4 Stars
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {filteredReviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-card-top">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <div className="reviewer-name-row">
                      <strong className="reviewer-name">{rev.name}</strong>
                      {rev.verified && (
                        <span className="verified-badge" title="Verified Urban Sole Purchaser">
                          <CheckCircle size={12} />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>
                    <span className="reviewer-meta">{rev.city} • {rev.date}</span>
                  </div>
                </div>

                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={13} 
                      fill={i < Math.floor(rev.rating) ? "#C5A059" : "none"} 
                      color="#C5A059" 
                    />
                  ))}
                </div>
              </div>

              <div className="review-product-tag">
                <span>Shoe: <strong>{rev.productName}</strong></span>
              </div>

              <h4 className="review-title">"{rev.title}"</h4>
              <p className="review-body">{rev.content}</p>

              <div className="review-card-bottom">
                <span className="review-fit-tag">Fit: {rev.fit}</span>
                <button 
                  className="review-like-btn"
                  onClick={() => handleLike(rev.id)}
                >
                  <ThumbsUp size={13} />
                  <span>Helpful ({rev.likes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write A Review Modal */}
      {isWriteModalOpen && (
        <div className="review-modal-backdrop" onClick={() => setIsWriteModalOpen(false)}>
          <div className="review-modal-panel" onClick={(e) => e.stopPropagation()}>
            <button 
              className="review-modal-close"
              onClick={() => setIsWriteModalOpen(false)}
            >
              <X size={20} />
            </button>

            <h3 className="write-review-title">Share Your Stride Experience</h3>
            <p className="write-review-sub">Your feedback guides our footwear engineering atelier.</p>

            <form onSubmit={handleReviewSubmit} className="write-review-form">
              <div className="form-field">
                <label>Your Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Priyanshu Roy"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label>City & State *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Pune, MH"
                  value={newReview.city}
                  onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label>Footwear Model *</label>
                <select
                  value={newReview.productName}
                  onChange={(e) => setNewReview({ ...newReview, productName: e.target.value })}
                >
                  <option value="Phantom Stealth Runner">Phantom Stealth Runner</option>
                  <option value="AeroStrata Minimalist Trainer">AeroStrata Minimalist Trainer</option>
                  <option value="SoleCraft Heritage Chelsea">SoleCraft Heritage Chelsea</option>
                  <option value="Vortex Quantum Court">Vortex Quantum Court</option>
                  <option value="Eclipse Chunky Platform Sneaker">Eclipse Chunky Platform Sneaker</option>
                  <option value="Kinetic Hydro Marathon Pro">Kinetic Hydro Marathon Pro</option>
                </select>
              </div>

              <div className="form-field">
                <label>Rating *</label>
                <div className="star-rating-picker">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="star-pick-btn"
                    >
                      <Star 
                        size={22} 
                        fill={star <= newReview.rating ? "#C5A059" : "none"} 
                        color="#C5A059" 
                      />
                    </button>
                  ))}
                  <span className="star-rating-count">({newReview.rating} of 5 Stars)</span>
                </div>
              </div>

              <div className="form-field">
                <label>Review Headline *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Summarize your experience in one sentence"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label>Detailed Experience *</label>
                <textarea 
                  rows="4" 
                  required 
                  placeholder="How does it feel on foot? Describe arch support, comfort, cushioning, and fit..."
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-dark btn-submit-review">
                <Send size={16} />
                <span>Submit Verified Review</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
