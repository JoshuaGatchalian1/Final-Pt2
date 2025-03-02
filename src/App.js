import { googleLogout } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Import Navigate for redirection
import "./App.css";
import Cart from "./Cart";
import CreditCard from "./CreditCard"; // Import CreditCard component
import Data from "./Data";
import Login from "./Login";
import NavigationBar from "./NavigationBar";
import ProductList from "./ProductList";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (cart.length) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const logout = () => {
    googleLogout();
    setUser(null);
  };

  // Update quantity of a cart item
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.category === "Subscription" ? 1 : newQuantity, // Prevent update for subscriptions
            }
          : item
      )
    );
  };

  // Calculate total price with two decimal places
  const totalPrice = cart.reduce((acc, item) => {
    return item.price && item.quantity ? acc + item.price * item.quantity : acc;
  }, 0).toFixed(2); // Round to two decimal places

  // Add item to cart
  const addToCart = (product) => {
    if (product.category === "Subscription") {
      const existingSubscription = cart.some((item) => item.category === "Subscription");

      if (existingSubscription) {
        setError("You can only add one subscription to your cart.");
        setTimeout(() => setError(null), 3000);
        return;
      }

      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        updateQuantity(existingItem.id, existingItem.quantity + 1);
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    }
    setError(null);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // If the user is not logged in, redirect to Login page
  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <Router>
      <div className="App">
        <NavigationBar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />

        {user && <button onClick={logout}>Logout</button>}

        {error && <div className="error">{error}</div>}

        <Routes>
          {/* Protect routes */}
          <Route path="/" element={user ? <ProductList products={Data} addToCart={addToCart} /> : <Navigate to="/login" />} />
          <Route path="/cart" element={user ? <Cart cart={cart} removeFromCart={removeFromCart} totalPrice={totalPrice} /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={user ? <CreditCard cart={cart} totalPrice={totalPrice} /> : <Navigate to="/login" />} />

          {/* Login route */}
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
