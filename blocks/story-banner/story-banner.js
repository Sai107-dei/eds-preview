export default function decorate(block) {
  const getTrimmedText = (el) => el?.textContent?.trim() || '';

  const [
    title,
    date,
    author,
    tags,
  ] = block.children;

  block.textContent = '';

  const titleGroup = document.createElement('div');
  titleGroup.className = 'story-banner-title-wrapper';

  const headlineWrapper = document.createElement('div');
  headlineWrapper.className = 'headline-wrapper';

  const tagWrapper = document.createElement('div');
  tagWrapper.className = 'tag-wrapper';

  const titleClassesMap = {
    H1: ['fs-normal', 'lds-ringside-heading-1'],
    H2: ['fs-normal', 'lds-ringside-heading-2'],
    H3: ['fs-normal', 'lds-ringside-heading-3'],
    H4: ['fs-normal', 'lds-ringside-heading-4'],
    H5: ['fs-normal', 'lds-ringside-heading-5'],
    H6: ['fs-normal', 'lds-ringside-heading-6'],
    P: ['fs-normal', 'lds-ringside-body-large'],
  };
  if (title && getTrimmedText(title)) {
    const titleClasses = title.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
    titleClasses.forEach((el) => {
      const classes = titleClassesMap[el.tagName.trim()] || [];
      if (classes.length) {
        el.classList.add(...classes);
      }
    });
    title.setAttribute('aria-label', title.textContent.trim());

    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'title';
    titleWrapper.append(title);

    let meta = document.querySelector('meta[name="customTitle222"]');
    if (meta) {   
        // meta = document.createElement('meta');   
        // meta.setAttribute('name', 'og:custom');   
        // document.head.appendChild(meta); 
        meta.setAttribute('content', title.textContent.trim());
    } 

    headlineWrapper.append(titleWrapper);
  }

  if ((date && getTrimmedText(date)) || (author && getTrimmedText(author))) {
    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';

    if (date && getTrimmedText(date)) {
      const dateObj = new Date(date.textContent.trim());
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      });
      date.textContent = formattedDate;
      date.classList.add('date');
      infoDiv.append(date);
    }

    if (date && getTrimmedText(date) && author && getTrimmedText(author)) {
      const divider = document.createElement('span');
      divider.className = 'vertical-divider';
      divider.setAttribute('aria-hidden', 'true');
      divider.textContent = '|';
      infoDiv.append(divider);
    }

    const authorClassesMap = {
      DIV: ['author'],
      H1: ['fs-normal', 'lds-ringside-heading-1'],
      H2: ['fs-normal', 'lds-ringside-heading-2'],
      H3: ['fs-normal', 'lds-ringside-heading-3'],
      H4: ['fs-normal', 'lds-ringside-heading-4'],
      H5: ['fs-normal', 'lds-ringside-heading-5'],
      H6: ['fs-normal', 'lds-ringside-heading-6'],
      P: ['fs-normal', 'lds-ringside-body-small'],
      UL: ['fs-normal', 'lds-ringside-body-large'],
      OL: ['fs-normal', 'lds-ringside-body-large'],
    };
    if (author && getTrimmedText(author)) {
      const authorClasses = author.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, ul, ol, a');
      authorClasses.forEach((el) => {
        const classes = authorClassesMap[el.tagName.trim()] || [];
        if (classes.length) {
          el.classList.add(...classes);
        }
      });
      author.setAttribute('aria-label', author.textContent.trim());
      author.querySelectorAll('a').forEach((anchor) => {
        anchor.tabIndex = 0;
      });
      infoDiv.append(author);
    }
    headlineWrapper.append(infoDiv);
  }

  if (getTrimmedText(tags)) {
    const tagTexts = tags.textContent
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    if (tagTexts.length) {
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'story-banner-tags';
      tagTexts.forEach((tag) => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'story-banner-tag';
        tagSpan.textContent = tag;
        tagsContainer.appendChild(tagSpan);
      });
      tagWrapper.append(tagsContainer);
    }
  }

  titleGroup.append(headlineWrapper, tagWrapper);
  block.append(titleGroup);
}
 