import { ActionFunctionArgs , redirect} from "@remix-run/node";
import { Form, Outlet, useNavigate , useFetcher, json, useSubmit} from "@remix-run/react";
import {
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  InlineGrid,
  InlineStack,
  Page,
  Text,
  TextField,
  Thumbnail,
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { FileInput } from "~/components/inputs/FileInput";
import prisma from "~/db.server";
import { authenticate } from "~/shopify.server";

interface ConfigurationType {
  name: string;
  description: string;
  icon: string;
  popupImg: string;
}

export default function ConfigurationCreate() {
  const submit = useSubmit()
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ConfigurationType>({
    name: "",
    description: "",
    icon: "",
    popupImg: ""
  });

  
  const handleName = (value: string) => setFormData({...formData, name:value})

  const handleDescription = (value: string) => setFormData({...formData, description:value})

  const handleIcon = (value: string) => setFormData({...formData, icon:value})

  const handlePopupImg =  (value: string) => setFormData({...formData, popupImg:value})
 


  const onBack = () => {
    navigate('/app/configuration')
  }

  const handleSubmit = (e:any) => {
    e.preventDefault(); 
    submit({...formData}, {method:"POST"})
    
  }

 


  return (
    <Page fullWidth>
      <SpacingBackground width="100%"  height="auto"  >
        <BoxBackground>
          <Box padding="300">
            <Text as="h2" variant="headingMd">
              Create new configuration
            </Text>
          </Box>
          <Divider borderWidth="050" />

                  <Form onSubmit={handleSubmit} method="POST" >
                      <Box paddingInline="300" paddingBlock="1000">
                          
            <InlineGrid columns={2} gap="800">
              {" "}
              <TextField
                label="Description"
                value={formData.description}
                onChange={handleDescription}
                autoComplete="off"
              />
                <FileInput title="Upload icon" path={formData.icon} handlePath={handleIcon} />
                <FileInput title="Upload Popupimg" path={formData.popupImg} handlePath={handlePopupImg} />
                
            </InlineGrid>
                      </Box>
                      <Divider borderWidth="050" />
                      <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <button className="back-large-btn" type="button" onClick={onBack}>
                  <Box paddingInline="1000">
                      <InlineStack gap="300">
                          <RayStartArrowIcon /> <span style={{color: "black", fontWeight:"bold" }} > Back</span>
                      </InlineStack>
                  </Box>
                </button>
                <button  className="next-large-btn" type="submit">
                  <Box paddingInline="1000"  >
                      <InlineStack gap="300"  >
                      <span style={{color: "white", fontWeight:"bold" }} > Next</span><RayEndArrowIcon/>
                      </InlineStack>
                  </Box>
                </button>
                          </InlineStack>
                      </Box>
          </Form>
        </BoxBackground>
      </SpacingBackground>
    </Page>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  
    return redirect('/app');

  const { session,admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const updates: ConfigurationType = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    icon: formData.get('icon') as string,
    popupImg: formData.get('popupImg') as string,
  }

  await prisma.configuration.create({
    data: { ...updates, sessionId: session.id }
  });

  console.log("after save");
   

 
}




