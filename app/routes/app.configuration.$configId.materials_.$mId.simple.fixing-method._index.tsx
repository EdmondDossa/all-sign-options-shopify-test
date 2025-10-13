import {
  ActionList,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Icon,
  IndexTable,
  InlineStack,
  Popover,
} from "@shopify/polaris";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  useFetcher,
  useNavigate,
  useNavigation,
  useOutletContext,
  useParams,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import MaterialFixingMethodService from "~/models/MaterialFixingMethod.service";
import { jFlashMessage } from "~/utils/message-flash";
import { FixingMethodType, ShapeType } from "~/types/SettingsType";
import { ConfigFixingMethod, ConfigSize } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { fileUrl } from "~/utils/fileUrl";

import MaterialFixingMethodEdit from "./app.configuration.$configId.materials_.$mId.simple.fixing-method.edit";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon, MenuHorizontalIcon } from "@shopify/polaris-icons";
import { PRICING_PLANS } from "~/utils/pricing";

interface MaterialFixingMethodProps {
  manageFixingMethods: FixingMethodType[];
  fixingMethods: ConfigFixingMethod[];
  manageShapes: ShapeType[];
  configSizes: ConfigSize[];
  plan: string,
  materialId: number | undefined,
}
export default function MaterialFixingMethodComponent({ manageFixingMethods, fixingMethods, manageShapes, configSizes, plan, materialId }: MaterialFixingMethodProps) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const params = useParams();
  const deleteFetcher = useFetcher() as any;
  const setDefaultFetcher = useFetcher() as any;

  // let { manageFixingMethods, fixingMethods } = useOutletContext<{
  //   manageFixingMethods: FixingMethodType[];
  //   fixingMethods: ConfigFixingMethod[];
  // }>();

  useEffect(() => {
    if (plan == PRICING_PLANS.STARTER) {
      manageShapes = manageShapes?.slice(0, PRICING_PLANS.STARTER_RULES.materialShapes) || [];
      configSizes = configSizes?.slice(0, PRICING_PLANS.STARTER_RULES.materialSizes) || [];
      manageFixingMethods = manageFixingMethods?.slice(0, PRICING_PLANS.STARTER_RULES.materialFixingMethods) || [];
      fixingMethods = fixingMethods?.filter(curr => curr.fixingMethodId < PRICING_PLANS.STARTER_RULES.materialFixingMethods) 
        ?.slice(0, PRICING_PLANS.STARTER_RULES.materialFixingMethods) || [];
    }
  }, []);

  useHandleFlashMessage();

  const navigation = useNavigation();
  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const handeleDelete = (id: number) => {
    console.log("=== handeleDelete called with ID:", id, "===");
    
    const configId = parseInt(params.configId ?? "");
    const finalMaterialId = materialId ?? 0;
        
    // Utiliser fetcher pour appeler l'API
    deleteFetcher.submit(
      {
        operation: 'delete',
        configId: configId.toString(),
        materialId: finalMaterialId.toString(),
        fixingMethodId: id.toString()
      },
      {
        method: "POST",
        action: "/api/fixing-method-manager"
      }
    );
  };

  const handeleDefault = (id: number) => {
    fixingMethods = fixingMethods.map((curr, index) => {
      if (index === id) {
        curr.isDefault = true;
      } else {
        curr.isDefault = false;
      }
      return curr;
    });

    const configId = parseInt(params.configId ?? "");
    const finalMaterialId = materialId ?? 0;

    // console.log(id, "7888")

    let requestBody = {
        operation: 'set-default',
        configId: configId,
        materialId: finalMaterialId,
        fixingMethodId: id
      };

    setDefaultFetcher.submit(requestBody, {
      action: "/api/fixing-method-manager", 
      method: "POST",
      encType: "application/json",
    })
  };

  const [showEditSection, setShowEditSection] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [currentFixingMethodeID, setCurrentFixingMethodeID] = useState<number>(0)
  const handleUpdate = (id: number) => {
    // submit({ id: id }, { method: "GET", action: "edit" });
    setShowEditSection(true)
    setEdit(true)
    setCurrentFixingMethodeID(id)
  };

  const handleEdit = () => {
    // navigate("edit");
    setEdit(false)
    setShowEditSection(true)
  };

  console.log("fixingMethods ....", fixingMethods);
  const fixingMethodTab = fixingMethods
    ? fixingMethods.map((currFixingMethod, index) => {
        let fixingMethod = manageFixingMethods.find(
          (manageFixingMethod, manageIndex) =>
            manageIndex == currFixingMethod.fixingMethodId,
        );
        return {
          id: `${index}`,
          title: `${fixingMethod?.name}`,
          image: fixingMethod?.icon,
          price: `${currFixingMethod?.additionalPrice}`,
          isDefault: currFixingMethod.isDefault,
        };
      })
    : [];

  const resourceName = {
    singular: "Fixing method",
    plural: "Fixing methods",
  };

  const [activePopoverId, setActivePopoverId] = useState<number | null>(null);
  const rowMarkup = fixingMethodTab?.map(
    ({ id, title, image, price, isDefault }, index) => {
      const isActive = activePopoverId === index;

      return(
        <IndexTable.Row id={id} key={id} position={index}>
          <IndexTable.Cell>
            <InlineStack blockAlign="start" gap="300">
              {title}
            </InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            <img
              style={{ height: "30px" }}
              src={fileUrl(image)}
              alt={"fixing-method" + title}
            />
          </IndexTable.Cell>

          <IndexTable.Cell className="td-center">
            <Badge>{price}</Badge>
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            <ReactSwitchCustom
              checked={isDefault || false}
              setChecked={() => (isDefault ? "" : handeleDefault(index))}
            ></ReactSwitchCustom>
          </IndexTable.Cell>

          <IndexTable.Cell className="td-center">
            {/* <ButtonGroup fullWidth noWrap gap="loose">
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
            </ButtonGroup> */}

            <Popover
              active={isActive}
              activator={
                <Button
                  onClick={() =>
                    setActivePopoverId(isActive ? null : index)
                  }
                  icon={<Icon source={MenuHorizontalIcon} />}
                />
              }
              onClose={() => setActivePopoverId(null)}
              preferredAlignment="right"
            >
              <ActionList 
                items={[
                  { content: 'Edit', icon: EditIcon, onAction: () => handleUpdate(index) },
                  { content: 'Delete', icon: DeleteIcon, onAction: () => handeleDelete(index), destructive: true, disabled: deleteFetcher.state === "submitting"},
                ]}
              />
            </Popover>
          </IndexTable.Cell>
        </IndexTable.Row>
      )
    },
  );
  return (
    <div>
      {!showEditSection ? (
        <div>
          <Card>
            <BoxBackground>
              <Box padding="150">
                {manageFixingMethods?.length == fixingMethods.length || (
                  <InlineStack gap="100" align="end">
                    <button
                      className="primary-btn"
                      type="button"
                      onClick={handleEdit}
                    >
                      <Box paddingInline="300">
                        <InlineStack gap="300">
                          <PlusIcon />
                          <span className="primary-btn-text">
                            {" "}
                            Add new fixing method
                          </span>
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
              itemCount={fixingMethodTab.length}
              headings={[
                { title: "Title" },
                { title: "Image", alignment: "center" },
                { title: "Additional Price", alignment: "center" },
                { title: "Default", alignment: "center" },
                { title: "Action", alignment: "center" },
              ]}
              selectable={false}
            >
              {rowMarkup}
            </IndexTable> 
          </Card>
        </div>

      ) : (
        <MaterialFixingMethodEdit materialId={materialId} manageFixingMethods={manageFixingMethods} fixingMethods={fixingMethods} configSizes={configSizes} manageShapes={manageShapes} id={currentFixingMethodeID} onClick={setShowEditSection} edit={edit} />
      )}
    </div>
  );
}

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
      await MaterialFixingMethodService.delete(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage(
          "Material fixing method deleted successfully",
        ),
      });
      break;
    }
    case "PUT": {
      const id = formData.get("id") as string;
      await MaterialFixingMethodService.setDefault(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Default fixing method set successfully"),
      });
      break;
    }
    default:
      break;
  }

  return null;
};
