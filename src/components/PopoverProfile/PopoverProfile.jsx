import React from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const PopoverProfile = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Add logout logic here
        localStorage.removeItem("userId");
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <Popover className="relative">
            <PopoverButton className="h-[50px] w-[50px] bg-red-600 rounded-[100px] flex items-center justify-center">
                <UserCircleIcon className="h-8 w-8 text-white" />
            </PopoverButton>

            <PopoverPanel
                className="absolute z-10 bg-white border border-gray-200 rounded shadow-lg p-4 mt-2"
                style={{ minWidth: "200px", right: 0 }}
            >
                <a onClick={() => navigate("/profile")} className="text-blue-500 hover:underline mt-2 block cursor-pointer">
                    View Profile
                </a>
                <a  className="text-blue-500 hover:underline mt-2 block cursor-pointer" onClick={() =>navigate("/wishlist")}>
                    My WishList
                </a>
                <a  className="text-blue-500 hover:underline mt-2 block cursor-pointer" onClick= {() =>navigate("/cart")}>
                    My Cart
                </a>
                <a  className="text-blue-500 hover:underline mt-2 block cursor-pointer" onClick= {() =>navigate("/order")}>
                    My Orders
                </a>
                <div className="border-t border-gray-200 mt-2 pt-2">
                    <a onClick={handleLogout} className="text-red-500 hover:underline block cursor-pointer">
                        Logout
                    </a>
                </div>
            </PopoverPanel>
        </Popover>
    );
};

export default PopoverProfile;
