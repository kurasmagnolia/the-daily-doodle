import {
  getLatestComic,
  getSpecificComic,
  fetch9RandomComics,
} from "./fetch-functions";
import { render3x3, renderFeaturedComic } from "./dom-helpers";
import { handleComicClick, handleRefreshClick } from "./handle-funcs";

const main = async () => {
  const dialog = document.querySelector("dialog"); // selects the dialog element
  const closeButton = document.querySelector(".close-modal"); // selects the close button

  // event listener for the "Refresh" button
  document
    .querySelector(".comic-3x3-button")
    .addEventListener("click", handleRefreshClick);

  //  click event listeners to dynamically generated comic panels
  document.addEventListener("click", handleComicClick);

  //  event listener for the close button
  closeButton.addEventListener("click", () => {
    dialog.close(); // closes the modal
  });

  // // OPTIONAL: Close the modal when clicking outside the content
  // dialog.addEventListener("click", (event) => {
  //   if (event.target === dialog) {
  //     dialog.close();
  //   }
  // });
};

main();
