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



































