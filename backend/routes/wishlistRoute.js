// backend/routes/wishlistRoute.js
import express from "express";
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/wishlistController.js";
import { verifyUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", verifyUser, addToWishlist);
router.post("/remove", verifyUser, removeFromWishlist);
router.get("/get", verifyUser, getWishlist);

export default router;
