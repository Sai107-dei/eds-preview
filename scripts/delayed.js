window.adobeDataLayer = window.adobeDataLayer || [];
const { adobeDataLayer } = window;
const htmlLang = document.documentElement?.getAttribute('lang');
const href = window.location.href;
    let environment;
    if (href.startsWith("https://qa--ewi-lilly-com-block-library-qa--elilillyco.aem.page") || href.includes("https://qa--ewi-lilly-com-block-library-qa--elilillyco.aem.page")) {
        environment = "QA";
    } else if (href.startsWith("https://dev--ewi-lilly-com-block-library--elilillyco.aem.page") || href.includes("https://dev--ewi-lilly-com-block-library--elilillyco.aem.page")) {
        environment = "DEV";
    } else {
        environment = "Unknown Environment";
    }
adobeDataLayer.push({
  event: 'page_view',
  pageInfo: {
    pageName: document.title,
    pageURL: window.location.href,
    environment: environment,
    businessCountryLanguage: htmlLang,
  },
});
