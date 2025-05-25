
import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
    
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process if DB connection fails
    }
};

export default connectDB;
// This code connects to a MongoDB database using Mongoose.