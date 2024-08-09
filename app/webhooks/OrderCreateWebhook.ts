import AdmZip from "adm-zip";
import { sendRecapMail } from "~/email";
import { ShopifyProductService } from "~/models/ShopifyProduct.service";
import { ShopifyShopService } from "~/models/ShopifyShop.service";
import { calculateImagePlacement, fileBuffer, generateUniqueId, getExtensionFromBase64, uploadBufferWithName } from "~/utils/uploadBase64";
import { jsPDF } from "jspdf";
import { assignShopDesignPath } from "~/utils/fileUrl";
import { unlink } from "fs";

export async function OrderCreateWebhook(admin:any,session:any,payload:any){
  const order = payload;


  


  
    const variantsData:any =  []
    if (order) {
      for(const line_item of order.line_items){
        let variantMetaData :any = await ShopifyProductService.getVariantRecap(admin,`gid://shopify/ProductVariant/${line_item.variant_id}`)
        if (variantMetaData) {
       
          variantMetaData.line_item = line_item;
          variantMetaData.orderNumber = order.name;
          variantsData.push(variantMetaData)
        }
      }

     

      if (variantsData?.length) {
        new Promise(async(resolve, reject) => {
          try {
            const mailData = [];
            for (const variantMetaData of  variantsData) {
            
              
          
             
              console.log("start");
              let zip = new AdmZip();
              let designImages = [];
              let images = [];
              let designImagesPdf = [];

            

              if (!variantMetaData.recaps?.faces) {
                for(const designImage of variantMetaData?.recaps.designImages){
                  const content = fileBuffer(designImage.url);
                  let fileName =`preview_${generateUniqueId()}.${designImage.format}`
                  if(content){
                    zip.addFile(fileName, content,"image");
                    designImages.push(`${process.env.SHOPIFY_APP_URL}/${uploadBufferWithName(fileName, content,session.id)}`)
                    
                    let doc = new jsPDF({ orientation: "landscape", });
                    let imageSize = calculateImagePlacement(content);
                    doc.addImage(content, "JPEG", imageSize.x, imageSize.y, imageSize.width, imageSize.height);
                    let filenamePath = assignShopDesignPath(session.id, `${fileName}.pdf`);
                    doc.save(filenamePath);
                    zip.addLocalFile(filenamePath,undefined,`${fileName}.pdf`, "application/pdf");
                    designImagesPdf.push(filenamePath)
                  }
                }
    
                for(const designImage of (variantMetaData?.recaps?.images?.value||[])){
                  const content = fileBuffer(designImage.url);
                  const ext  = getExtensionFromBase64(designImage.url);
                  let fileName = `${designImage.id}_${generateUniqueId()}.${ext}`;
                  if(content && ext){
                    zip.addFile(fileName, content,"image");
                    images.push({
                      id:designImage.id,
                      url:`${process.env.SHOPIFY_APP_URL}/${uploadBufferWithName(fileName,content,session.id)}`,
                    });
                  }
                }
                
              } else {

                for(const face in variantMetaData?.recaps.designImages){
                  for(const designImage of variantMetaData?.recaps.designImages[face]){
                    const content = fileBuffer(designImage.url);
                    let fileName =`preview_${face}_${generateUniqueId()}.${designImage.format}`
                    if(content){
                      zip.addFile(fileName, content,"image");
                      designImages.push(`${process.env.SHOPIFY_APP_URL}/${uploadBufferWithName(fileName, content,session.id)}`)
                      let doc = new jsPDF({ orientation: "landscape", });
                      let imageSize = calculateImagePlacement(content);
                      doc.addImage(content, "JPEG", imageSize.x, imageSize.y, imageSize.width, imageSize.height);
                      let filenamePath = assignShopDesignPath(session.id,`${fileName}.pdf`)
                      doc.save(filenamePath);
                      zip.addLocalFile(filenamePath,undefined,`${fileName}.pdf`, "application/pdf");
                      designImagesPdf.push(filenamePath)
                    }
                  }
                }
      
                  for(const face in (variantMetaData?.recaps?.images?.value||{})){
                    for(const designImage of (variantMetaData?.recaps?.images?.value[face]||[])){
                    const content = fileBuffer(designImage.url);
                    const ext  = getExtensionFromBase64(designImage.url);
                    let fileName = `${designImage.id}_${face}_${generateUniqueId()}.${ext}`;
                    if(content && ext){
                      zip.addFile(fileName, content,"image");
                      images.push({
                        id:designImage.id,
                        url:`${process.env.SHOPIFY_APP_URL}/${uploadBufferWithName(fileName,content,session.id)}`,
                      });
                    }
                  }
                }
              }
  
             
            
  
              let zipPath = assignShopDesignPath(session.id,`${ variantMetaData?.recaps?.output?.prefix}_${order.id}.zip`);
              zip.writeZip(zipPath);

              // delete  all  generated  pdf  files  after adding them to the zip
              if(designImagesPdf.length){
                  designImagesPdf.forEach((designImagePdf:string) => {
                    unlink(designImagePdf, (err) => { });
                  });
              }
              //end of delete
  
  
              if (variantMetaData?.recaps) {
                variantMetaData.recaps.filesUrl = {
                    designImages: designImages,
                    images: images,
                    zipUrl:`${process.env.SHOPIFY_APP_URL}/${zipPath.replace('public/','')}`
                }
                
                ShopifyProductService.updateVariantRecap(
                  admin,
                  `gid://shopify/ProductVariant/${variantMetaData.line_item.variant_id}`,
                  `${variantMetaData.id}`, 
                  JSON.stringify(variantMetaData.recaps)
                )
              } 
              mailData.push(variantMetaData);

            }
            const shop = await ShopifyShopService.getShop(admin,session)
            
           
            
            if (shop?.email) {
              sendRecapMail(mailData, shop.email, `All signs options ${mailData[0].orderNumber}`, order.customer);
              console.log("shop  email  ", shop.email)
            }
            if (order?.customer?.email) {
              sendRecapMail(mailData, order.customer.email, `All signs options ${mailData[0].orderNumber}`,order.customer, false);
              console.log("email of customer", order.customer.email)
            }
          } catch (error) {
            console.log("error  on creating zip",error) ;
  
          }
          
        });
      }
    }
}