"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schoolController_1 = require("../controllers/schoolController");
// Initialize the router
const router = express_1.default.Router();
// Route to create the table
router.get("/createTable", schoolController_1.createTableController);
// Route to add a school
router.post("/addSchool", schoolController_1.addSchoolController);
// Route to list schools based on proximity
router.get("/listSchools", schoolController_1.listSchoolsController);
exports.default = router;
