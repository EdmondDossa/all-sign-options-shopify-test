import { readJsonData } from "~/utils/jsonHandler";

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
                mutation populateProduct($product: ProductCreateInput!, $media: [CreateMediaInput!]) {
                    productCreate(product: $product, media: $media) {
                      product {
                          id
                          legacyResourceId
                          title
                          handle
                          status
                          variants(first: 10) {
                          edges {
                              node {
                              id
                              legacyResourceId
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
            product: {
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
                mutation productUpdate($product: ProductUpdateInput!) {
                  productUpdate(product: $product) {
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
            product: {
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


   

  /**
   * Creates a new product variant with options, price, image and optional metafields 
   * using the new productVariantsBulkUpdate approach
   * @param admin - Shopify admin API client
   * @param productID - The Shopify product ID
   * @param variantID - The variant ID (not used in creation but kept for method signature consistency)
   * @param name - The variant option name
   * @param price - The variant price
   * @param image - The image URL or path to associate with the variant
   * @param recaps - Optional configuration recap data to store in metafields
   * @returns Promise<object|null> - Returns variant and product IDs or null if creation failed
   */
  static async createVariant(admin: any, productID: string, variantID: string, name: string, price: number, image: string, recaps?: any) {
    try {
      // First create the media for the variant
      const mediaID = await this.CreateMediaProdutInput(admin, productID, image);
      
      // Prepare metafields array
      const metafields = [];
      
      // Add recaps metafield if provided
      if (recaps) {
        metafields.push({
          key: "asoConfigurationRecap",
          namespace: "allSignsOptionsAsoAso",
          type: "json",
          value: JSON.stringify(recaps)
        });
      }
      
      // Use the new productVariantsBulkUpdate approach with the create operation for new variants
      const response = await admin.graphql(
        `#graphql
        mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
          productVariantsBulkUpdate(productId: $productId, variants: $variants) {
            product {
              id
              legacyResourceId
            }
            productVariants {
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
            "productId": productID,
            "variants": [
              {
                // No ID provided for creation
                "options": [name],
                "price": `${price}`,
                "inventoryPolicy": "CONTINUE",
                "position": 1,
                "requiresComponents": false,
                "mediaId": mediaID,
                "metafields": metafields
              }
            ]
          },
        },
      );
      
      const responseJson = await response.json();
      
      // Check if creation was successful and return the IDs
      if (responseJson?.data?.productVariantsBulkUpdate?.productVariants?.length > 0) {
        const createdVariant = responseJson.data.productVariantsBulkUpdate.productVariants[0];
        const updatedProduct = responseJson.data.productVariantsBulkUpdate.product;
        
        return {
          variantID: createdVariant.id,
          variantId: createdVariant.legacyResourceId,
          productID: updatedProduct?.id,
          productId: updatedProduct?.legacyResourceId
        };
      }
      
      return null;
    } catch (error) {
      console.log("Error creating product variant:", error);
      return null;
    }
  }
  
  /**
   * Updates a product variant with new options, price and optional metafields using the new productVariantsBulkUpdate approach
   * @param admin - Shopify admin API client
   * @param productID - The Shopify product ID
   * @param variantID - The variant ID to update
   * @param name - The variant option name
   * @param price - The variant price
   * @param recaps - Optional configuration recap data to store in metafields
   * @returns Promise<object|null> - Returns variant and product IDs or null if update failed
   */
  static async updateVariant(admin: any, productID: string, variantID: string, name: string, price: number, recaps?: any) {
    try {
      // Prepare metafields array
      const metafields = [];
      
      // Add recaps metafield if provided
      if (recaps) {
        metafields.push({
          key: "asoConfigurationRecap",
          namespace: "allSignsOptionsAsoAso",
          type: "json",
          value: JSON.stringify(recaps)
        });
      }

      const response = await admin.graphql(
        `#graphql
        mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
          productVariantsBulkUpdate(productId: $productId, variants: $variants) {
            product {
              id
              legacyResourceId
            }
            productVariants {
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
            "productId": productID,
            "variants": [
              {
                "id": variantID,
                "options": [name],
                "price": `${price}`,
                "inventoryPolicy": "CONTINUE",
                "position": 1,
                "requiresComponents": false,
                "metafields": metafields
              }
            ]
          },
        },
      );
      
      const responseJson = await response.json();
      
      // Check if update was successful and return the IDs
      if (responseJson?.data?.productVariantsBulkUpdate?.productVariants?.length > 0) {
        const updatedVariant = responseJson.data.productVariantsBulkUpdate.productVariants[0];
        const updatedProduct = responseJson.data.productVariantsBulkUpdate.product;
        
        return {
          variantID: updatedVariant.id,
          variantId: updatedVariant.legacyResourceId,
          productID: updatedProduct?.id,
          productId: updatedProduct?.legacyResourceId
        };
      }
      
      return null;
    } catch (error) {
      console.log("Error updating product variant:", error);
      return null;
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
        const recapData = JSON.parse(data.data.productVariant?.metafield?.value);
        
        

        return data.data.productVariant.metafield ? {
          title: data.data.productVariant?.title,
          recaps: recapData?.recapsPath? readJsonData(recapData.recapsPath):recapData ,
          id: data.data.productVariant?.metafield?.id
        } : null;

      } catch (error) {
        console.log("error  on updating variant",error);

      }
      
    }

 


    /**
     * Updates a single product variant metafield using the new productVariantsBulkUpdate approach
     * @param admin - Shopify admin API client
     * @param productID - The Shopify product ID
     * @param variantId - The variant ID to update
     * @param metaId - The metafield ID to update
     * @param metaValue - The new value for the metafield
     * @returns Promise<boolean> - Returns true if update was successful
     */
    static async updateVariantRecap(admin: any, productID: string, variantId: string, metaId: string, metaValue: string) {
      try {
        const response = await admin.graphql(
          `#graphql
          mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
            productVariantsBulkUpdate(productId: $productId, variants: $variants) {
              product {
                id
              }
              productVariants {
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
                field
                message
              }
            }
          }`,
          {
            variables: {
              "productId": productID,
              "variants": [
                {
                  "id": variantId,
                  "metafields": [
                    {
                      "id": metaId,
                      "value": metaValue
                    }
                  ]
                }
              ]
            },
          },
        );
        
        const data = await response.json();
        
        // Check for successful update by verifying we have productVariants in the response
        // and no userErrors
        if (data.data.productVariantsBulkUpdate.productVariants?.length > 0 && 
            data.data.productVariantsBulkUpdate.userErrors.length === 0) {
          return true;
        }
        
        return false;
      } catch (error) {
        console.log("Error updating variant metafield:", error);
        return false;
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
