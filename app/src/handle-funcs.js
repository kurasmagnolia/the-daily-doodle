import { fetch9RandomComics, getSpecificComic } from './fetch-functions';
import { render3x3, renderGeneratedComic } from './dom-helpers';

export const handleRefreshClick = async () => {
  const comicDiv = document.getElementById('comic-grid');
  comicDiv.innerHTML = '';

  // render loading text
  const loadingElementsDiv = document.querySelector('.loading-elements');
  const loadingText = document.createElement('p');
  const circleBuffer = document.createElement('img');

  loadingText.textContent = 'Loading!';
  loadingText.className = 'loading-text';
  circleBuffer.src = '../src/assets/loading-buffer-circle.png';
  circleBuffer.className = 'loader';
  loadingElementsDiv.append(loadingText, circleBuffer);

  const comics = await fetch9RandomComics();

  // remove loading txt
  loadingElementsDiv.innerHTML = '';

  render3x3(comicDiv, comics);
};

export const handleComicClick = (event) => {
  const dialog = document.querySelector('dialog'); // selects the dialog element
  const modalTitle = document.querySelector('.modal-title');
  const modalImage = document.querySelector('.modal-image'); // selects the image inside the modal
  const modalTranscript = document.querySelector('.modal-transcript'); // selects the context inside the modal

  const img = event.target;
  if (
    img.classList.contains('comic-panel') ||
    img.classList.contains('featured-comic-img')
  ) {
    // gets the clicked comic's image source and alt text
    modalTitle.textContent = img.dataset.title;
    modalImage.src = img.src; // Extract URL from 'backgroundImage' CSS property
    modalTranscript.textContent = img.dataset.transcript; // Use custom data-transcript attribute

    // gets the transcript from the data-transcript attribute
    const transcript = img.dataset.transcript;

    // removes any existing transcript text
    const existingTranscript =
      modalTranscript.querySelector('.modal-transcript');
    if (existingTranscript) {
      existingTranscript.remove();
    }

    // Create and append a new <p> element for the transcript
    modalTranscript.textContent = transcript
      ? transcript
      : "We're sorry, but a transcript wasn't available for this comic.";

    dialog.showModal(); // Open the modal
  }
};

export const handleFavoriteClick = (event) => {
  const heartIcon = event.currentTarget;

  if (heartIcon.classList.contains('fi-xnlux3-heart')) {
    heartIcon.classList.remove('fi-xnlux3-heart');
    heartIcon.classList.add('fi-xnsuxl-heart-solid');
  } else {
    heartIcon.classList.remove('fi-xnsuxl-heart-solid');
    heartIcon.classList.add('fi-xnlux3-heart');
  }

  // Force a re-render
  const parent = heartIcon.parentNode;
  parent.removeChild(heartIcon);
  parent.appendChild(heartIcon);
};

// Keep track of the current comic number
let currentComicNum = 1;

export const handlePrevClick = async (event) => {
  console.log('test');
  if (currentComicNum > 1) {
    currentComicNum -= 1;
    const comic = await getSpecificComic(currentComicNum);
    renderComic(comic);
  } else {
    alert('No previous comic!');
  }
};

export const handleNextClick = async (event) => {
  currentComicNum += 1;
  const comic = await getSpecificComic(currentComicNum);
  renderComic(comic);
};

export const handleRandomClick = async (event) => {
  // Get a random comic number between 1 and 2500 (or however many comics are available)
  const randomComicNum = Math.floor(Math.random() * 2500) + 1;
  const comic = await getSpecificComic(randomComicNum);
  currentComicNum = randomComicNum; // Update current comic number
  renderComic(comic);
};

export const handleInputChange = async (event) => {
  const inputValue = event.target.value;
  if (inputValue) {
    const comic = await getSpecificComic(inputValue);
    currentComicNum = inputValue; // Update current comic number
    renderComic(comic);
  }
};

// Helper function to render the comic
const renderComic = (comic) => {
  if (comic) {
    const comicDiv = document.getElementById('comic-gen-img-container');
    renderGeneratedComic(comicDiv, comic);
  }
};
