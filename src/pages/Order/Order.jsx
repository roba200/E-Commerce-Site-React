import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Order() {
  const [orders, setOrders] = useState([]);
  const API_BASE_URL = "http://localhost:8080/api";

  

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`);
      const data = await response.json();
      // If no orders from API, use dummy orders
      setOrders( data );
    } catch (error) {
      console.error("Error fetching orders:", error);
      
    }
  };

  // Calculate total items in order
  const getTotalItems = (quantities) => {
    return Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="px-[135px] py-5">
        <div className="text-sm breadcrumbs">
          <a href="/" className="hover:text-red-500">Home</a>
          <span className="mx-2">/</span>
          <span>My Orders</span>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 lg:px-[135px] py-8">
        <h1 className="text-2xl font-medium mb-8">My Orders</h1>
        
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg p-6 shadow-md">
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
                  <span className="font-medium">{getTotalItems(order.productQuantities)} items</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Order;