import mongoose from "mongoose";

console.log("📌 [wishlistModel] Loading Wishlist Schema...");

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

console.log("✅ [wishlistModel] Wishlist Model Loaded Successfully");

export default Wishlist;
