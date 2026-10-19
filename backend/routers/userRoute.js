import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  adminLogout,
  userLogout,
} from "../controllers/userController.js";

import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin", adminLogin);
router.post("/logout", adminLogout);
router.post("/userLogout", userLogout);

router.get("/check-auth", adminAuth, (req, res) => {
  return res.json({
    success: true,
    admin: req.admin,
  });
});

router.get("/check-user", userAuth, (req, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
});

export default router;
