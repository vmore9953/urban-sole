import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Heart, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 size={16} color="#10B981" />;
        let toastClass = 'toast-success';

        if (toast.type === 'cart') {
          icon = <ShoppingBag size={16} color="#D8C8B2" />;
          toastClass = 'toast-cart';
        } else if (toast.type === 'heart') {
          icon = <Heart size={16} fill="#FF4D6D" color="#FF4D6D" />;
          toastClass = 'toast-heart';
        } else if (toast.type === 'error') {
          icon = <AlertCircle size={16} color="#EF4444" />;
          toastClass = 'toast-error';
        } else if (toast.type === 'info') {
          icon = <Info size={16} color="#6366F1" />;
          toastClass = 'toast-info';
        }

        return (
          <div key={toast.id} className={`toast ${toastClass}`}>
            <span className="toast-icon">{icon}</span>
            <span className="toast-message">{toast.message}</span>
            <button 
              className="toast-close"
              onClick={() => removeToast(toast.id)}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
