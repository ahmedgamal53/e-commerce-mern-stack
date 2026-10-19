import redisClient from "../config/redis.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import mongoose from "mongoose";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const placeOrder = async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const { items, amount, address } = req.body;

//     const orderData = {
//       userId,
//       items,
//       amount,
//       address,
//       paymentMethod: "COD",
//       payment: false,
//       date: Date.now(),
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     await redisClient.del(`cart:${userId}`);
//     res.json({
//       success: true,
//       message: "Order Placed",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

//comint

const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const userId = req.user.userId;
    const { address } = req.body;

    // 1. Get cart from Redis
    const cart = await redisClient.hGetAll(`cart:${userId}`);

    if (Object.keys(cart).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // 2. Extract product IDs
    const productIds = Object.keys(cart).map((key) => key.split(":")[0]);

    // 3. Get products from MongoDB
    const products = await productModel.find({
      _id: { $in: productIds },
    });

    // 4. Prepare cart items
    const items = Object.entries(cart).map(([key, quantityString]) => {
      const [productId, size] = key.split(":");

      const quantity = Number(quantityString);

      // Validate quantity
      if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error("Invalid quantity");
      }

      const product = products.find(
        (product) => product._id.toString() === productId,
      );

      if (!product) {
        throw new Error("Product not found");
      }

      const selectedSize = product.sizes.find((item) => item.size === size);

      if (!selectedSize) {
        throw new Error(`${product.name} (${size}) is not available`);
      }

      return {
        product,
        productId,
        size,
        quantity,
      };
    });

    let newOrder;
    // 5. Start transaction
    await session.withTransaction(async () => {
      let totalAmount = 0;
      const shippingFee = 10;
      const orderItems = [];

      // 6. Check stock + decrease stock atomically
      for (const item of items) {
        const result = await productModel.updateOne(
          {
            _id: item.productId,
            sizes: {
              $elemMatch: {
                size: item.size,
                stock: { $gte: item.quantity },
              },
            },
          },
          {
            $inc: {
              "sizes.$.stock": -item.quantity,
            },
          },
          {
            session,
          },
        );

        if (result.modifiedCount === 0) {
          throw new Error(
            `${item.product.name} (${item.size}) is out of stock`,
          );
        }

        totalAmount += item.product.price * item.quantity;

        orderItems.push({
          product: item.productId,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          size: item.size,
          quantity: item.quantity,
        });
      }

      totalAmount += shippingFee;

      // 7. Create order
      newOrder = new orderModel({
        userId,
        items: orderItems,
        amount: totalAmount,
        address,
        paymentMethod: "COD",
        payment: false,
        date: Date.now(),
      });

      // 8. Save order inside transaction
      await newOrder.save({ session });
    });

    // 9. MongoDB transaction succeeded
    // Delete cart from Redis
    await redisClient.del(`cart:${userId}`);

    return res.status(200).json({
      success: true,
      message: "Order Placed",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message || "Internal server error",
    });
  } finally {
    await session.endSession();
  }
};

// const placeOrderStripe = async (req, res) => {
//   let pendingOrder;

//   try {
//     const userId = req.user.userId;
//     const { address } = req.body;

//     // 1. Get cart from Redis
//     const cart = await redisClient.hGetAll(`cart:${userId}`);

//     if (Object.keys(cart).length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Cart is empty",
//       });
//     }

//     // 2. Get product IDs
//     const productIds = Object.keys(cart).map((key) => key.split(":")[0]);

//     const products = await productModel.find({
//       _id: { $in: productIds },
//     });

//     // 3. Prepare items
//     const items = Object.entries(cart).map(([key, quantityString]) => {
//       const [productId, size] = key.split(":");
//       const quantity = Number(quantityString);

//       if (!Number.isInteger(quantity) || quantity <= 0) {
//         throw new Error("Invalid quantity");
//       }

//       const product = products.find(
//         (product) => product._id.toString() === productId,
//       );

//       if (!product) {
//         throw new Error("Product not found");
//       }

//       const selectedSize = product.sizes.find((item) => item.size === size);

//       if (!selectedSize || selectedSize.stock < quantity) {
//         throw new Error(`${product.name} (${size}) has insufficient stock`);
//       }

//       return {
//         product: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         size,
//         quantity,
//       };
//     });

//     // 4. Calculate total on backend
//     const shippingFee = 10;

//     const subtotal = items.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0,
//     );

//     const amount = subtotal + shippingFee;

//     // 5. Create pending order
//     pendingOrder = await orderModel.create({
//       userId,
//       items,
//       amount,
//       address,
//       status: "Pending Payment",
//       paymentMethod: "Stripe",
//       payment: false,
//       date: Date.now(),
//     });

//     // 6. Prepare Stripe line items
//     const lineItems = items.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: `${item.name} - Size ${item.size}`,
//         },
//         unit_amount: Math.round(item.price * 100),
//       },
//       quantity: item.quantity,
//     }));

//     // Add shipping
//     lineItems.push({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: "Shipping Fee",
//         },
//         unit_amount: Math.round(shippingFee * 100),
//       },
//       quantity: 1,
//     });

//     // 7. Create Stripe Checkout Session
//     const checkoutSession = await stripe.checkout.sessions.create({
//       mode: "payment",
//       payment_method_types: ["card"],
//       line_items: lineItems,

//       metadata: {
//         orderId: pendingOrder._id.toString(),
//         userId: userId.toString(),
//       },

//       success_url: `${process.env.USER_FRONTEND_URL}/verify?session_id={CHECKOUT_SESSION_ID}`,

//       cancel_url: `${process.env.USER_FRONTEND_URL}/place-order?payment=cancelled`,
//     });

//     // 8. Save Stripe session ID
//     pendingOrder.stripeSessionId = checkoutSession.id;
//     await pendingOrder.save();

//     // 9. Return checkout URL
//     return res.status(200).json({
//       success: true,
//       session_url: checkoutSession.url,
//     });
//   } catch (error) {
//     console.error("Stripe checkout error:", error);

//     // Delete the pending order if session creation failed
//     if (pendingOrder && !pendingOrder.stripeSessionId) {
//       await orderModel.findByIdAndDelete(pendingOrder._id);
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Failed to create Stripe checkout",
//     });
//   }
// };

// Placing orders using Razorpay Method

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json({ succuss: true, orders });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// User Order Data for Frontend
// const userOrders = async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const orders = await orderModel.find({ userId });
//     res.json({ succuss: true, orders });
//   } catch (error) {
//     console.log(error);

//     return res.status(400).json({
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

const userOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const orders = await orderModel
      .find({ userId })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await orderModel.countDocuments({ userId });

    res.json({
      success: true,
      orders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Update order status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const allowedStatuses = [
      "Order Placed",
      "Packing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  placeOrder,
  // placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};
