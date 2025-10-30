import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, discountPrice }) => {
  const { currency } = useContext(ShopContext);


console.log("💸 Product Discount Price:", discountPrice ?? "❌ Missing");


const finalPrice =
    discountPrice && discountPrice < price ? discountPrice : price;
  return (
    <Link
      className="text-gray-700 cursor-pointer group w-full max-w-xs sm:max-w-sm mx-auto block"
      to={`/product/${id}`}
    >
      {/* Image Container */}
      <div className="overflow-hidden relative rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        {/* First image */}
        <img
          className="w-full h-48 sm:h-64 object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
          src={image[0]}
          alt={`${name} product`}
        />

        {/* Second image (appears on hover) */}
        {image[1] && (
          <img
            className="w-full h-48 sm:h-64 object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
            src={image[1]}
            alt={`${name} hover`}
          />
        )}
      </div>

      {/* Product Info */}
      <div className="pt-3 pb-1 text-center sm:text-left">
        <p className="text-sm sm:text-lg font-semibold truncate px-2">{name}</p>
        <div className="flex justify-center sm:justify-start gap-2 px-2 items-center">
   {discountPrice && discountPrice < price ? (
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
  );
};

export default ProductItem;
