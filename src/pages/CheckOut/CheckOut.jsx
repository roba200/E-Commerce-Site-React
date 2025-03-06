import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import "./CheckOut.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Redbutton from "../../components/RedButton/RedButton";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../constants/Constants";

function CheckOut() {
  const { total, orderId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    state: "",
    city: "",
    country: "",
    phone: "",
    postalcode: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`${BASE_URL}/auth/user/${userId}`);
      const data = await response.json();
      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        streetAddress: data.address.street,
        state: data.address.state,
        city: data.address.city,
        country: data.address.country,
        phone: data.phone,
        postalcode: data.address.postalCode,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const deleteCartUser = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/carts/user/${userId}`, {
        method: "DELETE",
      });
      const data = await response;
      console.log("Cart Deleted", data);
    } catch (error) {
      console.error("Error delete cart", error);
    }
  };

  const setStatusOrder = async (status) => {
    try {
      const response = await fetch(`${BASE_URL}/orders/${orderId}/${status}`, {
        method: "PUT",
      });
      const data = await response;
      console.log("Order status updated:", data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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
    const merchantSecret =
      "MTk5NDI0MDY0OTI5NDk4Njk4ODk0MjMwNzQwNjA4NzE4MDc5MDU=";
    const formattedAmount = Number(orderDetails.amount).toFixed(2);
    const md5Secret = CryptoJS.MD5(merchantSecret).toString().toUpperCase();

    const message =
      orderDetails.merchant_id +
      orderDetails.order_id +
      formattedAmount +
      orderDetails.currency +
      md5Secret;

    return CryptoJS.MD5(message).toString().toUpperCase();
  };

  const handlePayment = async () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "streetAddress",
      "state",
      "city",
      "country",
      "phone",
      "postalcode",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error("All fields are required!", {
          position: "top-right",
        });
        return;
      }
    }

    const orderDetails = {
      merchant_id: "1221874",
      order_id: orderId,
      amount: total,
      currency: "LKR",
    };

    const payment = {
      sandbox: true,
      merchant_id: orderDetails.merchant_id,
      return_url: "http://sample.com/return",
      cancel_url: "http://sample.com/cancel",
      notify_url: "http://sample.com/notify",
      order_id: orderDetails.order_id,
      items: orderDetails.order_id,
      amount: orderDetails.amount,
      currency: orderDetails.currency,
      hash: generateHash(orderDetails),
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.streetAddress + " " + formData.apartment,
      city: formData.city,
      country: formData.country,
      delivery_address: formData.streetAddress + " " + formData.apartment,
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
      navigate("/");

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
          <input
            type="text"
            name="firstName"
            id="Fname"
            required
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <span>Last Name</span>
          <input
            type="text"
            name="lastName"
            id="cname"
            required
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <span>Email</span>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
          <span>Street Address</span>
          <input
            type="text"
            name="streetAddress"
            id="saddress"
            required
            value={formData.streetAddress}
            onChange={handleInputChange}
          />
          <span>Town/City</span>
          <input
            type="text"
            name="city"
            id="town"
            required
            value={formData.city}
            onChange={handleInputChange}
          />
          <span>State</span>
          <input
            type="text"
            name="state"
            id="tstate"
            required
            value={formData.state}
            onChange={handleInputChange}
          />
          <span>Country</span>
          <input
            type="text"
            name="country"
            id="tcountryown"
            required
            value={formData.country}
            onChange={handleInputChange}
          />
          <span>Postal Code</span>
          <input
            type="text"
            name="postalcode"
            id="postalcode"
            required
            value={formData.postalcode}
            onChange={handleInputChange}
          />
          <span>Phone Number</span>
          <input
            type="text"
            name="phone"
            id="pn"
            required
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="payment">
          <hr />
          <div className="payment-itemtotal">
            Total:
            <div className="payment-itemtotalprice">${total}</div>
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
