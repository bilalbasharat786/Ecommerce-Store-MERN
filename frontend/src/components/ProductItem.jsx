import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
 <Link className="text-gray-700 cursor-pointer group" to={`/product/${id}`}>
  <div className="overflow-hidden relative">
    {/* First image */}
    <img
      className="w-full transition-opacity duration-500 ease-in-out group-hover:opacity-0"
      src={image[0]}
      alt="product_image"
    />
    {/* Second image (appears on hover) */}
    {image[1] && (
      <img
        className="w-full absolute top-0 left-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
        src={image[1]}
        alt="product_image_hover"
      />
    )}
  </div>
  <p className="pt-3 pb-1 text-sm">{name}</p>
  <p className="text-sm font-medium">
    {currency}
    {price}
  </p>
</Link>

  );
};

export default ProductItem;
