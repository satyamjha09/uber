import { validationResult } from "express-validator";
import { createUser, authenticateUser } from "../services/user.service.js";

export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;
    const user = await createUser({ firstName, lastName, email, password });

    const token = user.generateToken();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: `${user.fullName.firstName} ${user.fullName.lastName}`,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await authenticateUser(email, password);

    const token = user.generateToken();

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: `${user.fullName.firstName} ${user.fullName.lastName}`,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
