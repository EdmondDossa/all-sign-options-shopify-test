const shopifyProxyURL = `https://lgs84iuzw0j2.share.zrok.io/api/`;
async function getAsoConfiguration(configurationId) {
    
  
    try {
      const response = await fetch("https://lgs84iuzw0j2.share.zrok.io/api/configurations/57", {
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
      const response = await fetch(`https://lgs84iuzw0j2.share.zrok.io/api/manages-data`, {
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
      return null; // Or throw an error if necessary u_uuhhh
    }
}






async function aso_confiurator_dataFunction(){
  const   currentConfig = await getAsoConfiguration(57);
  const managesData = await getAsoManagesData();
  return ( {
      currentConfig: currentConfig,
      managesData: managesData
    })
};


























