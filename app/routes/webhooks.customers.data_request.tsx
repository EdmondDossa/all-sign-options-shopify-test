import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import db from "../db.server";

export async function action({ request }: ActionFunctionArgs) {
  // Vérifier que c'est une requête POST avec JSON
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  const contentType = request.headers.get("Content-Type");
  if (!contentType || !contentType.includes("application/json")) {
    return json({ error: "Invalid content type" }, { status: 400 });
  }

  try {
    const payload = await request.json();
    const { shop_id, shop_domain, customer, orders_requested, data_request } = payload;

    console.log("Received customers/data_request webhook:", {
      shop_id,
      shop_domain,
      customer_id: customer?.id,
      customer_email: customer?.email,
      orders_requested,
      data_request_id: data_request?.id
    });

    // Trouver la session/boutique dans notre base de données
    const session = await db.session.findFirst({
      where: { shop: shop_domain }
    });

    if (!session) {
      console.log(`Shop not found: ${shop_domain}`);
      return json({ message: "Shop not found" }, { status: 404 });
    }

    // Collecter toutes les données liées à ce client
    const customerData: any = {
      shop_info: {
        shop_id: session.id,
        shopify_domain: session.shop,
        created_at: session.expires,
        is_online: session.isOnline,
        scope: session.scope,
        user_id: session.userId,
        first_name: session.firstName,
        last_name: session.lastName,
        email: session.email,
        locale: session.locale
      },
      customer_info: {
        shopify_customer_id: customer?.id,
        email: customer?.email,
        phone: customer?.phone
      },
      designs: [],
      configurations: [],
      templates: [],
      fonts: [],
      cliparts: [],
      uploads: []
    };

    // Récupérer les designs liés à ce client (par IP ou email)
    if (customer?.email || customer?.id) {
      const designs = await db.design.findMany({
        where: {
          sessionId: session.id,
          // Note: Nous n'avons pas de champ direct pour l'email client
          // mais nous pouvons chercher par période ou autres critères
        },
        orderBy: { id: 'desc' }
      });

      customerData.designs = designs.map((design: any) => ({
        id: design.id,
        customerIp: design.customerIp,
        productId: design.productId,
        configId: design.configId,
        variantId: design.variantId,
        orderId: design.orderId,
        fileName: design.fileName,
        fileSize: design.fileSize,
        fileUrl: design.fileUrl,
        fileType: design.fileType,
        storage: design.storage,
        zipFile: design.zipFile
      }));
    }

    // Récupérer les configurations de la boutique
    const configurations = await db.configuration.findMany({
      where: {
        sessionId: session.id
      },
      orderBy: { id: 'desc' }
    });

    customerData.configurations = configurations.map((config: any) => ({
      id: config.id,
      name: config.name,
      description: config.description,
      icon: config.icon,
      popupImg: config.popupImg,
      data: config.data,
      products: config.products || (Array.isArray(config.product) ? config.product : [])
    }));

    // Récupérer les templates
    const templates = await db.template.findMany({
      where: {
        sessionId: session.id
      },
      orderBy: { id: 'desc' }
    });

    customerData.templates = templates.map((template: any) => ({
      id: template.id,
      name: template.name,
      basePrice: template.basePrice,
      prevImg: template.prevImg,
      realImg: template.realImg,
      recaps: template.recaps,
      enabledAddToCart: template.enabledAddToCart,
      enabledAutoImgUpdate: template.enabledAutoImgUpdate,
      configurationId: template.configurationId,
      categoryId: template.categoryId,
      data: template.data
    }));

    // Récupérer les polices
    const fonts = await db.font.findMany({
      where: {
        sessionId: session.id
      },
      orderBy: { id: 'desc' }
    });

    customerData.fonts = fonts.map((font: any) => ({
      id: font.id,
      label: font.label,
      url: font.url,
      isGoogleFont: font.isGoogleFont
    }));

    // Récupérer les groupes de cliparts
    const clipartsGroups = await db.clipartsGroup.findMany({
      where: {
        sessionId: session.id
      },
      include: {
        cliparts: true
      },
      orderBy: { id: 'desc' }
    });

    customerData.cliparts = clipartsGroups.map((group: any) => ({
      id: group.id,
      title: group.title,
      description: group.description,
      cliparts: group.cliparts.map((clipart: any) => ({
        id: clipart.id,
        title: clipart.title,
        url: clipart.url,
        additionalPrice: clipart.additionalPrice
      }))
    }));

    // Récupérer les uploads
    const uploads = await db.upload.findMany({
      where: {
        shop: shop_domain
      }
    });

    customerData.uploads = uploads.map((upload: any) => ({
      id: upload.id,
      files: upload.files,
      shop: upload.shop
    }));

    // Récupérer les paramètres
    const settings = await db.setting.findUnique({
      where: {
        sessionId: session.id
      }
    });

    if (settings) {
      customerData.settings = {
        id: settings.id,
        data: settings.data
      };
    }

    // Log pour audit (optionnel)
    console.log(`Customer data request processed for shop ${shop_domain}, customer ${customer?.id}`);

    // Retourner les données collectées
    // Note: Dans un vrai scénario, vous pourriez vouloir envoyer ces données
    // directement au propriétaire de la boutique via email ou autre méthode
    return json({
      message: "Customer data request processed successfully",
      data_request_id: data_request?.id,
      customer_id: customer?.id,
      shop_domain,
      data_summary: {
        designs_count: customerData.designs.length,
        configurations_count: customerData.configurations.length,
        templates_count: customerData.templates.length,
        fonts_count: customerData.fonts.length,
        cliparts_groups_count: customerData.cliparts.length,
        uploads_count: customerData.uploads.length,
        has_settings: !!customerData.settings
      }
    });

  } catch (error) {
    console.error("Error processing customers/data_request webhook:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
}
