import React, { useState } from 'react';
import { FAQS } from '../data/reviews';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ChevronDown, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ContactSection.css';

export const ContactSection = () => {
  const { addToast } = useCart();
  const [openFaq, setOpenFaq] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Sizing & Fit Advice',
    message: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSubmitted(true);
    addToast('Message received! Our footwear concierge will reply within 4 business hours.', 'success');

    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        inquiryType: 'Sizing & Fit Advice',
        message: ''
      });
    }, 4000);
  };

  return (
    <section className="section contact-section" id="contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">CONNECT & EXPERIENTIAL STUDIOS</span>
          <h2 className="section-title">GET IN TOUCH WITH THE ATELIER</h2>
          <p className="section-desc">
            Have questions regarding sizing, custom architectural drops, or visiting our 3D scanning experience centers? Reach out anytime.
          </p>
        </div>

        {/* Contact Grid: Form & Studios */}
        <div className="contact-main-grid">
          {/* Form */}
          <div className="contact-form-card">
            <h3 className="contact-card-title">Send A Direct Message</h3>
            <p className="contact-card-subtitle">Our dedicated footwear concierge team responds within 4 business hours.</p>

            {formSubmitted ? (
              <div className="contact-success-box">
                <CheckCircle2 size={48} className="success-check-icon" />
                <h4>Message Dispatched Successfully</h4>
                <p>Thank you, {formData.name || 'there'}. A footwear specialist has received your inquiry and will contact you via {formData.email}.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="contact-form">
                <div className="form-field">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Siddharth Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>Inquiry Topic *</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  >
                    <option value="Sizing & Fit Advice">Sizing & Fit Consultation</option>
                    <option value="Order Tracking & Logistics">Order Tracking & Logistics</option>
                    <option value="Returns & Size Exchange">Returns & Size Exchange</option>
                    <option value="Experience Center Booking">3D Foot-Scan Studio Booking</option>
                    <option value="Press & Collaborations">Press & Design Collaborations</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Your Inquiry or Message *</label>
                  <textarea 
                    rows="4" 
                    required 
                    placeholder="Tell us what you need help with..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-dark btn-contact-submit">
                  <Send size={16} />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Studios & Concierge Details */}
          <div className="contact-info-col">
            <div className="studio-card">
              <span className="studio-tag">MAIN STORE & ATELIER</span>
              <h4 className="studio-city">Yeola Flagship Store</h4>
              <div className="studio-detail-item">
                <MapPin size={18} className="info-icon" />
                <span>Old Nagar Palika, Near Dusne Jewellers, Yeola, Dist. Nashik, Maharashtra 423401</span>
              </div>
              <div className="studio-detail-item">
                <Clock size={18} className="info-icon" />
                <span>Monday – Sunday: 10:00 AM – 9:00 PM IST</span>
              </div>
            </div>

            <div className="studio-card">
              <span className="studio-tag">EXPERIENCE ATELIER 02</span>
              <h4 className="studio-city">Bengaluru Studio</h4>
              <div className="studio-detail-item">
                <MapPin size={18} className="info-icon" />
                <span>100ft Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038</span>
              </div>
              <div className="studio-detail-item">
                <Clock size={18} className="info-icon" />
                <span>Tuesday – Sunday: 11:00 AM – 8:30 PM IST</span>
              </div>
            </div>

            <div className="concierge-direct-card">
              <div className="direct-item">
                <Phone size={18} className="info-icon" />
                <div>
                  <strong>Direct Concierge Desk</strong>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
              </div>
              <div className="direct-item">
                <Mail size={18} className="info-icon" />
                <div>
                  <strong>Atelier Inquiries</strong>
                  <a href="mailto:concierge@urbansole.in">concierge@urbansole.in</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="faq-section-wrap">
          <div className="section-header faq-header">
            <span className="section-tag">FREQUENTLY INQUIRED</span>
            <h3 className="faq-title">ANSWERS & GUIDELINES</h3>
          </div>

          <div className="faq-accordion-list">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${openFaq === index ? 'active' : ''}`}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              >
                <div className="faq-question-row">
                  <h4 className="faq-q">{faq.question}</h4>
                  <ChevronDown size={18} className="faq-chevron" />
                </div>
                {openFaq === index && (
                  <div className="faq-answer-body">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
