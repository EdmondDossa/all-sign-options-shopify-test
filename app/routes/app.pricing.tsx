import {
    Page,
    Box,
    Button,
    Card,
    CalloutCard,
    Text,
    Grid,
    Divider,
    BlockStack,
    ExceptionList,
    InlineStack
  } from "@shopify/polaris";
  import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
  import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { authenticate, MONTHLY_PRO_PLAN, MONTHLY_STARTER_PLAN, YEARLY_PRO_PLAN, YEARLY_STARTER_PLAN } from "../shopify.server";
import {
    CheckIcon,XIcon
  } from '@shopify/polaris-icons';
import { PRICING_PLANS, getPlan, isTest } from "~/utils/pricing";
import { jFlashMessage } from "~/utils/message-flash";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useId } from "react";
  

  export async function loader({ request }:LoaderFunctionArgs) {
    const { billing ,admin, session} = await authenticate.admin(request);
    const plan = await getPlan(billing);
  
    try {
      
      if (plan === "free") {
        throw new Error('No active plan');
      }
  
      // Check if the shop has an active subscription
      const billingCheck = await billing.require({
        plans: [MONTHLY_PRO_PLAN, MONTHLY_STARTER_PLAN, YEARLY_STARTER_PLAN, YEARLY_PRO_PLAN],
        isTest:isTest(),
        onFailure: async () => billing.request({ plan: MONTHLY_STARTER_PLAN, isTest:isTest() }),
      });
  
      // If the shop has an active subscription, log and return the details
      const subscription = billingCheck.appSubscriptions[0];
     
    
      
      return json({ billing, subscription: subscription,plan });
  
    } catch (error:any) {
      // If the shop does not have an active plan, return an empty plan object
      if (error.message === 'No active plan') {
       
        return json({ billing, subscription: { name: "free" } ,plan});
      }
      // If there is another error, rethrow it
      throw error;
    }
  }
  
  
  let planData = [
    {
      title: "Basic",
      description: "Basic  with basic features",
      price: "39",
      year_price: "375",
      action: " Subscribe to Monthly",
      year_action: "Subscribe to Yearly",
      name: "starter",
      url: "/app/subscribe/monthly-starter",
      year_url: "/app/subscribe/yearly-starter",
      features: [
        "1 configuration",
        "0 templates ",
        "2  simple materials",
        "0 advanced material",
        "0  additionnal  component",
        "10 Sizes without custom",
        "10 colors without custom",
        "5  shapes",
        "5 fixing methods",
        "2 borders",
        "mail notifications on order",
      ]
    },
    {
      title: "Premium",
      description: "Premium  with advanced features",
      price: "79",
      year_price: "759",
      name: "pro",
      action: " Subscribe to Monthly",
      year_action: "Subscribe to Yearly",
      url: "/app/subscribe/monthly-pro",
      year_url: "/app/subscribe/yearly-pro",
      features: [
        "unlimited configuration",
        "unlimited templates per  configuration",
        "unlimited  simple materials",
        "unlimited advanced material",
        "unlimited  additionnal  component",
        "unlimited Sizes without custom",
        "unlimited colors without custom",
        "12  shapes",
        "20 fixing methods",
        "4 borders",
        "mail notifications on order",
      ]
    },
  ]
  
  export default function PricingPage() {
    const { plan, subscription } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const shopify = useAppBridge();
    const  submit =  useSubmit()
    const id = useId()
    useHandleFlashMessage();

    const handleSubmit = ()=>{
      submit({}, { method: "POST" });
    }
  
  
    return (
      <Page>
        <ui-title-bar title="Pricing" />
        <CalloutCard
            title="Subscription to all signs options"
            illustration="/aso_logo.png"
            primaryAction={plan !="free"?{
              content: 'Cancel  Current Plan',
              onAction: ()=>{
                shopify.modal.show(id)
              }
            } : {
              content: 'Subscribe monthly starter plan',
              url: '/app/subscribe/monthly-starter',
              
            }}
          >
            { plan == PRICING_PLANS.PRO? (
              <p>
                You're currently on pro plan. All features are unlocked.
              </p>
          ) : plan == PRICING_PLANS.STARTER ?
            (
              <p>
                You're currently on starter plan. Upgrade to pro to unlock more features.
              </p>
              ) : (
                <p>
              You're currently on free plan. Subscribe  to unlock  features.
            </p>)}
        </CalloutCard>
  
        <div style={{ margin: "0.5rem 0"}}>
          <Divider />
        </div>
  
        <Grid>
  
          {planData.map((plan_item, index) => (
            <Grid.Cell key={index} columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
              <Card background={ plan_item.name == plan ? "bg-surface-success" : "bg-surface" } >
                <Box padding="400">
                  <Text as="h1" variant="headingMd" fontWeight="bold">
                    {plan_item.title} 
                  </Text>
                  <Box as="div">
                    {plan_item.description}
                    <br />
                    <InlineStack>

                      <Text as="p" variant="headingLg" fontWeight="bold">
                        {plan_item.price === "0" ? "" : "$" + plan_item.price} 
                      </Text>  <Text as="p" tone="subdued" variant="bodyMd" >
                        /month
                      </Text>
                    </InlineStack>
                    <Text as="p" tone="success" variant="bodyMd" >
                      {plan_item.year_price 
                          === "0" ? "" : "$" + plan_item.year_price} /year and save 20% on subscription
                    </Text>
                  </Box>
  
                  <div style={{ margin: "0.5rem 0"}}>
                    <Divider />
                  </div>
  
                  <BlockStack gap="100">
                    {plan_item.features.map((feature, index) => (
                      <ExceptionList
                        key={index}
                        items={[
                          {
                            icon: feature.startsWith("0") ? XIcon : CheckIcon,
                            status: feature.startsWith("0") ? 'critical' : undefined,
                            description: feature,
                          },
                        ]}
                      />
                    ))}
                  </BlockStack>
                  <div style={{ margin: "0.5rem 0"}}>
                    <Divider />
                  </div>
  
                  { 
                    plan_item.name != plan ? (
                      <InlineStack gap="300">

                      <Button  url={plan_item.url}>
                        {plan_item.action}
                      </Button>
                        <Button variant="primary" tone="success" url={plan_item.year_url}>
                        {plan_item.year_action}
                      </Button>
                      </InlineStack>
                    ) : (
                      <InlineStack gap="300">
                          
                      <Text as="p" variant="bodyMd">
                        You're currently on this plan
                          </Text>
                          
                         {subscription.name.startsWith("Monthly") ? <Button variant="primary" tone="success" url={plan_item.year_url}>
                        {plan_item.year_action.replace("Subscribe to", "upgrade to") }
                      </Button>: <Button variant="primary" tone="success" url={plan_item.url}>  {plan_item.action.replace("Subscribe to", "switch to") }
                      </Button>}
                      </InlineStack>
                        
                    )
                 }
                </Box>
              </Card>
            </Grid.Cell>
          ))}
  
        </Grid>

        <Modal variant="small" id={id}>
                <Box padding="400">
                    <Text alignment="center" as="h3" variant="bodyMd">Are you sure you want to cancel this subscription? This action cannot be undone</Text>
                </Box>
              
                <TitleBar title="Subscription Cancel ">
                    <button variant="primary" tone="critical" onClick={() => {
                        handleSubmit()
                        shopify.modal.hide(id)
                    }}>Confirm  cancelling</button>
                    <button onClick={() => shopify.modal.hide(id)}>return back</button>
                </TitleBar>
            </Modal>
  
      </Page>
    );
  }





export const action = async ({ request }:ActionFunctionArgs) => {
  const { billing } = await authenticate.admin(request);
  const billingCheck = await billing.require({
    plans: [MONTHLY_STARTER_PLAN, MONTHLY_PRO_PLAN, YEARLY_PRO_PLAN, YEARLY_STARTER_PLAN],
    isTest:isTest(),
    onFailure: async () => billing.request({ plan: MONTHLY_STARTER_PLAN, isTest:isTest() }),
  });

  const subscription = billingCheck.appSubscriptions[0];

  const cancelledSubscription = await billing.cancel({
    subscriptionId: subscription.id,
    isTest: isTest(),
    prorate: true,
  });

  return json({ ... jFlashMessage("Subscription cancelled successfully") })
}
