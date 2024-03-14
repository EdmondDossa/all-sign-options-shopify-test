import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Grid,
  IndexTable,
  InlineGrid,
  InlineStack,
  Page,
  Select,
  Text,
  TextField,
  useIndexResourceState,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { ViewIconBtn } from "~/components/buttons/ViewIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  Form,
  Link,
  NavLink,
  Outlet,
  json,
  redirect,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import BiSaveIcon from "~/components/icons/BiSaveIcon";
import uploadIcon from "~/components/icons/uploadIcon";
import { FileInput } from "~/components/inputs/FileInput";
import { authenticate } from "~/shopify.server";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { ConfigurationType } from "~/types/ConfigurationType";
import ConfigurationService from "~/models/Configuration.service";


export const loader = async ({request, params }:LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  let configuration = null;
  
  if (id) {
    configuration = await prisma.configuration.findUnique({ where: { id: parseInt(id), sessionId: session.id } });
  }
  
  return json({ configuration})
}

export default function ConfigurationEdit() {
  const submit = useSubmit();
  let {configuration} = useLoaderData<typeof loader>()
  const [formData, setFormData] = useState<ConfigurationType>((configuration as ConfigurationType)||{
    name: "",
    description: "",
    icon: "",
    popupImg: ""
  });

  
  const handleName = (value: string) => setFormData({...formData, name:value})

  const handleDescription = (value: string) => setFormData({...formData, description:value})

  const handleIcon = (value: string) => setFormData({...formData, icon:value})

  const handlePopupImg =  (value: string) => setFormData({...formData, popupImg:value})



  const navigate = useNavigate();
  const onBack = () => {
    
    navigate("..");
  };

 
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(" log is nt errors");
    submit({ ...formData }, { method: "POST" });
  };
  

  return (
    <Page fullWidth>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
          <Form onSubmit={handleSubmit} method="POST">
            <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="600">
                  <Text as="h6" variant="bodyMd" fontWeight="bold" >  Create new configuration</Text>
            </Box>
            </SpacingBackground>
            <Divider borderWidth="100" />
             <SpacingBackground backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
              <TextField
                label="Name configuration"
                value={formData.name}
                onChange={handleName}
                autoComplete="on"
              />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                <TextField
                label="Description"
                value={formData.description}
                onChange={handleDescription}
                autoComplete="on"
              />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                <FileInput title="Upload icon" path={formData.icon} handlePath={handleIcon} />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                <FileInput title="Upload Popupimg" path={formData.popupImg} handlePath={handlePopupImg} />
                </Grid.Cell>

             
          
              </Grid>
            </Box>
            </SpacingBackground>
            <Divider borderWidth="100" />
             <SpacingBackground backgroundColor="#F9F9F9">

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
            </SpacingBackground>
          </Form>
      </SpacingBackground>
    </Page>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {

  const { session,admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const configuration: ConfigurationType = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    icon: formData.get('icon') as string,
    popupImg: formData.get('popupImg') as string,
  }
  if (id) {
    configuration.id = parseInt(id);
    await ConfigurationService.updateConfiguration(configuration, session.id)

    return redirect("..");
  } else {
    await ConfigurationService.addConfiguration(configuration, session.id)
  }
 


  return redirect("../demo");
};
