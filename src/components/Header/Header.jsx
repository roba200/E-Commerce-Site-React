import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import PopoverProfile from "../PopoverProfile/PopoverProfile";
import Logo from "../../../public/logo.png";
import MagGlass from "../../../public/mag-glass.png";

const Header = () => {
  const navigate = useNavigate();
  return (
    <section className="h-wrapper">
      <div className="h-container">
        <img src={Logo} alt="logo" width={100} />

        <div className="h-menu">
          <a href="" onClick={() => navigate("/homepage")}>
            Home
          </a>
          <a href="" onClick={() => navigate("")}>
            Contact
          </a>
          <a href="" onClick={() => navigate("")}>
            About
          </a>
          <a href="" onClick={() => navigate("/signup")}>
            Sign Up
          </a>
        </div>
        <div className="flex">
          <div className="search-input">
            <input type="text" placeholder="What are you looking for?" />
            <img src={MagGlass} alt="search" className="magnifying-glass" />
          </div>
          <PopoverProfile />
        </div>
      </div>
      <div className="line"></div>
    </section>
  );
};

export default Header;
