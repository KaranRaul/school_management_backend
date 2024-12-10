"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConnection = exports.connectToDb = exports.client = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Database connection configuration
exports.client = new pg_1.Client({
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
const connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.connect();
        console.log("Connected to PostgreSQL");
    }
    catch (error) {
        console.error("Connection error:", error);
        throw new Error("Failed to connect to the database");
    }
});
exports.connectToDb = connectToDb;
// Function to close the connection to PostgreSQL
const closeConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.client.end();
    console.log("Connection closed");
});
exports.closeConnection = closeConnection;
