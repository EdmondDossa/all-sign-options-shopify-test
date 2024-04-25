import {
  Text,
  Box,
  ButtonGroup,
  Divider,
  IndexTable,
  InlineStack,
} from "@shopify/polaris";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import { Form, Link, NavLink, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import SettingBorderService from "~/models/SettingBorder.service";
import {  BorderType } from "~/types/SettingsType";
import { fileUrl } from "~/utils/fileUrl";

export const loader = async ({request}:LoaderFunctionArgs) => { 
  const { session, admin } = await authenticate.admin(request);

  const borders:BorderType[]|null = await SettingBorderService.get(session.id);
 
  return  json({borders})
}

export default function SettingBorderIndex() {
  const { borders } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  

 
  const resourceName = {
    singular: "Border",
    plural: "Borders",
  };

  const rowMarkup = borders?.map(
    ({  name, icon , value}, index) => (
      <IndexTable.Row id={value} key={value} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {name}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
        <img style={{height: "30px"}}
            src={fileUrl(icon)}
            alt={"border" + name}
          />
        </IndexTable.Cell>
       
        

        <IndexTable.Cell>
          <ButtonGroup gap="loose">
            <EditIconBtn size="micro" />
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  return (
    
    <SpacingBackground margin="10px 0px ">
        <BoxBackground>
          <Box padding="400" >
            <InlineStack gap="100" align="start">
              <Text as="h6" variant="bodyMd" fontWeight="bold">List of Border</Text>
            </InlineStack>
          </Box>
          <Divider borderWidth="050" />
        </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={borders?borders.length:0}
          sortable={[false, true, true, true, true, true, true]}
          headings={[
            { title: "Title" },
            { title: "Icon" },
            { title: "Action" },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
    </SpacingBackground>
     
    
  );
}
