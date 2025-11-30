import express from "express";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlistController.js";
import auth from "../middlewares/auth.js";

console.log("📌 [wishlistRoute] Wishlist Routes Loaded");

const router = express.Router();

router.post("/add", auth, addToWishlist);
router.get("/get", auth, getWishlist);
router.delete("/remove/:productId", auth, removeFromWishlist);

export default router;
