window.adobeDataLayer = window.adobeDataLayer || [];
const { adobeDataLayer } = window;
const htmlLang = document.documentElement?.getAttribute('lang');
const canonicalMeta = document.querySelector('meta[name="canonical"]');
const pageUrl = canonicalMeta ? canonicalMeta.content : null;
adobeDataLayer.push({
  event: 'page_view',
  pageInfo: {
    pageName: document.title,
    pageURL: pageUrl,
    businessCountryLanguage: htmlLang,
  },
});
