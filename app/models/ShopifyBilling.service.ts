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

}