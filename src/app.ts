import express from "express";
import dotenv from "dotenv";
import { connectToDb, closeConnection } from "./config/dbConfig";
import schoolRoutes from "./routes/schoolRoutes";

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();
app.use(express.json());

// Connect to database and create table when starting the app
connectToDb().catch(console.error);

// Use the routes
app.use("/api", schoolRoutes);

// Close the connection when the app stops
process.on("SIGINT", async () => {
    await closeConnection();
    process.exit();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
