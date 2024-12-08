import React, { useState } from "react";
import CryptoJS from 'crypto-js';
import "./CheckOut.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Redbutton from "../../components/RedButton/Redbutton";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CheckOut() {
  const { total, orderId } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    apartment: '',
    city: '',
    country: '',
    phone: ''
  });

  const deleteCartUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/carts/user/${userId}`,
        {
          method: "DELETE"
        }
        
      );
      const data = await response;
      console.log("Cart Deleted", data);
    } catch (error) {
      console.error("Error delete cart", error);
    }
  };



  const setStatusOrder = async (status) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/orders/${orderId}/${status}`,
        {
          method: "PUT"
        }
        
      );
      const data = await response;
      console.log("Order status updated:", data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const paymentCompleteMessage = () => {
    toast.success("Payment Completed!", {
      position: "top-right",
    });
  };

  const paymentErrorMessage = (error) => {
    toast.error(error, {
      position: "top-right",
    });
  };

  const paymentDismissedMessage = () => {
    toast.info("Payment Dismissed!", {
      position: "top-right",
    });
  };

  const generateHash = (orderDetails) => {
    const merchantSecret = 'MTk5NDI0MDY0OTI5NDk4Njk4ODk0MjMwNzQwNjA4NzE4MDc5MDU=';
    const formattedAmount = Number(orderDetails.amount).toFixed(2);
    const md5Secret = CryptoJS.MD5(merchantSecret).toString().toUpperCase();
    
    const message = orderDetails.merchant_id + 
                   orderDetails.order_id + 
                   formattedAmount + 
                   orderDetails.currency + 
                   md5Secret;
                   
    return CryptoJS.MD5(message).toString().toUpperCase();
  };

  const handlePayment = async () => {
    const orderDetails = {
      merchant_id: "1221874",
      order_id: orderId,
      amount: total,
      currency: "LKR"
    };

    const payment = {
      sandbox: true,
      merchant_id: orderDetails.merchant_id,
      return_url: "http://sample.com/return",
      cancel_url: "http://sample.com/cancel",
      notify_url: "http://sample.com/notify",
      order_id: orderDetails.order_id,
      items: "Door bell wireles",
      amount: orderDetails.amount,
      currency: orderDetails.currency,
      hash: generateHash(orderDetails),
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.streetAddress + ' ' + formData.apartment,
      city: formData.city,
      country: formData.country,
      delivery_address: formData.streetAddress + ' ' + formData.apartment,
      delivery_city: formData.city,
      delivery_country: formData.country,
      custom_1: "",
      custom_2: "",
    };

    // Setup PayHere callback handlers
    payhere.onCompleted = function onCompleted(orderId) {
      console.log("Payment completed. OrderID:" + orderId);
      paymentCompleteMessage();
      setStatusOrder("COMPLETED");
      deleteCartUser(localStorage.getItem("userId"));

      // Note: validate the payment and show success or failure page to the customer
    };

    payhere.onDismissed = function onDismissed() {
      // Note: Prompt user to pay again or show an error page
      console.log("Payment dismissed");
      paymentDismissedMessage();
    };

    payhere.onError = function onError(error) {
      // Note: show an error page
      console.log("Error:" + error);
      paymentErrorMessage(error);
    };

    // Initialize PayHere payment
    payhere.startPayment(payment);
  };

  return (
    <div>
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
          <input type="text" name="firstName" id="Fname" required 
            value={formData.firstName} onChange={handleInputChange} />
          <span>Last Name</span>
          <input type="text" name="lastName" id="cname" 
            value={formData.lastName} onChange={handleInputChange} />
          <span>Email</span>
          <input type="email" name="email" id="email" 
            value={formData.email} onChange={handleInputChange} />
          <span>Street Address</span>
          <input type="text" name="streetAddress" id="saddress" required 
            value={formData.streetAddress} onChange={handleInputChange} />
          <span>Apartment,floor,etc.(optional)</span>
          <input type="text" name="apartment" id="optional" 
            value={formData.apartment} onChange={handleInputChange} />
          <span>Town/City</span>
          <input type="text" name="city" id="town" required 
            value={formData.city} onChange={handleInputChange} />
          <span>Country</span>
          <input type="text" name="country" id="tcountryown" required 
            value={formData.country} onChange={handleInputChange} />
          <span>Phone Number</span>
          <input type="text" name="phone" id="pn" required 
            value={formData.phone} onChange={handleInputChange} />

          <div className="li-wrapper">
            <input type="checkbox" />
            <div>Save this information for faster check-out next time</div>
          </div>
        </div>
        <div className="payment">
          <hr />
          <div className="payment-itemtotal">
            Total:
            <div className="payment-itemtotalprice">${total}</div>
          </div>
          <div className="payment-method">
            <div>
              <input type="radio" name="paymentuser" value="bank" />
            </div>
            <div className="payment-methodname">Bank</div>
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
            <Redbutton
              text="Place Order"
              onClick={() => handlePayment()}
            ></Redbutton>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
}

export default CheckOut;
