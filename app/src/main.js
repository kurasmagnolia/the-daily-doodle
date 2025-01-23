import {
  getLatestComic,
  getSpecificComic,
  fetch9RandomComics,
} from "./fetch-functions";
import { render3x3, renderFeaturedComic } from "./dom-helpers";
import {
  handleComicClick,
  handleFavoriteClick,
  handleNextClick,
  handlePrevClick,
  handleRandomClick,
  handleInputChange,
  handleRefreshClick,
} from "./handle-funcs";

const main = async () => {
  const dialog = document.querySelector("dialog"); // selects the dialog element
  const closeButton = document.querySelector(".close-modal"); // selects the close button
  const favoriteIcon = document.querySelector(".favorite-icon");
  // event listener for the "Refresh" button
  document
    .querySelector(".comic-3x3-button")
    .addEventListener("click", handleRefreshClick);

  // event listener for favorite button press
  favoriteIcon.addEventListener("click", handleFavoriteClick);

  //  click event listeners to dynamically generated comic panels
  document.addEventListener("click", handleComicClick);

  //  event listener for the close button
  closeButton.addEventListener("click", () => {
    dialog.close(); // closes the modal
  });

  // event listeners for comic generator buttons
  document
    .getElementById("prev-btn")
    .addEventListener("click", handlePrevClick);

  document
    .getElementById("random-btn")
    .addEventListener("click", handleRandomClick);

  document
    .getElementById("next-btn")
    .addEventListener("click", handleNextClick);

  // event listener for the input field
  document.getElementById("input").addEventListener("input", handleInputChange);

  // // OPTIONAL: Close the modal when clicking outside the content
  // dialog.addEventListener("click", (event) => {
  //   if (event.target === dialog) {
  //     dialog.close();
  //   }
  // });
};

main();
