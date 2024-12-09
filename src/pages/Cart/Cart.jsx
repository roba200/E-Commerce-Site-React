import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Cart.css";
import WhiteButton from "../../components/WhiteButton/WhiteButton";
import Redbutton from "../../components/RedButton/Redbutton";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [productQuantities, setProductQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/carts/user/${localStorage.getItem("userId")}`
      );
      const data = await response.json();
      console.log("Cart data:", data);
      setProductQuantities(data.productQuantities);
      fetchProducts(data.productIds);
      setTotal(data.totalPrice);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const fetchProducts = async (productIds) => {
    try {
      const products = [];
      for (const id of productIds) {
        const response = await fetch(
          `http://localhost:8080/api/products/${id}`
        );
        const product = await response.json();
        products.push(product);
      }
      console.log("Fetched products with quantities:", products);
      setCartItems(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/carts/update/${localStorage.getItem(
          "userId"
        )}/${productId}/${newQuantity}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        setProductQuantities((prev) => ({
          ...prev,
          [productId]: newQuantity,
        }));

        fetchCartItems();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const deleteCartItem = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/carts/remove/${localStorage.getItem("userId")}/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchCartItems();
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const orderData = {
        userId: localStorage.getItem("userId"),
        productIds: cartItems.map(item => item.id),
        productQuantities: productQuantities,
        totalPrice: total,
        orderDate: new Date().toISOString(),
        status: "pending"
      };

      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const responseText = await response.text();
        console.log('Order created successfully:', responseText);
        navigate(`/checkout/${total}/${responseText}`);
      } else {
        console.error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="Roadmap">Home / Cart</div>
      <div className="cart-container">
        <div className="cartMain">
          <div className="cartMain_row">
            <div>
              <p>Product</p>
            </div>
            <div>
              <p>Price</p>
            </div>
            <div>
              <p>Quantity</p>
            </div>
            <div>
              <p>Subtotal</p>
            </div>
          </div>
          {cartItems.map((item) => (
            <div className="cartMain_row" key={item._id}>
              <div className="product">
                <img
                  src={item.imageUrl1}
                  alt={item.name}
                  height={100}
                  width={100}
                />
                {item.name}
              </div>
              <div className="price">${item.price}</div>
              <div className="quantity">
                <input
                  type="number"
                  value={productQuantities[item.id]}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  min="1"
                />
              </div>
              <div className="subtotal">
                ${item.price * productQuantities[item.id]}
                <button 
                  className="delete-button"
                  onClick={() => deleteCartItem(item.id)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="item-button">
          <div className="item-button-return">
            <WhiteButton text="Return To Shop"></WhiteButton>
          </div>
          <div className="item-button-update">
            <WhiteButton text="Update Cart"></WhiteButton>
          </div>
        </div>
        <div className="cartMain_row"></div>
        <div className="coupon-container">
          <div className="coupon">
            <div className="coupon-box">
              <input type="text" placeholder="Coupon Code"></input>
            </div>
            <div className="coupon-button">
              <Redbutton text="Add Coupon"></Redbutton>
            </div>
          </div>
          <div className="toCheckout">
            <p>Cart Total</p>
            <div className="toCheckout-name">
              Subtotal:
              <div className="toCheckout-price">${total}</div>
            </div>
            <hr />
            <div className="toCheckout-name">
              Shipping:
              <div className="toCheckout-price">Free</div>
            </div>
            <hr />
            <div className="toCheckout-name">
              Total:
              <div className="toCheckout-price">${total}</div>
            </div>
            <div className="checkout-process">
              <Redbutton text="Process to checkout" onClick={handleCheckout}></Redbutton>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
