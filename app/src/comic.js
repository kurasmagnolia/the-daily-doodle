import {
  handlePrevClick,
  handleNextClick,
  handleRandomClick,
  handleInputSubmit,
  handleComicClick,
  handleFavoriteClick,
  updateHeartIcons,
} from "./handle-funcs";

const main = () => {
  const closeButton = document.querySelector(".close-modal"); // selects the close button
  const prevButton = document.querySelector("#prev-btn");

  prevButton.addEventListener("click", handlePrevClick);

  document
    .getElementById("random-btn")
    .addEventListener("click", handleRandomClick);
  console.log("random test");

  document
    .getElementById("next-btn")
    .addEventListener("click", handleNextClick);

  document
    .querySelector(".user-input-form")
    .addEventListener("submit", handleInputSubmit);

  document.addEventListener("click", (event) => {
    const heartButton = event.target.closest(".favorite-button");
    if (heartButton) {
      handleFavoriteClick(event);
    }
  });

  document.addEventListener("click", handleComicClick);

  //  event listener for the close button
  closeButton.addEventListener("click", () => {
    const dialog = document.querySelector("dialog");
    dialog.close(); // closes the modal

    // After closing the modal, update the heart icons in the grid
    updateHeartIcons(); // Ensure the heart icons in the grid are updated based on the localStorage state
  });
};

main();
