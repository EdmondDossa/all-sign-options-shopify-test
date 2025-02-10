import { apiVersion } from "~/shopify.server";

export class ShopifyShopService{
    
    static  async  getShop(admin: any ,session:any){
        try {
            const shop =  await admin.rest.resources.Shop.all({
                session: session,
                fields: "email,domain,myshopify_domain",
              });
            
            return  shop.data[0];
        } catch (error) {
          console.log("error  on getting order",error);
        }
  }  
  

  static  async  getCheckoutUrl(admin: any, key: string ){
    try {
      const response = await admin.graphql(
        `#graphql
   query checkoutURL {
  cart(id: "gid://shopify/Cart/${key}") {
    checkoutUrl
  }
}
        `
      );
      
      const responseData = await response.json();
      const returnData = responseData.data.cart.checkoutUrl;
      return returnData;

    } catch (error) {
      console.log("error  on getting billing",error);
      return null
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