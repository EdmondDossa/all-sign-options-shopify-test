export class ShopifyOrderService{
    
    static  async  getOrder(admin: any ,session:any ,  id: number){
        try {
            const order = await admin.rest.resources.Order.find({
                session: session,
                id: id,
                fields: "id,line_items,name,total_price,customer",
            });
            
            return  order;
        } catch (error) {
          console.log("error  on getting order",error);
        }
    }    

}