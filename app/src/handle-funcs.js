import {
  fetch9RandomComics,
  getSpecificComic,
  fetchRandomComic,
} from './fetch-functions';
import { render3x3, renderGeneratedComic } from './dom-helpers';
import loadingImage from './assets/loading-buffer-circle.png';

export const handleRefreshClick = async () => {
  const comicDiv = document.getElementById('comic-grid');
  comicDiv.innerHTML = '';

  // render loading text
  const loadingElementsDiv = document.querySelector('.loading-elements');
  const loadingText = document.createElement('p');
  const circleBuffer = document.createElement('img');

  loadingText.textContent = 'Loading!';
  loadingText.className = 'loading-text';
  circleBuffer.src = loadingImage;
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
  const modalIssue = document.querySelector('.modal-issue');
  const modalRelease = document.querySelector('.modal-release');
  const modalTranscript = document.querySelector('.modal-transcript'); // selects the context inside the modal
  const img = event.target;

  if (
    img.classList.contains('comic-panel') ||
    img.classList.contains('featured-comic-img') ||
    img.classList.contains('fav-panel')
  ) {
    // gets the clicked comic's image source and alt text
    modalTitle.textContent = `Comic Title: ${img.dataset.title}`;
    modalImage.src = img.src;
    modalIssue.textContent = `Issue #: ${img.dataset.issueNum}`;
    modalRelease.textContent = `Release Date: ${img.dataset.release}`;

    // gets the transcript from the data-transcript attribute
    const transcript = img.dataset.transcript;

    // removes any existing transcript text
    const existingTranscript =
      modalTranscript.querySelector('.modal-transcript');
    if (existingTranscript) {
      existingTranscript.remove();
    }

    // create and append a new <p> element for the transcript
    modalTranscript.textContent = transcript
      ? transcript
      : "We're sorry, but a transcript wasn't available for this comic.";

    dialog.showModal(); // opens the modal
  }
};

// export const handleFavoriteClick = (event) => {
//   const heartIcon = event.currentTarget;

//   //   if (heartIcon.classList.contains("fi-xnlux3-heart")) {
//   //     heartIcon.classList.remove("fi-xnlux3-heart");
//   //     heartIcon.classList.add("fi-xnsuxl-heart-solid");
//   //   } else {
//   //     heartIcon.classList.remove("fi-xnsuxl-heart-solid");
//   //     heartIcon.classList.add("fi-xnlux3-heart");
//   //   }
// if (heartIcon.classList.contains('fi-xnlux3-heart')) {
//   heartIcon.classList.remove('fi-xnlux3-heart');
//   heartIcon.classList.add('fi-xnsuxl-heart-solid');
// } else {
//   heartIcon.classList.remove('fi-xnsuxl-heart-solid');
//   heartIcon.classList.add('fi-xnlux3-heart');
// }

//   // Force a re-render
//   const parent = heartIcon.parentNode;
//   parent.removeChild(heartIcon);
//   parent.appendChild(heartIcon);
// };

// Keep track of the current comic number
let currentComicNum = 1;

export const handlePrevClick = async (event) => {
  console.log(event.target);
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
  console.log(event.target);
  console.log('Next button clicked');

  currentComicNum += 1;

  try {
    const comic = await getSpecificComic(currentComicNum);
    if (comic) {
      renderComic(comic);
    } else {
      alert('Failed to fetch the next comic. Please try again');
    }
  } catch (error) {
    console.warn('Error fetch the next comic. Please try again', error);
  }
};

export const handleRandomClick = async (event) => {
  try {
    const comic = await fetchRandomComic();
    if (comic) {
      renderComic(comic);
      currentComicNum = comic.num;
    } else {
      alert('Failed to fetch the random comic. Please try again');
    }
  } catch (error) {
    console.warn('Error fetch the random comic. please try again', error);
  }
};

export const handleInputChange = async (event) => {};

// Helper function to render the comic
// const renderComic = (comic) => {};
const renderComic = (comic) => {
  if (comic) {
    const comicDiv = document.getElementById('comic-gen-img-container');
    renderGeneratedComic(comicDiv, comic);
  }
};
