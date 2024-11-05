import React from "react";
import "./Account.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Account() {
  return (
    <>
      <Header></Header>
      <div className="navigate">
        <div className="navigate-panel"><a href="#"> Home / </a>
        <a href="#">My Account</a>
        </div>
        <div className="welcome">Welcome!
          <div className="username">Roba</div>
        </div>
      
      </div>
      <div className="my">
        <div className="my-account">
          <ul>
            <li>
              Manage My Account
              <ul className="list">
                <li>My Profile</li>
                <li>Address Book</li>
                <li>My Payment Options</li>
              </ul>
            </li>
            <li>
              My Orders
              <ul className="list">
                <li>My Returns</li>
                <li>MY Cancellations</li>
              </ul>
            </li>
            <li>My WishList</li>
          </ul>
        </div>
        <div className="profile">
        <div className="details">
        <div className="edit-profile">Edit Your Profile</div>
        <div className="name">
        <div className="namde"><span>First Name</span><input type="text" /></div>
        <div className="l"><span>Last Name</span><input type="text" /></div>
        </div>
        </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Account;
