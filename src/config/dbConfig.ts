import { Client } from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Database connection configuration
export const client = new Client({
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT || "5432"),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: {
        rejectUnauthorized: false, // Allow self-signed certificates
    },
});

// Function to establish the connection to PostgreSQL
export const connectToDb = async () => {
    try {
        await client.connect();
        console.log("Connected to PostgreSQL");
    } catch (error) {
        console.error("Connection error:", error);
        throw new Error("Failed to connect to the database");
    }
};

// Function to close the connection to PostgreSQL
export const closeConnection = async () => {
    await client.end();
    console.log("Connection closed");
};
