import redisClient from "../config/redis.js";
import productModel from "../models/productModel.js";
import mongoose from "mongoose";

// const addToCart = async (req, res) => {
//   try {
//     const userId = req.user.userId;

//     const { productId, size } = req.body;

//     if (!productId || !size) {
//       return res.status(400).json({
//         success: false,
//         message: "Product and size are required",
//       });
//     }

//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid product ID",
//       });
//     }

//     const product = await productModel.findById(productId).select("sizes");

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     if (!product.sizes.includes(size)) {
//       return res.status(400).json({
//         success: false,
//         message: "Selected size is not available",
//       });
//     }

//     const updatedCart = await cartModel
//       .findOneAndUpdate(
//         {
//           user: userId,

//           items: {
//             $elemMatch: {
//               product: productId,
//               size: size,
//             },
//           },
//         },
//         {
//           $inc: {
//             "items.$.quantity": 1,
//           },
//         },
//         {
//           new: true,
//         },
//       )
//       .populate("items.product");

//     if (updatedCart) {
//       return res.status(200).json({
//         success: true,
//         message: "Product quantity updated",
//         cart: updatedCart,
//       });
//     }

//     const cart = await cartModel.findOneAndUpdate(
//       { user: userId },
//       {
//         $push: {
//           items: {
//             product: productId,
//             size: size,
//             quantity: 1,
//           },
//         },
//       },

//       { new: true, upsert: true },
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Product added to cart",
//       cart,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const getCartItems = async (userId) => {
  const cart = await redisClient.hGetAll(`cart:${userId}`);

  if (Object.keys(cart).length === 0) {
    return [];
  }

  const productIds = Object.keys(cart).map((key) => key.split(":")[0]);

  const products = await productModel.find({
    _id: { $in: productIds },
  });

  return Object.entries(cart).map(([key, quantity]) => {
    const [productId, size] = key.split(":");

    return {
      product: products.find((product) => product._id.toString() === productId),
      size,
      quantity: Number(quantity),
    };
  });
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, size } = req.body;

    if (!productId || !size) {
      return res.status(400).json({
        success: false,
        message: "Product and size are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await productModel.findById(productId).select("sizes");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const selectedSize = product.sizes.find((item) => item.size === size);

    if (!selectedSize) {
      return res.status(400).json({
        success: false,
        message: "Selected size is not available",
      });
    }

    if (selectedSize.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Selected size is out of stock",
      });
    }

    const quantity = await redisClient.hIncrBy(
      `cart:${userId}`,
      `${productId}:${size}`,
      1,
    );

    const items = await getCartItems(userId);

    return res.status(200).json({
      success: true,
      message:
        quantity === 1 ? "Product added to cart" : "Product quantity updated",
      cart: {
        items,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export default addToCart;

// const updateCart = async (req, res) => {
//   try {
//     const userId = req.user.userId;

//     const { productId, size, quantity } = req.body;

//     if (!productId || !size || !quantity) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required data",
//       });
//     }

//     if (quantity === 1) {
//       const cart = await cartModel
//         .findOneAndUpdate(
//           {
//             user: userId,
//             items: {
//               $elemMatch: {
//                 product: productId,
//                 size: size,
//               },
//             },
//           },
//           {
//             $inc: {
//               "items.$.quantity": 1,
//             },
//           },
//           {
//             new: true,
//           },
//         )
//         .populate("items.product");

//       if (!cart) {
//         return res.status(404).json({
//           success: false,
//           message: "Cart item not found",
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         message: "Cart updated successfully",
//         cart,
//       });
//     }

//     const cart = await cartModel
//       .findOneAndUpdate(
//         {
//           user: userId,

//           items: {
//             $elemMatch: {
//               product: productId,
//               size: size,
//               quantity: { $gt: 1 },
//             },
//           },
//         },
//         {
//           $inc: {
//             "items.$.quantity": -1,
//           },
//         },
//         {
//           new: true,
//         },
//       )
//       .populate("items.product");

//     if (cart) {
//       return res.status(200).json({
//         success: true,
//         message: "Cart updated successfully",
//         cart,
//       });
//     }

//     const updatedCart = await cartModel
//       .findOneAndUpdate(
//         {
//           user: userId,

//           items: {
//             $elemMatch: {
//               product: productId,
//               size: size,
//               quantity: 1,
//             },
//           },
//         },
//         {
//           $pull: {
//             items: {
//               product: productId,
//               size: size,
//             },
//           },
//         },
//         {
//           new: true,
//         },
//       )
//       .populate("items.product");

//     return res.status(200).json({
//       success: true,
//       message: "Item removed from cart",
//       cart: updatedCart,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

const updateCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, size, quantity } = req.body;

    if (!productId || !size || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product, size and quantity are required",
      });
    }

    const cartKey = `cart:${userId}`;
    const itemKey = `${productId}:${size}`;

    const newQuantity = await redisClient.hIncrBy(
      cartKey,
      itemKey,
      Number(quantity),
    );

    if (newQuantity <= 0) {
      await redisClient.hDel(cartKey, itemKey);
    }
    const items = await getCartItems(userId);

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: {
        items,
      },
    });
  } catch (error) {
    console.error("Update cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, size } = req.body;

    if (!productId || !size) {
      return res.status(400).json({
        success: false,
        message: "Product ID and size are required",
      });
    }

    const cartKey = `cart:${userId}`;
    const itemKey = `${productId}:${size}`;

    const deleted = await redisClient.hDel(cartKey, itemKey);

    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const items = await getCartItems(userId);

    return res.status(200).json({
      success: true,
      cart: {
        items,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// const getUserCart = async (req, res) => {
//   try {
//     const userId = req.user.userId;

//     const cart = await cartModel
//       .findOne({ user: userId })
//       .populate("items.product");

//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       cart,
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

export { addToCart, updateCart, getUserCart, deleteItem };
