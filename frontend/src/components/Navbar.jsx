import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
import LazyImage from "./LazyImage";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation(); // Active route check karne ke liye
  
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
    wishlist,
    addToWishlist,
  } = useContext(ShopContext);

  const logout = async () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  // NavLinks ka array taake code clean rahay
  const navItems = [
    { name: "HOME", path: "/" },
    { name: "MEN", path: "/men" },
    { name: "WOMEN", path: "/women" },
    { name: "KIDS", path: "/kids" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <div className="flex items-center justify-between py-4 sm:py-6 px-4 sm:px-8 md:px-12 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      
      {/* Logo */}
      <Link to="/">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={assets.logo} 
          alt="Jamal Collection Logo" 
          className="w-28 sm:w-36 md:w-44 object-contain" 
        />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-6 md:gap-8 lg:gap-10">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink 
              key={item.name} 
              to={item.path} 
              className="relative flex flex-col items-center group"
            >
              <p className={`text-xs md:text-sm font-semibold tracking-widest uppercase transition-colors duration-300 ${isActive ? "text-[#C5A059]" : "text-gray-800 group-hover:text-[#C5A059]"}`}>
                {item.name}
              </p>
              {/* Animated Underline */}
              {isActive && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute -bottom-2 w-full h-[2px] bg-[#C5A059]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Search Icon */}
        <motion.img
          whileHover={{ scale: 1.1 }}
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 sm:w-6 cursor-pointer"
          alt="search"
        />

        {/* Profile / Dropdown */}
        <div className="group relative">
          <motion.img
            whileHover={{ scale: 1.1 }}
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 sm:w-6 cursor-pointer"
            alt="profile"
          />
          {token && (
            <div className="absolute right-0 pt-4 z-50 hidden group-hover:block transition-all duration-300 opacity-0 group-hover:opacity-100 transform origin-top-right scale-95 group-hover:scale-100">
              <div className="flex flex-col gap-1 w-36 py-3 px-4 bg-white border border-gray-100 shadow-xl rounded-md text-sm">
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer text-gray-600 hover:text-[#C5A059] transition-colors py-1 border-b border-gray-50"
                >
                  My Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer text-gray-600 hover:text-red-500 transition-colors py-1"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Wishlist Icon */}
        <Link to='/wishlist' className='relative'>
          <motion.img whileHover={{ scale: 1.1 }} src={assets.heart_icon} className='w-5 sm:w-6' alt="wishlist" />
          <span className='absolute right-[-6px] top-[-6px] w-[18px] text-center leading-[18px] bg-[#C5A059] text-white aspect-square rounded-full text-[9px] font-bold shadow-md'>
            {Object.keys(wishlist).length}
          </span>
        </Link>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <motion.img whileHover={{ scale: 1.1 }} src={assets.cart_icon} className="w-5 sm:w-6" alt="cart" />
          <span className="absolute right-[-6px] top-[-6px] w-[18px] text-center leading-[18px] bg-[#C5A059] text-white aspect-square rounded-full text-[9px] font-bold shadow-md">
            {getCartCount()}
          </span>
        </Link>

        {/* Mobile Menu Toggle Icon */}
        <motion.img
          whileTap={{ scale: 0.9 }}
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 sm:w-6 cursor-pointer sm:hidden ml-2"
          alt="menu"
        />
      </div>

      {/* Mobile Menu Drawer (Animated with AnimatePresence) */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <img src={assets.logo} alt="logo" className="w-24" />
              <div
                onClick={() => setVisible(false)}
                className="flex items-center justify-center p-2 cursor-pointer bg-gray-50 rounded-full hover:bg-gray-100"
              >
                <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="close" />
              </div>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex flex-col text-gray-800 mt-4 px-4 gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  onClick={() => setVisible(false)}
                  to={item.path}
                  className={({ isActive }) => `py-4 px-4 rounded-lg font-semibold tracking-widest text-sm uppercase transition-all ${isActive ? "bg-gray-50 text-[#C5A059] border-l-4 border-[#C5A059]" : "hover:bg-gray-50 hover:text-[#C5A059]"}`}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
