import { useState, useEffect } from "react";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on initialization
  useEffect(() => {
    const savedCart = localStorage.getItem("autovault-cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        setCartItems([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("autovault-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (car) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.carId === car.Id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.carId === car.Id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, {
        carId: car.Id,
        car: car,
        quantity: 1,
        addedAt: new Date().toISOString()
      }];
    });
  };

  const removeFromCart = (carId) => {
    setCartItems(prevItems => prevItems.filter(item => item.carId !== carId));
  };

  const updateQuantity = (carId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(carId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.carId === carId
          ? { ...item, quantity: quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.car.price * item.quantity), 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal
  };
};