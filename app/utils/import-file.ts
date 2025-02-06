import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';


export async function downloadFile(url: string, destinationFolder: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const fileName = path.basename(url);
        let destinationPath = path.join(destinationFolder, fileName);
        
  
      // Function to check if a file exists and handle renaming
      function ensureUniqueFileName(filePath: string): string {
        let counter = 1;
        let baseName = path.basename(filePath, path.extname(filePath));
        let ext = path.extname(filePath);
        while (fs.existsSync(filePath)) {
          filePath = path.join(destinationFolder, `${baseName}_${counter}${ext}`);
          counter++;
        }
        return filePath;
      }
  
        destinationPath = ensureUniqueFileName(destinationPath);
  
      const file = fs.createWriteStream(destinationPath);
      https.get(url, response => {
        response.pipe(file);
        file.on('finish', () => {
          file.close(); // Close the file without a callback
          resolve(destinationPath); // Resolve the promise with the full file path
        });
      }).on('error', err => {
        fs.unlink(destinationPath, () => {}); // Clean up the file if download fails
        reject(err); // Reject the promise with the error
      });
    });
  }

//   `public/uploads/${getShopPath(session.id)}/files`
export function replaceUrlForImport(data: any, uploadsPrefix = `/apps/aso-proxy/` , newUploadsPrefix = `https://shopUrl/apps/aso-proxy/`, downloadFolder='public/uploads/sessinnId' ,downloaded: boolean = false): any {

  
  if (downloaded && !fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder, { recursive: true });
  }



  async function replaceInObject(obj: any) {
    if (typeof obj === "string") {
      if (obj.startsWith("https://") && obj.includes(uploadsPrefix) && !obj.includes(newUploadsPrefix)) {
        if (downloaded) {
          
          let fileName = await downloadFile(obj, downloadFolder);
          return newUploadsPrefix + fileName.replace("public/",'');
        } 
          
        const newPath = newUploadsPrefix +obj.split(uploadsPrefix).pop();
        return newPath;
      }
      return obj;
    } else if (typeof obj === "object" && obj !== null) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          obj[key] = await replaceInObject(obj[key]);
        }
      }
    }
    return obj;
  }

  return replaceInObject(data);
}