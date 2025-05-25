import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "onTrip", "offline"],
    default: "offline",
  },
   socketId: {
    type: String,
    default: null,
  },
  vehicle: {
    color: {
      type: String,
      required: true,
    },
    plate: {
      type: String,
      required: true,
      unique: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    vehicleType: {
      type: String,
      enum: ["car", "bike", "van"],
      required: true,
    },

       
  },

  location: {
   type: {
      type: String,
      enum: ["Point"],
      default: "Point",
   },
    coordinates: {
      type: [Number],
      required: true,
    },
 },
    

}, {
  timestamps: true
});

// 🔐 Hash password before saving
captainSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔑 Method to compare passwords
captainSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// 🔑 Method to generate JWT token
captainSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, role: "captain" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const Captain = mongoose.model("Captain", captainSchema);

export default Captain;
