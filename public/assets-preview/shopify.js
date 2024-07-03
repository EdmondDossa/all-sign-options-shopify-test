// const shopifyProxyURL = `${window.Shopify.routes.root}apps/aso-proxy/api/`;


var asoConfigurationId = `${JSON.parse(window.name)?.configId}`;
var asoTemplateId = `${JSON.parse(window.name)?.templateId}`;
const header = {
  'Content-Type': 'application/json',
  'Aso-Access-Token': `${JSON.parse(window.name)?.token}`,
}

var notyf = new Notyf({duration:3000});

var asoProductId = "0";
var asoCurrency = "";
var  asoPriceFormat ="{{amount}}";
var asoRegularPrice ="0";
var asoCurrency_pos= "right";
var asoThousandSep= " ";
var asoDecimalSep= ".";


function replaceUploadsPath(data) {
  function replaceInObject(obj) {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = obj[key].replace(/^.*?\/apps\/aso-proxy/, "");
      } else if (typeof obj[key] === "object") {
        replaceInObject(obj[key]);
      }
    }
  }

  replaceInObject(data);
  return data;
}

const shopifyProxyURL = `/api/`;



async function getAsoConfiguration(configurationId) {
    
  
    try {
      const response = await fetch(`${shopifyProxyURL}configurations/${configurationId}`, {
        method: 'GET',
        headers:header,
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
        headers:header,
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




console.log("config id and  product id  agin", asoConfigurationId, asoProductId);

async function aso_confiurator_dataFunction(){
  const   currentConfig = await getAsoConfiguration(asoConfigurationId);
  const managesData = await getAsoManagesData();
  if (currentConfig?.templates?.find(template => template.id == asoTemplateId)?.data?.cartData) {
    
    asoRegularPrice = (currentConfig?.templates?.find(template => template.id == asoTemplateId)?.basePrice) || 0
    console.log("base price from template", asoRegularPrice)
  }
  return ( {
    skin: currentConfig['data']['settings']["themeColors"]["skin"],
    productID: asoProductId,
    currentConfig: replaceUploadsPath(currentConfig),
    managesData: replaceUploadsPath(managesData),
    currency_pos: asoCurrency_pos ,
     thousandSep:asoThousandSep,
    decimalSep: asoDecimalSep,
    decimals: "0",
    nbDecimals: "2",
    currencySymbol: asoCurrency,
    variations: [],
    fixing_methods_url:
      "/assets/images/fixing-methodes",
    frontend_nonce: "841fba2b18",
    product: {},
    regularPrice: "0",
    borders_url:
    "/assets/images/fixing-methodes",
    templates: {
      designFromTemplate: false,
      template: null
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



async function asoCreateVariantAndAddToCart(price, option) {
  try {
    const data = {
      productId: `gid://shopify/Product/${asoProductId}`,
      price: parseFloat(
        price + parseFloat(asoRegularPrice)
      ),
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

    let isAddedToCart = await asoAddproductToCart(parseInt(responseData.variantId),1);
    if (isAddedToCart) {
      setTimeout(()=>{
        document.location = asoCartUrl; 
      },1)
       
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

//  to add  font and custom css to  page  
document.addEventListener('DOMContentLoaded', async function () {
  let managesData = await getAsoManagesData();
  managesData =  replaceUploadsPath(managesData) ;
  managesData.fonts.forEach(font => {
    let style = document.createElement('style');
    style.textContent = `
          
  @font-face {
    font-family: "${font.label.trim().replace(' ', '_')}";
    font-display: swap;
    src: url('${font.url}') format('${asoGetFontFormat(font.url)}');
  }
      
      `; 
    document.body.appendChild(style);
  });

  const  currentConfig = await getAsoConfiguration(asoConfigurationId);

  try {
    console.log("Custom CSS", currentConfig)
    currentConfig['data']['settings']['themeColors']['customCss'] && addStylesToBody(currentConfig['data']['settings']['themeColors']['customCss']);
    console.log('Custom CSS added successfully');
  } catch (error) {
    console.error('Error adding custom CSS:', error);
  }

});

async function add_to_cart_shopify( cart_data,  redirectToCheckOut){

    // console.log("data cart ", cart_data);
    // await asoCreateVariantAndAddToCart( cart_data.recaps.custom_price, cart_data)
};


 async function addTemplateToCartShopify(template){
    console.log('template to  add to  cart',template)
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
    return "";
 }


async function asoUpdateTemplate_shopify(template_id,template_data) {
  try {
    
    const response = await fetch(`${shopifyProxyURL}templates/config/${template_id}`, {
      method: 'POST',
      body: JSON.stringify({data:template_data.data}), // Convert data to JSON string
      headers:header,
    });

    let responseData = await response.json();


    if (responseData?.status =="success") {
      notyf.success(`${responseData?.msg}`);
    } else {
      notyf.error(`${responseData?.msg}`);
    }

    
  
    return {
      success: true,
      message:"Template  updated successfully"
    }
  

  } catch (error) {
    console.error('Error posting ASO Proxy template:', error);
    // Handle the error appropriately in your application (e.g., display an error message to the user)
    return ({
      success: false,
      message: 'Error posting ASO Proxy template'
    }); // Or throw an error if necessary
  }
}




async function  asoGetTemplate_shopify(template_config_id,template_id){
  try {
    const response = await fetch(`${shopifyProxyURL}templates/${template_id}`, {
      method: 'GET',
      headers:header,
    });

    if (!response.ok) {
      throw new Error(`ASO Proxy template fetch failed with status: ${response.status}`);
    }

    const data = await response.json();
    return replaceUploadsPath(data);
  } catch (error) {
    console.error('Error fetching ASO Proxy template:', error);
    // Handle the error appropriately in your application (e.g., display an error message to the user)
    return null; // Or throw an error if necessary
  }
}


function  getRouteTemplate_shopify(){
  if (asoTemplateId) {
    return( {
      name:"template-maker",
      params:JSON.parse(window.name)
    })
  }

  return null;
}









































