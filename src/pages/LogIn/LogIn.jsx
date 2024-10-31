import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Redbutton from "../../components/RedButton/Redbutton";
import "./LogIn.css";

function LogIn() {
  return (
    <>
      <Header></Header>
      <div className="login-container">
        <img src="./Side Image.png" alt="Image" srcset="" />
        <div className="login-wrapper">
          <div className="login-form">
            <div className="title">Log in to Exclusive</div>
            <div className="subtitle">Enter your details below</div>
            <input
              type="text"
              className="email"
              placeholder="Email or Phone Number"
            />
            <br />
            <input
              type="password"
              className="password"
              placeholder="Password"
            />
            <div className="button-side">
              <div className="login-button">
                <Redbutton text="Log In" />
              </div>
              <div className="forgot-password">
                Forgot Password?
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default LogIn;
