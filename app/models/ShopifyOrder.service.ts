export class ShopifyOrderService{
    
    static async getOrder(admin: any,  id: number) {
        try {

            const response = await admin.graphql(
                `#graphql
                query getOrder($id: ID!) {
                    order(id: $id) {
                        id
                        name
                        clientIp
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
                order_number:order.name.replace('#', ''),
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
                customer: order.customer,
                clientIp:order.clientIp
            };
        } catch (error) {
            console.log("error on getting order", error);
            return null;
        }
    }

    /**
     * Counts all orders that contain at least one product created by the app
     * @param admin - Shopify admin API client
     * @returns Promise<number> - Returns the total count of orders with ASO products
     */
    static async countOrdersWithAsoProducts(admin: any): Promise<number> {
        try {
            let totalCount = 0;
            let hasNextPage = true;
            let cursor: string | null = null;
            const processedOrderIds = new Set<string>();

            while (hasNextPage) {
                const response = await admin.graphql(
                    `#graphql
                    query countOrdersWithAsoProducts($cursor: String) {
                        orders(first: 250, after: $cursor) {
                            edges {
                                node {
                                    id
                                    name
                                    lineItems(first: 250) {
                                        nodes {
                                            product {
                                                id
                                                metafield(namespace: "allSignsOptionsAsoAso", key: "asoConfigurationId") {
                                                    value
                                                }
                                            }
                                        }
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

                const orders = data.data?.orders?.edges || [];
                
                // Check each order to see if it contains at least one ASO product
                for (const edge of orders) {
                    const order = edge.node;
                    const orderId = order.id;
                    
                    // Skip if we've already processed this order
                    if (processedOrderIds.has(orderId)) {
                        continue;
                    }
                    
                    processedOrderIds.add(orderId);
                    
                    // Check if any line item has a product with the ASO metafield
                    const lineItems = order.lineItems?.nodes || [];
                    const hasAsoProduct = lineItems.some((item: any) => {
                        const metafield = item.product?.metafield;
                        return metafield && metafield.value && metafield.value !== "0";
                    });
                    
                    if (hasAsoProduct) {
                        totalCount++;
                    }
                }

                hasNextPage = data.data?.orders?.pageInfo?.hasNextPage || false;
                cursor = data.data?.orders?.pageInfo?.endCursor || null;
            }

            return totalCount;
        } catch (error) {
            console.log("Error counting orders with ASO products:", error);
            return 0;
        }
    }

}