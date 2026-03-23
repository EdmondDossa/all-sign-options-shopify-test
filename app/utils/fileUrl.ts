export const fileUrl = (url: any) => {
    
    if (url && typeof  url === "string") {
        const urlParts = url.split("/aso-proxy/");
        if (urlParts.length > 1) {
            return `/${urlParts[1]}`;
        }
    }

    return url;
}

/**
 * URL d'affichage pour les images de templates (prevImg, realImg, icon).
 * Décode les noms de fichiers encodés et retourne un fallback si vide.
 * À utiliser dans Templates list et Template Library pour un affichage cohérent.
 */
export function getImageUrl(url: string | null | undefined): string {
  if (!url || typeof url !== "string") return "/aso_logo.png";
  let finalUrl = fileUrl(url);
  try {
    if (finalUrl.startsWith("/")) {
      const parts = finalUrl.split("/");
      const filename = parts[parts.length - 1];
      if (filename && filename.includes("%")) {
        parts[parts.length - 1] = decodeURIComponent(filename);
        return parts.join("/");
      }
    }
    if (finalUrl.startsWith("http://") || finalUrl.startsWith("https://")) {
      const urlObj = new URL(finalUrl);
      urlObj.pathname = decodeURIComponent(urlObj.pathname);
      return urlObj.toString();
    }
    return finalUrl;
  } catch {
    return finalUrl;
  }
}


export function getShopPath(str: string) {
  return str.replace(/\.myshopify\.com$/, "");
}

 export function getShopDesignPath(sessionId: string){
  return `public/uploads/${getShopPath(sessionId)}/designs/`;
 };

 export function assignShopDesignPath (sessionId: string, file: string){
   return `${getShopDesignPath(sessionId)}${file}`;
 };




export function replaceUploadsAddShopUrl(data:any, shopUrl:string) {
  function replaceInObject(obj:any) {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = obj[key].replace(/^\/uploads\//, `https://${shopUrl}/apps/aso-proxy/uploads/`)
        obj[key] = obj[key].replace(/^\/aso_default_files\//, `https://${shopUrl}/apps/aso-proxy/aso_default_files/`)

      } else if (typeof obj[key] === "object") {
        replaceInObject(obj[key]);
      }
    }
  }

  replaceInObject(data);
  return data;
}





export  const  getShopProxyUrlWithSlash = (shop:string)=>{

  return `https://${shop}/apps/aso-proxy/`;
}
