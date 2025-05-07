async function fetchImageAltText(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const altText = data.assetMetadata["Iptc4xmpCore:AltTextAccessibility"];
      console.log(`altText: ${altText}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  export {
    fetchImageAltText
  }