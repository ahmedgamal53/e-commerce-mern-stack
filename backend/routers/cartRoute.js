import express from "express";

import {
  addToCart,
  getUserCart,
  updateCart,
  deleteItem,
} from "../controllers/cartcontroller.js";
import userAuth from "../middleware/userAuth.js";

const cartRouter = express.Router();

cartRouter.get("/get", userAuth, getUserCart);
cartRouter.post("/add", userAuth, addToCart);
cartRouter.post("/update", userAuth, updateCart);
cartRouter.delete("/delete", userAuth, deleteItem);

export default cartRouter;
