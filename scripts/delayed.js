window.adobeDataLayer = window.adobeDataLayer || [];
const { content: metaDescription } = document.querySelector('meta[name="description"]');
const { content: pageUrl } = document.querySelector('meta[name="canonical"]');
let adobeDataLayer = window.adobeDataLayer;
adobeDataLayer.push({
  event: 'page_view',
  pageInfo: {
    pageName: metaDescription,
    pageURL: pageUrl,
    businessCountryLanguage: htmlLang,
  },
});