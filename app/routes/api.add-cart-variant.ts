import { ShopifyProductService } from './../models/ShopifyProduct.service';
import { z } from 'zod';
import { authenticate } from './../shopify.server';
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { parseWithZod } from '@conform-to/zod';
import { jsonTransform } from '~/utils/transfomerZod';
import { uploadBase64, fileBuffer, calculateImagePlacement } from '~/utils/uploadBase64';
import { assignShopDesignPath, getShopProxyUrlWithSlash } from '~/utils/fileUrl';
import { updateOrCreateJsonData } from '~/utils/jsonHandler';




const formSchema = z.object({
  productId: z.string({ required_error: 'Size is required' }),
  price: z.number({ required_error: 'Text number is required' }),
  option: z.any().transform(jsonTransform),
});

export const action = async ({ request, params }: ActionFunctionArgs) => {

  console.log("request header before authencate");
  const { admin, session } = await authenticate.public.appProxy(request);
  if (!admin || !session) {
    return json({ error: "shop  not found here" });

  }


  try {
    const jsonData = await request.json();
    var formData = new FormData();
    for (var key in jsonData) {
      formData.append(key, jsonData[key]);
    }


    const submission = parseWithZod(formData, { schema: formSchema });

    if (submission.status !== 'success') {
      console.log("request header after inssucess");
      return json({ status: false, message: null, errors: submission.error })
    }



    const data = submission.value as {
      productId: string;
      price: number;
      option: any;
    };

    let optionName = `Quantity: ${data.option.recaps.quantity} | ${data.option.recaps.material?.label} ${data.option.recaps.material?.value}, `
    let size = data.option.recaps.sign?.size
    optionName += `${size?.value?.width?.label} ${size?.value?.width.value}, `
    optionName += `${size?.value?.height?.label} ${size?.value?.height.value}, `
    if (size?.value?.thickness.value) {
      optionName += `${size?.value?.thickness?.label} ${size?.value?.thickness.value}, `
    }

    optionName += `${data.option.recaps.sign?.shape?.label} ${data.option.recaps.sign?.shape?.value || ''}, `

    if (data.option.recaps?.sign?.fixingMethod?.label) {
      optionName += `${data.option.recaps.sign?.fixingMethod?.label} ${data.option.recaps.sign?.fixingMethod?.value || ''}, `
    }
    if (data.option.recaps?.faces?.face1) {
      optionName += `${data.option.recaps?.faces?.face1} `;
      optionName += `${data.option.recaps.sign?.color?.label}  ${data.option.recaps.sign?.color.value?.face1?.name},`
      optionName += `${data.option.recaps.sign?.border?.label} ${data.option.recaps.sign?.border?.value?.face1?.type} `
      optionName += `${data.option.recaps.sign?.border?.value?.face1?.codeHex || ""}`

      optionName += `, ${data.option.recaps?.faces?.face2} `;
      optionName += `${data.option.recaps.sign?.color?.label} ${data.option.recaps.sign?.color?.value?.face2?.name}, `
      optionName += `${data.option.recaps.sign?.border?.label} ${data.option.recaps.sign?.border?.value?.face2?.type} `
      optionName += `${data.option.recaps.sign?.border?.value?.face2?.codeHex || ""}`

    }
    if (!data.option.recaps?.faces?.face1) {
      optionName += ` ${data.option.recaps.sign?.color?.label} ${data.option.recaps.sign?.color?.value.name} ${data.option.recaps.sign?.color?.value?.codeHex || ''}, `

      if (data.option.recaps.sign?.border?.value) {

        optionName += `${data.option.recaps.sign?.border?.label} ${data.option.recaps.sign?.border?.value?.type || ''} ${data.option.recaps.sign?.border?.value?.codeHex}`
      }
    }
    let designImage = "";
    const recaps = data?.option?.recaps ?? {};
    if (recaps.faces?.face1 && recaps.designImages?.face1?.[0]) {
      designImage = uploadBase64(recaps.designImages.face1[0].format, recaps.designImages.face1[0].url, session.id);
    } else if (recaps.designImages?.[0]) {
      designImage = uploadBase64(recaps.designImages[0].format, recaps.designImages[0].url, session.id);
    } else if (recaps.printImage) {
      const print = Array.isArray(recaps.printImage) ? recaps.printImage[0] : recaps.printImage;
      const url = typeof print === "string" ? print : (print?.url ?? (print as { face1?: string })?.face1 ?? "");
      const format = typeof url === "string" && url.startsWith("data:image/svg") ? "svg" : "png";
      if (url) designImage = uploadBase64(format, url, session.id);
    }
    const shopDomain = (session as { shop?: string }).shop ?? (session as { id?: string }).id ?? "";
    const imageUrl = designImage
      ? (shopDomain ? getShopProxyUrlWithSlash(shopDomain) + designImage : `${process.env.SHOPIFY_APP_URL}/${designImage}`)
      : "";

    const product = await ShopifyProductService.create(
      data.option.recaps.configuration?.id,
      admin,
      `${data.option.recaps.configuration?.name}`
      ,
      optionName,
      imageUrl,
      optionName
    )

    await ShopifyProductService.publish(admin, product.id)
    const recapsPath = assignShopDesignPath(session.id, `recaps/${product.variants.edges[0].node.legacyResourceId}.json`)

    const recapsSaved = updateOrCreateJsonData(recapsPath, data.option.recaps);
    if (!recapsSaved) {
      console.warn("[add-cart-variant] updateOrCreateJsonData failed for path:", recapsPath, "- continuing to create variant");
    }

    const variant = await ShopifyProductService.updateVariant(
      admin,
      product.id,
      product.variants.edges[0].node.id,
      optionName,
      data.price,
      { recapsPath: recapsSaved ? recapsPath : undefined }
    )

    if (!variant || !variant.variantId) {
      console.error("[add-cart-variant] updateVariant returned no variant:", variant);
      return json({ status: false, message: "Failed to create variant", error: "variant_creation_failed" });
    }
    return json(variant);
  } catch (error) {
    console.log("error  on getting add cart", error);
    return json({ error: "error  on getting add cart" });
  }
};


export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ error: "error  on getting add cart load" });
};

