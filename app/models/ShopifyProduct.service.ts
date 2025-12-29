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
              productOptions: [
                {
                  name: "Custom Design",
                  values: [
                    { name: optionName }
                  ]
                  
                }
              ],
              
              metafields: [
                {
                  description: "ASO configuration  ID",
                  key: "asoConfigurationId",
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
      // If configurationId is 0, we want to delete the metafield completely
      if (configurationId === 0 && metafieldID) {
        const response = await admin.graphql(
          `#graphql
          mutation metafieldsDelete($metafields: [MetafieldIdentifierInput!]!) {
            metafieldsDelete(metafields: $metafields) {
              deletedMetafields {
                key
                namespace
                ownerId
              }
              userErrors {
                field
                message
              }
            }
          }`,
          {
            variables: {
              metafields: [
                {
                  ownerId: id,
                  namespace: "allSignsOptionsAsoAso",
                  key: "asoConfigurationId"
                }
              ]
            }
          }
        );
        const responseJson = await response.json();
        console.log("Metafield deleted:", responseJson);
        return responseJson.data?.metafieldsDelete?.deletedMetafields?.length > 0 ? { id } : null;
      } else {
        // Normal update with configurationId
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
                  metafieldID ? {
                    id: metafieldID,
                    value: `${configurationId}`,
                  } : {
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
        return responseJson.data?.productUpdate?.product;
      }
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

      console.log("error getting metafield ID", error);
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
  static async createVariant(admin: any, productID: string,  name: string, price: number, image: string, recaps?: any) {
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
                "optionValues": [
                    {
                      "name": name,
                      "optionName": "Custom Design"
                    }
                ],
                "price": `${price}`,
                "inventoryPolicy": "CONTINUE",
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
                "optionValues": [
                    {
                      "name": name,
                      "optionName": "Custom Design"
                    }
                ],
                "price": `${price}`,
                "inventoryPolicy": "CONTINUE",
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
          query getVariantRecap($id: ID!) {
            productVariant(id: $id) {
              title
              metafield(namespace: "allSignsOptionsAsoAso",
                key: "asoConfigurationRecap"){
                value
                id
              }
            }
          }`,
          {
            variables: {
              id: id
            }
          }
        );
        
        const data = await response.json();
        const recapData  = data.data.productVariant?.metafield?.value ? JSON.parse(data.data.productVariant?.metafield?.value) : null;
        
        if (!recapData) {
          return null;
        }

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

    /**
     * Updates multiple products with configuration association
     * @param admin - Shopify admin API client
     * @param products - Array of product objects with id and title
     * @param configurationId - The configuration ID to associate
     * @returns Promise<boolean> - Returns true if all updates were successful
     */
    static async updateMultipleProducts(admin: any, products: Array<{id: string, title: string}>, configurationId: number) {
      try {
        const results = await Promise.all(
          products.map(async (product) => {
            const metafieldId = await this.getMetafieldID(admin, product.id);
            return await this.update(admin, product.id, configurationId, metafieldId);
          })
        );
        
        return results.every(result => result !== null);
      } catch (error) {
        console.log("Error updating multiple products:", error);
        return false;
      }
    }

    /**
     * Removes configuration association from multiple products
     * @param admin - Shopify admin API client
     * @param productIds - Array of product IDs to disassociate
     * @returns Promise<boolean> - Returns true if all removals were successful
     */
    static async removeConfigurationFromProducts(admin: any, productIds: string[]) {
      try {
        const results = await Promise.all(
          productIds.map(async (productId) => {
            const metafieldId = await this.getMetafieldID(admin, productId);
            return await this.update(admin, productId, 0, metafieldId);
          })
        );
        
        return results.every(result => result !== null);
      } catch (error) {
        console.log("Error removing configuration from products:", error);
        return false;
      }
    }

    /**
     * Gets all products associated with a configuration
     * @param admin - Shopify admin API client
     * @param configurationId - The configuration ID
     * @returns Promise<Array<{id: string, title: string}>> - Returns array of associated products
     */
    static async getProductsByConfiguration(admin: any, configurationId: number) {
      try {
        const response = await admin.graphql(
          `#graphql
          query getProductsByConfiguration {
            products(first: 250, query: "metafield:allSignsOptionsAsoAso.asoConfigurationId:${configurationId}") {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }`
        );

        const data = await response.json();
        return data.data.products.edges.map((edge: any) => ({
          id: edge.node.id,
          title: edge.node.title
        }));
      } catch (error) {
        console.log("Error getting products by configuration:", error);
        return [];
      }
    }

    /**
     * Finds an available product (not associated with any configuration) to use as default
     * @param admin - Shopify admin API client
     * @returns Promise<{id: string, title: string} | null> - Returns first available product or null
     */
    static async findAvailableProduct(admin: any): Promise<{id: string, title: string} | null> {
      try {
        // Get first 10 products from the shop
        const response = await admin.graphql(
          `#graphql
          query getAvailableProducts {
            products(first: 10) {
              edges {
                node {
                  id
                  title
                  metafield(namespace: "allSignsOptionsAsoAso", key: "asoConfigurationId") {
                    value
                  }
                }
              }
            }
          }`
        );

        const data = await response.json();
        const products = data.data.products.edges || [];
        
        // Find first product without metafield (not associated with any configuration)
        for (const edge of products) {
          const product = edge.node;
          // If metafield is null or value is "0" or empty, product is available
          if (!product.metafield || !product.metafield.value || product.metafield.value === "0") {
            return {
              id: product.id,
              title: product.title
            };
          }
        }
        
        return null; // No available product found
      } catch (error) {
        console.log("Error finding available product:", error);
        return null;
      }
    }

    /**
     * Counts all products created by the app (products with asoConfigurationId metafield)
     * @param admin - Shopify admin API client
     * @returns Promise<number> - Returns the total count of products created by the app
     */
    static async countProductsCreated(admin: any): Promise<number> {
      try {
        let totalCount = 0;
        let hasNextPage = true;
        let cursor: string | null = null;
        let pageCount = 0;
        const MAX_PAGES = 10; // Limit to prevent infinite loops

        while (hasNextPage && pageCount < MAX_PAGES) {
          pageCount++;
          const response = await admin.graphql(
            `#graphql
            query countProductsCreated($cursor: String) {
              products(first: 250, query: "product_type:all-signs-options-product", after: $cursor) {
                edges {
                  node {
                    id
                    metafield(namespace: "allSignsOptionsAsoAso", key: "asoConfigurationId") {
                      value
                    }
                  }
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
              }
            }`,
            {
              variables: {
                cursor: cursor
              }
            }
          );

          const data = await response.json();
          
          if (data.errors) {
            console.log("GraphQL errors:", data.errors);
            break;
          }

          const products = data.data?.products?.edges || [];
          
          // Count products that have the metafield with a valid value (not null, not "0", not empty)
          const validProducts = products.filter((edge: any) => {
            const metafield = edge.node.metafield;
            return metafield && metafield.value && metafield.value !== "0";
          });
          
          totalCount += validProducts.length;

          hasNextPage = data.data?.products?.pageInfo?.hasNextPage || false;
          cursor = data.data?.products?.pageInfo?.endCursor || null;
        }

        if (pageCount >= MAX_PAGES) {
          console.log(`⚠️ Reached max pages limit (${MAX_PAGES}) for products count. Total counted: ${totalCount}`);
        }

        return totalCount;
      } catch (error) {
        console.log("Error counting products created:", error);
        return 0;
      }
    }
}