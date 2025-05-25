import dotenv from 'dotenv';
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import captainRoutes from "./routes/captainRoutes.js";

import express from 'express';
import cors from 'cors';
import connectDB from './db/db.js';
import cookieParser from 'cookie-parser';

const app = express();

connectDB(); // Connect to the database

// ✅ Middleware setup — move these above the routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Now register your routes
app.use("/api/users", userRoutes);
app.use("/api/captains", captainRoutes);


// Optional test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
