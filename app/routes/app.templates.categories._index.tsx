import {
  BlockStack,
  Box,
  ButtonGroup,
  Divider,
  IndexTable,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import { useFetcher, useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RoundManageHistoryIcon from "~/components/icons/RoundManageHistoryIcon";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import CategoryService from "~/models/Category.service";
import { jFlashMessage } from "~/utils/message-flash";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useEffect, useId, useState } from "react";
import { CategoryType } from "~/types/TemplateType";
import { getError } from "~/utils/error-getting";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const categories = await CategoryService.getCategorys(
    session.id,
  );

  return json({ categories });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const id = formData.get("id") as string;
  const method = request.method;

  switch (method) {
    case "DELETE": {
      console.log("start deleting");
      await CategoryService.deleteCategory(parseInt(id), session.id);
      return json({
        ...jFlashMessage("Category deleted successfully"),
      });
    }

    default:
      break;
  }

  return null;
};

export default function ManageClipartIndex() {
  const submit = useSubmit();
  let { categories } = useLoaderData<typeof loader>();
  let [category, setCategory]= useState<any>();
  let [enableCategoryEdit, setEnableCategoryEdit]= useState<any>(false);


  useHandleFlashMessage();

  const navigate = useNavigate();
  const onHandleCreate = () => {
      setEnableCategoryEdit(true)
  };

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handleUpdate = (id: number) => {
     setCategory(categories?.find(curr =>  curr.id == id))
     setEnableCategoryEdit(true)
  };

  const resourceName = {
    singular: "Category",
    plural: "Categories"
  };

  const rowMarkup = categories?.map(({ id, name }, index) => (
    <IndexTable.Row id={id} key={id} position={index}>
      <IndexTable.Cell>{name}</IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <ButtonGroup fullWidth noWrap gap="loose">
          <EditIconBtn
            size="micro"
            onClick={() => {
              handleUpdate(id);
            }}
          />
          <DeleteIconBtn
            size="micro"
            onClick={() => {
              handeleDelete(id);
            }}
          />
        </ButtonGroup>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));
  return (
    <SpacingBackground width="100%" height="auto" margin="16px 0px ">
      <BoxBackground>
        <Box padding="150">
          <InlineStack gap="100" align="end">
            <button
              className="primary-btn"
              type="button"
              onClick={onHandleCreate}
            >
              <Box paddingInline="300">
                <InlineStack gap="300">
                  <PlusIcon />
                  <span className="primary-btn-text">
                    Add new  category
                  </span>
                </InlineStack>
              </Box>
            </button>
          </InlineStack>
        </Box>
        <Divider borderWidth="050" />
      </BoxBackground>
      <IndexTable
        resourceName={resourceName}
        itemCount={categories ? categories.length : 0}
        headings={[
          { title: "Name" },
          { title: "Action", alignment: "center" },
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
      <EditCategoryModal onSubmit={(value:any)=> console.log(value)} category={category} open={enableCategoryEdit} onClose={()=>{
        setEnableCategoryEdit(false)
        
        }} />
    </SpacingBackground>
  );
}





export const EditCategoryModal = ({onSubmit,category, open,onClose}:{onSubmit:Function, open:boolean,category?:any,onClose:Function}) => {
    const [formData, setFormData] = useState<CategoryType>(category?(category as CategoryType) : {
      name: "",
    });

    const handleName = (value: string) => {
      formData.name = value
      setFormData({ ...formData}
    )
    }

    let { submit, data, state } = useFetcher<any>();

    const handleSubmit = () => {
      console.log(" log is nt errors");
      submit({ ...formData },{
        method: "POST",
        action: `/app/templates/categories/edit?id=${category?.id? category.id :""}`,
      } );
    };


    const shopify = useAppBridge();
    const id = useId()


    useEffect(()=>{
      if(open){shopify.modal.show(id);}
    },[open]);

    useEffect(()=>{
      setFormData(category? category as CategoryType:{...formData})
    },[category]);


    useEffect(()=>{
        if(data?.messageFlash?.status=="success" && state=="idle"){
          onClose()
          onSubmit(data.category)
          shopify.toast.show(data?.messageFlash?.msg, {isError: false});
          shopify.modal.hide(id)
          setFormData({name:""})

        }else if (data?.messageFlash?.status=="error" && state=="idle") {
          shopify.toast.show(data?.messageFlash?.msg, {isError: true});
        }else if(data?.error){
          shopify.toast.show(getError(data, 'name'), {isError: true});
          setFormData({ ...formData})
        }
    }, [data, state]);



    return (
        <>
            <Modal variant="small" id={id} onHide={()=>{
              onClose()
              setFormData({name:""})
              }}>
                <Box padding="400">
                    <BlockStack gap="400">
                        <TextField label="Name" value={formData.name} onChange={(value: string) =>handleName(value)}  autoComplete='on'
                        error={getError(data, 'name')} 
                        />
                    </BlockStack>
                </Box>
              
                <TitleBar title={formData.id?'Update category':'Create new category'}>
                    <button variant="primary" tone="default" onClick={() => {
                        handleSubmit()
                    }}> {formData.id?'Save':'Create'} </button>
                    <button onClick={() => {
                      shopify.modal.hide(id);
                      onClose()
                      
                    }}>cancel</button>
                </TitleBar>
            </Modal>
        </>
    );
}
