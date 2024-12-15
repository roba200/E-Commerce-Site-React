import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Redbutton from "../../components/RedButton/Redbutton";
import "./LogIn.css";
import axios from "axios";

function LogIn({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
            'email': email,
            'passwordHash': password,
        });

        // Store the token in local storage
        localStorage.setItem('token', response.data['token']);
        localStorage.setItem('userId', response.data['userId']);
        // Update logged-in state
        setIsLoggedIn(true);
        alert('Login successful!');
    } catch (error) {
        console.error('Login failed:', error);
        setError('Login failed, please check your credentials.');
    }
};
  return (
    <>
      <Header />
      <div className="login-container">
        <img src="./Side Image.png" alt="Image" srcset="" />
        <div className="login-wrapper">
          <form onSubmit={handleLogin}>
            <div className="login-form">
              <div className="title">Log in to Exclusive</div>
              <div className="subtitle">Enter your details below</div>
              <input
                required
                type="email"
                className="email"
                placeholder="Email or Phone Number"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                required
                type="password"
                className="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="button-side">
                <div className="login-button">
                  <Redbutton text="Log In" />
                </div>
                <div className="forgot-password">Forgot Password?</div>
              </div>
            </div>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default LogIn;
