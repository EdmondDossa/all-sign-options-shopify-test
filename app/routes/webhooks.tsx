import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { ShopifyProductService } from "~/models/ShopifyProduct.service";
import { ShopifyShopService } from "~/models/ShopifyShop.service";
import { sendRecapMail } from "~/email";
import AdmZip from "adm-zip";
import { fileBuffer, generateUniqueId, getExtensionFromBase64, uploadBufferWithName } from "~/utils/uploadBase64";
import { OrderCreateWebhook } from "~/webhooks/OrderCreateWebhook";

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("webhook call ");
  const { topic, shop, session, admin, payload } = await authenticate.webhook(
    request
    );
    console.log("customers data request ", topic);

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }
      return new Response("customers data request is received", { status: 200 });
    case "CUSTOMERS_DATA_REQUEST": 
      console.log("customers data request", payload);
      return new Response("customers data request is received", { status: 200 });
     
 
    case "CUSTOMERS_REDACT":
      console.log("customer redact request", payload);
      return new Response("customer redact request is received", { status: 200 });
    case "SHOP_REDACT":
      console.log("shop redact request", payload);
      return new Response("shop data request is received", { status: 200 });
    case "ORDERS_CREATE":
         new Promise(async(resolve, reject) => {
           await OrderCreateWebhook(admin,session,payload);
           console.log(" load order webhook function")
         });
         console.log(" load order webhook function end");


      // const  order =  payload;
  
      // const variantsData:any =  []
      // if (order) {
      //   for(const line_item of order.line_items){
      //     let variantMetaData :any = await ShopifyProductService.getVariantRecap(admin,`gid://shopify/ProductVariant/${line_item.variant_id}`)
      //     if (variantMetaData) {
         
      //       variantMetaData.line_item = line_item;
      //       variantMetaData.orderNumber = order.name;
      //       variantsData.push(variantMetaData)
      //     }
      //   }
  
       
  
      //   if (variantsData?.length) {
      //     new Promise(async(resolve, reject) => {
      //       try {
      //         const mailData = [];
      //         for (const variantMetaData of  variantsData) {
              
                
            
               
      //           console.log("start");
      //           let zip = new AdmZip();
      //           let designImages = [];
      //           let images = [];
  
      //           if (!variantMetaData.recaps?.faces) {
      //             for(const designImage of variantMetaData?.recaps.designImages){
      //               const content = fileBuffer(designImage.url);
      //               let fileName =`preview_${generateUniqueId()}.${designImage.format}`
      //               if(content){
      //                 zip.addFile(fileName, content,"image");
      //                 designImages.push(`${process.env.SHOPIFY_APP_URL}/${uploadBufferWithName(fileName,content)}`)
      //               }
      //             }
      
      //             for(const designImage of (variantMetaData?.recaps?.images?.value||[])){
      //               const content = fileBuffer(designImage.url);
      //               const ext  = getExtensionFromBase64(designImage.url);
      //               let fileName = `${designImage.id}_${generateUniqueId()}.${ext}`;
      //               if(content && ext){
      //                 zip.addFile(fileName, content,"image");
      //                 images.push({
      //                   id:designImage.id,
      //                   url:`${process.env.SHOPIFY_APP_URL}/${uploadBufferWithName(fileName,content)}`
      //                 });
      //               }
      //             }
                  
      //           } else {
  
      //             for(const face in variantMetaData?.recaps.designImages){
      //               for(const designImage of variantMetaData?.recaps.designImages[face]){
      //                 const content = fileBuffer(designImage.url);
      //                 let fileName =`preview_${face}_${generateUniqueId()}.${designImage.format}`
      //                 if(content){
      //                   zip.addFile(fileName, content,"image");
      //                   designImages.push(`${process.env.SHOPIFY_APP_URL}/${uploadBufferWithName(fileName,content)}`)
      //                 }
      //               }
      //             }
        
      //               for(const face in (variantMetaData?.recaps?.images?.value||{})){
      //                 for(const designImage of (variantMetaData?.recaps?.images?.value[face]||[])){
      //                 const content = fileBuffer(designImage.url);
      //                 const ext  = getExtensionFromBase64(designImage.url);
      //                 let fileName = `${designImage.id}_${face}_${generateUniqueId()}.${ext}`;
      //                 if(content && ext){
      //                   zip.addFile(fileName, content,"image");
      //                   images.push({
      //                     id:designImage.id,
      //                     url:`${process.env.SHOPIFY_APP_URL}/${uploadBufferWithName(fileName,content)}`
      //                   });
      //                 }
      //               }
      //             }
      //           }
    
               
    
              
    
      //           let zipPath = `public/upload_designs_files/${ variantMetaData?.recaps?.output?.prefix}_${order.id}.zip`;
      //           zip.writeZip(zipPath);
    
    
      //           if (variantMetaData?.recaps) {
      //             variantMetaData.recaps.filesUrl = {
      //                 designImages: designImages,
      //                 images: images,
      //                 zipUrl:`${process.env.SHOPIFY_APP_URL}/${zipPath.replace('public/','')}`
      //             }
                  
      //             ShopifyProductService.updateVariantRecap(
      //               admin,
      //               `gid://shopify/ProductVariant/${variantMetaData.line_item.variant_id}`,
      //               `${variantMetaData.id}`, 
      //               JSON.stringify(variantMetaData.recaps)
      //             )
      //           } 
      //           mailData.push(variantMetaData);
  
      //         }
      //         const shop = await ShopifyShopService.getShop(admin,session)
              
             
              
      //         if (shop?.email) {
      //           sendRecapMail(mailData, shop.email, `All signs options ${mailData[0].orderNumber}`, order.customer);
      //           console.log("shop  email  ", shop.email)
      //         }
      //         if (order?.customer?.email) {
      //           sendRecapMail(mailData, order.customer.email, `All signs options ${mailData[0].orderNumber}`,order.customer, false);
      //           console.log("email of customer", order.customer.email)
      //         }
      //       } catch (error) {
      //         console.log("error  on creating zip",error) ;
    
      //       }
            
      //     });
      //   }
      // }
      return new Response("shop data request is received", { status: 200 });
    default:

      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
