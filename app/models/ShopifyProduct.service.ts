
export class ShopifyProductService {
  static async create(
    configurationId: number,
    admin: any,
    name: string,
    description: string,
    image: string,
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
      console.log("responseJson", responseJson);
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




   static async createVariant(admin: any, id: string, name:string, price:number, image:string  ) {
    try {
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
              "mediaSrc": [
                image
              ],
            
              "options": [
                `${name} f ${Math.random().toString(36).slice(-1)}`
              ],
              "position": 1,
              "price": `${price}`,
              "productId": id, 
              "requiresComponents": false,
              "sku": "ASOPRREFERENCE"
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
}
