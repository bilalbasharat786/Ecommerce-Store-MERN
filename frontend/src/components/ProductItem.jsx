import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";
import { optimizeImage } from "../utils/imageConfig"; // <-- Ye new line add karo
import { ShopContext } from '../contexts/ShopContext';
import { assets } from "../assets/frontend_assets/assets";


const ProductItem = ({ id, image, name, price, discountPrice, colors }) => {
  const { currency, addToWishlist, getUserWishlist, } = useContext(ShopContext);


console.log("", discountPrice ?? "❌ Missing");


const finalPrice =
    discountPrice && discountPrice < price ? discountPrice : price;

    
  // ✅ Calculate discount percentage (only if discountPrice is valid)
  const discountPercent =
    discountPrice > 0 && discountPrice < price
      ? Math.round(((price - discountPrice) / price) * 100)
      : null;
  return (
    <div
      className="text-gray-700 cursor-pointer group w-full max-w-xs sm:max-w-sm mx-auto block relative"
    >
      {/* ❤️ Wishlist Heart Button (Added Here) */}
      <button 
        onClick={() => addToWishlist(id)}
        className="absolute top-2 right-2 z-20 hover:scale-110 transition-all"
      >
        <img 
          src={wishlist[id] ? assets.heart_filled : assets.heart_icon} 
          alt="wishlist" 
          className="w-5 drop-shadow-md"
        />
      </button>
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

{/* ⭐ Color Options */}
{colors && colors.length > 0 && (
  <div className="flex justify-center sm:justify-start gap-2 px-2 mt-2">
    {colors.map((clr, index) => (
      <span
        key={index}
        style={{ backgroundColor: clr }}
        className="w-4 h-4 rounded-full border border-gray-300"
      ></span>
    ))}
  </div>
)}

        </div>
      </div>
</Link>
    </div>
  );
};

export default ProductItem;
