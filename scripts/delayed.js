const scriptElement = document.createElement('script');
scriptElement.src = "https://assets.adobedtm.com/d8c48e012a5d/d1d9cb2d2584/launch-72ce3ebd3334-development.min.js";
scriptElement.async = true;
document.head.appendChild(scriptElement);
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