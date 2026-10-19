import express from "express";

import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";

import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.get("/list", adminAuth, allOrders);
orderRouter.patch("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/place", userAuth, placeOrder);
// orderRouter.post("/stripe", userAuth, placeOrderStripe);
// orderRouter.post("/razorpay", userAuth, placeOrderRazorpay);

// User Feature
orderRouter.get("/userorders", userAuth, userOrders);

export default orderRouter;
