import AdmZip from "adm-zip";
import { sendRecapMail } from "~/email";
import { ShopifyProductService } from "~/models/ShopifyProduct.service";
import { ShopifyShopService } from "~/models/ShopifyShop.service";
import { calculateImagePlacement, fileBuffer, generateUniqueId, getExtensionFromBase64, uploadBufferWithName } from "~/utils/uploadBase64";
import { jsPDF } from "jspdf";
import { assignShopDesignPath } from "~/utils/fileUrl";
import { unlink } from "fs";
import SettingOutputService from "~/models/SettingOutput.service";
import { updateOrCreateJsonData } from "~/utils/jsonHandler";

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
                    doc.addImage(content, "jpeg", imageSize.x, imageSize.y, imageSize.width, imageSize.height);
                    let filenamePath = assignShopDesignPath(session.id, `${fileName}.pdf`);
                    doc.save(filenamePath);
                    zip.addLocalFile(filenamePath,undefined,`${fileName}.pdf`, "application/pdf");
                    designImagesPdf.push(filenamePath)
                  }
                }

                //  save  printable  file
                if(variantMetaData?.recaps?.printImage){
                  const contentPrintable = fileBuffer(variantMetaData?.recaps?.printImage);
                  let fileNamePrintable =`print_design_${generateUniqueId()}.svg`;

                  if (contentPrintable) {
                    zip.addFile(fileNamePrintable, contentPrintable,"image");
                    // designImages.push(`${process.env.SHOPIFY_APP_URL}/${uploadBufferWithName(fileNamePrintable, contentPrintable ,session.id)}`)
                  }
                }
    

                // save  additonal  files
                for(const designImage of (variantMetaData?.recaps?.images?.value||[])){
                  const content = fileBuffer(designImage.url);
                  const ext  = getExtensionFromBase64(designImage.url);
                  let fileName = `${designImage.id}_${generateUniqueId()}.${ext}`;
                  if(content && ext){
                    zip.addFile(fileName, content,"image");
                    images.push({
                      id: designImage.id,
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

                //  save  printable  file
                if(variantMetaData?.recaps?.printImage){
                  for(const face in variantMetaData.recaps.printImage){
                    const contentPrintable = fileBuffer(variantMetaData.recaps.printImage[face]);
                    let fileNamePrintable =`print_design_${face}_${generateUniqueId()}.svg`;
    
                    if (contentPrintable) {
                      zip.addFile(fileNamePrintable, contentPrintable,"image");
                      // designImages.push(`${process.env.SHOPIFY_APP_URL}/${uploadBufferWithName(fileNamePrintable, contentPrintable ,session.id)}`)
                    }
                  }
                }

                // save  additonal  files
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

                const recapsPath = assignShopDesignPath(session.id, `recaps/${variantMetaData.line_item.variant_id}.json`)
                if (!updateOrCreateJsonData(recapsPath,  variantMetaData.recaps)) {
                  return null;
                }
                
                ShopifyProductService.updateVariantRecap(
                  admin,
                  `gid://shopify/Product/${variantMetaData.line_item.product_id}`,
                  `gid://shopify/ProductVariant/${variantMetaData.line_item.variant_id}`,
                  `${variantMetaData.id}`, 
                  JSON.stringify({recapsPath:recapsPath})
                )
              } 
              mailData.push(variantMetaData);

            }

            const shop = await ShopifyShopService.getShop(admin,session)
            
            const output = await SettingOutputService.get(session.id);         
            if (shop?.email && output.enableSendMailToAdmin) {
              sendRecapMail(mailData, shop.email, `All signs options ${mailData[0].orderNumber}`, order.customer);
            }

            for (const email of output.ouputReceiverMails?.split(',') || []) {
              const trimmedEmail = email.trim();
              if (trimmedEmail) {
                sendRecapMail(mailData,trimmedEmail,`All signs options ${mailData[0].orderNumber}`,order.customer);
              }
            }
            

            if (order?.customer?.email && output.enableSendMailToCustom) {
              sendRecapMail(mailData, order.customer.email, `All signs options ${mailData[0].orderNumber}`,order.customer, false);
            }

          } catch (error) {
            console.log("error  on creating zip",error) ;
  
          }
          
        });
      }
    }
}