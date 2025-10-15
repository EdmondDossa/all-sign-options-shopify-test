import {
  ActionList,
  Badge,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Grid,
  Icon,
  IndexTable,
  InlineStack,
  Popover,
  Text,
  TextField,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  useOutletContext,
  useParams,
  useSubmit,
  useFetcher,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { ConfigColor, ConfigCustomColor } from "~/types/ConfigDataType";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import MaterialColorService from "~/models/MaterialColors.service";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { getError } from "~/utils/error-getting";
import { FileInput } from "~/components/inputs/FileInput";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { any, z } from "zod";
import {
  booleanTransform,
  jsonTransform,
  stringTransform,
} from "~/utils/transfomerZod";
import { parseWithZod } from "@conform-to/zod";
import { fileUrl } from "~/utils/fileUrl";
import { PRICING_PLANS } from "~/utils/pricing";
import Sortable from "sortablejs";
import { useSortable } from "~/hooks/useSortable";
import {
  SaveIcon,
  DragHandleIcon,
  MenuHorizontalIcon,
  EditIcon,
  DeleteIcon,
} from "@shopify/polaris-icons";
import LoadingGray from "~/components/icons/LoadingGray";
import BiSaveIcon from "~/components/icons/BiSaveIcon";

import MaterialColorCreate from "./app.configuration.$configId.materials_.$mId.simple.color.edit";

interface MaterialColorsProps {
  colorTable: ConfigColor[];
  customColors: ConfigCustomColor;
  plan: string;
  materialId: number | undefined;
}

export default function MaterialColorIndex({
  colorTable,
  customColors,
  plan,
  materialId,
}: MaterialColorsProps) {
  console.log("=== MaterialColorIndex component rendered ===");
  const submit = useSubmit();
  const params = useParams();
  const navigate = useNavigate();

  // Fetchers pour les différentes opérations API
  const deleteFetcher = useFetcher() as any;
  const setDefaultFetcher = useFetcher() as any;
  const bulkUpdateFetcher = useFetcher() as any;
  const colorFetcher = useFetcher() as any;

  // État local pour gérer l'affichage des couleurs
  const [localColors, setLocalColors] = useState<ConfigColor[]>(colorTable);

  // Mettre à jour l'état local quand les props changent
  useEffect(() => {
    setLocalColors(colorTable);
    if (plan == PRICING_PLANS.STARTER && colorTable) {
      colorTable = colorTable?.slice(
        0,
        PRICING_PLANS.STARTER_RULES.materialColors,
      );
    }
  }, [colorTable]);

  const actionData = useActionData<typeof action>();

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
    // submit(data, { method: "POST" });

    // edit-custom
    const configId = parseInt(params.configId ?? "");
    const finalMaterialId = materialId ?? 0;

    colorFetcher.submit(
      {
        operation: "edit-custom",
        configId: configId,
        materialId: finalMaterialId,
        customColorData: data,
      },
      {
        method: "POST",
        action: "/api/color-manager",
        encType: "application/json",
      },
    );

    console.log(colorFetcher, "azert");
  };

  useEffect(() => {
    setFormData({
      ...customColors
    })
  }, [customColors, materialId])

  useHandleFlashMessage();

  const navigation = useNavigation();
  let isLoading = navigation.state == "loading";
  let isSubmitting = colorFetcher.state == "submitting";

  // Gérer les réponses des fetchers
  useEffect(() => {
    // Delete fetcher
    if (deleteFetcher.data?.success && deleteFetcher.data?.data) {
      console.log("Delete successful, updating local state");
      setLocalColors(deleteFetcher.data.data);
    }
  }, [deleteFetcher.data]);

  useEffect(() => {
    // Set default fetcher
    if (setDefaultFetcher.data?.success && setDefaultFetcher.data?.data) {
      console.log("Set default successful, updating local state");
      setLocalColors(setDefaultFetcher.data.data);
    }
  }, [setDefaultFetcher.data]);

  useEffect(() => {
    // Bulk update fetcher
    if (bulkUpdateFetcher.data?.success && bulkUpdateFetcher.data?.data) {
      console.log("Bulk update successful, updating local state");
      setLocalColors(bulkUpdateFetcher.data.data);
    }
  }, [bulkUpdateFetcher.data]);

  const handeleDelete = (id: number) => {
    console.log("=== handeleDelete called with ID:", id, "===");

    const configId = parseInt(params.configId ?? "");
    const finalMaterialId = materialId ?? 0;

    console.log("Deleting color with:", {
      configId,
      materialId: finalMaterialId,
      colorId: id,
    });

    // Utiliser fetcher pour appeler l'API
    deleteFetcher.submit(
      {
        operation: "delete",
        configId: configId,
        materialId: finalMaterialId,
        colorId: id,
      },
      {
        method: "POST",
        action: "/api/color-manager",
        encType: "application/json",
      },
    );
  };

  const handeleDefault = (id: number) => {
    console.log("=== handeleDefault called with ID:", id, "===");

    const configId = parseInt(params.configId ?? "");
    const finalMaterialId = materialId ?? 0;

    console.log("Setting color as default with:", {
      configId,
      materialId: finalMaterialId,
      colorId: id,
    });

    // Utiliser fetcher pour appeler l'API
    setDefaultFetcher.submit(
      {
        operation: "set-default",
        configId: configId,
        materialId: finalMaterialId,
        colorId: id,
      },
      {
        method: "POST",
        action: "/api/color-manager",
        encType: "application/json",
      },
    );
    // Mise à jour optimiste de l'UI
    const updatedColors = localColors.map((curr, index) => {
      if (index === id) {
        return { ...curr, isDefault: true };
      } else {
        return { ...curr, isDefault: false };
      }
    });
    setLocalColors(updatedColors);
  };

  const handeleSort = () => {
    console.log("=== handeleSort called ===");

    const matchingTbody = document.querySelector("tbody");
    if (matchingTbody) {
      const rows = Array.from(matchingTbody.querySelectorAll("tr"));
      const newOrder: ConfigColor[] = rows
        .map((row) => {
          const id = row.getAttribute("id");
          return localColors.find((color, index) => index + "" == id);
        })
        .filter(Boolean) as ConfigColor[];

      const configId = parseInt(params.configId ?? "");
      const finalMaterialId = materialId ?? 0;

      console.log("Bulk updating colors with:", {
        configId,
        materialId: finalMaterialId,
        colors: newOrder,
      });

      // Mise à jour optimiste de l'UI
      setLocalColors(newOrder);

      // Utiliser fetcher pour appeler l'API
      bulkUpdateFetcher.submit(
        {
          operation: "bulk-update",
          configId: configId,
          materialId: finalMaterialId,
          colors: JSON.stringify(newOrder),
        },
        {
          method: "POST",
          action: "/api/color-manager",
        },
      );
    }
  };

  useSortable("tbody", localColors);

  const [showEditSection, setShowEditSection] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [currentColorID, setCurrentColorID] = useState<number>(0);

  const handleUpdate = (id: number) => {
    setShowEditSection(true);
    setEdit(true);
    setCurrentColorID(id);
  };

  const handleEdit = () => {
    setEdit(false);
    setShowEditSection(true);
    setCurrentColorID(-1); // -1 pour indiquer une nouvelle couleur
  };

  const colorsTab = (localColors || []).map((color, index) => {
    const { name, textColor, pattern, additionalPrice, isDefault } =
      color || {};

    return {
      id: String(index),
      title: name || "",
      textColor: textColor?.active ? textColor.codeHex : "Disable",
      patternActive: !!pattern?.active,
      BackgroundColor: pattern?.active ? pattern.url : pattern?.codeHex,
      price: String(additionalPrice ?? ""),
      isDefault: !!isDefault,
    };
  });

  const resourceName = {
    singular: "Color",
    plural: "Colors",
  };

  const [activePopoverId, setActivePopoverId] = useState<number | null>(null);
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
    ) => {
      const isActive = activePopoverId === index;

      return (
        <IndexTable.Row id={`${id}`} key={id} position={index}>
          <IndexTable.Cell className="dragable-ref">
            <InlineStack blockAlign="start" gap="300">
              <Icon source={DragHandleIcon} tone="base" />
            </InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell className="dragable-ref">
            <InlineStack blockAlign="start" gap="300">
              {title}
            </InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            {textColor === "Disable" ? (
              <Badge>{textColor}</Badge>
            ) : (
              <BlockStack align="center" gap="100">
                <div
                  style={{
                    margin: "auto",
                    background: textColor,
                    width: "50px",
                    height: "30px",
                    borderRadius: "5px",
                    border: "1px solid #d3d3d3",
                  }}
                ></div>
                <span>
                  <Badge>{textColor.toUpperCase()}</Badge>
                </span>
              </BlockStack>
            )}
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            {patternActive ? (
              <img
                style={{ height: "30px" }}
                src={fileUrl(BackgroundColor)}
                alt={"color" + title}
              />
            ) : (
              <BlockStack align="center" gap="100">
                <div
                  style={{
                    margin: "auto",
                    background: BackgroundColor,
                    width: "50px",
                    height: "30px",
                    borderRadius: "5px",
                    border: "1px solid #d3d3d3",
                  }}
                ></div>
                <span>
                  <Badge>{BackgroundColor.toUpperCase()}</Badge>
                </span>
              </BlockStack>
            )}
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            <Badge>{price}</Badge>
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            <ReactSwitchCustom
              checked={isDefault || false}
              setChecked={() => (isDefault ? "" : handeleDefault(index))}
            />
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            <Popover
              active={isActive}
              activator={
                <Button
                  onClick={() => setActivePopoverId(isActive ? null : index)}
                  icon={<Icon source={MenuHorizontalIcon} />}
                  disabled={deleteFetcher.state === "submitting"}
                />
              }
              onClose={() => setActivePopoverId(null)}
              preferredAlignment="right"
            >
              <ActionList
                items={[
                  {
                    content: "Edit",
                    icon: EditIcon,
                    onAction: () => handleUpdate(index),
                  },
                  {
                    content: "Delete",
                    icon: DeleteIcon,
                    onAction: () => {
                      console.log("=== DELETE BUTTON CLICKED ===");
                      handeleDelete(index);
                    },
                    destructive: true,
                    disabled: deleteFetcher.state === "submitting",
                  },
                ]}
              />
            </Popover>
          </IndexTable.Cell>
        </IndexTable.Row>
      );
    },
  );

  return (
    <div>
      {!showEditSection ? (
        <div>
          <div>
            <Card>
              <BoxBackground>
                <Box padding="150">
                  <InlineStack gap="100" align="end">
                    <button
                      onClick={() => handeleSort()}
                      className="primary-btn primary-btn-text primary-btn-flex"
                      type="button"
                      disabled={bulkUpdateFetcher.state === "submitting"}
                    >
                      {bulkUpdateFetcher.state === "submitting" ? (
                        <LoadingGray />
                      ) : (
                        <BiSaveIcon />
                      )}
                      Save sort
                    </button>
                    {!(
                      plan == PRICING_PLANS.STARTER &&
                      localColors?.length >=
                        PRICING_PLANS.STARTER_RULES.materialColors
                    ) && (
                      <button
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
                      </button>
                    )}
                  </InlineStack>
                </Box>
                <Divider borderWidth="050" />
              </BoxBackground>
              <IndexTable
                resourceName={resourceName}
                itemCount={colorsTab.length}
                headings={[
                  { title: "" },
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
            </Card>
          </div>
          {!(
            plan == PRICING_PLANS.STARTER &&
            PRICING_PLANS.STARTER_RULES.materialCustomColors
          ) && (
            <div style={{ width: "100%", height: "auto", margin: "16px 0px " }}>
              <div>
                <Card>
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
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                          >
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
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                          >
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
                </Card>
              </div>
            </div>
          )}
        </div>
      ) : (
        <MaterialColorCreate
          colors={localColors}
          id={currentColorID}
          onClick={setShowEditSection}
          edit={edit}
          materialId={materialId}
          onUpdateColors={setLocalColors}
        />
      )}
    </div>
  );
}

const formSchema = z.object({
  label: z.string({ required_error: "Label is required" }),
  prevImg: z.string().nullish().transform(stringTransform),
  active: z.any().transform(booleanTransform).pipe(z.boolean()),
});

export const action = async ({ request, params }: ActionFunctionArgs) => {
  console.log("=== ACTION CALLED ===");
  console.log("ACTION - Action called with method:", request.method);

  const { session, admin } = await authenticate.admin(request);

  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");

  const method = request.method;
  const formData = await request.formData();

  switch (method) {
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
        );
        return res
          ? json({
              ...jFlashMessage(
                "Custom color updated is completed successfully",
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
