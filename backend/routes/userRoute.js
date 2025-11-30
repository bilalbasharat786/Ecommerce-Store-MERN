import express from "express";
import { loginUser, registerUser, adminLogin, googleLogin } from "../controllers/userController.js";

// ⭐ Wishlist Controllers
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlistController.js";

// ⭐ Auth middleware (name aapka hoga authUser ya verifyUser)
import authUser from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

// ⭐ NEW: Google Login Route
userRouter.post("/google-login", googleLogin);

// ⭐ WISHLIST ROUTES
userRouter.get("/wishlist", authUser, getWishlist);
userRouter.post("/wishlist", authUser, addToWishlist);
userRouter.delete("/wishlist/:productId", authUser, removeFromWishlist);

export default userRouter;

