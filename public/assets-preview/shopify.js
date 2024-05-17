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




// console.log("config id and  product id  agin", asoConfigurationId, asoProductId);

async function aso_confiurator_dataFunction(){
  const   currentConfig = await getAsoConfiguration(parseInt(window.name.split('_')[1]));
  const managesData = await getAsoManagesData();
  return ( {

  skin: "couffo",
      currentConfig: currentConfig,
      managesData: managesData
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
    productId: `gid://shopify/Product/${56}`,
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

//  to add  font to  page  ffffffff
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
});





// end



































