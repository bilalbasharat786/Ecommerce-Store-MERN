import React, { useContext } from "react";
import { WishlistContext } from "../contexts/WishlistContext";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";
import { FaTrash, FaCartPlus } from "react-icons/fa";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(ShopContext);

  // 🔴 Empty Wishlist
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center gap-4">
        <img
          src="/empty-wishlist.svg"
          className="w-40 opacity-70"
          alt="Empty"
        />
        <p className="text-gray-700 text-lg font-medium">
          Your Wishlist is Empty
        </p>
        <Link
          to="/shop"
          className="px-5 py-3 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Your Wishlist ❤️
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.product._id}
            className="bg-white shadow-md rounded-xl overflow-hidden group hover:shadow-lg transition-all"
          >
            {/* Product Image */}
            <Link to={`/product/${item.product._id}`}>
              <img
                src={item.product.image[0]}
                alt={item.product.title}
                className="w-full h-44 object-cover group-hover:scale-105 transition"
              />
            </Link>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="text-sm sm:text-lg font-semibold truncate">
                {item.product.title}
              </h3>

              <p className="text-gray-600 mt-1">
                PKR <span className="font-bold">{item.product.price}</span>
              </p>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-4">
                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(item.product._id)}
                  className="flex items-center gap-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-900 transition text-sm"
                >
                  <FaCartPlus /> Add
                </button>

                {/* Delete */}
                <button
                  onClick={() => removeFromWishlist(item.product._id)}
                  className="text-red-600 hover:text-red-800 text-xl"
                  title="Remove"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;


