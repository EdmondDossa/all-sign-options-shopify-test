import { ShopifyShopService } from "~/models/ShopifyShop.service.server";


export async function replaceDomainUrl(data: any, admin: any) {

  if (!admin) {
    return data;
  }
  
  const shop = await ShopifyShopService.getShop(admin);
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





