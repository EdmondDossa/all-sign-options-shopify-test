import { apiVersion } from "~/shopify.server";

export class ShopifyShopService{
    
  static  async  getShop(admin: any ){
    try {
      const query =  `#graphql
      query { 
        shop {
          name
          email
          primaryDomain{
            id
            host
            url
          }
          myshopifyDomain
        }
      }`;
      const response = await admin.graphql(
        query
      );
      
      const responseData = await response.json();
      const returnData = responseData?.data?.shop;
      return returnData;

    } catch (error) {
      console.log("error  on getting order",error);
      return false;
    }
  }  
  
  static  async  isShopInDev(admin: any ){
    try {
      const query =  `#graphql
      query {
        shop {
          name
          plan {
            partnerDevelopment
  
           }
        }
      }`;
      const response = await admin.graphql(
        query
      );
      
      const responseData = await response.json();
      const returnData = responseData?.data?.shop?.plan?.partnerDevelopment;
      return returnData? true : false;

    } catch (error) {

      return false;
    }
  }  
  



  static async isShopInDevPublic(shop: string, accessToken: string) {
    
    const query =  `#graphql
    query {
      shop {
        name
        plan {
          partnerDevelopment

         }
      }
    }`;
    const url = `https://${shop}/admin/api/${apiVersion}/graphql.json`;
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify({ query })
    });
  
    if (!response.ok) {
      console.log("error on getting billing",response);
      return false;
    }
    
    const responseData = await response.json();
    const returnData = responseData?.data?.shop?.plan?.partnerDevelopment;
    return returnData? true : false;
}



}