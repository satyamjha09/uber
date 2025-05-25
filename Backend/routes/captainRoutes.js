import express from "express";
import {
  registerCaptain,
  loginCaptain,
  logoutCaptain,
  getCaptainProfile,
  updateCaptainLocation,
  updateCaptainStatus,
  deleteCaptainAccount,
  getAllCaptains,
} from "../controllers/captainController.js";
import { authenticateCaptain } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Public routes
router.post("/register", registerCaptain);
router.post("/login", loginCaptain);
router.post("/logout", logoutCaptain);

// Protected routes
router.get("/profile", authenticateCaptain, getCaptainProfile);
router.patch("/location", authenticateCaptain, updateCaptainLocation);
router.patch("/status", authenticateCaptain, updateCaptainStatus);
router.delete("/delete", authenticateCaptain, deleteCaptainAccount);
router.get("/all", authenticateCaptain, getAllCaptains); // Optional: could be admin-only

export default router;
