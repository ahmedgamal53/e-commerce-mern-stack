import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import router from "./routers/userRoute.js";
import productRouter from "./routers/productRoute.js";
import cookieParser from "cookie-parser";
import cartRouter from "./routers/cartRoute.js";
import { connectRedis } from "./config/redis.js";
import orderRouter from "./routers/orderRoute.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// app config
connectCloudinary();

// middlewares
app.use(express.json());

const allowedOrigins = [
  process.env.USER_FRONTEND_URL,
  process.env.ADMIN_FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(cookieParser());

let initializationPromise;

app.use(async (req, res, next) => {
  try {
    if (!initializationPromise) {
      initializationPromise = (async () => {
        await connectDB();
        await connectRedis();
      })();
    }

    await initializationPromise;
    next();
  } catch (error) {
    initializationPromise = null;
    console.error("Initialization error:", error);
    res.status(500).json({ message: "Server initialization failed" });
  }
});

// api endpoints
app.use("/api/user", router);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
// connectDB().then(async () => {
//   await connectRedis();
//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
// });
