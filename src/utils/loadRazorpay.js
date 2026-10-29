/**
 * Dynamically loads the Razorpay checkout script if not already present.
 * @returns {Promise<boolean>} Resolves to true when Razorpay is loaded, false otherwise.
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay Checkout SDK.');
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

