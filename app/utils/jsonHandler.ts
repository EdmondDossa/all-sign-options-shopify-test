import fs from 'fs';
import path from 'path';

/**
 * Reads JSON data from a file.
 * @param filePath - The path to the JSON file.
 * @returns The parsed JSON data as an object.
 * @throws Throws an error if the file does not exist or cannot be read.
 */
export function readJsonData(filePath: string): Record<string, any> {
    try {
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found at path: ${filePath}`);
        }

        // Read and parse the JSON file
        const rawData = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(rawData) as Record<string, any>;
        return jsonData;
    } catch (error) {
        console.error('Error reading JSON data:', (error as Error).message);
        throw error;
    }
}

/**
 * Updates or creates JSON data in a file.
 * @param filePath - The path to the JSON file.
 * @param jsonData - The JSON data to write to the file.
 * @throws Throws an error if the file cannot be written.
 */
export function updateOrCreateJsonData(filePath: string, jsonData: Record<string, any>): boolean {
    try {
        // Ensure the directory exists
        const directoryPath = path.dirname(filePath);
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }


        // Write the updated JSON data to the file
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');

        return true;
    } catch (error) {
        console.error('Error updating or creating JSON data:', (error as Error).message);
        return false;
    }
}