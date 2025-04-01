import { ShopifyShopService } from "~/models/ShopifyShop.service";

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


export async function replaceDomainUrl(data: any, admin: any) {

  if (!admin) {
    return data;
  }
  
  const shop = await ShopifyShopService.getShopGraphQL(admin);
  const oldDomain = "https://" + shop.myshopifyDomain;
  const newDomain = shop.primaryDomain.url;

  function replaceUrls(obj: any): any {
    if (typeof obj === "string") {
      return obj.replace(oldDomain, newDomain);
    } else if (Array.isArray(obj)) {
      return obj.map(replaceUrls);
    } else if (typeof obj === "object" && obj !== null) {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, replaceUrls(value)])
      );
    }
    return obj;
  }

  return replaceUrls(data);
}


export  const  getShopProxyUrlWithSlash = (shop:string)=>{

  return `https://${shop}/apps/aso-proxy/`;
}


