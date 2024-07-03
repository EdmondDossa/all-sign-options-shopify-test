import { readFileSync } from "fs";
export function readJsonField(file: string) {
    const dataJSON = readFileSync(file, 'utf8');

    // 2. Parse the JSON string into a JavaScript object
    const dataArray = JSON.parse(dataJSON);

    return dataArray
}