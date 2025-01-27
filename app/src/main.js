import {
  getLatestComic,
  getSpecificComic,
  fetch9RandomComics,
} from "./fetch-functions";
import { render3x3, renderFeaturedComic } from "./dom-helpers";
import {
  handleComicClick,
  handleRefreshClick,
  handleFavoriteClick,
  handlePrevClick,
  updateHeartIcons,
} from "./handle-funcs";

const main = async () => {
  // console.log("test");
  const dialog = document.querySelector("dialog"); // selects the dialog element
  const closeButton = document.querySelector(".close-modal"); // selects the close button
  // const favoriteButton = document.querySelector(".favorite-button");
  // event listener for the "Refresh" button
  const refreshButton = document.querySelector(".comic-3x3-button");
  // console.log(refreshButton);
  refreshButton.addEventListener("click", handleRefreshClick);

  // event listener for favorite button press
  document.addEventListener("click", (event) => {
    const heartButton = event.target.closest(".favorite-button");
    if (heartButton) {
      handleFavoriteClick(event);
    }
  });

  //  click event listeners to dynamically generated comic panels
  document.addEventListener("click", handleComicClick);

  //  event listener for the close button
  closeButton.addEventListener("click", () => {
    const dialog = document.querySelector("dialog");
    dialog.close(); // closes the modal

    // After closing the modal, update the heart icons in the grid
    updateHeartIcons(); // Ensure the heart icons in the grid are updated based on the localStorage state
  });

  // Call this function when the page loads or after content is dynamically added
  document.addEventListener("DOMContentLoaded", updateHeartIcons);
};

main();
