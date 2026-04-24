
var shopifyProxyURL = `${window.Shopify.routes.root}apps/aso-proxy/api/`;
var urlParams = new URLSearchParams(window.location.search);
var paramAsoConfigurationId = urlParams.get('aso-config-id');
var asoTemplateId = urlParams.get('aso-template-id');

function asoLogConfiguratorDebug(label, payload) {
  try {
    console.groupCollapsed(`[ASO Configurator] ${label}`);
    console.log(payload);
    console.groupEnd();
  } catch (error) {
    console.log(`[ASO Configurator] ${label}`, payload);
  }
}

function asoGetConfiguratorDebugSnapshot(asoData, configuration) {
  const currentConfig = asoData?.currentConfig || {};
  const currentData = currentConfig?.data || {};
  const settings = currentData?.settings || {};
  const themes = settings?.themes || {};
  const requiredOptions = currentData?.requiredOptions || {};
  const additionalOptions = currentData?.additionalOptions || {};

  return {
    mountNodeFound: !!document.getElementById("aso-frontend-app"),
    configurationId: configuration?.id || null,
    configurationName: configuration?.name || configuration?.title || "",
    productType: currentConfig?.productType || null,
    pricingMode: currentConfig?.pricingMode || null,
    skin: asoData?.skin || null,
    hasCurrentConfig: !!asoData?.currentConfig,
    hasCurrentConfigData: !!currentData && Object.keys(currentData).length > 0,
    hasSettings: Object.keys(settings).length > 0,
    hasThemes: Object.keys(themes).length > 0,
    themeSkin: themes?.skin || null,
    hasLanguageImages: !!settings?.languageImages,
    iconCount: Array.isArray(settings?.languageImages?.icons?.listIcons)
      ? settings.languageImages.icons.listIcons.length
      : 0,
    fontCount: Array.isArray(requiredOptions?.fontOptions?.fonts)
      ? requiredOptions.fontOptions.fonts.length
      : 0,
    sizeCount: Array.isArray(requiredOptions?.sizeOptions?.sizes)
      ? requiredOptions.sizeOptions.sizes.length
      : 0,
    colorCount: Array.isArray(requiredOptions?.colorOptions?.colors)
      ? requiredOptions.colorOptions.colors.length
      : 0,
    priceOptionCount: Array.isArray(requiredOptions?.priceOptions)
      ? requiredOptions.priceOptions.length
      : 0,
    materialCount: Array.isArray(additionalOptions?.materialOptions?.materials)
      ? additionalOptions.materialOptions.materials.length
      : 0,
    mountingCount: Array.isArray(additionalOptions?.mountingOptions?.mountings)
      ? additionalOptions.mountingOptions.mountings.length
      : 0,
    backboardCount: Array.isArray(additionalOptions?.backboardOptions?.backboards)
      ? additionalOptions.backboardOptions.backboards.length
      : 0,
  };
}

function asoParseJson(value) {
  if (!value) return null;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  }
  return typeof value === "object" ? value : null;
}

function asoNormalizeText(value, fallback = "") {
  const normalized = String(value || "").trim();
  return normalized || fallback;
}

function asoNormalizeProductType(value) {
  return asoNormalizeText(value).toLowerCase();
}

function asoNormalizeNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function asoGetStorefrontProxyBase() {
  const root = String(window.Shopify?.routes?.root || '/');
  const normalizedRoot = root.endsWith('/') ? root : `${root}/`;
  return `${window.location.origin}${normalizedRoot}apps/aso-proxy/`;
}

function asoNormalizeProxyAssetUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return raw;

  const proxyBase = asoGetStorefrontProxyBase();
  const normalizePath = (path = '', search = '', hash = '') => {
    const cleanedPath = String(path || '').replace(/^\/+/, '');
    if (!cleanedPath) return raw;

    if (cleanedPath.startsWith('apps/aso-proxy/')) {
      return `${proxyBase}${cleanedPath.replace(/^apps\/aso-proxy\//, '')}${search}${hash}`;
    }

    if (cleanedPath.startsWith('uploads/')) {
      return `${proxyBase}${cleanedPath}${search}${hash}`;
    }

    if (cleanedPath.startsWith('aso_default_files/')) {
      return `${proxyBase}${cleanedPath}${search}${hash}`;
    }

    return raw;
  };

  if (/^https?:\/\//i.test(raw)) {
    try {
      const parsed = new URL(raw);
      return normalizePath(parsed.pathname, parsed.search, parsed.hash);
    } catch {
      return raw;
    }
  }

  if (/^https?:\/\/[^/]+\/apps\/aso-proxy\//i.test(raw)) {
    const [, proxyPath = ''] = raw.split(/\/apps\/aso-proxy\//i);
    return `${proxyBase}${proxyPath.replace(/^\/+/, '')}`;
  }

  if (raw.startsWith('/apps/aso-proxy/')) {
    return `${proxyBase}${raw.replace(/^\/apps\/aso-proxy\//, '')}`;
  }

  if (raw.startsWith('apps/aso-proxy/')) {
    return `${proxyBase}${raw.replace(/^apps\/aso-proxy\//, '')}`;
  }

  if (raw.startsWith('/uploads/')) {
    return `${proxyBase}${raw.replace(/^\/+/, '')}`;
  }

  if (raw.startsWith('uploads/')) {
    return `${proxyBase}${raw}`;
  }

  if (raw.startsWith('/aso_default_files/')) {
    return `${proxyBase}${raw.replace(/^\/+/, '')}`;
  }

  if (raw.startsWith('aso_default_files/')) {
    return `${proxyBase}${raw}`;
  }

  return normalizePath(raw);
}

function asoNormalizeProxyAssetTree(input) {
  if (typeof input === 'string') {
    return asoNormalizeProxyAssetUrl(input);
  }

  if (Array.isArray(input)) {
    return input.map((entry) => asoNormalizeProxyAssetTree(entry));
  }

  if (input && typeof input === 'object') {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key, asoNormalizeProxyAssetTree(value)]),
    );
  }

  return input;
}

function asoNormalizeNcpcAssets(data) {
  if (!data || typeof data !== "object") {
    return {};
  }

  data = asoNormalizeProxyAssetTree(data);

  if (data.settings?.themeColors && typeof data.settings.themeColors === "object") {
    data.settings.themeColors.customCss = asoNormalizeText(
      data.settings.themeColors.customCss || data.settings.themeColors.customCSS,
      "",
    );
    delete data.settings.themeColors.customCSS;
  }

  const icons = data.settings?.languageImages?.icons?.listIcons;
  if (Array.isArray(icons)) {
    data.settings.languageImages.icons.listIcons = icons
      .filter((icon) => icon && typeof icon === "object")
      .map((icon) => {
        const fontUrl = asoNormalizeText(
          icon.iconFontUrl || icon.fontFile || icon.fontUrl || icon.fileTtf,
        );
        const fontFamily = asoNormalizeText(
          icon.iconFontFamily || icon.fontFamily || icon.familyName,
        );
        const glyph = asoNormalizeText(icon.iconGlyph || icon.glyph);
        const codepoint = asoNormalizeText(icon.iconCodepoint || icon.codepoint);

        return {
          ...icon,
          ...(fontUrl
            ? {
                iconFontUrl: fontUrl,
                fontFile: fontUrl,
                fontUrl,
                fileTtf: fontUrl,
              }
            : {}),
          ...(fontFamily
            ? {
                iconFontFamily: fontFamily,
                fontFamily,
              }
            : {}),
          ...(glyph
            ? {
                iconGlyph: glyph,
                glyph,
              }
            : {}),
          ...(codepoint
            ? {
                iconCodepoint: codepoint,
                codepoint,
              }
            : {}),
        };
      });
  }

  return data;
}

function asoResolveNcpcConfigurationData(configuration) {
  const rootData = asoParseJson(configuration?.data) || {};
  const wrappedNcpcData = asoParseJson(rootData?.ncpc);
  const resolvedData =
    wrappedNcpcData && typeof wrappedNcpcData === "object" ? wrappedNcpcData : rootData;

  return asoNormalizeNcpcAssets(structuredClone(resolvedData));
}

function asoResolveNcpcSkin(data) {
  return asoNormalizeText(
    data?.settings?.themes?.skin ||
      data?.settings?.themes?.colors?.skin ||
      data?.settings?.themeColors?.skin,
    "default",
  ).toLowerCase();
}

function buildAsoNcpcStorefrontData(configuration) {
  const currentConfigData = asoResolveNcpcConfigurationData(configuration);
  const skin = asoResolveNcpcSkin(currentConfigData);
  const regularPrice = asoNormalizeNumber(asoRegularPrice, 0);

  return {
    skin,
    productID: asoNormalizeNumber(asoProductId, 0),
    product: {
      id: asoNormalizeNumber(asoProductId, 0),
      title: asoNormalizeText(
        configuration?.product?.title || configuration?.name || configuration?.title,
        "Storefront product",
      ),
    },
    author: "ASO",
    site_url: encodeURIComponent(window.location.origin),
    caches: {
      timestamp: "0",
      time: "0",
      seconds_until: 0,
    },
    ncpc_product: null,
    currentConfig: {
      id: asoNormalizeNumber(configuration?.id),
      title: asoNormalizeText(configuration?.name || configuration?.title, "Configuration"),
      productType:
        asoNormalizeProductType(configuration?.productType) ||
        asoNormalizeProductType(currentConfigData?.productType),
      pricingMode:
        asoNormalizeProductType(configuration?.pricingMode) ||
        asoNormalizeProductType(currentConfigData?.pricingMode),
      data: currentConfigData,
    },
    regularPrice,
    wc_rate: 1,
    thousandSep: asoNormalizeText(asoThousandSep, " "),
    decimalSep: asoNormalizeText(asoDecimalSep, "."),
    decimals: 2,
    nbDecimals: 2,
    currencySymbol: asoNormalizeText(asoCurrency, ""),
    currency_pos: asoNormalizeText(asoCurrency_pos, "right"),
    variations: [],
    wpApiSettings: {
      root: "",
      nonce: "",
      user: 0,
    },
  };
}

function ensureAsoFrontendRoot() {
  const appRoot = document.getElementById("app");
  const asoRoot = document.getElementById("aso-frontend-app");

  if (asoRoot) {
    return asoRoot;
  }

  if (appRoot) {
    appRoot.id = "aso-frontend-app";
    return appRoot;
  }

  return null;
}

async function asoPrepareNcpcConfiguratorData(configuration) {
  const asoData = buildAsoNcpcStorefrontData(configuration);
  window.asoData = asoData;
  window.asoNcpcData = asoData;
  ensureAsoFrontendRoot();
  asoLogConfiguratorDebug("Prepared storefront data", {
    snapshot: asoGetConfiguratorDebugSnapshot(asoData, configuration),
    asoData,
    configuration,
  });
  return asoData;
}

if (!window.__asoConfiguratorDebugListenersAttached) {
  window.__asoConfiguratorDebugListenersAttached = true;
  window.addEventListener("error", (event) => {
    console.error("[ASO Configurator] window error", {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
    });
  });
  window.addEventListener("unhandledrejection", (event) => {
    console.error("[ASO Configurator] unhandled rejection", event.reason);
  });
}

function getAsoProxyAbsoluteUrl(path = '') {
  const normalizedPath = String(path || '').replace(/^\/+/, '');
  return `${window.Shopify?.routes?.root || '/'}apps/aso-proxy/api/${normalizedPath}`;
}

async function asoFetchJson(url, options = {}) {
  const response = await fetch(url, options);
  let data = null;

  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `ASO request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}




if (asoTemplateId && paramAsoConfigurationId) {
  // Si on a un template-id dans l'URL, on doit utiliser le config-id de l'URL
  // même si asoConfigurationId est déjà défini (car il pourrait être vide ou incorrect)
  // Cela permet de charger le configurateur même si le produit n'a pas de metafield asoConfigurationId
  asoConfigurationId = paramAsoConfigurationId;
}
async function getAsoConfiguration(configurationId) {
  try {
    const response = await fetch(`${shopifyProxyURL}configurations/${configurationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`ASO Proxy configuration fetch failed with status: ${response.status}`);
    }

    const data = asoNormalizeProxyAssetTree(await response.json());
    return data;
  } catch (error) {
    console.error('Error fetching ASO Proxy configuration:', error);
    // Handle the error appropriately in your application (e.g., display an error message to the user)
    return null; // Or throw an error if necessary
  }
}


async function getAsoTemplateById(templateId) {
  try {
    const response = await fetch(`${shopifyProxyURL}templates/${templateId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`ASO Proxy template fetch failed with status: ${response.status}`);
    }

    const data = asoNormalizeProxyAssetTree(await response.json());
    return data;
  } catch (error) {
    console.error('Error fetching ASO Proxy template:', error);
    // Handle the error appropriately in your application (e.g., display an error message to the user)
    return null; // Or throw an error if necessary
  }
}



async function getAsoManagesData() {


  try {
    console.log('Calling manages-data API at:', shopifyProxyURL + 'manages-data');
    const response = await fetch(`${shopifyProxyURL}manages-data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`ASO Proxy configuration fetch failed with status: ${response.status}`);
    }

    const data = asoNormalizeProxyAssetTree(await response.json());
    return data;
  } catch (error) {
    console.error('Error fetching ASO Proxy configuration:', error);
    // Handle the error appropriately in your application (e.g., display an error message to the user)
    return null; // Or throw an error if necemmmssuhhh ssscurrentConfig.data.settings.theme.skin
  }
}




console.log("config id and  product dfg   kihhhg ", asoConfigurationId, asoProductId);

async function aso_confiurator_dataFunction() {
  const managesData = await getAsoManagesData();

  let currentConfig = null;
  let template = null;
  if (asoConfigurationId) {
    currentConfig = await getAsoConfiguration(asoConfigurationId);

    template = asoTemplateId ? await getAsoTemplateById(asoTemplateId) : null;

    if (!currentConfig) {
      currentConfig = getDefaultConfig();
    }
  } else {

    currentConfig = getDefaultConfig();
    document.querySelector(".aso-app-not-found").style.display = "flex";
  }

  if (currentConfig && managesData) {
    managesData.fonts = managesData.fonts.filter(font => currentConfig.data.settings.customizerSign.text.selectedFonts?.includes(font.id)) ?? [];
    managesData.cliparts = managesData.cliparts.filter(clipart => currentConfig.data.settings.customizerSign.images.enableClipart?.selectClipartGroups?.includes(clipart.id));
  }
  defaultStyle(`${window.location.origin}/${window.Shopify?.routes?.root?.replace("/", '')}apps/aso-proxy`);
  //  to add  font and custom css to  page
  if (managesData && managesData.fonts) {
    managesData.fonts?.forEach(font => {
      let style = document.createElement('style');
      style.textContent = `
          
  @font-face {
    font-family: "${font.label?.replaceAll(/\s+/g, '-')}";
    src: url('${font.url}') format('${asoGetFontFormat(font.url)}');
  }
      
      `;
      document.body.appendChild(style);
    });
  }
  try {
    currentConfig['data']['settings']['themeColors']['customCss'] && addStylesToBody(currentConfig['data']['settings']['themeColors']['customCss']);
  } catch (error) {
    console.error('Error adding custom CSS:', error);
  }
  // end to add  font and custom css to  page


  if (asoTemplateId && template) {
    asoRegularPrice = template.basePrice || 0;
  }


  return ({
    skin: currentConfig['data']['settings']["themeColors"]["skin"],
    productID: asoProductId,
    currentConfig: currentConfig,
    managesData: managesData,
    currency_pos: asoCurrency_pos,
    thousandSep: asoThousandSep,
    decimalSep: asoDecimalSep,
    decimals: "0",
    nbDecimals: "2",
    currencySymbol: asoCurrency,
    variations: [],
    fixing_methods_url:
      "/apps/aso-proxy/assets/images/fixing-methodes",
    frontend_nonce: "841fba2b18",
    product: {},
    regularPrice: "0",
    borders_url:
      "/apps/aso-proxy/assets/images/fixing-methodes",
    templates: {
      designFromTemplate: template ? true : false,
      template: template || null
    }
  })
};



async function asoAddproductToCart(variantId, quantity = 1) {
  let formData = {
    'items': [{
      'id': variantId,
      'quantity': quantity
    }]
  };
  try {
    let response = await fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (response.json()) {
      return true
    }



  } catch (error) {
    console.log("Error adding product  to cart :", error)
  }

  return false;
}


async function getAsoCheckoutUrl(cartId) {


  try {
    const response = await fetch(`${shopifyProxyURL}checkout-url/${cartId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`ASO Proxy configuration fetch failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching ASO Proxy configuration:', error);
    // Handle the error appropriately in your application (e.g., display an error message to the user)
    return null; // Or throw an error if necemmmssuhhh ssscurrentConfig.data.settings.theme.skin
  }
}

async function asoReidirectToCheckout() {
  try {
    const response = await fetch(window.Shopify.routes.root + 'cart.js');
    const data = await response.json();

    const checkoutUrl = await getAsoCheckoutUrl(encodeURIComponent(data.token));

    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
  }
}


async function asoUploadsOnfinish(option) {
  let files = []

  if (Array.isArray(option.recaps.printImage)) {
    for (const face in option.recaps.printImage) {
      files.push(option.recaps.printImage[face]);
    }

    for (const face in option.recaps.designImages) {
      for (const designImage of option.recaps.designImages[face]) {
        files.push(designImage.url);
      }
    }

  } else {
    files.push(option.recaps.printImage);
    for (const designImage of option.recaps.designImages) {
      files.push(designImage.url);
    }
  }



  window.postMessage({
    type: 'UPLOAD_ON_FINISH',
    payload: JSON.stringify(files)
  }, '*');

}

async function asoCreateVariantAndAddToCart(price, option, asoProductID = asoProductId, regularPrice = asoRegularPrice, redirectToCheckOut = false) {

  try {
    console.log('[ASO] asoCreateVariantAndAddToCart called with:', { price, option, asoProductID, regularPrice, redirectToCheckOut });

    // Vérifier que l'option est définie
    if (!option || typeof option !== 'object') {
      console.error('[ASO] Invalid option data:', option);
      throw new Error('Invalid option data');
    }

    if (option.uploadFileOnFinish) {
      console.log('[ASO] Upload file on finish detected, returning null');
      asoUploadsOnfinish(option);
      return null;
    }

    // Vérifier et corriger le prix
    let calculatedPrice = parseFloat(`${price}`) + parseFloat(`${regularPrice}`);
    if (!isFinite(calculatedPrice) || calculatedPrice < 0) {
      console.error('[ASO] Invalid price calculation:', { price, regularPrice, calculatedPrice });
      console.log('[ASO] Using fallback price calculation');

      // Utiliser un prix par défaut basé sur le prix régulier
      const fallbackPrice = parseFloat(`${regularPrice}`) || 0;
      calculatedPrice = fallbackPrice + (fallbackPrice * 0.1); // Ajouter 10% comme marge
      console.log('[ASO] Fallback price set to:', calculatedPrice);
    }

    const data = {
      productId: `gid://shopify/Product/${asoProductID}`,
      price: calculatedPrice,
      option: JSON.stringify(option)
    };

    console.log('[ASO] Making API call to /apps/aso-proxy/api/add-cart-variant');
    console.log('[ASO] Request data:', data);

    let response = await fetch((window.Shopify?.routes?.root || '/') + 'apps/aso-proxy/api/add-cart-variant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    console.log('[ASO] API response status:', response.status);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    let responseData = await response.json();

    console.log('[ASO] API response data:', responseData);

    // Vérifier que la réponse existe (l'API peut retourner null en cas d'erreur)
    if (responseData == null || responseData === undefined) {
      console.error('[ASO] Invalid API response - null or empty:', responseData);
      throw new Error('Invalid API response - server returned no data');
    }

    // Vérifier si l'API a retourné une erreur
    if (responseData.status === false || responseData.error) {
      console.error('[ASO] API returned error:', responseData);
      throw new Error(`API error: ${responseData.message || responseData.error || 'Unknown error'}`);
    }

    // Vérifier que la réponse contient bien un variantId
    if (!responseData.variantId) {
      console.error('[ASO] Invalid API response - missing variantId:', responseData);
      throw new Error('Invalid API response - missing variantId');
    }

    if (redirectToCheckOut) {
      console.log('[ASO] Redirecting to checkout:', `${window.location.origin}/cart/${responseData.variantId}:1`);
      document.location = window.location.origin + `/cart/${responseData.variantId}:1`;
    } else {
      console.log('[ASO] Redirecting to cart:', `${window.location.origin}/cart/${responseData.variantId}:1?storefront=true`);
      document.location = window.location.origin + `/cart/${responseData.variantId}:1?storefront=true`;
    }
  } catch (error) {
    console.error('[ASO] Error in asoCreateVariantAndAddToCart:', error);

    // En cas d'erreur, essayer d'ajouter le produit de base au panier
    console.log('[ASO] Fallback: trying to add base product to cart');
    try {
      // Extraire l'ID numérique du produit (enlever le préfixe gid://shopify/Product/)
      const numericProductId = asoProductID.replace('gid://shopify/Product/', '');
      console.log('[ASO] Using numeric product ID for fallback:', numericProductId);

      const fallbackData = {
        'items': [{
          'id': numericProductId,
          'quantity': 1
        }]
      };

      console.log('[ASO] Fallback request data:', fallbackData);

      let fallbackResponse = await fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fallbackData)
      });

      console.log('[ASO] Fallback response status:', fallbackResponse.status);

      if (fallbackResponse.ok) {
        console.log('[ASO] Fallback successful, redirecting to cart');
        document.location = window.location.origin + '/cart';
      } else {
        const errorText = await fallbackResponse.text();
        console.error('[ASO] Fallback failed with status:', fallbackResponse.status, 'Error:', errorText);
        // Ne pas rediriger vers le panier : rien n'a été ajouté (cart/add attend un variant id, pas un product id)
        if (typeof notyf !== 'undefined') {
          notyf.error('Impossible d\'ajouter au panier. Veuillez personnaliser le design puis cliquer sur "Finish" avant d\'ajouter au panier.');
        }
      }
    } catch (fallbackError) {
      console.error('[ASO] Fallback error:', fallbackError);
      if (typeof notyf !== 'undefined') {
        notyf.error('Une erreur s\'est produite lors de l\'ajout au panier.');
      }
    }
  }
}

function asoGetFontFormat(url) {
  const extension = url.split('.').pop().toLowerCase();
  switch (extension) {
    case 'ttf':
      return 'truetype';
    case 'otf':
      return 'truetype';
    case 'woff': return 'woff';
    case 'woff2':
      return 'woff2'; // WOFF2 is preferred for better compression
    // Add more cases for other font formats (e.g., otf for OpenType)
    default:

      return null;
  }
}


function addStylesToBody(cssRules) {
  var styleElement = document.createElement("style");
  styleElement.textContent = cssRules;
  document.body.appendChild(styleElement);
}

async function add_to_cart_shopify(cart_data, redirectToCheckOut) {
  await asoCreateVariantAndAddToCart(cart_data.recaps.custom_price, cart_data, asoProductId, asoRegularPrice, redirectToCheckOut);
};


async function addTemplateToCartShopify(template) {
  var productRef = template?.configuration?.product;
  var productId = Array.isArray(productRef) ? (productRef[0]?.id) : (productRef?.id);
  var cartData = template?.data?.data?.cartData || template?.data?.cartData;
  if (productId && cartData) {
    var numericId = String(productId).split('/').pop();
    await asoCreateVariantAndAddToCart(cartData.custom_price, { recaps: cartData }, numericId, template.basePrice);
  }
};


function setScrollColor_shopify(color) {

}

function formatPrice_shopify(price) {
  let parsedPrice = parseFloat(price) || 0;
  let additionalPrice = parseFloat(asoRegularPrice) || 0;
  let formattedPrice = (parsedPrice + additionalPrice).toFixed(2);

  if (asoPriceFormat) {
    if (asoPriceFormat.includes('{{amount}}')) {
      return asoPriceFormat.replace("{{amount}}", formattedPrice);
    }
    if (asoPriceFormat.includes('{{amount_no_decimals}}')) {
      return asoPriceFormat.replace("{{amount_no_decimals}}", Math.round(formattedPrice));
    }
  }

  return formattedPrice;
}

function globalFormatPrice_shopify(price) {
  let parsedPrice = parseFloat(price) || 0;
  let formattedPrice = (parsedPrice).toFixed(2);

  if (asoPriceFormat) {
    if (asoPriceFormat.includes('{{amount}}')) {
      return asoPriceFormat.replace("{{amount}}", formattedPrice);
    }
    if (asoPriceFormat.includes('{{amount_no_decimals}}')) {
      return asoPriceFormat.replace("{{amount_no_decimals}}", Math.round(formattedPrice));
    }
  }

  return formattedPrice;
}


function getAsoUrl_shopify() {
  return "/apps/aso-proxy";
}

function registerAsoNcpcShopifyBridge() {
  window.asoShopifyNcpcApi = {
    mode: 'shopify',
    getProxyBaseUrl() {
      return getAsoProxyAbsoluteUrl('');
    },
    async addToCart(recaps, redirectToCheckOut = false) {
      const safeRecaps = recaps && typeof recaps === 'object' ? recaps : {};
      const customPrice =
        Number(
          safeRecaps?.custom_price ??
          safeRecaps?.customPrice ??
          safeRecaps?.recaps?.custom_price ??
          0
        ) || 0;

      return asoCreateVariantAndAddToCart(
        customPrice,
        { recaps: safeRecaps },
        asoProductId,
        asoRegularPrice,
        redirectToCheckOut,
      );
    },
    async shareConfiguration(configData) {
      return asoFetchJson(getAsoProxyAbsoluteUrl('aso-config-share'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          configId: String(window.asoConfigurationId || ''),
          productId: String(window.asoProductId || ''),
          configuration: configData,
        }),
      });
    },
    async getSharedConfiguration(shareId) {
      return asoFetchJson(
        getAsoProxyAbsoluteUrl(`aso-config-share/${encodeURIComponent(shareId)}`),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    },
    async addRequestQuote(formData) {
      return asoFetchJson(getAsoProxyAbsoluteUrl('aso-request-quotes'), {
        method: 'POST',
        body: formData,
      });
    },
  };

  window.asoNcpcBridge = window.asoShopifyNcpcApi;
}

registerAsoNcpcShopifyBridge();


async function asoUpdateTemplate_shopify(template_id, template_data) {

}


async function asoGetTemplate_shopify(template_config_id, template_id) {
  // hhh nnn
}


function getRouteTemplate_shopify() {
  return null;
}


function getDefaultConfig() {

  return {
    "id": 7,
    "name": "My new config",
    "description": "My new config",
    "icon": "https://local-aso-dev-two.myshopify.com/apps/aso-proxy/uploads/offline_local-aso-dev-two/files/Metallic_Silver by ambersstock on DeviantArt-1724258743356.jpeg",
    "popupImg": "",
    "sessionId": "offline_local-aso-dev-two.myshopify.com",
    "data": {
      "settings": {
        "generals": {
          "mobile": {
            "showNavigatorMenu": "off",
            "showNavigationMenuFirst": "yes",
            "mobileSelectionOptionsDisplay": "horizontally"
          },
          "output": {
            "waterMark": "",
            "filesFormat": "png",
            "zipOutputFiles": {
              "active": true,
              "zipOutFolderPrefix": "aso_"
            },
            "designComposition": true,
            "pdfDpi": 300
          },
          "product": {
            "designFromScratch": true,
            "redirectToCheckOutPage": false,
            "displayRecapsOnCheckout": false,
            "hidePricing": false,
            "showRecapAfterFinish": true,
            "redirectAfterAddingToCart": true,
            "hideDesignButtonsOnShopPage": false,
            "hideAddToCartButtonOnShopPage": true,
            "hideAddToCartButtonOnDetailPage": true
          }
        },
        "themeColors": {
          "skin": "default",
          "colors": {
            "bars": {
              "help": {
                "textColor": "#ffffff",
                "borderColor": "#016464",
                "hoverTextColor": "#ffffff",
                "backgroundColor": "#016464",
                "hoverBorderColor": "#016464",
                "hoverBackgroundColor": "#016464"
              },
              "price": {
                "textColor": "#000000",
                "textAfterColor": "#000000",
                "backgroundColor": "#ffffff",
                "textBeforeColor": "#000000"
              },
              "reset": {
                "textColor": "#000000",
                "borderColor": "#ffffff",
                "hoverTextColor": "#dd3232",
                "modalTextColor": "#000000",
                "backgroundColor": "#ffffff",
                "hoverBorderColor": "#f4f8fa",
                "hoverBackgroundColor": "#f4f8fa",
                "modalBackgroundColor": "#000000",
                "modalNoButtonTextColor": "#ffffff",
                "modalYesButtonTextColor": "#000000",
                "modalContainerBackground": "#ffffff",
                "modalNoButtonBackgroundColor": "#dc2626",
                "modalYesButtonBackgroundColor": "#f4f8fa"
              },
              "preview": {
                "textColor": "#000000",
                "borderColor": "#ffffff",
                "hoverTextColor": "#016464",
                "backgroundColor": "#ffffff",
                "hoverBorderColor": "#f4f8fa",
                "hoverBackgroundColor": "#f4f8fa"
              },
              "undoRedo": {
                "textColor": "#000000",
                "borderColor": "#ffffff",
                "hoverTextColor": "#016464",
                "backgroundColor": "#ffffff",
                "hoverBorderColor": "#f4f8fa",
                "disabledTextColor": "#c3cfd6",
                "hoverBackgroundColor": "#f4f8fa",
                "disabledBackgroundColor": "#ffffff"
              },
              "titleColor": "#000000",
              "backgroundColor": "#ffffff"
            },
            "canvas": {
              "borderColor": "#c3cfd6",
              "backgroundColor": "#f4f8fa"
            },
            "recaps": {
              "backgroundColor": "#ffffff",
              "headerTextColor": "#ffffff",
              "optionTextColor": "#000000",
              "optionBorderColor": "#eef3f6",
              "buttonEditTextColor": "#ffffff",
              "optionHoverTextColor": "#000000",
              "buttonFinishTextColor": "#14213d",
              "headerBackgroundColor": "#058585",
              "optionHoverBorderColor": "#eef3f6",
              "buttonAddToCartTextColor": "#14213d",
              "buttonEditHoverTextColor": "#f4f8fa",
              "buttonEditBackgroundColor": "#016464",
              "buttonFinishHoverTextColor": "#313e52",
              "optionHoverBackgroundColor": "#eef3f6",
              "buttonFinishBackgroundColor": "#febd52",
              "buttonAddToCartHoverTextColor": "#313e52",
              "buttonAddToCartBackgroundColor": "#febd52",
              "buttonEditHoverBackgroundColor": "#058585",
              "buttonFinishHoverBackgroundColor": "#fcac29",
              "buttonAddToCartHoverBackgroundColor": "#fcac29"
            },
            "objectsOptions": {
              "edit": {
                "textColor": "#000000",
                "buttonColor": "#ffffff",
                "hoverTextColor": "#ffffff",
                "hoverButtonColor": "#787878"
              },
              "clone": {
                "textColor": "#000000",
                "buttonColor": "#ffffff",
                "hoverTextColor": "#ffffff",
                "hoverButtonColor": "#787878"
              },
              "center": {
                "textColor": "#000000",
                "buttonColor": "#ffffff",
                "hoverTextColor": "#ffffff",
                "hoverButtonColor": "#787878"
              },
              "delete": {
                "textColor": "#dd3232",
                "buttonColor": "#ffffff",
                "hoverTextColor": "#dd3232",
                "hoverButtonColor": "#787878"
              },
              "backgroundColor": "#ffffff"
            },
            "optionsSideBar": {
              "options": {
                "modals": {
                  "option": {
                    "textColor": "#000000",
                    "hoverTextColor": "#000000",
                    "activeTextColor": "#016464",
                    "hoverBackgroundColor": "#eef3f6"
                  },
                  "buttons": {
                    "textColor": "#ffffff",
                    "hoverTextColor": "#ffffff",
                    "backgroundColor": "#016464",
                    "hoverBackgroundColor": "#028383"
                  },
                  "textColor": "#000000",
                  "backgroundColor": "#ffffff",
                  "headerTextColor": "#ffffff",
                  "headerBackgroundColor": "#016464"
                },
                "buttons": {
                  "textColor": "#000000",
                  "hoverTextColor": "#016464",
                  "hovertextColor": "#016464",
                  "backgroundColor": "#ffffff",
                  "hoverBackgroundColor": "#ffffff"
                }
              },
              "backgroundColor": "#eef3f6",
              "scrollButtonsTextColor": "#ffffff",
              "scrollButtonsHoverTextColor": "#ffffff",
              "scrollButtonsBackgroundColor": "#4a4a4a",
              "scrollButtonsHoverBackgroundColor": "#74848d"
            }
          },
          "customCss": ""
        },
        "customizerSign": {
          "text": {
            "colors": [
              {
                "name": "black",
                "codeHex": "#000000"
              },
              {
                "name": "White",
                "codeHex": "#FFFFFF"
              },
              {
                "name": "Blue",
                "codeHex": "#004f86"
              },
              {
                "name": "Red",
                "codeHex": "#c4271d"
              },
              {
                "name": "Pink",
                "codeHex": "#eb3f77"
              },
              {
                "name": "Green",
                "codeHex": "#009251"
              },
              {
                "name": "Yellow",
                "codeHex": "#fee900"
              },
              {
                "name": "Gray",
                "codeHex": "#4f575b"
              },
              {
                "name": "Orange",
                "codeHex": "#e15616"
              },
              {
                "name": "Purple",
                "codeHex": "#554585"
              },
              {
                "name": "Brown",
                "codeHex": "#523d2a"
              }
            ],
            "enableBold": true,
            "colorsLabel": "Text  Colors",
            "enableBorder": true,
            "enableItalic": true,
            "enableStrike": true,
            "colorsPrevImg": "",
            "enableOpacity": true,
            "selectedFonts": [],
            "enableCurvedUp": false,
            "enableFontSize": {
              "active": true,
              "defaultFontSize": 16,
              "maximumFontSize": 100,
              "minimumFontSize": 4
            },
            "enableOverline": true,
            "enableUnderline": true,
            "enableCurvedDown": false,
            "enableCustomColor": true,
            "enableTextAlignment": true
          },
          "images": {
            "colors": [],
            "filter": {
              "active": true,
              "enableBlur": true,
              "enableSepia": true,
              "enableEmbross": true,
              "enableOpacity": true,
              "enableSharpen": true,
              "enableGreyscale": false
            },
            "scenes": [],
            "colorsLabel": "Image Colors",
            "colorsPrevImg": "",
            "enableClipart": {
              "active": true,
              "selectClipartGroups": [
                1
              ]
            },
            "fileUploadScript": {
              "uploadMaxWidth": 100,
              "uploadMinWidth": 100,
              "customWithGraphical": false,
              "allowedUploadsExtentions": [
                "png"
              ]
            },
            "enableCustomColor": true,
            "enableUploadImage": true,
            "enableDownloadImage": true
          },
          "signPart": {
            "doublePart": {
              "label": "Switch Face",
              "part1": "Face A",
              "part2": "Face B",
              "active": false,
              "enableCopyDesignFromSide": true
            }
          },
          "customizerOptions": {
            "measurementUnit": "mm",
            "desktopColumnOrder": "right",
            "showHideMeasurements": "both",
            "decimalFormatMeasurements": "with-decimal"
          }
        },
        "languageImages": {
          "images": {
            "redoIcon": "",
            "undoIcon": "",
            "resetAllIcon": "",
            "cancelAnAction": "",
            "changeIconHelp": "",
            "changeIconSize": "",
            "changeIconText": "",
            "changeIconColor": "",
            "changeIconImage": "",
            "changeIconShape": "",
            "changeIconShare": "",
            "changeIconBorder": "",
            "changeIconImport": "",
            "changeIconPreview": "",
            "changeIconProduct": "",
            "changeIconDownload": "",
            "changeIconMaterial": "",
            "changeIconSaveProject": "",
            "changeIconFixingMethod": "",
            "changeIconShareSideBar": ""
          },
          "visualizer": {
            "textTop": "Top",
            "textHelp": "Help",
            "textLeft": "Left",
            "textSave": "Save",
            "textSize": "Size",
            "textAngle": "Angle",
            "textColor": "Color",
            "textImage": "Image",
            "textRight": "Right",
            "textShape": "Shape",
            "textShare": "Share",
            "textWidth": "Width",
            "thickness": "Thickness",
            "customSize": "Custom Size",
            "textBorder": "Border",
            "textBottom": "Bottom",
            "textHeight": "Height",
            "textImport": "Import",
            "textPreview": "Preview",
            "textProduct": "Product",
            "titleHeader": "Test  Signs: not available to  customers",
            "textDownload": "Download",
            "textMaterial": "Material",
            "textPosition": "Position",
            "textAddToCart": "Add To Cart",
            "textAfterPrice": "TVA Include",
            "textButtonBack": "Undo",
            "textButtonNext": "Redo",
            "textCanvasEdit": "Edit",
            "textOptionText": "Text",
            "textBeforePrice": "",
            "textCanvasClone": "Clone",
            "textButtonFinish": "Finish",
            "textCanvasDelete": "delete",
            "textButtonRefresh": "Restart all",
            "textCanvasCenterH": "centerH",
            "textCanvasCenterV": "centerV",
            "textFixingMethods": "Fixing Methods",
            "customSizeButtonDone": "Done"
          },
          "uploadDesign": {
            "link": "",
            "activate": false,
            "helpContent": "",
            "phraseSubmitCustom": "Take a customization"
          }
        }
      },
      "materials": [],
      "additionalOptions": []
    },
    "product": {
      "id": "gid://shopify/Product/9598653759805",
      "title": "Gift Card"
    },
    "templates": []
  }
}
function defaultStyle(baseUrl) {
  let fontUrl = "";
  if (baseUrl) {
    fontUrl = baseUrl;
  } else {
    fontUrl = window.location.origin;
  }
  let defaulStyle = document.createElement('style');
  defaulStyle.textContent = `
            
    @font-face {
      font-family: "Arial";
      font-display: swap;
      src: url('${fontUrl}/assets/fonts/arial.ttf') format('truetype');
    }
        
        `;
  document.body.appendChild(defaulStyle);
}
