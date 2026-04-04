import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import LazyImage from "../components/LazyImage";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Framer motion add kiya

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const location = useLocation();

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let filterProductsCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(filterProductsCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(filterProductsCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    if (location.pathname.includes("women")) {
      setCategory(["Women"]);
    } else if (location.pathname.includes("men")) {
      setCategory(["Men"]);
    } else if (location.pathname.includes("kids")) {
      setCategory(["Kids"]);
    } else {
      setCategory([]);
    }
  }, [location.pathname]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // Custom Checkbox Component for Premium Look
  const CustomCheckbox = ({ label, value, onChange, checked }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 border border-gray-300 rounded-sm group-hover:border-[#C5A059] transition-colors duration-300">
        <input
          type="checkbox"
          className="peer hidden"
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <div className="absolute inset-0 bg-[#C5A059] scale-0 peer-checked:scale-100 transition-transform duration-300 origin-center rounded-sm flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <span className="text-gray-600 text-sm sm:text-base group-hover:text-[#121212] transition-colors">{label}</span>
    </label>
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-[#FAFAFA] min-h-screen">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 lg:gap-16">
        
        {/* Sidebar - Filters (Sticky on Desktop) */}
        <div className="min-w-[240px] sm:sticky top-24 h-max">
          
          {/* Mobile Filter Toggle */}
          <div
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center justify-between sm:hidden bg-white px-4 py-3 border border-gray-200 cursor-pointer shadow-sm"
          >
            <p className="text-sm font-semibold tracking-widest uppercase">Filters</p>
            <motion.img
              animate={{ rotate: showFilter ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="h-3 sm:hidden"
              src={assets.dropdown_icon}
              alt="dropdown"
            />
          </div>

          <p className="hidden sm:block text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-6">
            Filter By
          </p>

          <AnimatePresence>
            {(showFilter || window.innerWidth >= 640) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden sm:overflow-visible"
              >
                {/* Categories Filter */}
                <div className="bg-white p-5 sm:p-6 border border-gray-100 shadow-sm mb-5 mt-4 sm:mt-0">
                  <p className="mb-4 text-xs font-bold tracking-widest text-[#121212] uppercase">Categories</p>
                  <div className="flex flex-col gap-3">
                    <CustomCheckbox label="Men" value="Men" onChange={toggleCategory} checked={category.includes("Men")} />
                    <CustomCheckbox label="Women" value="Women" onChange={toggleCategory} checked={category.includes("Women")} />
                    <CustomCheckbox label="Kids" value="Kids" onChange={toggleCategory} checked={category.includes("Kids")} />
                  </div>
                </div>

                {/* SubCategories Filter */}
                <div className="bg-white p-5 sm:p-6 border border-gray-100 shadow-sm">
                  <p className="mb-4 text-xs font-bold tracking-widest text-[#121212] uppercase">Product Type</p>
                  <div className="flex flex-col gap-3">
                    <CustomCheckbox label="Topwear" value="Topwear" onChange={toggleSubCategory} checked={subCategory.includes("Topwear")} />
                    <CustomCheckbox label="Bottomwear" value="Bottomwear" onChange={toggleSubCategory} checked={subCategory.includes("Bottomwear")} />
                    <CustomCheckbox label="Winterwear" value="Winterwear" onChange={toggleSubCategory} checked={subCategory.includes("Winterwear")} />
                    <CustomCheckbox label="Summerwear" value="Summerwear" onChange={toggleSubCategory} checked={subCategory.includes("Summerwear")} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side - Products Grid */}
        <div className="flex-1">
          
          {/* Header & Sort */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 border-b border-gray-200 pb-4">
            <Title 
              text1={category.length === 1 ? category[0].toUpperCase() : "ALL"} 
              text2={"COLLECTIONS"} 
            />

            {/* Premium Minimalist Select */}
            <div className="relative min-w-[180px]">
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="w-full appearance-none bg-transparent border-b border-gray-300 text-gray-600 text-xs sm:text-sm py-2 pr-8 focus:outline-none focus:border-[#C5A059] focus:text-[#121212] transition-colors cursor-pointer"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
              {/* Custom Dropdown Arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Animated Products Grid */}
          {filterProducts.length > 0 ? (
            <motion.div 
              layout 
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 gap-y-8"
            >
              <AnimatePresence>
                {filterProducts.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProductItem
                      id={item._id}
                      name={item.name}
                      price={item.price}
                      discountPrice={item.discountPrice}
                      image={item.image}
                      colors={item.colors}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
              <p className="text-sm text-gray-500">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Collection;
