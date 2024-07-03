import { writeFileSync } from "fs";

export function uploadBase64(ext:string, base64: string){
    const path = `public/upload_designs_files/${generateUniqueId()}.${ext}`;
    const matches = base64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
        base64 = matches[2];
    }
    try {
        const buffer = Buffer.from(base64, "base64");
        writeFileSync(path, buffer);
        return path.replace("public/",'')
    } catch (error) {
        console.log('error on saving file', error);
        return "";
    }
}


export function uploadBufferWithName(name:string, buffer: any){
    const path = `public/upload_designs_files/${name}`;
    
    try {
        writeFileSync(path, buffer);
        return path.replace("public/",'')
    } catch (error) {
        console.log('error on saving file', error);
        return "";
    }
}



export function fileBuffer(base64: string){
    const matches = base64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
        base64 = matches[2];
    }
    try {
        const buffer = Buffer.from(base64, "base64");
        return buffer
    } catch (error) {
        console.log('error on saving file', error);
        return null;
    }
}


export function generateUniqueId() {
    const timestamp = Date.now().toString(36); // Convert current time to a base-36 string
    const randomNum = Math.random().toString(36).substring(2); // Generate a random number and convert to base-36 string
    return `${timestamp}-${randomNum}`;
}

export function  getExtensionFromBase64(baseString64:string){
    const typeRegex = /data:.*\/([^\+^;]+)/;
    const match = `${baseString64}`.match(typeRegex);

    if (match) {
        const dataType = match[1];
        return dataType;
    
    } else {
        return null;
    }
}
  