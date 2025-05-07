window.adobeDataLayer = window.adobeDataLayer || [];
const { adobeDataLayer } = window;
const htmlLang = document.documentElement?.getAttribute('lang');
const pageUrl = document.documentElement?.getAttribute('lang');
let canonicalMeta = document.querySelector('meta[name="canonical"]');
let contentValue = canonicalMeta ? canonicalMeta.content : null;
adobeDataLayer.push({
  event: 'page_view',
  pageInfo: {
    pageName: document.title,
    pageURL: contentValue,
    businessCountryLanguage: htmlLang,
  },
});
