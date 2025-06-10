export default function decorate(block) {
 
const cards = document.createElement('div');
cards.className = 'cards';

const childDiv = document.createElement('div');
cards.appendChild(childDiv);

const grandChildDiv = document.createElement('div');
grandChildDiv.textContent = 'text';

childDiv.appendChild(grandChildDiv);

block.appendChild(cards);
}
