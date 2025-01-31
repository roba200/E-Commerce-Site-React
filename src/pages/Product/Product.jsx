import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/Constants";

function Product() {

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${productId}`);
    } catch (error) {    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await fetch(`${BASE_URL}/carts/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          productId,
          quantity,
        }),
      });
    } catch (error) {
      // ...existing code...
    }
  };

  return (
    <>
    </>
  );
}

export default Product;
