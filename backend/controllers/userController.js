import userModel from "../models/useModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does'nt exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch && user) {
      const token = createToken(user._id);

      res.cookie("userToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ success: true, message: "Login successful" });
    } else {
      res.json({ success: false, message: "Incorrect email or password" });
    }
  } catch (error) {
    console.log(error);
  }
};

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exits = await userModel.findOne({ email });

    if (exits) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 8);

    const newUser = new userModel({
      name,
      email,
      password: hashedpassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.cookie("userToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, message: "register successful" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "7d",
        },
      );

      res.cookie("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",

        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        success: true,
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};

const adminLogout = (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.json({
    success: true,
    message: "Logged out successfully",
  });
};

const userLogout = (req, res) => {
  res.clearCookie("userToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.json({
    success: true,
    message: "Logged out successfully",
  });
};

export { loginUser, registerUser, adminLogin, adminLogout, userLogout };
