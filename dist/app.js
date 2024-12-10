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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConfig_1 = require("./config/dbConfig");
const schoolRoutes_1 = __importDefault(require("./routes/schoolRoutes"));
// Load environment variables
dotenv_1.default.config();
// Initialize the Express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Connect to database and create table when starting the app
(0, dbConfig_1.connectToDb)().catch(console.error);
// Use the routes
app.use("/api", schoolRoutes_1.default);
// Close the connection when the app stops
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConfig_1.closeConnection)();
    process.exit();
}));
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
