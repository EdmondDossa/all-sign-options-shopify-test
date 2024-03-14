import {
  Box,
  ButtonGroup,
  Checkbox,
  Divider,
  Grid,
  IndexTable,
  InlineGrid,
  InlineStack,
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
  redirect,
  useNavigate,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import BiSaveIcon from "~/components/icons/BiSaveIcon";

export default function ManageSizeCreate() {
  const [checked, setChecked] = useState(true);

  const [selected, setSelected] = useState("1");

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );

  const options = [
    { label: "Design page", value: "1" },
    { label: "My account", value: "2" }
  ];

  const [value, setValue] = useState("12");
  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );
  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

  return (
      <SpacingBackground width="100%" height="auto" margin="10px 0px ">
        <Form method="POST">
          <SpacingBackground backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 12, xl: 12 }}>
                  <Select
                    label="Select the configuration Page"
                    options={options}
                    onChange={handleSelectChange}
                    value={selected}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 12, xl: 12 }}>
                  <InlineStack align="end" gap="600">
                    <button className="next-large-btn" type="submit">
                      <Box paddingInline="200">
                        <InlineStack gap="300">
                          <PlusIcon/>
                          <span style={{ color: "white", fontWeight: "bold" }}>
                          Add name page
                          </span>
                        </InlineStack>
                      </Box>
                    </button>
                  </InlineStack>
                </Grid.Cell>
              </Grid>
            </Box>
          </SpacingBackground>
          <SpacingBackground backgroundColor="#F8F9FB" margin="6px 0px ">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 12, xl: 12 }}>
                  <TextField
                    label="Template page"
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Grid.Cell>
              </Grid>
            </Box>
          </SpacingBackground>
          <Divider borderWidth="100" />
          <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <button className="next-large-btn" type="submit">
                  <Box paddingInline="1000">
                    <InlineStack gap="300">
                      <BiSaveIcon />
                      <span style={{ color: "white", fontWeight: "bold" }}>
                        {" "}
                        Save
                      </span>
                    </InlineStack>
                  </Box>
                </button>
              </InlineStack>
            </Box>
          </SpacingBackground>
        </Form>
      </SpacingBackground>
  );
}

export const action = () => {
  return redirect("..");
};
