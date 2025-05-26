import { validationResult } from "express-validator";
import { createCaptain, loginCaptainService } from "../services/captain.service.js";
import Captain from "../models/captain.model.js";
// import { loginCaptainService } from "../services/captain.services.js";

export const registerCaptain = async (req, res) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      email,
      password,
      vehicle,
      location,
    } = req.body;

    const captain = await createCaptain({
      firstName,
      lastName,
      email,
      password,
      vehicle,
      location,
    });

    const token = captain.generateToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(201).json({
      message: "Captain registered successfully",
      captain: {
        id: captain._id,
        name: `${captain.fullName.firstName} ${captain.fullName.lastName}`,
        email: captain.email,
        vehicle: captain.vehicle,
        location: captain.location,
        status: captain.status,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginCaptain = async (req, res) => {
  try {
    const { email, password } = req.body;

    const captain = await loginCaptainService(email, password);
    const token = captain.generateToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "Login successful",
      captain: {
        id: captain._id,
        name: `${captain.fullName.firstName} ${captain.fullName.lastName}`,
        email: captain.email,
        status: captain.status,
      },
      token,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};


export const logoutCaptain = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCaptainProfile = async (req, res) => {
  try {
    const captain = req.captain; // Assuming the captain is set in the request by middleware
    res.status(200).json({
      id: captain._id,
      name: `${captain.fullName.firstName} ${captain.fullName.lastName}`,
      email: captain.email,
      vehicle: captain.vehicle,
      location: captain.location,
      status: captain.status,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCaptainLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const captain = req.captain; // Assuming the captain is set in the request by middleware

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and longitude are required" });
    }

    captain.location.coordinates = [longitude, latitude];
    await captain.save();

    res.status(200).json({
      message: "Location updated successfully",
      location: captain.location,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateCaptainStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const captain = req.captain; // Assuming the captain is set in the request by middleware

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    captain.status = status;
    await captain.save();

    res.status(200).json({
      message: "Status updated successfully",
      status: captain.status,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteCaptainAccount = async (req, res) => {
  try {
    const captain = req.captain; // Assuming the captain is set in the request by middleware
    await captain.remove();

    res.status(200).json({ message: "Captain account deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllCaptains = async (req, res) => {
  try {
    const captains = await Captain.find().select("-password -__v");
    res.status(200).json(captains);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




