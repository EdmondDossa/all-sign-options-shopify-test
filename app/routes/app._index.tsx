import { useNavigate } from "@remix-run/react";
import {
  BlockStack,
  Box,
  EmptyState,
  Grid,
  InlineStack,
  Page,
  Text,
} from "@shopify/polaris";
import ConceptSharingIcon from "~/components/icons/ConceptSharingIcon";
import ConfigurationBlackIcon from "~/components/icons/ConfigurationBlackIcon";
import ConfigurationIcon from "~/components/icons/ConfigurationIcon";
import SettingsGeneralBlackIcon from "~/components/icons/SettingsGeneralBlackIcon";
import SettingsGeneralIcon from "~/components/icons/SettingsGeneralIcon";
import SupportAgentIcon from "~/components/icons/SupportAgentIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";

export default function Index() {
  const navigate = useNavigate();


  return (
    <Page fullWidth>
      <Box width="100%" minHeight="100%" padding="300">
        <SpacingBackground backgroundColor="#FFFFFF">
          <BlockStack gap="300">
            <div className="aso-card-welcome" >
              <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Box padding="400" width="97%" >
                <BlockStack gap="400">

               
                  <Text as="span" fontWeight="semibold" variant="bodyLg">
                    Welcome to All Signs Options
                  </Text>
                  <Text as="h2"  fontWeight="bold" variant="headingXl">
                    Test our <br/> plugin now
                  </Text>

                  <Text as="p" variant="bodyMd">
                    Every feature we offer is a promise of quality, efficiency
                    and performance. Explore how our innovations can take your
                    business to new heights.
                  </Text>
                  <button className="aso-welcome-btn">
                    Explore Pricing  Plans
                  </button>
                  </BlockStack>
                </Box>

              </Grid.Cell>
           
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <img src="/aso_welcom.png"  className="aso-welcome-img" />
                </Grid.Cell>
             
               
                
              </Grid>
            </div>
            <Box paddingInline="600" paddingBlock="400">

            <Text as="span" fontWeight="bold" variant="headingLg"> What  may be interested in </Text>
            </Box>

            <Box paddingInline="600" paddingBlock="400">

              <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                 <WelcomeCard icon={<SupportAgentIcon/>} title="Get Support" description="basic task management tools" background="linear-gradient(175deg, #229d6e 46%, #133e2e 95%)"/>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                 <WelcomeCard icon={<ConceptSharingIcon/>} title="Documentations" description="basic task management tools" background="linear-gradient(175deg, #9d7b22 46%, #2f361d 95%)"/>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                 <WelcomeCard onClik={()=>navigate("/app/configuration")} icon={<ConfigurationBlackIcon/>} title="Configurations" description="All configurator data" background="linear-gradient(175deg, #a871ec 46%, #33344c 95%)"/>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                 <WelcomeCard onClik={()=>navigate("/app/settings")} icon={<SettingsGeneralBlackIcon/> } title="Global Settings" description="All things that plugin needs" background="linear-gradient(175deg, #7ad0fb 46%, #274a4f 95%)"/>
              </Grid.Cell>
              </Grid>
            </Box>
            

            
          </BlockStack>
        </SpacingBackground>
      </Box>
    </Page>
  );
}


const WelcomeCard = ({title, description, icon, onClik, background}:{
  title:string, 
  description?:string, 
  icon?:any, 
  onClik?:any, 
  background:string
})=>{


  return (
  <div className="aso-welcome-card" style={{background:background}} onClick={()=>{onClik && onClik()}}>
    <div className="aso-welcome-icon">
  {icon||""}
    </div>
    <div >
      <Text as="span" fontWeight="semibold" variant="bodyMd">{title} </Text>
      <Text as="p" variant="bodySm" >{description||""} </Text>
    </div>
  </div>
  );

}
