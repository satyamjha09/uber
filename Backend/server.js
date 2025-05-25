import dotenv from "dotenv";
dotenv.config(); // ✅ Should be at the top before accessing process.env

import app from "./app.js"; // Import the app from app.js
import http from "http";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
