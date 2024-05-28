import {
  Box,
  Divider,
  Grid,
  InlineStack,
  TextField,
} from "@shopify/polaris";
import {  useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import { ConfigSize } from "~/types/ConfigDataType";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { z } from "zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { parseWithZod } from "@conform-to/zod";
import MaterialSizeService from "~/models/MateriaSizeService.service";
import { flashMessage } from "~/utils/message-flash";

export default function MaterialSizeIndex() {
  const submit = useSubmit();
  const navigation = useNavigation()
  const actionData = useActionData<typeof action>();
  console.log('action data :', actionData);
  let { allSizes,  } = useOutletContext<{
    allSizes: ConfigSize[];
  }>();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get('id') || "");
  let configSize = allSizes?.find((curr, index) =>index === id)
  const [formData, setFormData] = useState<ConfigSize>(configSize?(configSize as ConfigSize):{
    width: 0,
    label: "",
    height: 0,
    textNumber: 0,
    maxTextChar: -1,
    charPrice: 0,
    basePrice: 0,
    startPriceAtChar: 0
  });


  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";
  
  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const handleTextNumber = (value: string,onBlur=false) => setFormData({...formData, textNumber:onBlur? parseInt(`${formData.textNumber || "0"}`) : value})

  const handleMaxTextChar = (value: string,onBlur=false) => setFormData({...formData, maxTextChar:onBlur? parseInt(`${formData.maxTextChar || "0"}`) : value})
  const handleStartPriceAtChar = (value: string,onBlur=false) => setFormData({...formData, startPriceAtChar: onBlur? parseInt(`${formData.startPriceAtChar || "0"}`) : value})

  const handleCharPrice = (value: string,onBlur=false) => setFormData({ ...formData, charPrice:onBlur? parseFloat(`${formData.charPrice || "0"}`) : value })
  const handleBasePrice = (value: string,onBlur=false) => setFormData({ ...formData, basePrice:  onBlur? parseFloat(`${formData.basePrice || "0"}`) : value })
  

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({...formData}, { method: "POST" });
  };
  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
        <BoxBackground>
          <Form onSubmit={handleSubmit} method="POST">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{lg:"30px"}}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <TextField
                        size="medium"
                        label="Label"
                        value={`${formData.label}`}
                        onChange={(value) => handleInputChange("label", value)}
                        autoComplete="on"
                        error={getError(actionData, "label")}
                      />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                <TextField
                        size="medium"
                        label="Width"
                        type="number"
                        value={`${formData.width}`}
                        onChange={(value) => handleInputChange("width", value)}
                        onBlur={(value) => handleInputChange("width", parseFloat(`${formData.width}`))}
                        autoComplete="on"
                        error={getError(actionData, "width")}
                      />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                <TextField
                        size="medium"
                        label="Height"
                        type="number"
                        value={`${formData.height}`}
                        onChange={(value) => handleInputChange("height", value)}
                        onBlur={(value) => handleInputChange("height", parseFloat(`${formData.height}`))}
                        autoComplete="on"
                        error={getError(actionData, "height")}
                />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Text number"
                    type="number"
                    value={`${formData.textNumber}`}
                    onChange={value=>handleTextNumber(value)}
                    onBlur={value=>handleTextNumber("", true)}
                    autoComplete="on"
                    error={getError(actionData, "textNumber")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Max text char"
                    type="number"
                    value={`${formData.maxTextChar}`}
                    onChange={value=>handleMaxTextChar(value)}
                    onBlur={value=>handleMaxTextChar("",true)}
                    helpText="Max number of characters in text, for without limit set to -1"
                    autoComplete="on"
                    error={getError(actionData, "maxTextChar")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Base Price"
                    type="number"
                    value={`${formData.basePrice}`}
                    onChange={value=>handleBasePrice(value)}
                    onBlur={value=>handleBasePrice("",true)}
                    autoComplete="on"
                    error={getError(actionData, "basePrice")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Number at start pricing char"
                    type="number"
                    value={`${formData.startPriceAtChar}`}
                    onChange={(value) => handleStartPriceAtChar(value)}
                    onBlur={(value) => handleStartPriceAtChar("", true)}
                    autoComplete="on"
                    error={getError(actionData, "startPriceAtChar")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Char Price"
                    type="number"
                    value={`${formData.charPrice}`}
                    onChange={value=>handleCharPrice(value)}
                    onBlur={value=>handleCharPrice("",true)}
                    autoComplete="on"
                    error={getError(actionData, "charPrice")}
                  />
                </Grid.Cell>
              </Grid>
            </Box>
            <Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <button
                  className="back-large-btn"
                  type="button"
                  onClick={onBack}
                >
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
        </BoxBackground>
      </SpacingBackground>
    </div>
  );
}


const formSchema = z.object({
  label: z.string({ required_error: 'Size is required' }),
  width: z.number({ required_error: 'Size is required' }),
  height: z.number({ required_error: 'Size is required' }),
  textNumber: z.number({ required_error: 'Text number is required' }),
  maxTextChar: z.number({ required_error: 'Max Text char is required' }), 
  startPriceAtChar: z.number({ required_error: 'price is required' }), 
  charPrice: z.number({ required_error: 'Price is required' }), 
  basePrice: z.number({ required_error: 'Price is required' }),
});

export const action = async ({ request,params}: ActionFunctionArgs) => {

  const { session, admin } = await authenticate.admin(request);



  const formData = await request.formData();
  const url = new URL(request.url);
  const id =   parseInt(url.searchParams.get("id")||"") ;
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  const submission = parseWithZod(formData, {schema:formSchema});

  if (submission.status !== 'success') {
    return json({status:false,message:null,errors:submission.error})
  }

  let configSize: ConfigSize = submission.value as ConfigSize;
  
  if (!Number.isNaN(id) && !Number.isNaN(configId)  &&  !Number.isNaN(mId)  ) {
    let res = await MaterialSizeService.update(
      configId,
      session.id,
      mId,
      configSize,
      id
    ); 
    return res
      ? redirect(`..${flashMessage("Material Size  updated is completed successfully")}`)
      : redirect(`..${flashMessage("Material Size updated is  fail","error")}`);
  } else {
    let res = await MaterialSizeService.addSize(
      configId,
      session.id,
      mId,
      configSize
    ); 
    return res
      ? redirect(`..${flashMessage("Material  added is completed successfully")}`)
      : redirect(`..${flashMessage("Material  added is  fail","error")}`);
  }
 
};
