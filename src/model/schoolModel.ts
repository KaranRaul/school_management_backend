import { client } from "../config/dbConfig";
import { calculateDistance } from "../utils/distanceCalculator";

// Query to create the 'schools' table
export const createSchoolsTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS schools (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
    );
  `;
    await client.query(query);
};

// Query to insert a new school
export const addSchool = async (name: string, address: string, latitude: number, longitude: number) => {
    const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4)";
    const values = [name, address, latitude, longitude];
    await client.query(query, values);
};

// Query to list schools sorted by proximity
export const listSchools = async (latitude: number, longitude: number) => {
    try {
        const query = "SELECT id, name, address, latitude, longitude FROM schools";
        const result = await client.query(query);

        // Calculate distance for each school and sort by proximity
        const schoolsWithDistance = result.rows.map((school: any) => {
            const distance = calculateDistance(
                latitude,
                longitude,
                school.latitude,
                school.longitude
            );
            return { ...school, distance };
        });

        // Sort schools by distance
        const sortedSchools = schoolsWithDistance.sort(
            (a: any, b: any) => a.distance - b.distance
        );


        return sortedSchools;
    } catch (error) {
        console.error("Error fetching schools:", error);
        throw new Error("Failed to list schools");
    }
};