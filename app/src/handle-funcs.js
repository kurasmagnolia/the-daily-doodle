import { fetch9RandomComics } from "./fetch-functions";
import { render3x3 } from "./dom-helpers";

export const handleRefreshClick = async () => {
  const comicDiv = document.getElementById("comic-grid");
  comicDiv.innerHTML = "";

  // render loading text
  const loadingElementsDiv = document.querySelector(".loading-elements");
  const loadingText = document.createElement("p");
  const circleBuffer = document.createElement("img");

  loadingText.textContent = "Loading!";
  loadingText.className = "loading-text";
  circleBuffer.src = "../src/assets/loading-buffer-circle.png";
  circleBuffer.className = "loader";
  loadingElementsDiv.append(loadingText, circleBuffer);

  const comics = await fetch9RandomComics();

  // remove loading txt
  loadingElementsDiv.innerHTML = "";

  render3x3(comicDiv, comics);
};

export const handleComicClick = (event) => {
  const dialog = document.querySelector("dialog"); // selects the dialog element
  const modalTitle = document.querySelector(".modal-title");
  const modalImage = document.querySelector(".modal-image"); // selects the image inside the modal
  const modalTranscript = document.querySelector(".modal-transcript"); // selects the context inside the modal

  const img = event.target;
  if (
    img.classList.contains("comic-panel") ||
    img.classList.contains("featured-comic-img")
  ) {
    // gets the clicked comic's image source and alt text
    modalTitle.textContent = img.dataset.title;
    modalImage.src = img.src; // Extract URL from 'backgroundImage' CSS property
    modalTranscript.textContent = img.dataset.transcript; // Use custom data-transcript attribute

    // gets the transcript from the data-transcript attribute
    const transcript = img.dataset.transcript;

    // removes any existing transcript text
    const existingTranscript =
      modalTranscript.querySelector(".modal-transcript");
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
