window.adobeDataLayer = window.adobeDataLayer || [];
const { adobeDataLayer } = window;
const htmlLang = document.documentElement?.getAttribute('lang');
const href = window.location.href;
let environment;
if (href.startsWith('https://qa--ewi-lilly-com-block-library-qa--elilillyco.aem.page') || href.includes('https://qa--ewi-lilly-com-block-library-qa--elilillyco.aem.page')) {
  environment = 'QA';
} else if (href.startsWith('https://dev--ewi-lilly-com-block-library--elilillyco.aem.page') || href.includes('https://dev--ewi-lilly-com-block-library--elilillyco.aem.page')) {
  environment = 'DEV';
} else {
  environment = 'Unknown Environment';
}
const userAgent = navigator.userAgent || navigator.vendor || window.opera;
let deviceType;
if (/android/i.test(userAgent)) {
  deviceType = 'Android';
} else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  deviceType = 'iOS';
} else if (/Macintosh/i.test(userAgent)) {
  deviceType = 'Mac';
} else if (/Windows/i.test(userAgent)) {
  deviceType = 'Windows';
} else if (/Linux/i.test(userAgent)) {
  deviceType = 'Linux';
} else {
  deviceType = 'Unknown';
}
let browserType;
if (/Chrome/i.test(userAgent) && !/Edge|Edg/i.test(userAgent)) {
  browserType = 'Chrome';
} else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
  browserType = 'Safari';
} else if (/Edge|Edg/i.test(userAgent)) {
  browserType = 'Edge';
} else {
  browserType = 'Unknown Browser';
}
adobeDataLayer.push({
  event: 'page_view',
  pageInfo: {
    pageName: document.title,
    pageURL: window.location.href,
    previousPageName: document.referrer,
    environment: environment,
    businessCountryLanguage: htmlLang,
  },
  applicationInfo: {
    applicationType: browserType,
    applicationOS: deviceType,
  },
});
