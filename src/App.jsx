import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { Shop } from './components/Shop';
import { AboutSection } from './components/AboutSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastContainer } from './components/ToastContainer';
import './App.css';

function MainApp() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle navigation
  const handleNavigate = (section, category = null) => {
    setActiveSection(section);
    if (category) {
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    setActiveSection('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
    if (query.trim() && activeSection !== 'shop') {
      setActiveSection('shop');
    }
  };

  return (
    <div className="urban-sole-app">
      {/* Navigation Header */}
      <Navbar 
        activeSection={activeSection}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchQuery={handleSearchQuery}
      />

      {/* Main Body Rendering */}
      <main>
        {activeSection === 'home' && (
          <>
            <Hero 
              onShopNow={() => handleNavigate('shop')} 
              onSelectCategory={handleSelectCategory}
            />
            <CategoryShowcase 
              onSelectCategory={handleSelectCategory}
            />
            <Shop 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchQuery={setSearchQuery}
            />
            <AboutSection 
              onShopNow={() => handleNavigate('shop')}
            />
            <CustomerReviewsSection />
            <ContactSection />
            <Newsletter />
          </>
        )}

        {activeSection === 'shop' && (
          <>
            <Shop 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchQuery={setSearchQuery}
            />
            <Newsletter />
          </>
        )}

        {activeSection === 'categories' && (
          <>
            <CategoryShowcase 
              onSelectCategory={handleSelectCategory}
            />
            <Shop 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchQuery={setSearchQuery}
            />
            <Newsletter />
          </>
        )}

        {activeSection === 'about' && (
          <>
            <AboutSection 
              onShopNow={() => handleNavigate('shop')}
            />
            <CustomerReviewsSection />
            <Newsletter />
          </>
        )}

        {activeSection === 'contact' && (
          <>
            <ContactSection />
            <Newsletter />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
