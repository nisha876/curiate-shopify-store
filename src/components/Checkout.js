import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("🛒 Your cart is empty.");
      return;
    }

    console.log("🧾 Simulated Order:", cartItems);

    alert("✅ Simulated Checkout: Your order was placed successfully!");

    clearCart();          // ✅ Clear the cart and save the last order
    navigate('/thank-you');
  };

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={handleCheckout} disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Checkout;
