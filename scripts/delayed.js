// add delayed functionality here
window.adobeDataLayer = window.adobeDataLayer || []
const metaDescription = document.querySelector('meta[name="description"]').getAttribute('content');
const pageUrl = document.querySelector('meta[name="canonical"]').getAttribute('content');
const htmlLang = document.documentElement.getAttribute('lang');
console.log('Adobe datalayer props' + metaDescription + pageUrl + htmlLang);
adobeDataLayer.push({
    "event": "page_view",
    "pageInfo": {
        "pageName": metaDescription,
        "pageURL": pageUrl,
        "siteSection": "<L1 of site hierarchy>",
        "siteSubSection1": "<L2 of site hierarchy>",
        "siteSubSection2": "<L3 of site hierarchy>",
        "previousPageName": "<Previous Page Name>",
        "environment": "<Environment of the website>",
        "businessCountryLanguage": htmlLang

    }
})