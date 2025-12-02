import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

const WishlistContextProvider = ({ children, backendUrl, token }) => {
  const [wishlist, setWishlist] = useState([]);

  console.log("🔄 [WishlistContext] Initializing...");

  // ============================
  // ADD TO WISHLIST
  // ============================
  const addToWishlist = async (productId) => {
    console.log("➡️ [addToWishlist] productId:", productId);

    if (!token) {
      toast.error("Please log in first");
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/wishlist/add",
        { productId },
        {headers: { Authorization: `Bearer ${token}` }
  }
      );

      console.log("✅ [addToWishlist] Response:", response.data);

      if (response.status === 201) {
        toast.success("Added to wishlist");
        getWishlist();
      }
    } catch (error) {
      console.log("🔥 [addToWishlist ERROR]", error);
      if (error.response?.status === 409) {
    toast.info("Already in wishlist");
} else {
    toast.error(error.response?.data?.message || "Error adding wishlist");
}

    }
  };

  // ============================
  // GET WISHLIST ITEMS
  // ============================
  const getWishlist = async () => {
    console.log("➡️ [getWishlist] Fetching wishlist...");

    if (!token) return;

    try {
      const response = await axios.get(backendUrl + "/api/wishlist/get", {
  headers: { Authorization: `Bearer ${token}` },
});


      console.log("📦 [getWishlist] Response:", response.data);

      setWishlist(response.data);
    } catch (error) {
      console.log("🔥 [getWishlist ERROR]", error);
    }
  };

  // ============================
  // REMOVE WISHLIST ITEM
  // ============================
  const removeFromWishlist = async (productId) => {
    console.log("➡️ [removeFromWishlist] productId:", productId);

    try {
      const response = await axios.delete(
  backendUrl + "/api/wishlist/remove/" + productId,
  { headers: { Authorization: `Bearer ${token}` } }
);


      console.log("🗑 [removeFromWishlist] Response:", response.data);

      toast.success("Removed from wishlist");
      getWishlist();
    } catch (error) {
      console.log("🔥 [removeFromWishlist ERROR]", error);
      toast.error("Error removing wishlist");
    }
  };

  // Load wishlist when token is available
  useEffect(() => {
    if (token) {
      console.log("🔐 [WishlistContext] Token Detected, Loading wishlist...");
      getWishlist();
    }
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        getWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;
