var asoConfigurationId = `${parseInt(window.name.split('_')[1])}`;
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




console.log("config id and  product id  agin", asoConfigurationId, asoProductId);

async function aso_confiurator_dataFunction(){
  const   currentConfig = await getAsoConfiguration(asoConfigurationId);
  const managesData = await getAsoManagesData();
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
    frontend_nonce: "841fba2b18"
  })
};



function asoAddproductToCart(variantId, quantity=1) { 
  let formData = {
    'items': [{
     'id': variantId,
     'quantity': quantity
     }]
   };
   fetch(window.Shopify.routes.root + 'cart/add.js', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(formData)
   })
   .then(response => {
     return response.json();
   })
   .catch((error) => {
     console.error('Error:', error);
   });
}



function asoCreateVariantAndAddToCart(price, option) {
  
  const data = {
    productId: `gid://shopify/Product/${asoProductId}`,
    price: price,
    option: option
  };
  
  fetch('/apps/aso-proxy/api/add-cart-variant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
      asoAddproductToCart(parseInt(data.variantId),1)
  })
  .catch(error => {
    console.error('Error:', error);
  });
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

//  to add  font and custom css to  page  ffffffff
document.addEventListener('DOMContentLoaded', async function () {
  let managesData = await getAsoManagesData() ;
  managesData =  replaceUploadsPath(managesData) ;
  console.log(" log  data manage ", managesData)
  managesData.fonts.forEach(font => {
    let style = document.createElement('style');
    style.textContent = `
          
  @font-face {
    font-family: "${font.label}";
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
  // console.log("ajax_url", cart_data, redirectToCheckOut); 
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










































