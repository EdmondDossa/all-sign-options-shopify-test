import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, redirect, useActionData, useFetcher, useNavigate, useNavigation, useOutletContext, useParams, useSearchParams, useSubmit } from "@remix-run/react";
import {
  BlockStack,
  Box,
  Card,
  Divider,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import {  useState, useEffect, useRef } from "react";
import { z } from "zod";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import { FileInput } from "~/components/inputs/FileInput";
import { MultiCombobox } from "~/components/inputs/MultiCombobox";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import MaterialAdditionalOptionItemService from "~/models/MaterialAdditionalOptionItem.service";
import { authenticate } from "~/shopify.server";
import {  ConfigAdditionalOptionItem, ConfigColor } from "~/types/ConfigDataType";
import { getError } from "~/utils/error-getting";
import { flashMessage } from "~/utils/message-flash";
import { booleanTransform, jsonTransform, stringTransform } from "~/utils/transfomerZod";


interface MaterialAddOptionsProps {
  additionalOptionItems: ConfigAdditionalOptionItem[];
  configColors: ConfigColor[], 
  materialId: number | undefined,
  componentId: number,
  id: number,
  edit: boolean,
  refreshOptionItems: (data: ConfigAdditionalOptionItem[]) => void,
  onClick: (id: boolean) => void
  // on
}
export default function MaterialAdditionalOptionCreate({ additionalOptionItems, configColors, materialId, componentId, id, edit, onClick, refreshOptionItems }: MaterialAddOptionsProps) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const fetcher = useFetcher<any>();
  const params = useParams();
  const configId = params.configId;
  // const { additionalOptionItems, configColors } = useOutletContext<{
  //   additionalOptionItems: ConfigAdditionalOptionItem[];
  //   configColors: ConfigColor[]
  // }>();
  const actionData = useActionData<typeof action>();
  useHandleFlashMessage();
  const [searchParams] = useSearchParams();
  // const id = parseInt(searchParams.get("id") || "");
  // console.log("action data :", actionData);
  let additionalOptionItem = additionalOptionItems?.find((curr, index) => index == id);
  const [formData, setFormData] = useState<ConfigAdditionalOptionItem>(
    edit ?
    additionalOptionItem as ConfigAdditionalOptionItem
      : {
        title: "",
        description: "",
        icon: "",
        popImg:"",
        additionalPrice: 0,
        excludeColors: [],
        isDefault: false,
        enablePricingBySurface: false,
        surface:0
      }
  );

  let isLoading = navigation.state == "loading";
  let isSubmitting = fetcher.state == "submitting";
  const colors = configColors ? configColors.map((configColor,index) => ({ label: configColor.name||'', value: `${index}` })) : [];
  const hasProcessedResponse = useRef(false);


  const handleTitle= (value: string) =>
    setFormData({ ...formData, title: value });
  const handleDescription = (value: string) =>
    setFormData({ ...formData, description: value });
  const handleIcon = (value: string) =>
    setFormData({ ...formData, icon: value });

  const handlePopImg = (value: string) =>
      setFormData({ ...formData, popImg: value });
  const handleAdditionalPrice= (value: string, onBlur = false) =>
    setFormData({ ...formData, additionalPrice: onBlur ?  parseFloat(`${formData.additionalPrice}`):value });
  const handleSurface= (value: string, onBlur = false) =>
    setFormData({ ...formData, surface: onBlur ?  parseFloat(`${formData.surface}`):value });
  const handleEnablePricingBySurface= (value: string) =>
    setFormData({ ...formData, enablePricingBySurface: value? true : false });

  console.log(componentId, "compo ID")

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // submit({ ...formData, excludeColors: JSON.stringify(formData.excludeColors) }, { method: "POST" });

    const requestBody: any = {
      operation: edit ? "update" : "add",
      configId: configId,
      materialId: materialId,
      additionalId: componentId,
      optionItemData: formData,
    }
    if(edit){
      requestBody.optionItemId = id
    }

    fetcher.submit(requestBody, {
      method: "POST",
      action: "/api/simple-additionnalOptionItems-manager",
      encType: "application/json",
    })
  };

  // Gérer la réponse du fetcher après la soumission
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && !hasProcessedResponse.current) {
      if (fetcher.data.success && fetcher.data.data) {
        // Marquer comme traité pour éviter les déclenchements multiples
        hasProcessedResponse.current = true;
        // Rafraîchir la liste avec les nouvelles données
        refreshOptionItems(fetcher.data.data);
        // Fermer le formulaire seulement après une sauvegarde réussie
        onClick(false);
      } else if (fetcher.data.error) {
        // Gérer les erreurs si nécessaire
        console.error("Error saving option:", fetcher.data.error);
        hasProcessedResponse.current = true;
      }
    }
    // Réinitialiser le flag quand on commence une nouvelle soumission
    if (fetcher.state === "submitting") {
      hasProcessedResponse.current = false;
    }
  }, [fetcher.state, fetcher.data, refreshOptionItems, onClick]);

  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

  return (
    <div style={{
      width: '100%',
      height: 'auto'
    }}>
      <Card>
        <Box paddingInline="100" paddingBlockEnd="300">
          <Text as="h2" variant="headingMd">
          {Number.isNaN(id)?'Add new option ':'Edit option'}
          
          </Text>
        </Box>
        <Divider borderWidth="050" />

        <Form onSubmit={handleSubmit} method="POST">
          <Box paddingInline="300" paddingBlock="300">
            <Grid gap={{lg:"30px"}}>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
              label="Title"
                value={`${formData.title}`}
                autoComplete="off"
              onChange={handleTitle}
              error={getError(actionData, "title")}
            />
              </Grid.Cell>
            
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            <TextField
              label="Description"
              value={`${formData.description}`}
              autoComplete="off"
            onChange={handleDescription}
            error={getError(actionData, "description")}
            />
              </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            <FileInput error={getError(actionData, "icon")} title="Upload icon"
                  path={formData.icon} handlePath={handleIcon} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            <FileInput error={getError(actionData, "popImg")} title="Upload Image" buttonTitle="upload image"
                  path={formData.popImg} handlePath={handlePopImg} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <MultiCombobox
                    helpText="exclude the colors of this option"
                    label="Exclude colors"
                    placeholder="Search colors"
                    selectedOptions={formData.excludeColors.map((curr) => `${curr}`)}
                    data={colors}
                    setSelectedOptions={(value:any) => {
                      formData.excludeColors = value.map((curr:any) => parseFloat(curr));
                      setFormData({ ...formData });
                    }}
                  ></MultiCombobox>
              </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            <TextField
                label="Additional  price"
                type="number"
              value={`${formData.additionalPrice}`}
              autoComplete="off"
            onChange={value=>handleAdditionalPrice(value)}
            onBlur={value=>handleAdditionalPrice("", true)}
            error={getError(actionData, "additionalPrice")}
            />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                  label="Surface for  this price"
                  type="number"
                  value={`${formData.surface}`}
                  autoComplete="off"
                  onChange={value=>handleSurface(value)}
                  onBlur={value=>handleSurface(value+"", true)}
                  error={getError(actionData, "surface")}
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <BlockStack gap="200">
                <Text as="span">
                  Enable Pricing By Surface
                </Text>
                <InlineStack wrap={false} gap="100" blockAlign="center">
                  <Text as="span"> No</Text>
                  <ReactSwitchCustom
                    checked={formData.enablePricingBySurface? true : false}
                    setChecked={(value:any) => {
                      formData.enablePricingBySurface = value;
                      setFormData({ ...formData });
                    }}
                  />
                  <Text as="span"> Yes</Text>
                </InlineStack>
              </BlockStack>
            </Grid.Cell>


            </Grid>
          </Box>
        
          <Divider borderWidth="050" />
          <Box paddingInline="300" paddingBlock="300">
            <InlineStack align="end" gap="600">
              <button className="back-large-btn" type="button" onClick={()=> onClick(false)}>
                <Box paddingInline="1000">
                  <InlineStack gap="300">
                    <RayStartArrowIcon />{" "}
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      {" "}
                      Back
                    </span>
                  </InlineStack>
                </Box>
              </button>
              <BiSaveBtn isLoading={isSubmitting} title="Save" />
            </InlineStack>
          </Box>
        </Form>
      </Card>
    </div>
  );
}



const formSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is too short")
    .max(100, "Title is too long"),
  description: z.string().nullish().transform(stringTransform),
  icon:  z.string().nullish().transform(stringTransform),
  popImg:  z.string().nullish().transform(stringTransform),
  additionalPrice: z.number({ required_error: "image file is required" }),
  surface: z.number({ required_error: "image file is required" }).optional().nullable(),
  excludeColors: z.any().transform(jsonTransform).pipe(z.number().array()),
  isDefault: z.any().transform(booleanTransform).pipe(z.boolean()),
  enablePricingBySurface: z.any().transform(booleanTransform).pipe(z.boolean())
});

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  const aId = parseInt(params.aId ?? "");
  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let configAdditionalOptionItem: ConfigAdditionalOptionItem = submission.value as ConfigAdditionalOptionItem;

  
  if (id && !Number.isNaN(configId)  && !Number.isNaN(mId) && !Number.isNaN(aId) && !Number.isNaN(id)) {
    let res = await MaterialAdditionalOptionItemService.update(
      configId,
      session.id,
      mId, aId,
      configAdditionalOptionItem,
      parseInt(id),
    ); 
    return res
      ? redirect(
          `..${flashMessage("Material option updated successfully")}`,
        )
      : redirect(
          `..${flashMessage("Failed to update material option", "error")}`,
        );
  } else {
    let res = await MaterialAdditionalOptionItemService.add(
      configId,
      session.id,
      mId,
      aId,
      configAdditionalOptionItem,
    );
    return res
      ? redirect(
          `..${flashMessage("Material option added successfully")}`,
        )
      : redirect(`..${flashMessage("Failed to add material option", "error")}`);
  }

};

