import React from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useNavigate } from 'react-router-dom';

const PopoverProfile = () => {
    const navigate = useNavigate();
  return (
    <Popover className="relative">
      {/* Trigger Button */}
      <PopoverButton className="h-[50px] w-[50px] bg-fuchsia-800 rounded-[100px]"></PopoverButton>

      {/* Popover Content */}
      <PopoverPanel
        className="absolute z-10 bg-white border border-gray-200 rounded shadow-lg p-4 mt-2"
        style={{ minWidth: "200px", right: 0 }}
      >
        <a className="text-blue-500 hover:underline mt-2 block cursor-pointer">
          View Profile
        </a>
        <a  className="text-blue-500 hover:underline mt-2 block cursor-pointer" onClick={() =>navigate("/wishlist")}>
          My WishList
        </a>
        <a  className="text-blue-500 hover:underline mt-2 block cursor-pointer" onClick= {() =>navigate("/cart")}>
          My Cart
        </a>
        
      </PopoverPanel>
    </Popover>
  );
};

export default PopoverProfile;
