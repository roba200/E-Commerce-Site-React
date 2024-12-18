import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RedButton from "../../components/RedButton/RedButton";

function Account() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: ""
    }
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId"); // You might want to get this from context/auth state
        const response = await fetch(`http://localhost:8080/api/auth/user/${userId}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const userId = localStorage.getItem("userId");
      
      // Verify current password if trying to change password
      if (passwords.newPassword) {
        if (passwords.newPassword !== passwords.confirmPassword) {
          alert("New passwords don't match!");
          return;
        }

        // Verify current password
        const verifyResponse = await fetch(`http://localhost:8080/api/auth/verify-password/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: passwords.currentPassword })
        });

        if (!verifyResponse.ok) {
          alert('Current password is incorrect!');
          return;
        }
      }

      let updateData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
        address: userData.address
      };

      // Add new password to update data if being changed
      if (passwords.newPassword) {
        updateData.passwordHash = passwords.newPassword;
      }

      const response = await fetch(`http://localhost:8080/api/auth/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        alert('Profile updated successfully!');
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-140px)] bg-gray-50 px-5 py-10">
        <div className="mx-auto max-w-[900px] bg-white rounded-xl shadow-sm p-10">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-gray-900 mb-10">Edit Your Profile</h2>
            
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 pb-3 border-b border-gray-100">
                Personal Information
              </h3>
              <div className="flex gap-10 mb-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="Fname"
                    value={userData.firstName}
                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                    className="w-full h-[45px] px-6 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lname"
                    value={userData.lastName}
                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                    className="w-full h-[45px] px-6 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 pb-3 border-b border-gray-100">
                Contact Information
              </h3>
              <div className="flex gap-10 mb-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="w-full h-[45px] px-6 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                
              </div>

              <h3 className="text-lg font-semibold text-gray-700 mb-6 pb-3 border-b border-gray-100">
                Address Information
              </h3>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  value={userData.address.street}
                  onChange={(e) => setUserData({
                    ...userData,
                    address: { ...userData.address, street: e.target.value }
                  })}
                  className="w-full h-[45px] px-6 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="Enter street address"
                />
              </div>
              
              <div className="flex gap-10 mb-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={userData.address.city}
                    onChange={(e) => setUserData({
                      ...userData,
                      address: { ...userData.address, city: e.target.value }
                    })}
                    className="w-full h-[45px] px-6 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Enter city"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={userData.address.state}
                    onChange={(e) => setUserData({
                      ...userData,
                      address: { ...userData.address, state: e.target.value }
                    })}
                    className="w-full h-[45px] px-6 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Enter state"
                  />
                </div>
              </div>

              <div className="flex gap-10 mb-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={userData.address.country}
                    onChange={(e) => setUserData({
                      ...userData,
                      address: { ...userData.address, country: e.target.value }
                    })}
                    className="w-full h-[45px] px-6 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Enter country"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={userData.address.postalCode}
                    onChange={(e) => setUserData({
                      ...userData,
                      address: { ...userData.address, postalCode: e.target.value }
                    })}
                    className="w-full h-[45px] px-6 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Enter postal code"
                  />
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 pb-3 border-b border-gray-100">
                Change Password
              </h3>
              <div className="max-w-[500px]">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords({
                      ...passwords,
                      currentPassword: e.target.value
                    })}
                    className="w-full h-[45px] px-6 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({
                      ...passwords,
                      newPassword: e.target.value
                    })}
                    className="w-full h-[45px] px-6 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({
                      ...passwords,
                      confirmPassword: e.target.value
                    })}
                    className="w-full h-[45px] px-6 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-5 border-t border-gray-100">
              <button type="button" className="px-6 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <RedButton text="Save Changes" type="submit" />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Account;
