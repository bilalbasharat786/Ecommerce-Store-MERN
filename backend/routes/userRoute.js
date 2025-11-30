import express from "express";
import { loginUser, registerUser, adminLogin, googleLogin } from "../controllers/userController.js";


// ⭐ Auth middleware (name aapka hoga authUser ya verifyUser)

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

// ⭐ NEW: Google Login Route
userRouter.post("/google-login", googleLogin);



export default userRouter;

