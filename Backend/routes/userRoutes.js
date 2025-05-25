import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  logoutUser,
} from "../controllers/userController.js";
import { body } from "express-validator";
import { authenticateUser } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// ✅ Validation middleware for registration
const validateRegister = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// ✅ Validation middleware for login
const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// 🔐 Auth Routes
router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.post("/logout", authenticateUser, logoutUser);

// 👤 Profile Routes
router.get("/me", authenticateUser, getUserProfile);
router.put("/me", authenticateUser, updateUserProfile);
router.delete("/me", authenticateUser, deleteUser);

// 🧑‍🤝‍🧑 Admin/User Management Routes
router.get("/", authenticateUser, getAllUsers); // GET /api/users
router.get("/:id", authenticateUser, getUserById); // GET /api/users/:id
router.put("/:id", authenticateUser, updateUserById); // PUT /api/users/:id
router.delete("/:id", authenticateUser, deleteUserById); // DELETE /api/users/:id

export default router;
