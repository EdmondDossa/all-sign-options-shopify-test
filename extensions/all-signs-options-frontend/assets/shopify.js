const shopifyProxyURL = `${window.Shopify.routes.root}apps/aso-proxy/api/`;
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
    frontend_nonce: "841fba2b18"
  })
};



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

//  to add  font and custom css to  page  ffffffff
document.addEventListener('DOMContentLoaded', async function () {
  const managesData = await getAsoManagesData();
  
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

    console.log("data cart ", cart_data);
    await asoCreateVariantAndAddToCart( cart_data.recaps.custom_price, cart_data)
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










































