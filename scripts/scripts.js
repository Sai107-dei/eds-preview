import {
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
} from './aem.js';

/**
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveAttributes(from, to, attributes) {
  if (!attributes) {
    // eslint-disable-next-line no-param-reassign
    attributes = [...from.attributes].map(({ nodeName }) => nodeName);
  }
  attributes.forEach((attr) => {
    const value = from.getAttribute(attr);
    if (value) {
      to.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
  moveAttributes(
    from,
    to,
    [...from.attributes]
      .map(({ nodeName }) => nodeName)
      .filter((attr) => attr.startsWith('data-aue-') || attr.startsWith('data-richtext-')),
  );
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks() {
  try {
    // TODO: add auto block, if needed
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

/**
* Pre-hides the body to avoid flicker in Adobe Target by applying temporary styles.
* @param {Document} doc - The document object.
* @param {string} style - The CSS style to apply.
* @param {number} timeout - The duration in milliseconds before removing the style.
*/
function adobepreload(win, doc, style, timeout) {
  const STYLE_ID = 'at-body-style';

  function getParent() {
    return doc.getElementsByTagName('head')[0];
  }

  function addStyle(parent, id, css) { // Renamed 'style' to 'css' to avoid conflict
    if (!parent) {
      return;
    }

    const styleElement = doc.createElement('style'); // Renamed 'style' to 'styleElement'
    styleElement.id = id;
    styleElement.innerHTML = css;
    parent.appendChild(styleElement);
  }

  function removeStyle(parent, id) {
    if (!parent) {
      return;
    }

    const styleElement = doc.getElementById(id); // Renamed 'style' to 'styleElement'

    if (!styleElement) {
      return;
    }

    parent.removeChild(styleElement);
  }

  addStyle(getParent(), STYLE_ID, style);
  setTimeout(() => {
    removeStyle(getParent(), STYLE_ID);
  }, timeout);
}

function adobeTargetInit(){
  window.adobeDataLayer = window.adobeDataLayer || [];
const { adobeDataLayer } = window;
const { lang: htmlLang } = document.documentElement || {};
const { href } = window.location;
let environmentName;
if (href.startsWith('https://qa--ewi-lilly-com-block-library-qa--elilillyco.aem.page') || href.includes('https://qa--ewi-lilly-com-block-library-qa--elilillyco.aem.page')) {
  environmentName = 'QA';
} else if (href.startsWith('https://dev--ewi-lilly-com-block-library--elilillyco.aem.page') || href.includes('https://dev--ewi-lilly-com-block-library--elilillyco.aem.page')) {
  environmentName = 'DEV';
} else {
  environmentName = 'Unknown Environment';
}
const { userAgent } = navigator;
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
  deviceType = 'Unknown Device';
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
    environment: environmentName,
    businessCountryLanguage: htmlLang,
  },
  applicationInfo: {
    applicationType: browserType,
    applicationOS: deviceType,
  },
});
}
async function loadPage() {
  adobepreload(window, document, 'body {opacity: 0 !important}', 3000);
  adobeTargetInit();
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
