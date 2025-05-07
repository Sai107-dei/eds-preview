window.adobeDataLayer = window.adobeDataLayer || [];
const { content: metaDescription } = document.querySelector('meta[name="description"]');
const { content: pageUrl } = document.querySelector('meta[name="canonical"]');
const adobeDataLayer = window.adobeDataLayer;
const htmlLang = document.documentElement.getAttribute('lang');
adobeDataLayer.push({
  event: 'page_view',
  pageInfo: {
    pageName: metaDescription,
    pageURL: pageUrl,
    businessCountryLanguage: htmlLang,
  },
});
