import Wishlist from "../models/wishlistModel.js";

console.log("📌 [wishlistController] File Loaded");

export const addToWishlist = async (req, res) => {
  console.log("➡️ [addToWishlist] Body:", req.body);
  console.log("➡️ [addToWishlist] User ID:", req.userId);

  try {
    const { productId } = req.body;

    if (!productId) {
      console.log("❌ [addToWishlist] productId missing");
      return res.status(400).json({ message: "productId required" });
    }

    const already = await Wishlist.findOne({
      userId: req.userId,
      productId,
    });

    console.log("🔍 [addToWishlist] Already exists:", already);

    if (already) {
      return res.status(409).json({ message: "Already in wishlist" });
    }

    const created = await Wishlist.create({
      userId: req.userId,
      productId,
    });

    console.log("✅ [addToWishlist] Created Wishlist Item:", created);

    res.status(201).json(created);
  } catch (error) {
    console.log("🔥 [addToWishlist ERROR]", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getWishlist = async (req, res) => {
  console.log("🔥 [getWishlist] START");

  console.log("➡️ req.userId:", req.userId);

  if (!req.userId) {
    console.log("❌ ERROR: req.userId missing");
    return res.status(401).json({ message: "User not authorized" });
  }

  try {
    const list = await Wishlist.find({ userId: req.userId }).populate("productId");

    console.log("📦 Wishlist Found:", list);

    return res.json(list);
  } catch (error) {
    console.log("🔥 [getWishlist ERROR]", error);
    return res.status(500).json({ message: "Server Error", error });
  }
};


export const removeFromWishlist = async (req, res) => {
  console.log("➡️ [removeFromWishlist] Params:", req.params);
  console.log("➡️ [removeFromWishlist] User ID:", req.userId);

  try {
    const { productId } = req.params;

    const removed = await Wishlist.findOneAndDelete({
      userId: req.userId,
      productId,
    });

    console.log("🗑️ [removeFromWishlist] Removed:", removed);

    if (!removed) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Removed successfully" });
  } catch (error) {
    console.log("🔥 [removeFromWishlist ERROR]", error);
    res.status(500).json({ error: "Server error" });
  }
};
