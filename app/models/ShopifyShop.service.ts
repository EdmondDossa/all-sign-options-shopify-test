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

}