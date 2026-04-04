import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";
import { optimizeImage } from "../utils/imageConfig";
import { assets } from "../assets/frontend_assets/assets";

const ProductItem = ({ id, image, name, price, discountPrice, colors }) => {
  const { wishlist, addToWishlist } = useContext(ShopContext);

  const discountPercent =
    discountPrice > 0 && discountPrice < price
      ? Math.round(((price - discountPrice) / price) * 100)
      : null;

  // ES6 checks to prevent crashes if image is undefined or empty
  const primaryImage = image?.[0] ? optimizeImage(image[0], 450) : "";
  const hoverImage = image?.[1] ? optimizeImage(image[1], 450) : null;

  return (
    <div className="group block relative w-full max-w-xs sm:max-w-sm mx-auto cursor-pointer animate-fade-in">
      
      {/* Image Container with Premium Hover Effects */}
      <div className="relative overflow-hidden bg-white mb-4 aspect-[3/4] shadow-sm transition-shadow duration-300 group-hover:shadow-md">
        
        {/* Luxury Sale Badge */}
        {discountPercent && (
          <div className="absolute top-3 left-3 z-20 bg-[#121212] text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 tracking-widest uppercase shadow-sm">
            -{discountPercent}%
          </div>
        )}

        <Link to={`/product/${id}`} className="block w-full h-full">
          {/* Primary Image */}
          {primaryImage && (
            <LazyImage
              src={primaryImage}
              w={300}
              h={400}
              className="w-full h-full object-cover object-top transition-all duration-1000 ease-in-out group-hover:scale-105 group-hover:opacity-0"
              alt={`${name} product`}
            />
          )}

          {/* Secondary Image (Hover Swap) */}
          {hoverImage && (
            <LazyImage
              src={hoverImage}
              w={300}
              h={400}
              className="w-full h-full object-cover object-top absolute top-0 left-0 opacity-0 transition-all duration-1000 ease-in-out group-hover:scale-105 group-hover:opacity-100"
              alt={`${name} hover`}
            />
          )}
        </Link>

        {/* Quick Actions Overlay (Slides up on Hover) */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:translate-y-0 z-20 pointer-events-none">
          
          <button
            onClick={(e) => {
              e.preventDefault();
              addToWishlist(id);
            }}
            className="pointer-events-auto w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-[#C5A059] border border-gray-100 hover:border-[#C5A059] transition-all duration-300 shadow-lg hover:-translate-y-1"
            title="Add to Wishlist"
          >
            <img
              src={wishlist?.[id] ? assets.heart_filled : assets.heart_icon}
              alt="wishlist"
              className={`w-4 h-4 transition-all duration-300 ${wishlist?.[id] ? 'brightness-0 invert-0' : ''}`}
            />
          </button>

          <Link
            to={`/product/${id}`}
            className="pointer-events-auto w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-[#C5A059] hover:text-white border border-gray-100 hover:border-[#C5A059] transition-all duration-300 shadow-lg hover:-translate-y-1"
            title="View Product"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col items-center text-center px-2 pb-2">
        <Link to={`/product/${id}`} className="w-full">
          <h3 className="text-sm sm:text-base text-gray-800 font-medium truncate w-full mb-1.5 transition-colors duration-300 group-hover:text-[#C5A059]">
            {name}
          </h3>
        </Link>

        <div className="flex justify-center items-center gap-3">
          {discountPrice > 0 && discountPrice < price ? (
            <>
              <span className="text-[#C5A059] font-bold text-sm sm:text-base">{`PKR ${discountPrice}`}</span>
              <span className="text-gray-400 line-through text-[10px] sm:text-xs">{`PKR ${price}`}</span>
            </>
          ) : (
            <span className="text-[#121212] font-semibold text-sm sm:text-base">{`PKR ${price}`}</span>
          )}
        </div>

        {/* Dynamic Color Dots */}
        {colors?.length > 0 && (
          <div className="flex gap-1.5 mt-2.5 justify-center">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full border border-gray-300 shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
