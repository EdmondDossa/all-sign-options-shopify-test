import { writeFileSync,mkdirSync } from "fs";
import sizeOf from 'buffer-image-size';
import { assignShopDesignPath, getShopDesignPath } from "./fileUrl";
import {dataUriToBuffer} from "data-uri-to-buffer";
import mime from "mime-types"; // pour convertir mime-type en extension

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

export function getExtensionFromBase64(base64String: string): string | null {
    try {
      const parsed = dataUriToBuffer(base64String); // parse le data URL
      const mimeType = parsed.type; // ex: image/jpeg
      const ext = mime.extension(mimeType); // ex: jpg
      return ext || null;
    } catch (error) {
      console.error("Invalid base64 string:", error);
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

/**
 * Convertit les pixels en millimètres selon le DPI spécifié
 * @param px - Largeur ou hauteur en pixels
 * @param dpi - Résolution en DPI
 * @returns Dimension en millimètres
 */
export function pixelsToMm(px: number, dpi: number): number {
  return (px / dpi) * 25.4;
}

/**
 * Type pour le placement d'image avec dimensions en millimètres
 */
export type ImagePlacement = { 
  x: number; 
  y: number; 
  width: number; 
  height: number; 
};

/**
 * Calcule le placement d'une image dans un PDF en tenant compte du DPI
 * @param imgPxWidth - Largeur de l'image en pixels
 * @param imgPxHeight - Hauteur de l'image en pixels
 * @param pageWidthMm - Largeur de la page en millimètres
 * @param pageHeightMm - Hauteur de la page en millimètres
 * @param dpi - Résolution en DPI (72, 150, 300, 600)
 * @param marginMm - Marge en millimètres (défaut: 10)
 * @returns Placement de l'image avec coordonnées et dimensions en millimètres
 */
export function calculateImagePlacementWithDpi(
  imgPxWidth: number,
  imgPxHeight: number,
  pageWidthMm: number,
  pageHeightMm: number,
  dpi: 72 | 150 | 300 | 600,
  marginMm = 10
): ImagePlacement {
  // Convertir les dimensions de l'image de pixels vers millimètres
  const rawWmm = pixelsToMm(imgPxWidth, dpi);
  const rawHmm = pixelsToMm(imgPxHeight, dpi);

  // Calculer les dimensions maximales disponibles (page - marges)
  const maxW = pageWidthMm - marginMm * 2;
  const maxH = pageHeightMm - marginMm * 2;

  // Calculer l'échelle pour s'adapter à la page tout en conservant le ratio
  const scale = Math.min(maxW / rawWmm, maxH / rawHmm, 1);
  
  // Appliquer l'échelle
  const w = rawWmm * scale;
  const h = rawHmm * scale;
  
  // Centrer l'image
  const x = (pageWidthMm - w) / 2;
  const y = (pageHeightMm - h) / 2;

  return { x, y, width: w, height: h };
}

/**
 * Calcule la qualité JPEG en fonction du DPI
 * @param dpi - Résolution en DPI
 * @returns Qualité JPEG (0.0 à 1.0)
 */
export function getJpegQualityFromDpi(dpi: 72 | 150 | 300 | 600): number {
  if (dpi >= 600) return 1.0;
  if (dpi >= 300) return 0.95;
  if (dpi >= 150) return 0.9;
  return 0.85;
}

// Tests unitaires pour les fonctions DPI
if (process.env.NODE_ENV === 'test') {
  // Test pixelsToMm
  console.assert(pixelsToMm(300, 300) === 25.4, '300px à 300 DPI devrait être 25.4mm');
  console.assert(pixelsToMm(72, 72) === 25.4, '72px à 72 DPI devrait être 25.4mm');
  
  // Test getJpegQualityFromDpi
  console.assert(getJpegQualityFromDpi(72) === 0.85, '72 DPI devrait avoir une qualité de 0.85');
  console.assert(getJpegQualityFromDpi(150) === 0.9, '150 DPI devrait avoir une qualité de 0.9');
  console.assert(getJpegQualityFromDpi(300) === 0.95, '300 DPI devrait avoir une qualité de 0.95');
  console.assert(getJpegQualityFromDpi(600) === 1.0, '600 DPI devrait avoir une qualité de 1.0');
  
  // Test calculateImagePlacementWithDpi
  const placement = calculateImagePlacementWithDpi(1000, 500, 297, 210, 300);
  console.assert(placement.width > 0 && placement.height > 0, 'Le placement devrait avoir des dimensions positives');
  console.assert(placement.x >= 0 && placement.y >= 0, 'Les coordonnées devraient être positives');
}


  