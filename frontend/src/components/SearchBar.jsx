import React, { useContext, useEffect } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = () => {
  const { search, showSearch, setSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Premium UX: Agar user kisi aur page par search type karna shuru kare, 
  // to usko automatically collection page par redirect kar do taake results show hon.
  useEffect(() => {
    if (showSearch && search && !location.pathname.includes("collection")) {
      navigate("/collection");
    }
  }, [search, showSearch, location.pathname, navigate]);

  return (
    <AnimatePresence>
      {showSearch && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full bg-[#FAFAFA] border-b border-gray-100 overflow-hidden shadow-sm z-40 relative"
        >
          <div className="max-w-[800px] mx-auto px-4 py-6 sm:py-8 flex items-center justify-between gap-4 sm:gap-6">
            
            {/* Elegant Search Input Area */}
            <div className="flex-1 flex items-center gap-3 border-b-2 border-gray-200 focus-within:border-[#C5A059] transition-colors duration-500 pb-2 group">
              <img 
                src={assets.search_icon} 
                alt="search" 
                className="w-4 h-4 sm:w-5 sm:h-5 opacity-40 group-focus-within:opacity-100 transition-opacity duration-300" 
              />
              <input
                autoFocus
                className="w-full bg-transparent outline-none px-2 text-sm sm:text-base text-[#121212] placeholder-gray-400 tracking-wide"
                type="text"
                placeholder="Search for premium styles, collections..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Premium Close Button */}
            <button
              onClick={() => {
                setShowSearch(false);
                setSearch(""); // Close karte waqt search text clear kar dena behtar UX hai
              }}
              className="p-2 sm:p-3 hover:bg-gray-200 rounded-full transition-colors duration-300 group"
              title="Close Search"
            >
              <img
                className="w-3 h-3 sm:w-4 sm:h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                src={assets.cross_icon}
                alt="close"
              />
            </button>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
