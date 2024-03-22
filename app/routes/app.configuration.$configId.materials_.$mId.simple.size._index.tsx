import {
  Badge,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  ChoiceList,
  Divider,
  Grid,
  IndexFilters,
  IndexTable,
  InlineGrid,
  InlineStack,
  Layout,
  Page,
  Select,
  Text,
  TextField,
  useIndexResourceState,
  useSetIndexFiltersMode,
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
  useActionData,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ConfigCustomSize, ConfigSize } from "~/types/ConfigDataType";
import { SizeType } from "~/types/ManagePropertyType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { getError } from "~/utils/error-getting";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import MaterialSizeService from "~/models/MateriaSizeService.service";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";

export default function MaterialSizeIndex() {
  const submit = useSubmit();
  let { customSize, allSizes, manageSizes } = useOutletContext<{
    customSize: ConfigCustomSize;
    allSizes: ConfigSize[];
    manageSizes: SizeType[];
  }>();

  useHandleFlashMessage();

  const actionData = useActionData<typeof action>();

  const navigation = useNavigation();
  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const navigate = useNavigate();

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handleUpdate = (id: number) => {
    submit({ id: id }, { method: "GET", action: "edit" });
  };

  const handleEdit = () => {
    navigate("edit");
  };

  const [formData, setFormData] = useState<ConfigCustomSize>(
    customSize
      ? (customSize as ConfigCustomSize)
      : {
          active: false,
          width: {
            label: "",
            min: 0,
            max: 0,
          },
          height: {
            label: "",
            min: 0,
            max: 0,
          },
        },
  );

  const handleActive = (value: boolean) =>
    setFormData({ ...formData, active: value });

  const handleWidthLabel = (value: string) => {
    formData.width.label = value;
    setFormData({ ...formData });
  };
  const handleWidthMin = (value: string) => {
    formData.width.min = parseFloat(value);
    setFormData({ ...formData });
  };
  const handleWidthMax = (value: string) => {
    formData.width.max = parseFloat(value);
    setFormData({ ...formData });
  };

  const handleHeightLabel = (value: string) => {
    formData.height.label = value;
    setFormData({ ...formData });
  };
  const handleHeightMin = (value: string) => {
    formData.height.min = parseFloat(value);
    setFormData({ ...formData });
  };
  const handleHeightMax = (value: string) => {
    formData.height.max = parseFloat(value);
    setFormData({ ...formData });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    submit(
      {
        active: formData.active,
        width: JSON.stringify(formData.width),
        height: JSON.stringify(formData.height),
      },
      { method: "POST" },
    );
  };

  const sizes = allSizes?.map((currSize, index) => {
    let manageSize = manageSizes.find(
      (currMsize) => currMsize.id == currSize.manageSizeId,
    );
    let thickness: { active: boolean; value: number } | undefined =
      manageSize?.thickness;
    return {
      id: `${index}mm`,
      title: manageSize?.label,
      width: `${manageSize?.width}mm`,
      height: `${manageSize?.height}mm`,
      price: `${currSize?.basePrice}$`,
      thickness: thickness?.active ? `${thickness.value}mm` : "None",
    };
  });
  const resourceName = {
    singular: "Size",
    plural: "sizes",
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(sizes);
  const rowMarkup = sizes?.map(
    ({ id, title, width, height, thickness, price }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {title}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            <Badge tone="success">{width}</Badge>
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Badge tone="critical">{height}</Badge>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Badge>{thickness}</Badge>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Badge tone="critical">{price}</Badge>
        </IndexTable.Cell>

        <IndexTable.Cell>
          <ButtonGroup gap="loose">
            <EditIconBtn
              size="micro"
              onClick={() => {
                handleUpdate(index);
              }}
            />
            <DeleteIconBtn
              size="micro"
              onClick={() => {
                handeleDelete(index);
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
              <button
                className="primary-btn"
                type="button"
                onClick={handleEdit}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300">
                    <PlusIcon />
                    <span className="primary-btn-text"> Add new SIZE</span>
                  </InlineStack>
                </Box>
              </button>
            </InlineStack>
          </Box>
          <Divider borderWidth="050" />
        </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={sizes ? sizes.length : 0}
          sortable={[false, true, true, true, true, true, true]}
          headings={[
            { title: "Title" },
            { title: "Width" },
            { title: "Height" },
            { title: "Thickness" },
            { title: "price" },
            { title: "Action" },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
      </BoxBackground>

      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
        <BoxBackground>
          <Form onSubmit={handleSubmit} method="POST">
            <Box paddingInline="300" paddingBlock="1000">
              <Box paddingBlockEnd="600">
                <InlineStack blockAlign="center" gap="200">
                  <Text as="strong" variant="headingMd">
                    Custum Size
                  </Text>
                  <ReactSwitchCustom
                    checked={formData.active}
                    setChecked={handleActive}
                  />
                </InlineStack>
              </Box>
              {formData.active && (
                <Grid gap={{ lg: "30px" }}>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <BlockStack gap="800">
                      <TextField
                        label="Width label"
                        value={`${formData.width.label}`}
                        onChange={handleWidthLabel}
                        autoComplete="on"
                        error={getError(actionData, "width.label")}
                      />
                      <TextField
                        size="medium"
                        label="Min width"
                        type="number"
                        value={`${formData.width.min}`}
                        onChange={handleWidthMin}
                        autoComplete="on"
                        error={getError(actionData, "width.min")}
                      />
                      <TextField
                        size="medium"
                        label="Max width"
                        type="number"
                        value={`${formData.width.max}`}
                        onChange={handleWidthMax}
                        autoComplete="on"
                        error={getError(actionData, "width.max")}
                      />
                    </BlockStack>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <BlockStack gap="800">
                      <TextField
                        label="Height label"
                        value={`${formData.height.label}`}
                        onChange={handleHeightLabel}
                        autoComplete="on"
                        error={getError(actionData, "height.label")}
                      />

                      <TextField
                        size="medium"
                        label="Min height"
                        type="number"
                        value={`${formData.height.min}`}
                        onChange={handleHeightMin}
                        autoComplete="on"
                        error={getError(actionData, "height.min")}
                      />
                      <TextField
                        size="medium"
                        label="Max height"
                        type="number"
                        value={`${formData.height.max}`}
                        onChange={handleHeightMax}
                        autoComplete="on"
                        error={getError(actionData, "height.max")}
                      />
                    </BlockStack>
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
      </SpacingBackground>
    </div>
  );
}

const formSchema = z.object({
  active: z
    .any()
    .transform((val) => `${val}`.toLowerCase() == "true")
    .pipe(z.boolean()),
  width: z
    .any()
    .transform((value) => JSON.parse(value as string) || {})
    .pipe(
      z.object({
        label: z
          .string({ required_error: "Width label is required" })
          .min(3, "Width label is too short")
          .max(100, "Width label is too long"),
        min: z.number({
          required_error: "Width min is required",
        }),
        max: z.number({
          required_error: "Width max is required",
        }),
      }),
    ),
  height: z
    .any()
    .transform((value) => JSON.parse(value as string) || {})
    .pipe(
      z.object({
        label: z
          .string({ required_error: "Height label is required" })
          .min(3, "Height label is too short")
          .max(100, "Height label is too long"),
        min: z.number({
          required_error: "Height min is required",
        }),
        max: z.number({
          required_error: "Height max is required",
        }),
      }),
    ),
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
      await MaterialSizeService.delete(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Size deleting is completed successfull"),
      });
      break;
    }
    case "POST": {
      const submission = parseWithZod(formData, { schema: formSchema });

      if (submission.status !== "success") {
        return json({ status: false, message: null, errors: submission.error });
      }

      let customSize: ConfigCustomSize = submission.value as ConfigCustomSize;
      if (customSize) {
        let res = await MaterialSizeService.addCustomSize(
          configId,
          session.id,
          mId,
          customSize,
        ); // Custom Size  updated is completed successfully
        return res
          ? json({
              ...jFlashMessage(
                "Custom Size  updated is completed successfully",
              ),
            })
          : json({
              ...jFlashMessage("Errors on Custom Size  upadating", "error"),
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
