import express from "express";
import { addSchoolController, listSchoolsController, createTableController } from "../controllers/schoolController";

// Initialize the router
const router = express.Router();

// Route to create the table
router.get("/createTable", createTableController);

// Route to add a school
router.post("/addSchool", addSchoolController);

// Route to list schools based on proximity
router.get("/listSchools", listSchoolsController);

export default router;
