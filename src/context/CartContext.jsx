import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load initial cart and wishlist from localStorage if available
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('urbansole_cart');
      return saved ? JSON.parse(saved) : [
        {
          product: {
            id: 'us-01',
            name: 'Phantom Stealth Runner',
            price: 7499,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
            category: 'Men'
          },
          size: 9,
          color: 'Onyx Carbon',
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('urbansole_wishlist');
      return saved ? JSON.parse(saved) : ['us-02', 'us-04'];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activeProductDetail, setActiveProductDetail] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('urbansole_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('urbansole_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Toast dispatcher
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add to cart
  const addToCart = (product, size = null, color = null, quantity = 1) => {
    const chosenSize = size || (product.sizes && product.sizes[0]) || 8;
    const chosenColor = color || (product.colors && product.colors[0]?.name) || 'Default';

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === chosenSize && item.color === chosenColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, size: chosenSize, color: chosenColor, quantity }];
      }
    });

    addToast(`Added ${product.name} (UK ${chosenSize}) to bag`, 'cart');
  };

  // Remove from cart
  const removeFromCart = (productId, size, color) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size && item.color === color)
      )
    );
    addToast('Item removed from bag', 'info');
  };

  // Update quantity
  const updateQuantity = (productId, size, color, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.size === size && item.color === color) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Wishlist actions
  const toggleWishlist = (product) => {
    const isSaved = wishlist.includes(product.id);
    if (isSaved) {
      setWishlist((prev) => prev.filter((id) => id !== product.id));
      addToast(`Removed ${product.name} from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, product.id]);
      addToast(`Saved ${product.name} to wishlist`, 'heart');
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Promo code
  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'URBANFIRST') {
      setAppliedPromo({ code: 'URBANFIRST', discountPercent: 15, name: '15% First Stride Discount' });
      addToast('Coupon URBANFIRST applied: 15% OFF!', 'success');
      return { success: true, message: '15% discount applied!' };
    } else if (clean === 'SOLE20') {
      setAppliedPromo({ code: 'SOLE20', discountPercent: 20, name: '20% Sole VIP Discount' });
      addToast('Coupon SOLE20 applied: 20% OFF!', 'success');
      return { success: true, message: '20% discount applied!' };
    } else {
      addToast('Invalid coupon code. Try URBANFIRST or SOLE20', 'error');
      return { success: false, message: 'Invalid coupon code' };
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    addToast('Coupon removed', 'info');
  };

  // Cart calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercent) / 100) : 0;
  const freeShippingThreshold = 2999;
  const isFreeShipping = subtotal >= freeShippingThreshold || cart.length === 0;
  const shippingFee = isFreeShipping ? 0 : 250;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        wishlist,
        wishlistCount: wishlist.length,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        activeProductDetail,
        setActiveProductDetail,
        isCheckoutOpen,
        setIsCheckoutOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        promoCode,
        setPromoCode,
        appliedPromo,
        applyPromo,
        removePromo,
        subtotal,
        discountAmount,
        shippingFee,
        totalAmount,
        freeShippingThreshold,
        isFreeShipping,
        progressToFreeShipping,
        remainingForFreeShipping,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
