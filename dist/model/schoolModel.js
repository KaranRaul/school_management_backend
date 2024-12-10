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
exports.listSchools = exports.addSchool = exports.createSchoolsTable = void 0;
const dbConfig_1 = require("../config/dbConfig");
const distanceCalculator_1 = require("../utils/distanceCalculator");
// Query to create the 'schools' table
const createSchoolsTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    CREATE TABLE IF NOT EXISTS schools (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
    );
  `;
    yield dbConfig_1.client.query(query);
});
exports.createSchoolsTable = createSchoolsTable;
// Query to insert a new school
const addSchool = (name, address, latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4)";
    const values = [name, address, latitude, longitude];
    yield dbConfig_1.client.query(query, values);
});
exports.addSchool = addSchool;
// Query to list schools sorted by proximity
const listSchools = (latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "SELECT id, name, address, latitude, longitude FROM schools";
        const result = yield dbConfig_1.client.query(query);
        // Calculate distance for each school and sort by proximity
        const schoolsWithDistance = result.rows.map((school) => {
            const distance = (0, distanceCalculator_1.calculateDistance)(latitude, longitude, school.latitude, school.longitude);
            return Object.assign(Object.assign({}, school), { distance });
        });
        // Sort schools by distance
        const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);
        return sortedSchools;
    }
    catch (error) {
        console.error("Error fetching schools:", error);
        throw new Error("Failed to list schools");
    }
});
exports.listSchools = listSchools;
