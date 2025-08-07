import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import CartSidebar from "@/components/organisms/CartSidebar";
import Home from "@/components/pages/Home";
import CarDetail from "@/components/pages/CarDetail";
import { useCart } from "@/hooks/useCart";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    getCartItemCount 
  } = useCart();

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleAddToCart = (car) => {
    addToCart(car);
  };

  const handleRemoveFromCart = (carId) => {
    removeFromCart(carId);
  };

  const handleUpdateQuantity = (carId, quantity) => {
    updateQuantity(carId, quantity);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header 
          cartItemCount={getCartItemCount()} 
          onCartToggle={handleCartToggle}
        />
        
        <main className="flex-1">
          <Routes>
            <Route 
              path="/" 
              element={<Home onAddToCart={handleAddToCart} />} 
            />
            <Route 
              path="/car/:id" 
              element={<CarDetail onAddToCart={handleAddToCart} />} 
            />
          </Routes>
        </main>

        <Footer />

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
        />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;