import {
  Badge,
  BlockStack,
  Box,
  ButtonGroup,
  Divider,
  Grid,
  IndexTable,
  InlineError,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  Form,
  json,
  useActionData,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { BorderType } from "~/types/SettingsType";
import { BorderSettingType, ConfigBorder } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { jFlashMessage } from "~/utils/message-flash";
import MaterialBorderService from "~/models/MaterialBorderService.service";
import { authenticate } from "~/shopify.server";
import { ActionFunctionArgs } from "@remix-run/node";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { getError } from "~/utils/error-getting";
import { TextColorField } from "~/components/inputs/TextColorField";
import { DeleteNowIconBtn } from "~/components/buttons/DeleteNowIconBtn";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { booleanTransform, jsonTransform, stringTransform } from "~/utils/transfomerZod";
import { fileUrl } from "~/utils/fileUrl";
import { FileInput } from "~/components/inputs/FileInput";

export default function MaterialBorderIndex() {
  const submit = useSubmit();

  let { manageBorders, borders, borderSetting } = useOutletContext<{
    manageBorders: BorderType[];
    borders: ConfigBorder[];
    borderSetting: any;
  }>();

  useHandleFlashMessage();

  const navigation = useNavigation();
  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const navigate = useNavigate();

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handeleDefault = (id: number) => {
    borders = borders.map((curr, index) => {
      if (index === id) {
        curr.isDefault = true;
      } else {
        curr.isDefault = false;
      }
      return curr;
    });

    submit({ id: id }, { method: "PUT" });
  };

  const handleUpdate = (id: number) => {
    submit({ id: id }, { method: "GET", action: "edit" });
  };

  const handleEdit = () => {
    navigate("edit");
  };

  const actionData = useActionData<typeof action>();

  console.log("actionData Data data", actionData);

  const [formData, setFormData] = useState<any>(
    {
      colors: [],
      enableBorderWidth: true,
      enableBorderColor: true,
      borderColorsLabel: "Borders Colors",
      customColorsPrevImg: '',
      ...borderSetting||{}
    },
  );

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data = { ...formData, colors: JSON.stringify(formData.colors) };

    submit(data, { method: "POST" });
  };

  const handleAddColor = () => {
    if (!formData.colors) {
      formData.colors = [];
    }
    formData.colors.push({
      name: "",
      codeHex: "#FFFFFF",
      additionalPrice: 0,
    });

    setFormData({ ...formData });
  };

  const handleDeleteColor = (index: number) => {
    formData.colors.splice(index, 1);
    setFormData({ ...formData });
  };

  console.log("data", borders, manageBorders);

  const bordersTab = borders
    ? borders.map((currBorder, index) => {
        let border = manageBorders.find(
          (manageBorder, manageIndex) =>
            manageIndex == currBorder.manageBorderId,
        );
        return {
          id: `${index}`,
          title: `${border?.name}`,
          icon: `${border?.icon}`,
          price: `${currBorder.additionalPrice}`,
          isDefault: currBorder.isDefault,
        };
      })
    : [];

  const resourceName = {
    singular: "Border",
    plural: "Borders",
  };

  const rowMarkup = bordersTab.map(
    ({ id, title, icon, price, isDefault }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {title}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          <img
            style={{ height: "30px" }}
            src={fileUrl(icon)}
            alt={"border" + title}
          />
        </IndexTable.Cell>

        <IndexTable.Cell className="td-center">
          <Badge tone="critical">{price}</Badge>
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          <ReactSwitchCustom
            checked={isDefault || false}
            setChecked={() => (isDefault ? "" : handeleDefault(index))}
          ></ReactSwitchCustom>
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          <ButtonGroup fullWidth noWrap gap="loose">
            <EditIconBtn
              size="micro"
              onClick={() => {
                handleUpdate(parseInt(id));
              }}
            />
            <DeleteIconBtn
              size="micro"
              onClick={() => {
                handeleDelete(parseInt(id));
              }}
            />
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  return (
    <div>
      <BoxBackground>
        <BoxBackground>
          <Box padding="150">
            {manageBorders?.length == borders?.length || (
              <InlineStack gap="100" align="end">
                <button
                  className="primary-btn"
                  type="button"
                  onClick={handleEdit}
                >
                  <Box paddingInline="300">
                    <InlineStack gap="300">
                      <PlusIcon />
                      <span className="primary-btn-text"> Add new border</span>
                    </InlineStack>
                  </Box>
                </button>
              </InlineStack>
            )}
          </Box>
          <Divider borderWidth="050" />
        </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={bordersTab.length}
          headings={[
            { title: "Title" },
            { title: "Icon", alignment: "center" },
            { title: "Additional Price", alignment: "center" },
            { title: "Default", alignment: "center" },
            { title: "Action", alignment: "center" },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
      </BoxBackground>

      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
        <BoxBackground>
          <Form onSubmit={handleFormSubmit} method="POST">
            <Box paddingInline="300" paddingBlock="1000">
              <BlockStack gap="300">
                <Text as="strong" variant="headingMd">
                  Border settings
                </Text>
                <BlockStack gap="300">
                  <Text as="h3" variant="bodyMd" fontWeight="bold">
                    Define border colors
                  </Text>
                  <Box maxWidth="350px" width="350px">
                    <TextField
                      autoComplete="on"
                      onChange={(value) => {
                        formData.borderColorsLabel = value;
                        setFormData({ ...formData });
                      }}
                      label="Label"
                      value={formData.borderColorsLabel}
                    />
                  </Box>
                  <Grid gap={{ lg: "30px" }}>
                    {formData.colors?.map((color: any, index: number) => (
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}
                      >
                        <InlineStack
                          gap={"300"}
                          blockAlign="end"
                          align="space-between"
                          wrap={false}
                        >
                          <TextField
                            autoComplete="on"
                            onChange={(value) => {
                              color.name = value;
                              formData.colors[index] = color;
                              setFormData({ ...formData });
                            }}
                            label="Name"
                            value={color.name}
                          />
                          <InlineStack
                            gap={"300"}
                            blockAlign="end"
                            align="space-between"
                            wrap={false}
                          >
                            <TextColorField
                              color={color.codeHex}
                              setColor={(value: any) => {
                                color.codeHex = value;
                                formData.colors[index] = color;
                                setFormData({ ...formData });
                              }}
                            />
                            <TextField
                              type="number"
                              autoComplete="on"
                              onChange={(value) => {
                                color.additionalPrice = value;
                                formData.colors[index] = color;
                                setFormData({ ...formData });
                              }}
                              onBlur={(value) => {
                                formData.colors[index].additionalPrice =
                                  parseFloat(color.additionalPrice || "0");
                                setFormData({ ...formData });
                              }}
                              label="Price"
                              value={`${color.additionalPrice}`}
                            />
                            <DeleteNowIconBtn
                              onClick={() => handleDeleteColor(index)}
                            />
                          </InlineStack>
                        </InlineStack>
                        {true && (
                          <InlineError
                            message={
                              getError(actionData, `colors[${index}].name`) ||
                              getError(
                                actionData,
                                `colors[${index}].codeHex`,
                              ) ||
                              ""
                            }
                            fieldID="myFieldID"
                          />
                        )}
                      </Grid.Cell>
                    ))}
                  </Grid>
                  <Box width="150px">
                    <BiAddBtn
                      title="Add color"
                      handleClick={() => handleAddColor()}
                    />
                  </Box>
                </BlockStack>

                <InlineStack gap="600">
                  <InlineStack blockAlign="center" gap="200">
                    <Text as="strong" variant="headingMd">
                      Enable border width
                    </Text>
                    <ReactSwitchCustom
                      checked={formData.enableBorderWidth}
                      setChecked={(value: boolean) => {
                        formData.enableBorderWidth = value;
                        setFormData({ ...formData });
                      }}
                    />
                  </InlineStack>

                  <InlineStack blockAlign="center" gap="200">
                    <Text as="strong" variant="headingMd">
                      Enable border color
                    </Text>
                    <ReactSwitchCustom
                      checked={formData.enableBorderColor}
                      setChecked={(value: boolean) => {
                        formData.enableBorderColor = value;
                        setFormData({ ...formData });
                      }}
                    />


                 
                  </InlineStack>
                </InlineStack>
            { formData.enableBorderColor &&   <Box width="300px">

                 <FileInput title="Custom color preview image"  buttonTitle="upload image"  path={formData.customColorsPrevImg} handlePath={(value:any)=>{formData.customColorsPrevImg = value; setFormData({...formData})}}/>
                </Box>}
              </BlockStack>
            </Box>
            <Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <BiSaveBtn isLoading={isSubmitting} title="Save" />
              </InlineStack>
            </Box>
          </Form>
        </BoxBackground>
      </SpacingBackground>
    </div>
  );
}

const formSchema = z.object({
  colors: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z
        .object({
          codeHex: z.string().nullish().transform(stringTransform),
          name: z.string().nullish().transform(stringTransform),
          additionalPrice: z.number(),
        })
        .array(),
  ),
  borderColorsLabel: z.string().nullish().transform(stringTransform),
  customColorsPrevImg: z.string().nullish().transform(stringTransform),
  enableBorderWidth: z.any().transform(booleanTransform).pipe(z.boolean()),
  enableBorderColor: z.any().transform(booleanTransform).pipe(z.boolean()),
});

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");

  const method = request.method;
  const formData = await request.formData();

  switch (method) {
    case "DELETE": {
      const id = formData.get("id") as string;
      console.log("start deleting");
      await MaterialBorderService.delete(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Border deleting is completed successfull"),
      });
      break;
    }
    case "PUT": {
      const id = formData.get("id") as string;
      await MaterialBorderService.setDefault(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Default border is defined successfull"),
      });
      break;
    }
    case "POST": {
      const submission = parseWithZod(formData, { schema: formSchema });

      if (submission.status !== "success") {
        return json({ status: false, message: null, errors: submission.error });
      }

      let borderSetting: BorderSettingType =
        submission.value as BorderSettingType;
      if (borderSetting) {
        let res = await MaterialBorderService.editSetting(
          configId,
          session.id,
          mId,
          borderSetting,
        ); // Custom Size  updated is completed successfully
        return res
          ? json({
              ...jFlashMessage(
                "Border setting  updated is completed successfully",
              ),
            })
          : json({
              ...jFlashMessage("Errors on setting updating", "error"),
            });
      } else {
        return;
      }
      break;
    }
    default:
      break;
  }

  return null;
};
