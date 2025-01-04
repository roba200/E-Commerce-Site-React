import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import PopoverProfile from "../PopoverProfile/PopoverProfile";
import Logo from "../../../public/logo.png";
import MagGlass from "../../../public/mag-glass.png";
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';

const searchClient = algoliasearch('S9NOOSY4TW', '663bf4ee6c5daa10de5fe174b60f1e1e');

const Hit = ({ hit }) => (
  <div className="hit-item" onClick={() => window.location.href = `/productdetails/${hit._id.$oid}`}>
    <img src={hit.imageUrl1} alt={hit.name} className="hit-image" />
    <div className="hit-content">
      <h4>{hit.name}</h4>
      <p>{hit.category}</p>
    </div>
  </div>
);

const Header = () => {
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userId");
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
            <div className="search-container" ref={searchContainerRef}>
              <InstantSearch searchClient={searchClient} indexName="e-commerce.products">
                <div className="search-input">
                  <SearchBox
                    onFocus={() => setShowResults(true)}
                    placeholder="What are you looking for?"
                    classNames={{
                      input: 'search-box-input',
                      submit: 'search-box-submit',
                    }}
                  />
                  <img src={MagGlass} alt="search" className="magnifying-glass" />
                </div>
                {showResults && (
                  <div className="search-results" onBlur={() => setShowResults(false)}>
                    <Hits hitComponent={Hit} />
                  </div>
                )}
              </InstantSearch>
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
