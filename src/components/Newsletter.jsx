import React, { useState } from 'react';
import { Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Newsletter.css';

export const Newsletter = () => {
  const { addToast } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribed(true);
    addToast('Welcome to the Collective! Use code URBANFIRST for 15% OFF.', 'success');
  };

  return (
    <section className="newsletter-section">
      <div className="container newsletter-container">
        <div className="newsletter-box">
          <div className="newsletter-badge">
            <Sparkles size={14} />
            <span>EXCLUSIVE ARCHIVE ACCESS</span>
          </div>

          <h2 className="newsletter-title">JOIN THE URBAN SOLE COLLECTIVE</h2>
          <p className="newsletter-desc">
            Subscribe for private drop notifications, archival releases, and receive an instant <strong>15% OFF code</strong> for your initial order.
          </p>

          {subscribed ? (
            <div className="newsletter-success">
              <CheckCircle2 size={24} className="sub-check-icon" />
              <div>
                <strong>You're in the inner circle.</strong>
                <span>Your welcome voucher is <strong>URBANFIRST</strong> (15% OFF at checkout).</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="newsletter-input-wrap">
                <Mail size={18} className="newsletter-mail-icon" />
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your email address..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                />
              </div>

              <button type="submit" className="btn btn-beige newsletter-btn">
                <span>Unlock 15% Off</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          <span className="newsletter-disclaimer">
            We value your digital privacy. Zero spam. Unsubscribe anytime with one tap.
          </span>
        </div>
      </div>
    </section>
  );
};
