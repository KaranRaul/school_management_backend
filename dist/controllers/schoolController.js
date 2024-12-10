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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTableController = exports.listSchoolsController = exports.addSchoolController = void 0;
const schoolModel_1 = require("../model/schoolModel");
// Function to add a school
const addSchoolController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: "All fields are required." });
    }
    try {
        yield (0, schoolModel_1.addSchool)(name, address, latitude, longitude);
        res.status(201).json({ message: "School added successfully!" });
    }
    catch (error) {
        console.error("Error adding school:", error);
        res.status(500).json({ message: "Failed to add school", error });
    }
});
exports.addSchoolController = addSchoolController;
// Function to list schools sorted by proximity
const listSchoolsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
        return res.status(400).json({ message: "Latitude and longitude are required." });
    }
    try {
        const schools = yield (0, schoolModel_1.listSchools)(parseFloat(latitude), parseFloat(longitude));
        res.status(200).json(schools);
    }
    catch (error) {
        console.error("Error fetching schools:", error);
        res.status(500).json({ message: "Failed to list schools", error });
    }
});
exports.listSchoolsController = listSchoolsController;
// Function to create the table
const createTableController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, schoolModel_1.createSchoolsTable)();
        res.status(200).json({ message: "Schools table created successfully." });
    }
    catch (error) {
        console.error("Error creating table:", error);
        res.status(500).json({ message: "Failed to create table", error });
    }
});
exports.createTableController = createTableController;
