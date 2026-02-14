import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import LazyImage from "../components/LazyImage";
// 👇 1. useLocation import kiya
import { useLocation } from "react-router-dom"; 

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  
  // 👇 2. Location hook
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

  // 👇 3. URL check karne ke liye naya useEffect
// 👇 URL check karne ke liye naya useEffect (UPDATED)
  useEffect(() => {
    
    // ⚠️ PEHLE WOMEN CHECK KARO (Kyunki 'women' mein bhi 'men' aata hai)
    if (location.pathname.includes("women")) {
        setCategory(["Women"]);
    } 
    // Phir Men check karo
    else if (location.pathname.includes("men")) {
        setCategory(["Men"]);
    } 
    else if (location.pathname.includes("kids")) {
        setCategory(["Kids"]);
    } 
    else {
        setCategory([]); 
    }
    
  }, [location.pathname]); // URL change hone par ye chalega

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <LazyImage
            w={20} h={20}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="dropdown_icon"
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {/* 👇 Checkbox ko 'checked' prop diya taake wo auto-tick ho jaye */}
            <p className="flex gap-2">
              <input
                className="w-3 accent-black"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
                checked={category.includes("Men")} 
              />{" "}
              Men
            </p>
            <p className="flex gap-2 accent-black">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
                checked={category.includes("Women")}
              />{" "}
              Women
            </p>
            <p className="flex gap-2 accent-black">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
                checked={category.includes("Kids")}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        
        {/* Sub-Category Filter (Ye same rahega) */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 sm:block ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
             {/* Sub categories code same... */}
            <p className="flex gap-2">
              <input onChange={toggleSubCategory} className="w-3" type="checkbox" value={"Topwear"} /> Topwear
            </p>
            <p className="flex gap-2">
              <input onChange={toggleSubCategory} className="w-3" type="checkbox" value={"Bottomwear"} /> Bottomwear
            </p>
            <p className="flex gap-2">
              <input onChange={toggleSubCategory} className="w-3" type="checkbox" value={"Winterwear"} /> Winterwear
            </p>
             <p className="flex gap-2">
              <input onChange={toggleSubCategory} className="w-3" type="checkbox" value={"Summerwear"} /> Summerwear
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm sm:text-lg md:text-xl lg:text-2xl gap-2 sm:gap-0 mb-4 px-2">
          {/* 👇 Title Dynamically Change hoga */}
          <Title text1={category.length === 1 ? category[0].toUpperCase() : "ALL"} text2={"COLLECTIONS"} />
          
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-xs sm:text-sm md:text-base px-2 py-1 rounded-md"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Mapping Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              discountPrice={item.discountPrice}
              image={item.image}
              colors={item.colors} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
