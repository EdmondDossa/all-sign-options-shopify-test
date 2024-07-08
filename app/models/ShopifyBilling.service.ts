import { apiVersion } from "~/shopify.server";

export class ShopifyBillingService{
    
    static  async  getBilling(admin: any ){
      try {
        const response = await admin.graphql(
          `#graphql
           query appSubscription {
          currentAppInstallation {
            activeSubscriptions {
              id
              name
              test
            }
      
        
          }
        }
          `
        );
        
        const responseData = await response.json();
        const returnData = responseData.data.currentAppInstallation.activeSubscriptions;
        return returnData;
  
      } catch (error) {
        console.log("error  on getting billing",error);
        return null
      }
    }    


  static async getBillingRequest(shop: string, accessToken: string) {
    
      const query = `#graphql
      query appSubscription {
     currentAppInstallation {
       activeSubscriptions {
         id
         name
         test
       }
 
   
     }
   }
     `;
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
        throw new Error(`Failed to fetch data from Shopify. Status: ${response.status}`);
      }
    
      const data = await response.json();
      const returnData = data.data.currentAppInstallation.activeSubscriptions;
      return returnData;
    }
    

}