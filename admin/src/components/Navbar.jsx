import React from "react";
import { assets } from "../assets/admin_assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-center md:justify-between px-4 sm:px-8 py-3 bg-white shadow-md sticky top-0 z-40">
      {/* Logo */}
      <img
        className="w-20 sm:w-28 md:w-32 object-contain"
        src={assets.logo}
        alt="logo"
      />

      {/* Logout Button */}
      <button
        onClick={() => setToken("")}
        className=" bg-gray-700 text-white text-xs sm:text-sm md:text-base px-4 sm:px-6 py-2 rounded-full border border-transparent hover:bg-white hover:text-black hover:border-black transition-all duration-500"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;


