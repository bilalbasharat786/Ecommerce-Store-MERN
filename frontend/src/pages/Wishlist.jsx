import React, { useEffect, useState } from "react";
import axios from "axios";

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist from backend
  const loadWishlist = async () => {
    console.log("📌 Loading wishlist...");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/wishlist/get`,
        {
          headers: { token },
        }
      );

      console.log("📌 Wishlist response: ", response.data);
      if (response.data.success) {
        setItems(response.data.wishlist);
      }
    } catch (err) {
      console.log("❌ Wishlist load error: ", err);
    }
    setLoading(false);
  };

  const removeFromWishlist = async (productId) => {
    console.log("📌 Removing product from wishlist: ", productId);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/wishlist/remove/${productId}`,
        { headers: { token } }
      );

      console.log("📌 Remove response: ", response.data);
      if (response.data.success) {
        setItems(items.filter((item) => item._id !== productId));
      }
    } catch (error) {
      console.log("❌ Remove wishlist error:", error);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  if (loading) {
    return <h2>Loading wishlist...</h2>;
  }

  return (
    <div className="wishlist-page" style={{ padding: "20px" }}>
      <h1>Your Wishlist ❤️</h1>

      {items.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="wishlist-items" style={{ marginTop: "20px" }}>
          {items.map((item) => (
            <div
              key={item._id}
              className="wishlist-card"
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
              </div>

              <button
                onClick={() => removeFromWishlist(item._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                Remove ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
