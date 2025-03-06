import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { BASE_URL } from "../../constants/Constants";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const API_BASE_URL = BASE_URL;

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`);
      const data = await response.json();
      setOrder(data);
      fetchProductDetails(data.productIds);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const fetchProductDetails = async (productIds) => {
    try {
      const productDetails = await Promise.all(
        productIds.map(async (productId) => {
          const response = await fetch(`${API_BASE_URL}/products/${productId}`);
          return response.json();
        })
      );
      setProducts(productDetails);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="px-[135px] py-5">
        <div className="text-sm breadcrumbs">
          <a href="/" className="hover:text-red-500">Home</a>
          <span className="mx-2">/</span>
          <a href="/orders" className="hover:text-red-500">My Orders</a>
          <span className="mx-2">/</span>
          <span>Order #{order.id}</span>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 lg:px-[135px] py-8">
        <h1 className="text-2xl font-medium mb-8">Order Details</h1>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="space-y-1">
              <h3 className="font-medium">Order #{order.id}</h3>
              <p className="text-sm text-gray-600">
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-2 md:mt-0">
              <span className={`px-4 py-1 rounded-full text-sm font-medium
                ${order.status === 'PENDING' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-green-100 text-green-800'}`}>
                {order.status}
              </span>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-medium">${order.totalPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Items:</span>
              <span className="font-medium">{Object.values(order.productQuantities).reduce((sum, quantity) => sum + quantity, 0)} items</span>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <h2 className="text-xl font-medium mb-4">Order Items</h2>
            {products.map((product) => (
              <div key={product.id} className="flex items-center space-x-4">
                <img src={product.imageUrl1} alt={product.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-600">${product.discountedPrice ?? product.price}</p>
                  <p className="text-sm text-gray-600">Quantity: {order.productQuantities[product.id]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default OrderDetails;
