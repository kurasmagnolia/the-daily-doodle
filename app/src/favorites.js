import {
  handleComicClick,
  handleFavoriteClick,
  handleFavoriteComicClick,
  updateHeartIcons,
} from "./handle-funcs";
import { getComics } from "./local-storage"; // Import the getComics function
import { renderFavorites } from "./dom-helpers"; // Import renderFavorites function

const main = async () => {
  const dialog = document.querySelector("dialog"); // selects the dialog element
  const closeButton = document.querySelector(".close-modal"); // selects the close button

  // Event listener for favorite button press
  document.addEventListener("click", (event) => {
    const heartButton = event.target.closest(".favorite-button");
    if (heartButton) {
      handleFavoriteClick(event);
    }
  });

  // Click event listeners for dynamically generated comic panels
  document.addEventListener("click", handleFavoriteComicClick);

  // Event listener for the close button
  closeButton.addEventListener("click", () => {
    const dialog = document.querySelector("dialog");
    dialog.close(); // Closes the modal

    // After closing the modal, update the heart icons in the grid
    updateHeartIcons(); // Ensure the heart icons in the grid are updated based on the localStorage state
  });

  // Call this function when the page loads or after content is dynamically added
  document.addEventListener("DOMContentLoaded", () => {
    updateHeartIcons(); // Ensure heart icons are updated

    // Get the favorite comics from localStorage
    const favoritesUl = document.querySelector(".favorites-list"); // Replace with the actual ID of your list
    const comics = getComics(); // Get the comics from localStorage

    // Call renderFavorites to render the comics
    renderFavorites(favoritesUl, comics);
  });
};

main();
