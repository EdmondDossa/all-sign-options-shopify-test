export const fileUrl = (url: any) => {
    
    if (url && typeof  url === "string") {
        const urlParts = url.split("/aso-proxy/");
        if (urlParts.length > 1) {
            return `/${urlParts[1]}`;
        }
    }

    return url;
}


export function replaceUploadsAddShopUrl(data:any, shopUrl:string) {
  function replaceInObject(obj:any) {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = obj[key].replace(/^\/uploads\//, `https://${shopUrl}/apps/aso-proxy/uploads/`)} else if (typeof obj[key] === "object") {
        replaceInObject(obj[key]);
      }
    }
  }

  replaceInObject(data);
  return data;
}