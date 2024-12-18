import React, { useState, useEffect } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import PopoverProfile from "../PopoverProfile/PopoverProfile";
import Logo from "../../../public/logo.png";
import MagGlass from "../../../public/mag-glass.png";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userId");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <section className="h-wrapper">
      <div className="h-container">
        <img src={Logo} alt="logo" width={100} />

        <div className="h-menu">
          <a href="" onClick={() => navigate("/homepage")}>
            Home
          </a>
          <a href="" onClick={() => navigate("/contact")}>
            Contact
          </a>
          <a href="" onClick={() => navigate("/about")}>
            About
          </a>
          
          {!isLoggedIn && (
            <a href="" onClick={() => navigate("/signup")}>
              Sign Up
            </a>
          )}
        </div>
        
        {isLoggedIn && (
          <div className="flex">
            <div className="search-input">
              <input type="text" placeholder="What are you looking for?" />
              <img src={MagGlass} alt="search" className="magnifying-glass" />
            </div>
            <PopoverProfile />
          </div>
        )}
      </div>
      <div className="line"></div>
    </section>
  );
};

export default Header;
