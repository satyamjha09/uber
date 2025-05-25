import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { body } from "express-validator";

const router = express.Router();

// Validation middleware for registration
const validateRegister = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Validation middleware for login
const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post("/register",validateRegister ,  registerUser);
router.post("/login",validateLogin ,  loginUser);

export default router;
