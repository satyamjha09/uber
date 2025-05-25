
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BlacklistToken from "../models/blacklistToken.models.js";
import Captain from "../models/captain.model.js";

export const authenticateUser = async (req, res, next) => {

    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    // Check if the token is blacklisted
        const isBlacklisted = await BlacklistToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Token is blacklisted. Please log in again." });
        }

    
    if (!token) {
        return res.status(401).json({ message: "No token provided. Please log in." });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
    
        if (!user) {
          return res.status(401).json({ message: "Invalid token." });
        }
    
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
}

export const authenticateCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    // Check if the token is blacklisted
    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Token is blacklisted. Please log in again." });
    }

    if (!token) {
        return res.status(401).json({ message: "No token provided. Please log in." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await Captain.findById(decoded.id);

        if (!captain) {
            return res.status(401).json({ message: "Invalid token." });
        }

        req.captain = captain;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
}




