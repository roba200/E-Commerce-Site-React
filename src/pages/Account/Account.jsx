import React from "react";
import "./Account.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RedButton from "../../components/RedButton/RedButton";
import WhiteButton from "../../components/WhiteButton/WhiteButton";

function Account() {
  return (
    <>
      <Header></Header>
      <div className="navigate">
        <div className="navigate-panel">
          <a href="#"> Home / </a>
          <a href="#">My Account</a>
        </div>
        <div className="welcome">
          Welcome!
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
            <div className="details-user">
              <div className="namef">
                <span>First Name</span>
                <br />
                <input
                  type="text"
                  name="Fname"
                  id="Fname"
                  placeholder="tharindu"
                />
              </div>
              <div className="namel">
                <span>Last Name</span>
                <br />
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  placeholder="madushan"
                />
              </div>
            </div>
            <div className="details-user">
              <div className="namef">
                <span>Email</span>
                <br />
                <input
                  type="text"
                  name="email"
                  id="emails"
                  placeholder="tharindu@gmail.com"
                />
              </div>
              <div className="namel">
                <span>Address</span>
                <br />
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="kelaniya,561,sri lanka"
                />
              </div>
            </div>
            <div className="details-user">
              <div className="namef">
                <span>Passward Changes</span>
                <br />
                <div className="password">
                <input
                  type="text"
                  name="cpassword"
                  id="cpassword"
                  placeholder="Current Password"
                />
                </div>
              </div>
            </div>
            <div className="details-user">
              <div className="namef">
                <div className="password">
                <input
                  type="text"
                  name="npassword"
                  id="npassword"
                  placeholder="New Password"
                />
                </div>
              </div>
            </div>
            <div className="details-user">
              <div className="namef">
                <div className="password">
                <input
                  type="text"
                  name="cnpassword"
                  id="cnpassword"
                  placeholder="Confirm New password"
                />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="cancel">
               <input type="submit" name="cancel" value="cancel" />
              </div>
              <div className="">
                <RedButton text=" Save Changes"></RedButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Account;
