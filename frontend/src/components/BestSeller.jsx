import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    // ES6 Optional chaining & Safe filtering
    if (products?.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]);

  return (
    <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-white via-[#FCFBF8] to-white border-y border-[#C5A059]/20 overflow-hidden">
      
      {/* Decorative Background Elements (Optional Luxury Touch) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Premium Header Section */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <span className="text-[#C5A059] text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Top Trending
          </span>
          <Title text1={"BEST"} text2={"SELLERS"} />
          
          {/* Elegant Divider */}
          <div className="w-16 sm:w-24 h-[2px] bg-[#C5A059] my-4 sm:my-6 rounded-full shadow-[0_0_10px_rgba(197,160,89,0.5)]"></div>
          
          <p className="max-w-2xl text-xs sm:text-sm md:text-base text-gray-500 tracking-widest leading-relaxed uppercase">
            Discover our most popular picks — loved by customers for their style, comfort, and unbeatable quality.
          </p>
        </div>

        {/* Product Grid with VIP Hover Glow */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {bestSeller.map((item) => (
            <div key={item._id} className="relative group">
              
              {/* Premium Background Glow (Visible only on hover) */}
              <div className="absolute inset-0 bg-[#C5A059]/10 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10"></div>
              
              <ProductItem
                id={item._id} // Fixed: MongoDB id is usually _id
                image={item.image}
                name={item.name}
                price={item.price}
                discountPrice={item.discountPrice}
                colors={item.colors}
              />
            </div>
          ))}
        </div>

        {/* Explore All Button */}
        <div className="mt-16 sm:mt-20 flex justify-center">
          <button className="group relative px-8 py-3 bg-[#121212] overflow-hidden text-xs sm:text-sm font-semibold tracking-widest uppercase border border-[#121212] text-white transition-all duration-300 shadow-xl hover:shadow-[#C5A059]/20">
            <span className="absolute inset-0 bg-[#C5A059] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
            <span className="relative z-10 transition-colors duration-300">
              Shop All Bestsellers
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default BestSeller;
