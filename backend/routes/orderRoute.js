import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  deleteOrder,
  updateStatus,
  verifyStripe,
  getUnreadOrdersCount,
  markOrderAsRead,
  markAllOrdersAsRead,
} from "../controllers/orderController.js";
import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);
orderRouter.post("/delete", adminAuth, deleteOrder);
orderRouter.get("/unread-count", adminAuth, getUnreadOrdersCount);
orderRouter.put("/mark-read/:orderId", adminAuth, markOrderAsRead);
orderRouter.put("/mark-all-read", adminAuth, markAllOrdersAsRead);

orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);

orderRouter.post("/userorders", authUser, userOrders);

orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
