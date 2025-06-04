export default function decorate(block) {
  const getTrimmedText = (el) => el?.textContent?.trim() || '';
 
  const [title] = block.children;
  block.textContent = '';
 
  if (title && getTrimmedText(title)) {
    const h2 = document.createElement('h2');
    h2.className = 'fs-normal lds-ringside-heading-2';
    h2.id = getTrimmedText(title);
    h2.textContent = getTrimmedText(title);
    h2.setAttribute('aria-label', h2.textContent);
 
    let meta = document.querySelector('meta[name="story-title"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'story-title');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', h2.textContent);
 
    block.appendChild(h2);
  }
}
