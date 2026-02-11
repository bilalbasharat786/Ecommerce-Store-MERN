import express from "express";
import { loginUser, registerUser, adminLogin, googleLogin ,addToWishlist, getUserWishlist} from "../controllers/userController.js";
// ⭐ Auth middleware (name aapka hoga authUser ya verifyUser)


const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post('/add-to-wishlist',  addToWishlist);
userRouter.post('/get-wishlist', getUserWishlist);
// ⭐ NEW: Google Login Route
userRouter.post("/google-login", googleLogin);



export default userRouter;

