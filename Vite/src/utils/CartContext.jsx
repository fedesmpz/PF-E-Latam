import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCartData();
  }, []);

  useEffect(() => {
    saveCartData();
  }, [cart]);

  const loadCartData = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart && savedCart.length > 0) {
      setCart(savedCart);
    }
  };

  const saveCartData = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((p) => p.id === product.id);

    if (existingProduct) {
      const updatedCart = cart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const removeToCart = (product) => {
    const existingProduct = cart.find((p) => p.id === product.id);

    if (existingProduct) {
      const updatedCart = cart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      );
      setCart(updatedCart);
    }
  };


  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };
  const removeAllItems = () => {
    setCart([]);
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeToCart,removeAllItems }}>
      {children}
    </CartContext.Provider>
  )
}
