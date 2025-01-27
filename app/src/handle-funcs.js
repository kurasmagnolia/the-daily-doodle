import {
  fetch9RandomComics,
  getSpecificComic,
  fetchRandomComic,
} from "./fetch-functions";
import { render3x3, renderGeneratedComic } from "./dom-helpers";
import { getComics, setComics, unfavoriteComic } from "./local-storage";
import loadingImage from "./assets/loading-buffer-circle.png";

export const handleRefreshClick = async () => {
  const comicDiv = document.getElementById("comic-grid");
  comicDiv.innerHTML = "";

  // render loading text
  const loadingElementsDiv = document.querySelector(".loading-elements");
  const loadingText = document.createElement("p");
  const circleBuffer = document.createElement("img");

  loadingText.textContent = "Loading!";
  loadingText.className = "loading-text";
  circleBuffer.src = loadingImage;
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
  const modalIssue = document.querySelector(".modal-issue");
  const modalRelease = document.querySelector(".modal-release");
  const modalTranscript = document.querySelector(".modal-transcript"); // selects the context inside the modal
  const favoriteButton = document.querySelector(".favorite-button");
  const heartIcon = favoriteButton.querySelector(".heart-icon");
  const img = event.target;

  if (
    img.classList.contains("comic-panel") ||
    img.classList.contains("featured-comic-img") ||
    img.classList.contains("comic-gen-img") ||
    img.classList.contains("fav-panel")
  ) {
    // Get the clicked comic's data
    const comicId = img.dataset.issueNum;
    modalTitle.textContent = `Comic Title: ${img.dataset.title}`;
    modalImage.src = img.src;
    modalIssue.textContent = `Issue #: ${img.dataset.issueNum}`;
    modalRelease.textContent = `Release Date: ${img.dataset.release}`;

    favoriteButton.setAttribute("data-comic-id", comicId);

    // Get the transcript from the data-transcript attribute
    const transcript = img.dataset.transcript;
    const existingTranscript =
      modalTranscript.querySelector(".modal-transcript");
    if (existingTranscript) {
      existingTranscript.remove();
    }
    modalTranscript.textContent = transcript
      ? transcript
      : "We're sorry, but a transcript wasn't available for this comic.";

    // Check if the comic is in localStorage favorites
    const favorites = getComics();
    if (favorites[comicId]) {
      heartIcon.classList.add("favorited"); // If comic is in favorites, mark the heart as favorited
    } else {
      heartIcon.classList.remove("favorited"); // If comic is not in favorites, ensure the heart is not favorited
    }

    dialog.showModal(); // open the modal
  }
};

export const handleFavoriteClick = (event) => {
  // Ensure we're interacting with the heart button, not other elements
  const heartButton = event.target.closest(".favorite-button");
  if (!heartButton) return; // If the clicked element is not a heart button, return

  const heartIcon = heartButton.querySelector(".heart-icon");
  const comicId = heartButton.dataset.comicId; // Each heart button should have its unique comic ID

  // Get the title, image, and additional info for this specific comic
  const modalContent = document.querySelector(".modal-content");
  const comicTitle =
    modalContent.querySelector(".modal-title").textContent || "Unknown Title";
  const comicImage = modalContent.querySelector(".modal-image").src || "";
  const comicAlt =
    modalContent.querySelector(".modal-image").alt || "No image description"; // Ensure alt text is captured
  const comicDate =
    modalContent.querySelector(".modal-release").textContent || "Unknown Date"; // Extract date if available

  // Get the favorites object from localStorage
  const favorites = getComics();

  // Check if this comic is already in the favorites
  if (favorites[comicId]) {
    // Remove from favorites
    delete favorites[comicId]; // Remove the comic by its ID
    setComics(favorites); // Save the updated favorites to localStorage
    heartIcon.classList.remove("favorited"); // Remove the heart icon highlight
    console.log(`Comic ${comicId} removed from favorites.`);
  } else {
    // Add to favorites
    favorites[comicId] = {
      num: comicId,
      title: comicTitle.slice(12),
      img: comicImage,
      alt: comicAlt,
      release: comicDate.slice(14), // Store the data-release (date)
    };
    setComics(favorites); // Save the updated favorites to localStorage
    heartIcon.classList.add("favorited"); // Add the heart icon highlight
    console.log(`Comic ${comicId} added to favorites.`);
  }
};

export const updateHeartIcons = () => {
  const favorites = getComics(); // Get the favorites from localStorage

  // Go through all favorite buttons and update the heart state
  const heartButtons = document.querySelectorAll(".favorite-button");
  heartButtons.forEach((button) => {
    const heartIcon = button.querySelector(".heart-icon");
    const comicId = button.dataset.comicId;

    // If the comic is in favorites, mark the heart as 'favorited'
    if (favorites[comicId]) {
      heartIcon.classList.add("favorited");
    } else {
      heartIcon.classList.remove("favorited");
    }
  });
};

// Keep track of the current comic number
let currentComicNum = 1;

export const handlePrevClick = async (event) => {
  if (currentComicNum > 1) {
    currentComicNum -= 1;
    const comic = await getSpecificComic(currentComicNum);
    renderComic(comic);
    currentComicNum = comic.num;
  } else {
    alert("No previous comic!");
  }
};

export const handleNextClick = async (event) => {
  console.log(event.target);
  console.log("Next button clicked");

  currentComicNum += 1;

  try {
    const comic = await getSpecificComic(currentComicNum);
    if (comic) {
      renderComic(comic);
      currentComicNum = comic.num;
    } else {
      alert("Failed to fetch the next comic. Please try again");
    }
  } catch (error) {
    console.warn("Error fetch the next comic. Please try again", error);
  }
};

export const handleRandomClick = async (event) => {
  try {
    const comic = await fetchRandomComic();
    if (comic) {
      renderComic(comic);
      currentComicNum = comic.num;
    } else {
      alert("Failed to fetch the random comic. Please try again");
    }
  } catch (error) {
    console.warn("Error fetch the random comic. please try again", error);
  }
};

export const handleInputSubmit = async (event) => {
  event.preventDefault(); // Prevent the form from reloading the page

  const userInput = document.getElementById("input").value; // Get the input value
  console.log(userInput);

  try {
    const comic = await getSpecificComic(Number(userInput));
    if (comic) {
      renderComic(comic);
      currentComicNum = comic.num;
    } else {
      alert("Failed to fetch the requested comic. Please try again");
    }
  } catch (error) {
    console.warn("Error fetch the next comic. Please try again", error);
  }

  // event.target.reset();

  //   if (userInput) {
  //     console.log(`User entered number: ${userInput}`);
  //     // Call your function and pass the user input
  //     const comic = await getSpecificComic(Number(userInput));
  //     renderComic(comic);
  //   } else {
  //     alert("Please enter a number.");
  //   }
};

export const handleFavoriteComicClick = (event) => {
  const clickedComic = event.target.closest(".favorite-comic-item");
  if (!clickedComic) return; // If no comic item is clicked, return early

  const comicId = clickedComic.dataset.comicId; // Get the comic ID from the data attribute

  // Get the favorites from localStorage
  const favorites = getComics(); // Fetch favorites from localStorage

  // Get the comic from favorites based on the comicId
  const comic = favorites[comicId];

  // Get modal elements
  const modal = document.querySelector(".selected-comic-modal");
  const modalTitle = modal.querySelector(".modal-title");
  const modalImage = modal.querySelector(".modal-image");
  const modalIssue = modal.querySelector(".modal-issue");
  const modalRelease = modal.querySelector(".modal-release");
  const heartButton = modal.querySelector(".favorite-button");
  const modalTranscript = modal.querySelector(".modal-transcript"); // Assuming the transcript element exists

  if (comic) {
    // Comic data found in favorites, update modal content
    modalTitle.textContent = comic.title || "Unknown Title"; // Comic title
    modalImage.src = comic.img || ""; // Comic image source
    modalImage.alt = comic.alt || ""; // Comic alt text
    modalIssue.textContent = `Issue #: ${comic.num || "N/A"}`; // Comic issue number
    modalRelease.textContent = `Release Date: ${
      comic.release || "Unknown Date"
    }`; // Comic release date

    // Set heart button as favorited
    heartButton.classList.add("favorited"); // Add 'favorited' class to heart button

    // Add the transcript if available
    modalTranscript.textContent = comic.transcript || "No transcript available"; // Show transcript if exists
  } else {
    // Comic not found in favorites, populate modal with default values
    modalTitle.textContent = "Unknown Title";
    modalImage.src = "default-image-url";
    modalImage.alt = "No image description";
    modalIssue.textContent = `Issue #: N/A`;
    modalRelease.textContent = `Release Date: Unknown Date`;

    // Ensure heart button is not favorited
    heartButton.classList.remove("favorited");

    // Ensure no transcript is shown
    modalTranscript.textContent = "No transcript available";
  }

  // Open the modal
  modal.showModal();
};

// helper function to render the comic
const renderComic = (comic) => {
  if (comic) {
    const comicDiv = document.getElementById("comic-gen-img-container");
    renderGeneratedComic(comicDiv, comic);
  }
};
