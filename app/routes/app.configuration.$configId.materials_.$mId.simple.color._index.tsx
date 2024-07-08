import {
  Badge,
  Box,
  ButtonGroup,
  Divider,
  Grid,
  IndexTable,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { ConfigColor, ConfigCustomColor } from "~/types/ConfigDataType";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import MaterialColorService from "~/models/MaterialColors.service";
import { jFlashMessage } from "~/utils/message-flash";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { getError } from "~/utils/error-getting";
import { FileInput } from "~/components/inputs/FileInput";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { z } from "zod";
import { booleanTransform, stringTransform } from "~/utils/transfomerZod";
import { parseWithZod } from "@conform-to/zod";
import { fileUrl } from "~/utils/fileUrl";
import { PRICING_PLANS } from "~/utils/pricing";

export default function MaterialColorIndex() {
  const submit = useSubmit();
  const navigate = useNavigate();

  const actionData = useActionData<typeof action>();

  

  let {  colors, customColors, plan } = useOutletContext<{
    colors: ConfigColor[];
    customColors: ConfigCustomColor;
    plan: string;
  }>();

  const [formData, setFormData] = useState<any>(
    customColors || {
      active: false,
      label: "Custom Colors",
      prevImg: "",
    },
  );

  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data = { ...formData };

    submit(data, { method: "POST" });
  };

  useHandleFlashMessage();

  const navigation = useNavigation();
  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handeleDefault = (id: number) => {
    colors = colors.map((curr, index) => {
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

  const colorsTab = colors
    ? colors.map((color, index) => {
        return {
          id: `${index}`,
          title: `${color?.name}`,
          textColor: color?.textColor?.active
            ? `${color?.textColor?.codeHex}`
            : "Disable",
          patternActive: color?.pattern?.active,
          BackgroundColor: color?.pattern?.active
            ? `${color?.pattern?.url}`
            : `${color?.pattern?.codeHex}`,
          price: `${color?.additionalPrice}`,
          isDefault: color.isDefault,
        };
      })
    : [];

  const resourceName = {
    singular: "Color",
    plural: "Colors",
  };

  const rowMarkup = colorsTab.map(
    (
      {
        id,
        title,
        textColor,
        BackgroundColor,
        patternActive,
        price,
        isDefault,
      },
      index,
    ) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {title}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          <Badge tone="critical">{textColor}</Badge>
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          {patternActive ? (
            <img
              style={{ height: "30px" }}
              src={fileUrl(BackgroundColor)}
              alt={"color" + title}
            />
          ) : (
            <Badge tone="info">{BackgroundColor}</Badge>
          )}
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          <Badge tone="success">{price}</Badge>
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
            <InlineStack gap="100" align="end">
{ plan == PRICING_PLANS.STARTER ||      <button
                className="primary-btn"
                type="button"
                onClick={handleEdit}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300">
                    <PlusIcon />
                    <span className="primary-btn-text">
                    Add material Color 
                    </span>
                  </InlineStack>
                </Box>
              </button>}
            </InlineStack>
          </Box>
          <Divider borderWidth="050" />
        </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={colorsTab.length}
          headings={[
            { title: "Title" },
            { title: "Text color", alignment: "center" },
            { title: "Background color", alignment: "center" },
            { title: "Additional price", alignment: "center" },
            { title: "Default", alignment: "center" },
            { title: "Action", alignment: "center" },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
      </BoxBackground>
{ plan == PRICING_PLANS.STARTER ||    <SpacingBackground width="100%" height="auto" margin="16px 0px ">
        <BoxBackground>
          <Form onSubmit={handleFormSubmit} method="POST">
            <Box paddingInline="300" paddingBlock="1000">
              <Box paddingBlockEnd="600">
                <InlineStack blockAlign="center" gap="200">
                  <Text as="strong" variant="headingMd">
                  Enable Custom Color
                  </Text>
                  <ReactSwitchCustom
                    checked={formData.active}
                    setChecked={(value: boolean) => {
                      handleInputChange("active", value);
                    }}
                  />
                </InlineStack>
              </Box>
              {formData.active && (
                <Grid gap={{ lg: "30px" }}>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <TextField
                      label="Label"
                      value={`${formData.label}`}
                      onChange={(value) => {
                        handleInputChange("label", value);
                      }}
                      autoComplete="on"
                      error={getError(actionData, "label")}
                    />
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <FileInput
                      error={getError(actionData, "image")}
                      title="Preview Image"
                      path={formData.prevImg}
                      handlePath={(value: string) => {
                        handleInputChange("prevImg", value);
                      }}
                    />
                  </Grid.Cell>
                </Grid>
              )}
            </Box>
            <Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <BiSaveBtn isLoading={isSubmitting} title="Save" />
              </InlineStack>
            </Box>
          </Form>
        </BoxBackground>
      </SpacingBackground>}
    </div>
  );
}

const formSchema = z.object({
  label: z.string({ required_error: "Label is required" }),
  prevImg: z.string().nullish().transform(stringTransform),
  active: z.any().transform(booleanTransform).pipe(z.boolean()),
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
      await MaterialColorService.delete(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Material  color deleting is completed successfull"),
      });
      break;
    }
    case "PUT": {
      const id = formData.get("id") as string;
      await MaterialColorService.setDefault(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Default color is defined successfull"),
      });
      break;
    }

    case "POST": {
      const submission = parseWithZod(formData, { schema: formSchema });

      if (submission.status !== "success") {
        return json({ status: false, message: null, errors: submission.error });
      }

      let customColor: ConfigCustomColor =
        submission.value as ConfigCustomColor;
      if (customColor) {
        let res = await MaterialColorService.editCustom(
          configId,
          session.id,
          mId,
          customColor,
        ); // Custom Size  updated is completed successfully
        return res
          ? json({
              ...jFlashMessage(
                "Custom color  updated is completed successfully",
              ),
            })
          : json({
              ...jFlashMessage("Errors on color updating", "error"),
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
