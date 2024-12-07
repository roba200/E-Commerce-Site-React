import React from "react";
import "./Header.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <section className="h-wrapper">
      <div className="h-container">
        <img src="./logo.png" alt="logo" width={100} />

        <div className="h-menu">
          <a href="" onClick={() => navigate("/homepage")}>Home</a>
          <a href="" onClick={() => navigate("/wishlist")}>Contact</a>
          <a href="" onClick={() => navigate("/cart")}>About</a>
          <a href="" onClick={() => navigate("/signup")}>Sign Up</a>
        </div>

        <div className="search-input">
          <input type="text" placeholder="What are you looking for?" />
          <img src="./mag-glass.png" alt="" className="magnifying-glass" />
        </div>
      </div>
      <div className="line"></div>
    </section>
  );
};

export default Header;
