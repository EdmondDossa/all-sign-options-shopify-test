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


}