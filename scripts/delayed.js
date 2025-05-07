window.adobeDataLayer = window.adobeDataLayer || [];
const metaDescription = document.querySelector('meta[name="description"]').getAttribute('content');
const pageUrl = document.querySelector('meta[name="canonical"]').getAttribute('content');
const htmlLang = document.documentElement.getAttribute('lang');
adobeDataLayer.push({
  'event': 'page_view',
  'pageInfo': {
    'pageName': metaDescription,
    'pageURL': pageUrl,
    'businessCountryLanguage': htmlLang
  }
});