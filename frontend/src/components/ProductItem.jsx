import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";
import { optimizeImage } from "../utils/imageConfig";
import { assets } from "../assets/frontend_assets/assets";

const ProductItem = ({ id, image, name, price, discountPrice, colors }) => {
  
  // ✅ addToCart bhi context se nikala
  const { currency, wishlist, addToWishlist, addToCart } = useContext(ShopContext);

  const finalPrice = discountPrice && discountPrice < price ? discountPrice : price;

  const discountPercent =
    discountPrice > 0 && discountPrice < price
      ? Math.round(((price - discountPrice) / price) * 100)
      : null;

  return (
    <div className="text-gray-700 cursor-pointer group w-full max-w-xs sm:max-w-sm mx-auto block relative">
      
      {/* ⚠️ NOTE: Purana Heart button yahan se hata diya hai */}

      <Link to={`/product/${id}`}>
        {/* Image Container */}
        <div className="overflow-hidden relative rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          
          {/* ✅ Discount Badge */}
          {discountPercent && (
            <div className="absolute top-2 left-1 bg-black text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-md shadow-md z-10">
              -{discountPercent}%
            </div>
          )}

          {/* 🖼️ First image */}
          <LazyImage
            src={optimizeImage(image[0], 450)}
            w={300}
            h={300}
            className="w-full h-48 sm:h-64 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
            alt={`${name} product`}
          />

          {/* 🖼️ Second image (appears on hover) */}
          {image[1] && (
            <LazyImage
              src={optimizeImage(image[1], 450)}
              w={300}
              h={300}
              className="w-full h-48 sm:h-64 absolute top-0 left-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
              alt={`${name} hover`}
            />
          )}

          {/* ✨ HOVER ACTION BAR (Jo aapne manga hai) */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-20">
            
            {/* 1. ❤️ Wishlist Button */}
            <button
              onClick={(e) => {
                e.preventDefault(); // Link open hone se rokta hai
                addToWishlist(id);
              }}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 hover:scale-110 transition-all"
              title="Add to Wishlist"
            >
              <img
                src={wishlist[id] ? assets.heart_filled : assets.heart_icon}
                alt="wishlist"
                className="w-4"
              />
            </button>


            {/* 3. 👁️ View Button (Optional - Jaisa pic mein hai) */}
            <Link
                to={`/product/${id}`}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 hover:scale-110 transition-all"
                title="View Product"
            >
                 {/* Agar eye icon nahi hai to search icon use karlo ya text */}
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                 </svg>
            </Link>

          </div>
        </div>

        {/* Product Info */}
        <div className="pt-3 pb-1 text-center sm:text-left">
          <p className="text-sm sm:text-lg font-semibold truncate px-2">{name}</p>
          <div className="flex justify-center sm:justify-start gap-2 px-2 items-center">
            {discountPrice > 0 && discountPrice < price ? (
              <>
                <span className="text-red-600 font-bold">{`PKR ${discountPrice}`}</span>
                <span className="line-through text-gray-500 text-lg ml-3">{`PKR ${price}`}</span>
              </>
            ) : (
              <span>{`PKR ${price}`}</span>
            )}
          </div>

        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
