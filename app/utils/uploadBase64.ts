import { writeFileSync,mkdirSync } from "fs";
import sizeOf from 'buffer-image-size';
import { assignShopDesignPath, getShopDesignPath } from "./fileUrl";

export function uploadBase64(ext:string, base64: string, sessionId: string) {
    const path = assignShopDesignPath(sessionId, `${generateUniqueId()}.${ext}`);
    const matches = base64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
        base64 = matches[2];
    }
    try {
        const buffer = Buffer.from(base64, "base64");
        mkdirSync(getShopDesignPath(sessionId), { recursive: true });
        writeFileSync(path, buffer);
        return path.replace("public/",'')
    } catch (error) {
        console.log('error on saving file', error);
        return "";
    }
}


export function uploadBufferWithName(name:string, buffer: any,sessionId:string){
    const path = assignShopDesignPath(sessionId, name);
    
    try {
        mkdirSync(getShopDesignPath(sessionId), { recursive: true });
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



export const calculateImagePlacement = (imgBuffer: Buffer) => {
  // Dimensions d'une page A4 en mode paysage en millimètres
  const pageWidth = 297;
  const pageHeight = 210;

  // Obtenir les dimensions de l'image
  const dimensions = sizeOf(imgBuffer);
  const imgWidth = dimensions.width;
  const imgHeight = dimensions.height;

  // Calculer le rapport d'aspect de l'image
  const aspectRatio = imgWidth / imgHeight;

  // Dimensions de l'image redimensionnée
  let newImgWidth, newImgHeight;
  if (imgWidth > imgHeight) {
    newImgWidth = pageWidth;
    newImgHeight = pageWidth / aspectRatio;
  } else {
    newImgHeight = pageHeight;
    newImgWidth = pageHeight * aspectRatio;
  }

  // Assurer que l'image s'adapte à la page sans déformation
  if (newImgWidth > pageWidth) {
    newImgWidth = pageWidth;
    newImgHeight = pageWidth / aspectRatio;
  }
  if (newImgHeight > pageHeight) {
    newImgHeight = pageHeight;
    newImgWidth = pageHeight * aspectRatio;
  }

  // Calculer les coordonnées pour centrer l'image
  const x = (pageWidth - newImgWidth) / 2;
  const y = (pageHeight - newImgHeight) / 2;

  return {
    x: x,
    y: y,
    width: newImgWidth,
    height: newImgHeight
  };
};


  