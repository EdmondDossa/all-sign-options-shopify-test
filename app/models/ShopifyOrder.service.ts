export class ShopifyOrderService{
    
    static async getOrder(admin: any,  id: number) {
        try {

            const response = await admin.graphql(
                `#graphql
                query getOrder($id: ID!) {
                    order(id: $id) {
                        id
                        name
                        totalPriceSet {
                            presentmentMoney {
                                amount
                            }
                        }
                        lineItems(first: 10) {
                            nodes {
                                id
                                name
                                title
                                quantity
                                sku
                                variant {
                                    id
                                    legacyResourceId
                                    sku
                                    title
                                }
                                product {
                                    id
                                    legacyResourceId
                                }
                            }
                        }
                        customer {
                            id
                            firstName
                            lastName
                            email
                        }
                    }
                }`,
                {
                    variables: {
                        id: `gid://shopify/Order/${id}`
                    }
                }
            );

            const data = await response.json();
            
            if (data.errors) {
                console.log("GraphQL errors:", data.errors);
                return null;
            }

            const order = data.data.order;
            
            // Format response to match REST API structure
            return {
                id: order.id,
                name: order.name,
                total_price: order.totalPriceSet.presentmentMoney.amount,
                line_items: order.lineItems.nodes.map((item:any) => ({
                    id: item.id,
                    name: item.name,
                    title: item.title,
                    quantity: item.quantity,
                    sku: item.sku,
                    variant_id:  item.variant.legacyResourceId,
                    product_id:  item.product.legacyResourceId
                })),
                customer: order.customer
            };
        } catch (error) {
            console.log("error on getting order", error);
            return null;
        }
    }  

}