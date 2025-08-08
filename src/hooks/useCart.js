import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('autovault-cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      toast.error('Failed to load saved cart');
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem('autovault-cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
      toast.error('Failed to save cart');
    }
  }, [cartItems]);

  const addToCart = (car) => {
    if (!car || !car.Id) {
      toast.error('Invalid car data');
      return;
    }

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.Id === car.Id);
      
      if (existingItemIndex >= 0) {
        // Item already in cart, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // New item, add to cart
        return [...prevItems, { ...car, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (carId) => {
    if (!carId) {
      toast.error('Invalid car ID');
      return;
    }

    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.Id !== carId);
      const removedItem = prevItems.find(item => item.Id === carId);
      
      if (removedItem) {
        toast.success(`${removedItem.make} ${removedItem.model} removed from cart`);
      }
      
      return updatedItems;
    });
  };

  const updateQuantity = (carId, newQuantity) => {
    if (!carId || newQuantity < 0) {
      toast.error('Invalid quantity');
      return;
    }

    if (newQuantity === 0) {
      removeFromCart(carId);
      return;
    }

    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.Id === carId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared');
  };

  const isInCart = (carId) => {
    return cartItems.some(item => item.Id === carId);
  };

  const getCartItemQuantity = (carId) => {
    const item = cartItems.find(item => item.Id === carId);
    return item ? item.quantity : 0;
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartItemCount,
    getCartTotal,
    clearCart,
    isInCart,
    getCartItemQuantity
  };
};