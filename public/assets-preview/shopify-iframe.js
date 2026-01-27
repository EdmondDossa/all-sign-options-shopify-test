
var shopifyProxyURL = `${window.parent.Shopify.routes.root}apps/aso-proxy/api/`;
var urlParams = new URLSearchParams(window.parent.location.search);
var paramAsoConfigurationId = urlParams.get('aso-config-id');
var asoTemplateId = urlParams.get('aso-template-id');

if (window.name=="ASOIframe") {
  var urlFrameParams = new URLSearchParams(window.location.search);
  var asoProductId = urlFrameParams.get('asoProductId');
  var asoCurrency = urlFrameParams.get('asoCurrency');
  var  asoPriceFormat = urlFrameParams.get('asoPriceFormat');
  var asoRegularPrice =urlFrameParams.get('asoRegularPrice');
  var asoCurrency_pos = urlFrameParams.get('asoCurrency_pos');
  var asoThousandSep = urlFrameParams.get('asoThousandSep') ;
  var asoDecimalSep = urlFrameParams.get('asoDecimalSep');
  var asoConfigurationId = urlFrameParams.get('asoConfigurationId');
}

if(asoTemplateId && paramAsoConfigurationId){
  // Si on a un template-id dans l'URL, on doit utiliser le config-id de l'URL
  // même si asoConfigurationId est déjà défini (car il pourrait être vide ou incorrect)
  // Cela permet de charger le configurateur même si le produit n'a pas de metafield asoConfigurationId
  if(asoConfigurationId==undefined){
    var asoConfigurationId = paramAsoConfigurationId;
  }else{
    asoConfigurationId = paramAsoConfigurationId;
  }
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
  
      const data = await response.json();
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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching ASO Proxy template:', error);
    // Handle the error appropriately in your application (e.g., display an error message to the user)
    return null; // Or throw an error if necessary
  }
}



async function getAsoManagesData() {
    
  
    try {
      const response = await fetch(`${shopifyProxyURL}manages-data`, {
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




console.log("config id and  product dfg   kihhhg ", asoConfigurationId, asoProductId);

async function aso_confiurator_dataFunction(){
  const managesData = await getAsoManagesData();

  let currentConfig = null;
  let template = null;
  if (asoConfigurationId ) {
    currentConfig = await getAsoConfiguration(asoConfigurationId);

    template = asoTemplateId ? await getAsoTemplateById(asoTemplateId) : null;

    if (!currentConfig) {
      currentConfig = getDefaultConfig();
    }
  }else{

     currentConfig = getDefaultConfig();
     document.querySelector(".aso-app-not-found").style.display = "flex";
  }

  if (currentConfig) {
    managesData.fonts = managesData.fonts.filter(font => currentConfig.data.settings.customizerSign.text.selectedFonts?.includes(font.id)) ?? [];
    managesData.cliparts = managesData.cliparts.filter(clipart => currentConfig.data.settings.customizerSign.images.enableClipart?.selectClipartGroups?.includes(clipart.id));
  }
  defaultStyle( `${window.location.origin}/${window.Shopify?.routes?.root?.replace("/",'')}apps/aso-proxy`);
   //  to add  font and custom css to  page
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
  try {
    currentConfig['data']['settings']['themeColors']['customCss'] && addStylesToBody(currentConfig['data']['settings']['themeColors']['customCss']);
  } catch (error) {
    console.error('Error adding custom CSS:', error);
  }
  // end to add  font and custom css to  page


  if (asoTemplateId && template) {
    asoRegularPrice = template.basePrice || 0;
  }

  
  return ( {
    skin: currentConfig['data']['settings']["themeColors"]["skin"],
    productID: asoProductId,
    currentConfig: currentConfig,
    managesData: managesData,
    currency_pos: asoCurrency_pos ,
     thousandSep:asoThousandSep,
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
      template: template ||  null
    }
  })
};



async function asoAddproductToCart(variantId, quantity=1 , checkout) { 
  let formData = {
     'id': variantId,
     'quantity': quantity
    }
   try {
    window.parent.postMessage({
        type: checkout ? 'ADD_TO_CART_CHECKOUT': 'ADD_TO_CART',
        payload: formData
      }, '*'); 
      
  
   } catch (error) {
      console.log("Error on sending  message:", error)
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

async function  asoReidirectToCheckout() {
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

async function asoUploadsOnfinish(option){
  let  files  =  []

  if (Array.isArray(option.recaps.printImage)) {
    for(const face in option.recaps.printImage){
        files.push(option.recaps.printImage[face]);
    }

    for(const face in option.recaps.designImages){
      for(const designImage of option.recaps.designImages[face]){
        files.push(designImage.url);           
      }
    }

  }else{
    files.push(option.recaps.printImage);
    for(const designImage of option.recaps.designImages){
      files.push(designImage.url);
    }
  }



    window.parent.postMessage({
      type:  'UPLOAD_ON_FINISH',
      payload: JSON.stringify(files)
    }, '*'); 

}

async function asoCreateVariantAndAddToCart(price, option, asoProductID=asoProductId, regularPrice=asoRegularPrice, redirectToCheckOut=false) {

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
    
    let response = await fetch('/apps/aso-proxy/api/add-cart-variant', {
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

    // Vérifier si l'API a retourné une erreur
    if (responseData.status === false) {
      console.error('[ASO] API returned error:', responseData);
      throw new Error(`API error: ${responseData.message || 'Unknown error'}`);
    }

    // Vérifier que la réponse contient bien un variantId
    if (!responseData || !responseData.variantId) {
      console.error('[ASO] Invalid API response - missing variantId:', responseData);
      throw new Error('Invalid API response - missing variantId');
    }

    asoAddproductToCart(responseData.variantId, 1, redirectToCheckOut);
    
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
        
        // Dernier recours : redirection simple vers le panier
        console.log('[ASO] Last resort: redirecting to cart page');
        document.location = window.location.origin + '/cart';
      }
    } catch (fallbackError) {
      console.error('[ASO] Fallback error:', fallbackError);
      // Dernier recours : redirection simple vers le panier
      console.log('[ASO] Last resort: redirecting to cart page');
      document.location = window.location.origin + '/cart';
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

async function add_to_cart_shopify( cart_data,  redirectToCheckOut){
    await asoCreateVariantAndAddToCart( cart_data.recaps.custom_price, cart_data,asoProductId, asoRegularPrice , redirectToCheckOut);
};


 async function addTemplateToCartShopify(template){
   var productRef = template?.configuration?.product;
   var productId = Array.isArray(productRef) ? (productRef[0]?.id) : (productRef?.id);
   if (productId && template?.data?.cartData) {
     var numericId = String(productId).split('/').pop();
     await asoCreateVariantAndAddToCart(template.data.cartData.custom_price, {recaps: template.data.cartData}, numericId, template.basePrice);
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



 function getAsoUrl_shopify(){
    return "/apps/aso-proxy";
 }


async function asoUpdateTemplate_shopify(template_id,template_data) {
   
}


async function  asoGetTemplate_shopify(template_config_id,template_id){
  // hhh nnn
}


function  getRouteTemplate_shopify(){
  return null;
}


function getDefaultConfig(){

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
                    "hidePricing":false,
                    "showRecapAfterFinish":true,
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
  if (baseUrl) {
  const fontUrl = baseUrl;
  }else{
    const fontUrl = window.location.origin;
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