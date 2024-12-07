import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUP/SignUp";
import WishList from "./pages/WishList/WishList";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import Account from "./pages/Account/Account";
import Error from "./pages/Error/Error";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import HomePage from "./pages/HomePage/HomePage";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkTokenExpiration = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp > currentTime; // Check if the token is still valid
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && checkTokenExpiration(token)) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("token"); // Clear expired token
      localStorage.removeItem("userId");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={isLoggedIn ? <Navigate to="/homepage" /> : <LogIn setIsLoggedIn={setIsLoggedIn} />} 
          />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Protected Routes */}
          <Route path="/homepage" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/wishList" element={
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          } />
          <Route path="/account" element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
