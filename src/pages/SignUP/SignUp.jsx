import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Redbutton from "../../components/RedButton/RedButton";
import "./SignUp.css";
import axios from "axios";
import { BASE_URL } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(`${BASE_URL}/auth/register`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        passwordHash: password,
        role: "CUSTOMER",
      });
      alert("Registration successful! You can now log in.");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed, please try again.");
    }
  };
  return (
    <>
      <Header></Header>
      <div className="login-container">
        <img src="./Side Image.png" alt="Image" srcset="" />
        <div className="login-wrapper">
          <form onSubmit={handleRegister}>
            <div className="login-form">
              <div className="title">Create an Account</div>
              <div className="subtitle">Enter your details below</div>
              <input
                type="text"
                className="name"
                placeholder="First Name"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
              <br />
              <input
                type="text"
                className="name"
                placeholder="Last Name"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
              <br />
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
              <div className="button-side-signup">
                <div className="signup-button">
                  <Redbutton text="Sign Up" />
                </div>

                <br />
                <div className="have-account-warpper">
                  <div className="have-account">Already have account?</div>
                  <div className="login" onClick={() => navigate('/')}>Login</div>
                </div>
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

export default SignUp;
