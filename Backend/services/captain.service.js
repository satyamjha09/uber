import Captain from "../models/captain.model.js";
import createHttpError from "http-errors";

export const createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  vehicle,
  location,
}) => {
  // Check if the captain already exists
  const existing = await Captain.findOne({ email });
  if (existing) {
    throw new Error("Captain already exists with this email");
  } 

  // Construct the captain object
  const newCaptain = new Captain({
    fullName: { firstName, lastName },
    email,
    password,
    vehicle: {
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    },
    location: {
      type: "Point",
      coordinates: location.coordinates,
    },
  });

  await newCaptain.save();
  return newCaptain;
};



export const loginCaptainService = async (email, password) => {
  const captain = await Captain.findOne({ email });

  if (!captain) {
    throw createHttpError(401, "Captain not found with this email.");
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    throw createHttpError(401, "Invalid password.");
  }

  return captain;
};

