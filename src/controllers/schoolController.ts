import { Request, Response } from "express";
import { addSchool, listSchools, createSchoolsTable } from "../model/schoolModel";

// Function to add a school
export const addSchoolController = async (req: any, res: any) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        await addSchool(name, address, latitude, longitude);
        res.status(201).json({ message: "School added successfully!" });
    } catch (error) {
        console.error("Error adding school:", error);
        res.status(500).json({ message: "Failed to add school", error });
    }
};

// Function to list schools sorted by proximity
export const listSchoolsController = async (req: any, res: any) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: "Latitude and longitude are required." });
    }

    try {
        const schools = await listSchools(parseFloat(latitude as string), parseFloat(longitude as string));
        res.status(200).json(schools);
    } catch (error) {
        console.error("Error fetching schools:", error);
        res.status(500).json({ message: "Failed to list schools", error });
    }
};

// Function to create the table
export const createTableController = async (req: any, res: any) => {
    try {
        await createSchoolsTable();
        res.status(200).json({ message: "Schools table created successfully." });
    } catch (error) {
        console.error("Error creating table:", error);
        res.status(500).json({ message: "Failed to create table", error });
    }
};
