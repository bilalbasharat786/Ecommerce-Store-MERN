import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";
import { FaTrash, FaCartPlus } from "react-icons/fa";
import { backendUrl } from "../contexts/ShopContext";


const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(ShopContext);

  // 🟦 Fetch Wishlist from Backend
  const fetchWishlist = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/wishlist`, {
        credentials: "include",
      });

      const data = await response.json();
      setWishlist(data.wishlist || []);
      setLoading(false);
    } catch (err) {
      console.log("Wishlist fetch error:", err);
      setLoading(false);
    }
  };

  // 🟥 Remove Item
  const removeItem = async (productId) => {
    try {
      const response = await fetch(
        `${backendUrl}/api/wishlist/remove/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
      }
    } catch (err) {
      console.log("Remove error:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // 🟡 Loading Screen
  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500 text-xl">
        Loading your wishlist...
      </div>
    );
  }

  // 🔴 Empty Wishlist
  if (wishlist.length === 0) {
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
            key={item.id}
            className="bg-white shadow-md rounded-xl overflow-hidden group hover:shadow-lg transition-all"
          >
            {/* Product Image */}
            <Link to={`/product/${item.id}`}>
              <img
                src={item.image?.[0]}
                alt={item.title}
                className="w-full h-44 object-cover group-hover:scale-105 transition"
              />
            </Link>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="text-sm sm:text-lg font-semibold truncate">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-1">
                PKR <span className="font-bold">{item.price}</span>
              </p>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-4">
                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(item.id)}
                  className="flex items-center gap-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-900 transition text-sm"
                >
                  <FaCartPlus /> Add
                </button>

                {/* Delete */}
                <button
                  onClick={() => removeItem(item.id)}
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
