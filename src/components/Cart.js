import React from 'react';
import { useCart } from '../context/CartContext';
import Checkout from './Checkout';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * parseFloat(item.price),
    0
  );

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 && <p>Cart is empty.</p>}
      {cartItems.map(item => (
        <div key={item.variantId} style={{ borderBottom: '1px solid #ccc', marginBottom: 10 }}>
          <img src={item.image} alt={item.title} width="50" />
          <p>{item.title}</p>
          <p>₹{item.price}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.variantId, parseInt(e.target.value))}
            min="1"
            style={{ width: 50 }}
          />
          <button onClick={() => removeFromCart(item.variantId)}>Remove</button>
        </div>
      ))}
      <h3>Total: ₹{total.toFixed(2)}</h3>

      {/* Add Checkout Button */}
      {cartItems.length > 0 && <Checkout />}
    </div>
  );
};

export default Cart;
