export const fileUrl = (url: any) => {
    
    if (url && typeof  url === "string") {
        const urlParts = url.split("/aso-proxy/");
        if (urlParts.length > 1) {
            return `/${urlParts[1]}`;
        }
    }

    return url;
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