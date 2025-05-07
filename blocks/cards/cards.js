import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { fetchImageAltText } from '../../scripts/common-utils.js';

export default async function decorate(block) {
  try {
    const altText = await fetchImageAltText('https://delivery-p153303-e1585520.adobeaemcloud.com/adobe/assets/urn:aaid:aem:d2358024-836e-47b6-a541-4093a63654a3/metadata?p=2');
    console.log(`Fetched alt text: ${altText}`);
  } catch (error) {
    console.error('Error fetching alt text:', error);
  }
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
