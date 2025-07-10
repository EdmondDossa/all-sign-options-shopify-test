import {
  Badge,
  BlockStack,
  Box,
  ButtonGroup,
  Divider,
  Grid,
  Icon,
  IndexTable,
  InlineStack,
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
  useSubmit,
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
import { booleanTransform, jsonTransform, stringTransform } from "~/utils/transfomerZod";
import { parseWithZod } from "@conform-to/zod";
import { fileUrl } from "~/utils/fileUrl";
import { PRICING_PLANS } from "~/utils/pricing";
import Sortable from 'sortablejs';
import { useSortable } from "~/hooks/useSortable";
import {SaveIcon,
  DragHandleIcon
} from '@shopify/polaris-icons';
import LoadingGray from "~/components/icons/LoadingGray";
import BiSaveIcon from "~/components/icons/BiSaveIcon";


export default function MaterialColorIndex() {
  const submit = useSubmit();
  const navigate = useNavigate();
  let { customColors, plan ,...outletData} = useOutletContext<{
    colors: ConfigColor[];
    customColors: ConfigCustomColor;
    plan: string;
  }>();

  let   [colors , setColors ] =  useState<ConfigColor[]>(outletData.colors);
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
    submit(data, { method: "POST" });
  };

  useHandleFlashMessage();

  const navigation = useNavigation();
  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const handeleDelete = (id: number) => {
    colors = colors.filter((curr, index) => index !== id);
    submitUpdate(colors, 'delete');
    setColors([...colors])

  };

  const handeleDefault = (id: number) => {
    colors = colors.map((curr,index)=>({...curr, isDefault: id == index }));
    submitUpdate(colors,'default');
    setColors([...colors])

  };

  const handeleSort = () => {
      const matchingTbody = document.querySelector('tbody');
      if(matchingTbody){
        const rows = Array.from(matchingTbody.querySelectorAll('tr'));
        const newOrder:any = rows.map((row) => {
          const id = row.getAttribute("id")
          return colors.find((color, index) => index+'' == id);
        });

        submitUpdate(newOrder,'sort');
      }
  };

  useSortable('tbody', colors)

  const submitUpdate = (items:any,  type:any)=>{
    submit({ items:  JSON.stringify(items), type:type}, { method: "PUT" });
  };

  const handleUpdate = (id: number) => {
    submit({ id: id }, { method: "GET", action: "edit" });
  };

  const handleEdit = () => {
    navigate("edit");
  };

  const colorsTab = (colors || []).map((color, index) => {
    const {
      name,
      textColor,
      pattern,
      additionalPrice,
      isDefault
    } = color || {};
  
    return {
      id: String(index),
      title: name || '',
      textColor: textColor?.active ? textColor.codeHex : 'Disable',
      patternActive: !!pattern?.active,
      BackgroundColor: pattern?.active ? pattern.url : pattern?.codeHex,
      price: String(additionalPrice ?? ''),
      isDefault: !!isDefault
    };
  });
  

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
      <IndexTable.Row id={`${id}`} key={id} position={index}>
        <IndexTable.Cell className="dragable-ref">
          <InlineStack blockAlign="start" gap="300">
          <Icon
            source={DragHandleIcon}
            tone="base"
          />
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell className="dragable-ref">
          <InlineStack blockAlign="start" gap="300">
         
            {title}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          
          {textColor === "Disable" ? <Badge tone="critical">{textColor}</Badge> :
            <BlockStack align="center" gap="100">
              <div style={{ margin: "auto", background: textColor, width: "50px", height: "30px", borderRadius: "5px", border: "1px solid #d3d3d3" }}>
              </div>
              <span>
              <Badge >{textColor.toUpperCase()}</Badge>
              </span>
           </BlockStack>
          }
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          {patternActive ? (
            <img
              style={{ height: "30px" }}
              src={fileUrl(BackgroundColor)}
              alt={"color" + title}
            />
          ) : (
              <BlockStack  align="center" gap="100">
                <div style={{ margin: "auto" , background: BackgroundColor, width: "50px" , height: "30px" , borderRadius: "5px",  border: "1px solid #d3d3d3" }}>
                </div>
                <span>
                  <Badge >{BackgroundColor.toUpperCase()}</Badge>
                </span>



              </BlockStack>
              
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
              <button  onClick={()=>handeleSort()} className="primary-btn primary-btn-text primary-btn-flex" type="button" >
              
                {isSubmitting  ?<LoadingGray/> : <BiSaveIcon />}
                Save  sort
              </button>
{ (plan == PRICING_PLANS.STARTER && colors?.length>=PRICING_PLANS.STARTER_RULES.materialColors )||      <button
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
            {title:""},
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
{ (plan == PRICING_PLANS.STARTER && PRICING_PLANS.STARTER_RULES.materialCustomColors) ||    <SpacingBackground width="100%" height="auto" margin="16px 0px ">
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

const formSchemaItems = z.object({
  items: any().transform(jsonTransform),
  type:any().transform(stringTransform)
});

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");

  const method = request.method;
  const formData = await request.formData();

  switch (method) {
    case "PUT": {

      const submission = parseWithZod(formData, { schema: formSchemaItems });

      if (submission.status !== "success") {
        return jFlashMessage("An error occurred during the update. Please try again later.");
      }

      await MaterialColorService.bulkUpdate(
        configId,
        session.id,
        mId,
        submission.value.items
      );

      if (submission.value.type=="delete") {
        return  redirect(flashMessage("Configuration updated successfully"));
      }else  if (submission.value.type=="default") {
        return redirect(flashMessage("Default color set successfully")); 
      }else  {
        return redirect(flashMessage("Colors updated successfully"));  
      }
     
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
