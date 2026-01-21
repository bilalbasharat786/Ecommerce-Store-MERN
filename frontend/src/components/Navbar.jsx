import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import LazyImage from "./LazyImage";



const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = async () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-3 sm:py-5 px-3 sm:px-0 font-medium text-xs sm:text-sm md:text-base  min-h-[60px]">
      {/* Logo */}
      <Link to="/">
       <img src={assets.logo} alt="forever_logo" className="w-24 sm:w-36 md:w-40" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-3 md:gap-5 text-[10px] sm:text-sm md:text-base text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-0.5 sm:gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/collection"
          className="flex flex-col items-center gap-0.5 sm:gap-1"
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        {/* <NavLink to="/about" className="flex flex-col items-center gap-0.5 sm:gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink> */}
        <NavLink
          to="/contact"
          className="flex flex-col items-center gap-0.5 sm:gap-1"
        >
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      {/* Right Section (Icons) */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Search */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-4 sm:w-5 cursor-pointer"
          alt="search_icon"
        />

        {/* Profile */}
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-4 sm:w-5 cursor-pointer"
            alt="profile_icon"
          />

          {/* Dropdown menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-2 sm:pt-4 z-50">
              <div className="flex flex-col gap-2 w-28 sm:w-36 py-2 sm:py-3 px-3 sm:px-5 bg-slate-100 text-gray-500 rounded text-[10px] sm:text-sm">
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
{/* Wishlist */}


        {/* Cart */}
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-4 sm:w-5 min-w-4 sm:min-w-5"
            alt="cart_icon"
          />
          <p className="absolute right-[-4px] bottom-[-4px] w-3 sm:w-4 text-center leading-3 sm:leading-4 bg-black text-white aspect-square rounded-full text-[7px] sm:text-[8px]">
            {getCartCount()}
          </p>
        </Link>


        {/* Menu Icon (Mobile) */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-4 sm:w-5 cursor-pointer sm:hidden"
          alt="menu_icon"
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden z-50 bg-white transition-all duration-500 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 text-sm sm:text-base">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-3 sm:gap-4 p-3 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              className="h-3 sm:h-4 rotate-180"
              alt="dropdown_icon"
            />
            <p className="text-xs sm:text-sm">Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-4 sm:pl-6 border text-xs sm:text-sm"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-4 sm:pl-6 border text-xs sm:text-sm"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          {/* <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-4 sm:pl-6 border text-xs sm:text-sm"
            to="/about"
          >
            ABOUT
          </NavLink> */}
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-4 sm:pl-6 border text-xs sm:text-sm"
            to="/contact"
          >
            CONTACT
          </NavLink>
          

        </div>
      </div>
    </div>
  );
};

export default Navbar;
