import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [lastOrder, setLastOrder] = useState([]);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const variantId = product.variants.edges[0].node.id;
    setCartItems(prev => {
      const existing = prev.find(item => item.variantId === variantId);
      if (existing) {
        return prev.map(item =>
          item.variantId === variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, {
          variantId,
          title: product.title,
          price: product.variants.edges[0].node.price.amount,
          image: product.images.edges[0]?.node.url,
          quantity: 1,
        }];
      }
    });
  };

  const removeFromCart = (variantId) => {
    setCartItems(prev => prev.filter(item => item.variantId !== variantId));
  };

  const updateQuantity = (variantId, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setLastOrder(cartItems); // save for Thank You page
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      lastOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};
