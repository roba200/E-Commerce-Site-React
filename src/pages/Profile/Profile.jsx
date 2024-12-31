import React, { useState, useEffect } from "react";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userId: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
  });

  const showErrorMessage = (error) => {
    toast.error(error, {
      position: "top-right",
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `https://e-commerce-site-spring-boot-production.up.railway.app/api/auth/user/${localStorage.getItem("userId")}`
      );
      const data = await response.json();
      setUserData(data);
      console.log(data);
    } catch (error) {
      showErrorMessage(error);
    }
  };

  const formatAddress = (address) => {
    if (!address) {
      return "No address provided";
    }

    const parts = [
      address.street,
      address.city,
      address.state,
      address.country,
      address.postalCode,
    ].filter((part) => part);

    return parts.length > 0 ? parts.join(", ") : "No address provided";
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Profile Information Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-[#DB4444]/10 flex items-center justify-center">
                  <FaUser className="h-10 w-10 text-[#DB4444]" />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-gray-800">
                    {userData.firstName} {userData.lastName}
                  </h2>
                  <p className="text-gray-600">User ID: {userId}</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center p-3 border-b">
                  <FaUser className="w-5 h-5 text-[#DB4444] mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="text-gray-800">
                      {userData.firstName} {userData.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-3 border-b">
                  <FaEnvelope className="w-5 h-5 text-[#DB4444] mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="text-gray-800">{userData.email}</p>
                  </div>
                </div>

                <div className="flex items-center p-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-[#DB4444] mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="text-gray-800">
                      {formatAddress(userData.address)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Account Actions
              </h2>
              <div className="flex flex-wrap gap-4">
                <button
                  className="px-6 py-2 bg-[#DB4444] text-white rounded-md hover:bg-[#DB4444]/80 transition-colors"
                  onClick={() => navigate("/account")}
                >
                  Edit Profile
                </button>
                <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Profile;
