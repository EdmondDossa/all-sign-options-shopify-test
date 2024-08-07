
var shopifyProxyURL = `${window.Shopify.routes.root}apps/aso-proxy/api/`;
var urlParams = new URLSearchParams(window.location.search);
var paramAsoConfigurationId = urlParams.get('aso-config-id');
var asoTemplateId = urlParams.get('aso-template-id');




if(!asoConfigurationId){
  asoConfigurationId = paramAsoConfigurationId || asoConfigurationId;
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
  const currentConfig = await getAsoConfiguration(asoConfigurationId);

   //  to add  font and custom css to  page
   managesData.fonts.forEach(font => {
    let style = document.createElement('style');
    style.textContent = `
          
  @font-face {
    font-family: "${font.label?.replaceAll(/\s+/g, '-')}";
    font-display: swap;
    src: url('${font.url}') format('${asoGetFontFormat(font.url)}');
  }
      
      `; 
    document.body.appendChild(style);
  });
  try {
    console.log("Custom CSS", currentConfig)
    currentConfig['data']['settings']['themeColors']['customCss'] && addStylesToBody(currentConfig['data']['settings']['themeColors']['customCss']);
    console.log('Custom CSS added successfully');
  } catch (error) {
    console.error('Error adding custom CSS:', error);
  }
  // end to add  font and custom css to  page


  if (currentConfig?.templates?.find(template => template.id == asoTemplateId)?.data?.cartData) {
    
    asoRegularPrice = (currentConfig?.templates?.find(template => template.id == asoTemplateId)?.basePrice) || 0;
  
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
      designFromTemplate: currentConfig?.templates?.find(template => template.id == asoTemplateId) ? true : false,
      template: currentConfig?.templates?.find(template => template.id == asoTemplateId)|| null
    }
  })
}; //kk ll



async function asoAddproductToCart(variantId, quantity=1) { 
  let formData = {
    'items': [{
     'id': variantId,
     'quantity': quantity
     }]
   };
   try {
      let response =  await fetch(window.Shopify.routes.root + 'cart/add.js', {
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

async function asoCreateVariantAndAddToCart(price, option, asoProductID=asoProductId, regularPrice=asoRegularPrice, redirectToCheckOut=false) {
  console.log("price and option", price, option, asoProductID);

  try {
    const data = {
      productId: `gid://shopify/Product/${asoProductID}`,
      price: parseFloat(`${price}` )+parseFloat(`${regularPrice}`),
      option: JSON.stringify(option)
    };
    
    let response = await fetch('/apps/aso-proxy/api/add-cart-variant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    let responseData = await response.json();
  
    console.log('Success:', responseData);   

  
    if (redirectToCheckOut) {
      document.location = window.location.origin + `/cart/${responseData.variantId}:1`;
    } else {
      document.location = window.location.origin + `/cart/${responseData.variantId}:1?storefront=true`;
    }
  } catch (error) {
    console.error('Error: ', error);
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

// //  to add  font and custom css to  page  
// document.addEventListener('DOMContentLoaded', async function () {
//   if(asoConfigurationId){const managesData = await getAsoManagesData();
  
 

//   const  currentConfig = await getAsoConfiguration(asoConfigurationId);

//  }

// });

async function add_to_cart_shopify( cart_data,  redirectToCheckOut){

    console.log("data cart ", cart_data);
    await asoCreateVariantAndAddToCart( cart_data.recaps.custom_price, cart_data,asoProductId, asoRegularPrice , redirectToCheckOut);
};


 async function addTemplateToCartShopify(template){
   console.log('template to   to ', template)

   if (template?.configuration?.product?.id) {
     await asoCreateVariantAndAddToCart(  template.data.cartData.custom_price,{recaps: template.data.cartData}, template?.configuration?.product?.id.split('/').pop(),template.basePrice)
   }





   
 };


function setScrollColor_shopify(color) {

}

function formatPrice_shopify(price) {
  let formattedPrice = parseFloat(
    price + parseFloat(asoRegularPrice)
  ).toFixed(2);
 return `${asoPriceFormat}`.replace("{{amount}}", formattedPrice);
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
  // if (asoTemplateId) {
  //   return( {
  //     name:"template-maker",
  //     params:JSON.parse(window.name)
  //   })
  // }    

  return null;
}










































