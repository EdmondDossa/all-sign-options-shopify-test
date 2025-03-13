
export class ShopifyProductService {
  static async create(
    configurationId: number,
    admin: any,
    name: string,
    description: string,
    image: string,
    optionName?: string
  ) {
    try {
      const response = await admin.graphql(
        `#graphql
                mutation populateProduct($input: ProductInput!, $media: [CreateMediaInput!]) {
                    productCreate(input: $input, media: $media) {
                    product {
                        id
                        title
                        handle
                        status
                        variants(first: 10) {
                        edges {
                            node {
                            id
                            price
                            barcode
                            createdAt
                            }
                        }
                        }
                    }
                    }
                }`,
        {
          variables: {
            input: {
              title: name,
              descriptionHtml: description,
              status: "ACTIVE",
              productType: "all-signs-options-product",
              
              metafields: [
                {
                  description: "ASO configuration  ID",
                  key: "asoConfigurationIdItem",
                  namespace: "allSignsOptionsAsoAso",
                  type: "number_integer",
                  value: `${configurationId}`,
                },
              ],
            },
            media: [
              {
                alt: name,
                mediaContentType: "IMAGE",
                originalSource: image,
              },
            ],
          },
        },
      );
      const responseJson = await response.json();
      return responseJson.data?.productCreate?.product;
    } catch (error) {
      console.log("error creating  product", error);
      return null;
    }
  }

  static async update(admin: any, id: string, configurationId: number = 0, metafieldID?: string ) {
    try {
      const response = await admin.graphql(
        `#graphql
                mutation productUpdate($input: ProductInput!) {
                  productUpdate(input: $input) {
                    product {
                        id
                        title
                        handle
                        status
                        variants(first: 10) {
                        edges {
                            node {
                            id
                            price
                            barcode
                            createdAt
                            }
                        }
                        }
                    }
                    }
                }`,
        {
          variables: {
            input: {
              id: id,
              metafields: [
                metafieldID?
                {
                  id: metafieldID,
                  value: `${configurationId}`,
                }:{
                  description: "ASO configuration  ID",
                  key: "asoConfigurationId",
                  namespace: "allSignsOptionsAsoAso",
                  type: "number_integer",
                  value: `${configurationId}`,
                }
              ],
            },
          },
        },
      );
      const responseJson = await response.json();
      console.log("responseJson ", id, configurationId, responseJson);
      return responseJson.data?.productCreate?.product;
    } catch (error) {
      console.log("error creating  product", error);
      return null;
    }
  }

  static async getMetafieldID(admin: any, id: string) {
    try {
      const response = await admin.graphql(

        `#graphql
               query getMetafieldID($id: ID!) {
            product(id: $id) {
              metafield(namespace: "allSignsOptionsAsoAso", key: "asoConfigurationId") {
                value
                id
              }
            }
          }`,
          {
            variables: {
              id: id
            }
          },
      );

      const responseJson = await response.json();
      return responseJson?.data?.product?.metafield?.id;

    } catch (error) {

      console.log("error creating  product", error);
      return null;
    }
  }


   

   static async createVariant(admin: any, id: string, name:string, price:number, image:string, recaps?:any   ) {
    try {

    
    
      const mediaID = await  this.CreateMediaProdutInput(admin, id, image)
      const response = await admin.graphql(
        `#graphql
                mutation productVariantCreate($input: ProductVariantInput!) {
                  productVariantCreate(input: $input) {
                    product {
                      id
                      legacyResourceId
                    }
                    productVariant {
                      id
                      legacyResourceId
                    }
                    userErrors {
                      field
                      message
                    }
                  }
                }`,
        {
          variables: {
            input: {
              "inventoryPolicy": "CONTINUE",
              "mediaId": mediaID,
              "options": [
                `${name}`
              ],
              "position": 1,
              "price": `${price}`,
              "productId": id, 
              "requiresComponents": false,
              "metafields":[
                {
                  key: "asoConfigurationRecap",
                  namespace: "allSignsOptionsAsoAso",
                  type: "json",
                  value: JSON.stringify(recaps),
                }
              ]
            }
          }
        },
      );

      const responseJson = await response.json();

      return (responseJson?.data?.productVariantCreate?.productVariant) ?
      (  {
        variantID: responseJson.data.productVariantCreate.productVariant.id,
        variantId: responseJson.data.productVariantCreate.productVariant.legacyResourceId,
        productID: responseJson.data.productVariantCreate.product?.id,
        productId: responseJson.data.productVariantCreate.product?.legacyResourceId
      })
      : null;
    
    } catch (error) {
      console.log("error creating  product", error);
      return null  ;
    }
   }
  
   static async updateVariant(admin: any, id: string, name:string, price:number,  recaps?:any   ) {
    try {

      const response = await admin.graphql(
        `#graphql
        mutation updateProductVariantMetafields($input: ProductVariantInput!) {
              productVariantUpdate(input: $input) {
                product {
                      id
                      legacyResourceId
                    }
                    productVariant {
                      id
                      legacyResourceId
                    }
                userErrors {
                  message
                  field
                }
              }
            }`,
            {
              variables: {
                input: {
                  "inventoryPolicy": "CONTINUE",
                  "options": [
                    `${name}`
                  ],
                  "position": 1,
                  "price": `${price}`,
                  "requiresComponents": false,
                  "metafields":[
                    {
                      key: "asoConfigurationRecap",
                      namespace: "allSignsOptionsAsoAso",
                      type: "json",
                      value: JSON.stringify(recaps),
                    }
                  ],
                  "id": id
                }
              },
            },
          );
      
      const responseJson = await response.json();

      return (responseJson?.data?.productVariantUpdate?.productVariant) ?
      (  {
        variantID: responseJson.data.productVariantUpdate.productVariant.id,
        variantId: responseJson.data.productVariantUpdate.productVariant.legacyResourceId,
        productID: responseJson.data.productVariantUpdate.product?.id,
        productId: responseJson.data.productVariantUpdate.product?.legacyResourceId
      })
      : null;
    
    } catch (error) {
      console.log("error on  updating  product", error);
      return null  ;
    }
  }

    static  async CreateMediaProdutInput(admin: any, id: string, image:string ){
     

      try {
        const response = await admin.graphql(
          `#graphql
          mutation productCreateMedia($media: [CreateMediaInput!]!, $productId: ID!) {
            productCreateMedia(media: $media, productId: $productId) {
              media {
                id
                alt
                mediaContentType
                status
              }
              mediaUserErrors {
                field
                message
              }
              product {
                id
                title
              }
            }
          }`,
          {
            variables: {
              "media": {
                "alt": "Image",
                "mediaContentType": "IMAGE",
                "originalSource": image
              },
              "productId": id
            },
          },
        );
        
        const data = await response.json();

        return data.data.productCreateMedia.media[0].id
      } catch (error) {
          console.log("error on adding  image to  product", image);
      }

    }

    static  async  getVariantRecap(admin: any, id: string){
      try {
        const response = await admin.graphql(
          `#graphql
          query {
            productVariant(id: "${id}") {
              title
              metafield(namespace: "allSignsOptionsAsoAso",
                key: "asoConfigurationRecap"){
                value
                id
              }
            }
          }`,
        );
        
        const data = await response.json();
        
        

        return data.data.productVariant.metafield? {title: data.data.productVariant?.title , recaps :JSON.parse( data.data.productVariant?.metafield?.value),id:data.data.productVariant?.metafield?.id}:null;

      } catch (error) {
        console.log("error  on updating variant",error);

      }
      
    }

    static  async  updateVariantRecap(admin: any, variantId: string, metaId:string, metaValue : string){
      try {
        const response = await admin.graphql(
          `#graphql
          mutation updateProductVariantMetafields($input: ProductVariantInput!) {
            productVariantUpdate(input: $input) {
              productVariant {
                id
                metafields(first: 3) {
                  edges {
                    node {
                      id
                      namespace
                      key
                      value
                    }
                  }
                }
              }
              userErrors {
                message
                field
              }
            }
          }`,
          {
            variables: {
              "input": {
                "metafields": [
                  {
                    "id": metaId,
                    "value":  metaValue
                  }
                ],
                "id": variantId
              }
            },
          },
        );
        
        
        const data = await response.json();
        
        

        return data.data.productVariantUpdate.productVariant?  true :false;

      } catch (error) {
        console.log("error  on getting variant",error);

      }
      
    }
  
  
    static async publish(admin: any, id: string) {
      try {

        const publicationId = await ShopifyProductService.getPublicationID(admin);

        const response = await admin.graphql(
                    `#graphql
                    mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
                      publishablePublish(id: $id, input: $input) {
                       
                        shop {
                          id
                        }
                        userErrors {
                          field
                          message
                        }
                      }
                    }`,
                    {
                      variables: {
                        "id": id,
                        "input": {
                          "publicationId": publicationId
                        }
                      },
                    },
                  );

        const data = await response.json();
        // console.log("data on publish", JSON.stringify(data));
        return data?.data?.publishablePublish?.shop ? true : false;
      } catch (error) {
        console.log("error  on getting variant", error);
      }
    }

  static async getPublicationID(admin: any) {
      try {
     

        const response = await admin.graphql(
          `#graphql
          query publications {
            publications(first: 5) {
              edges {
                node {
                  id
                  name
                  supportsFuturePublishing
                  app {
                    id
                    title
                    description
                    developerName
                  }
                }
              }
            }
          }`,
        );
        
        const data = await response.json();
        
       
        return data.data.publications.edges.find((publication: any) => publication.node.name == "Online Store" || publication.node.supportsFuturePublishing).node.id;
      } catch (error) {
        console.log("error  on getting variant", error);
        return null
      }
    }
}
