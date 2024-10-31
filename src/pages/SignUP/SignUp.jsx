import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Redbutton from "../../components/RedButton/Redbutton";
import "./SignUp.css";

function SignUp() {
  return (
    <>
      <Header></Header>
      <div className="login-container">
        <img src="./Side Image.png" alt="Image" srcset="" />
        <div className="login-wrapper">
          <div className="login-form">
            <div className="title">Create an Account</div>
            <div className="subtitle">Enter your details below</div>
            <input type="text" className="name" placeholder="Name" />
            <br />
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
            <div className="button-side-signup">
              <div className="signup-button">
                <Redbutton text="Sign Up" />
              </div>
              <br />
              <div className="have-account-warpper">
                <div className="have-account">Already have account?</div>
                <div className="login">
                    Login
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default SignUp;
