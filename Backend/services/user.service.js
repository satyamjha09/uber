import User from "../models/User.js";

export const createUser = async ({ firstName, lastName, email, password }) => {

  const existingUser = await User.findOne({ email });
  
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = new User({
    fullName: { firstName, lastName },
    email,
    password,
  });

  await user.save();

  return user;
};

export const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};
