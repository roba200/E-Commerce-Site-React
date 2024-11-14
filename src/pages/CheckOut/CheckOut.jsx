import React from "react";
import "./CheckOut.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function CheckOut() {
  return (
    <>
      <Header></Header>
      <div className="navigate-panel">
        <ul>
          <li>
            <a href="">Account /</a>
          </li>
          <li>
            <a href="">My Account /</a>
          </li>
          <li>
            <a href="">Product /</a>
          </li>
          <li>
            <a href="">View Cart /</a>
          </li>
          <li>
            <a href="">CheckOut </a>
          </li>
        </ul>
      </div>

      <div className="title">
        <h2>Billing Details</h2>
      </div>
      <div className="wrapper">
        <div className="billing-form">
          <span>First Name</span>
          <input type="text" name="Fname" id="Fname" required/>
          <span>Company Name</span>
          <input type="text" name="cname" id="cname" />
          <span>Street Address</span>
          <input type="text" name="saddress" id="saddress" required/>
          <span>Apartment,floor,etc.(optional)</span>
          <input type="text" name="optional" id="optional" />
          <span>Town/City</span>
          <input type="text" name="town" id="town" required/>
          <span>Phone Number</span>
          <input type="text" name="pn" id="pn" required />
          <span>Email Address</span>
          <input type="text" name="eaddress" id="eaddress" required />
        
          <div className="li-wrapper">
            <input type="checkbox" />
            <div>Save this information for faster check-out next time</div>
          </div>
        </div>
        <div className="payment">
          <div className="payment-item">
            <img src="./Gamepad-Cart-Small.png" alt="" />
            <div className="payment-item-name">
              <p>HI Gamepad </p>
              <p>$650</p>
            </div>
          </div>
          <div className="payment-item">
            <img src="./Monitor-Cart-Small.png" alt="" />
            <div className="payment-item-name">
              <p>LCD Monitor</p>
              <p>$1100</p>
            </div>
          </div>
            <div className="payment-itemsubtotal">
                Subtotal:
                <div className="payment-itemsubtotalprice">
                    $1750
                </div>
            </div>
            <hr />
            <div className="payment-itemshop">
                Shipping:
                <div className="payment-itemshopprice">
                    Free
                </div>
            </div>
            <hr />
            <div className="payment-itemtotal">
               Total:
                <div className="payment-itemtotalprice">
                 $1750
                </div>
            </div>
            <div className="payment-method">
            <div>
              <input type="radio" name="paymentuser" value="bank" />
             </div>
                <div className="payment-methodname">Bank
              </div>
              <div className="payment-card">
                <img src="./Bkash.png" alt="" />
                <img src="./Visa.png" alt="" />
                <img src="./Mastercard.png" alt="" />
                <img src="./Nagad.png" alt="" />
              </div>
            </div>
            <div className="payment-cash">
              <div>
                <input type="radio" name="paymentuser" value="cash" />
              </div>
              <div className="payment-cn">Cash on delivery</div>
            </div>
            <div className="code">
              <div className="coupon-code">
                <input type="text" name="ccon" placeholder="Coupon Code" />
              </div>
              <div className="apply-code">
              <input type="submit" name="acon" value="Apply Coupon" />
              </div>
            </div>
            <div className="place-order">
              <input type="submit" name="order" value="Place Order" />
              </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default CheckOut;