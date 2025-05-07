window.adobeDataLayer = window.adobeDataLayer || [];
const { adobeDataLayer } = window;
const htmlLang = document.documentElement?.getAttribute('lang');
adobeDataLayer.push({
  event: 'page_view',
  pageInfo: {
    pageName: document.title,
    pageURL: window.location.href,
    businessCountryLanguage: htmlLang,
  },
});
