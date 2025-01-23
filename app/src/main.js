import {
  getLatestComic,
  getSpecificComic,
  fetch9RandomComics,
} from './fetch-functions';
import { render3x3, renderFeaturedComic } from './dom-helpers';
import { handleComicClick, handleRefreshClick } from './handle-funcs';

const main = async () => {
  const dialog = document.querySelector('dialog'); // selects the dialog element
  const closeButton = document.querySelector('.close-modal'); // selects the close button
  const favoriteButton = document.querySelector('.favorite-button');
  // event listener for the "Refresh" button
  const refreshButton = document.querySelector('.comic-3x3-button');

  refreshButton.addEventListener('click', handleRefreshClick);

  // event listener for favorite button press
  favoriteIcon.addEventListener('click', handleFavoriteClick);

  //  click event listeners to dynamically generated comic panels
  document.addEventListener('click', handleComicClick);

  //  event listener for the close button
  closeButton.addEventListener('click', () => {
    dialog.close(); // closes the modal
  });

  // event listeners for comic generator buttons
  const prevButton = document.querySelector('#prev-btn');
  prevButton.addEventListener('click', handlePrevClick);

  document
    .getElementById('random-btn')
    .addEventListener('click', handleRandomClick);

  document
    .getElementById('next-btn')
    .addEventListener('click', handleNextClick);

  // event listener for the input field
  document.getElementById('input').addEventListener('input', handleInputChange);

  // // OPTIONAL: Close the modal when clicking outside the content
  // dialog.addEventListener("click", (event) => {
  //   if (event.target === dialog) {
  //     dialog.close();
  //   }
  // });
};

main();
