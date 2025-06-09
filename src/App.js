import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThankYou from './components/Thankyou'; 

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div style={{ display: 'flex', gap: 40, padding: 20 }}>
                <div style={{ flex: 2 }}>
                  <h1>🛍️ Curiate Shopify Store</h1>
                  <ProductList />
                </div>
                <div style={{ flex: 1 }}>
                  <Cart />
                </div>
              </div>
            }
          />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
