import {
  Box,
  Divider,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import {  useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import { BackBtn } from "~/components/buttons/BackBtn";
import CategoryService from "~/models/Category.service";
import { CategoryType } from "~/types/TemplateType";


export const loader = async ({request, params }:LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  let clipartsGroup = null;
  
  if (id) {
    clipartsGroup = await CategoryService.getCategory(parseInt(id),session.id)
  }
  
  return json({clipartsGroup})
}

// export default function ManageClipartCreate() {
//   const submit = useSubmit();
//   const navigation = useNavigation()
//   const actionData = useActionData<typeof action>();
//   useHandleFlashMessage();
//   console.log('action data :', actionData);
//   let {clipartsGroup} = useLoaderData<typeof loader>()
//   const [formData, setFormData] = useState<CategoryType>((clipartsGroup as CategoryType) || {
//     name: "",
//   });

//   let isLoading = navigation.state == "loading";
//   let isSubmitting = navigation.state == "submitting";

  
  

//   const handleName = (value: string) => {
//     formData.name = value
//     setFormData({ ...formData}
//   )
//   }

 



  
//   const navigate = useNavigate();
//   const onBack = () => {
//     navigate("..");
//   };

   
//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     console.log(" log is nt errors");
//     submit({ ...formData }, { method: "POST" });
//   };
  
//   return (
//     <div>
//       <SpacingBackground width="100%" height="auto" margin="16px 0px ">
//           <Form onSubmit={handleSubmit} method="POST">
//             <SpacingBackground backgroundColor="#F9F9F9">
//             <Box paddingInline="300" paddingBlock="600">
//                   <Text as="h6" variant="bodyMd" fontWeight="bold" >{clipartsGroup?'Update template category' :"Create new tempalte category"} </Text>
//             </Box>
//           </SpacingBackground>
//             <Divider borderWidth="100" />
//             <SpacingBackground backgroundColor="#F8F9FB">
              
//             <Box paddingInline="300" paddingBlock="1000">
//               <Grid gap={{lg:"30px"}}>
//                 <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
//                   <TextField
//                     label="Name"
//                     value={`${formData.name}`}
//                     onChange={handleName}
//                     autoComplete="on"
//                     error={getError(actionData,"name")}
//                   />
//                 </Grid.Cell>
//               </Grid>
//             </Box>
//               </SpacingBackground>
//             <Divider borderWidth="100" />
//             <SpacingBackground backgroundColor="#F9F9F9">
              
//             <Box paddingInline="300" paddingBlock="300">
//               <InlineStack align="end" gap="600">
//               <BackBtn isLoading={isLoading} title="Back"/>
//               <BiSaveBtn isLoading={isSubmitting} title="Save" />
//               </InlineStack>
//             </Box>
//               </SpacingBackground>
//           </Form>
//       </SpacingBackground>
//     </div>
//   );
// }


const formSchema = z.object({
  name: z.string({ required_error: 'Name is required' })
  .min(2, 'Name is too short')
    .max(250, 'Name is too long')
});



export const action = async ({ request }: ActionFunctionArgs) => {

  const { session, admin } = await authenticate.admin(request);



  const formData = await request.formData();
  console.log(" form  dta",formData.get("thickness"));
  
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const submission = parseWithZod(formData, {schema:formSchema});

  if (submission.status !== 'success') {
    return json({status:false,message:null,errors:submission.error})
  }

  let category: CategoryType = submission.value as CategoryType;
  console.log(" data to  save", category)
  if (id) {
    category.id = parseInt(id);
    let res = await CategoryService.updateCategory(category, session.id)
    return res ?  json({...jFlashMessage("Category updated is completed successfully"), category:res })
      : json({ ...jFlashMessage("Error on category upadating") });
  } else {
    let res =  await CategoryService.addCategory(category, session.id)
    return res ? json({...jFlashMessage("category  added is completed successfully"), category:res })
      : json({ ...jFlashMessage("Error   on category adding") });
  } 
};

