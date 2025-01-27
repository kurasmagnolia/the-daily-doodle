import {
  getLatestComic,
  getSpecificComic,
  getFeaturedComic,
  fetch9RandomComics,
} from "./fetch-functions";

export const renderFeaturedComic = (comic) => {
  const comicImgDiv = document.querySelector(".featured-comic-container");
  const comicTitleDiv = document.querySelector(".featured-comic-title");
  const comicHeading = document.createElement("h2");
  const comicImage = document.createElement("img");

  comicImgDiv.innerHTML = "";
  comicTitleDiv.innerHTML = "";

  comicHeading.className = "featured-h2";
  comicHeading.textContent = `Featured Comic Of The Day: ${comic.title} `;

  comicImage.dataset.title = comic.title;
  comicImage.dataset.issueNum = comic.num;
  comicImage.dataset.release = `${comic.month}/${comic.day}/${comic.year}`;
  comicImage.src = comic.img;
  comicImage.alt = comic.alt;
  comicImage.className = "featured-comic-img";

  comicTitleDiv.append(comicHeading);
  comicImgDiv.append(comicImage);
};

export const renderGeneratedComic = (comicDiv, comic) => {
  // Clear previous content
  comicDiv.innerHTML = "";

  // Create new comic elements
  const comicImage = document.createElement("img");
  const comicTitle = document.createElement("h2");

  comicImage.dataset.title = comic.title;
  comicImage.dataset.issueNum = comic.num;
  comicImage.dataset.release = `${comic.month}/${comic.day}/${comic.year}`;
  comicImage.id = comic.num;
  comicImage.className = "comic-gen-img";
  comicImage.src = comic.img;
  comicImage.alt = comic.alt;

  comicTitle.id = "comic-gen-title";
  comicTitle.textContent = `Comic #${comic.num}: ${comic.title}`;

  comicDiv.appendChild(comicTitle);
  comicDiv.appendChild(comicImage);
};

export const render3x3 = (comicDiv, comics) => {
  // clears each row before inserting its 3 comic strip images
  comicDiv.innerHTML = "";

  // iterate through comics array and create cell for it
  comics.forEach((comic) => {
    const comicImage = document.createElement("img");

    // give elements their attributes and content
    comicImage.dataset.title = comic.title;
    comicImage.dataset.issueNum = comic.num;
    comicImage.dataset.release = `${comic.month}/${comic.day}/${comic.year}`;
    comicImage.src = comic.img;
    comicImage.className = "comic-panel";
    comicImage.alt = comic.alt;
    comicImage.dataset.transcript = comic.transcript;
    comicImage.className = "comic-panel";

    // append element to its correct container
    comicDiv.append(comicImage);
  });
};

export const renderFavorites = (favoritesUl, comics) => {
  // Clear the list before rendering the new favorites
  favoritesUl.innerHTML = ""; // This ensures the DOM is cleaned up before rendering new favorites

  // Loop through each comic and create the corresponding <li> element
  for (const comicNum in comics) {
    const comic = comics[comicNum];

    // Create the <li> element
    const li = document.createElement("li");
    li.className = "favorite-comic-item"; // Add the appropriate class
    li.dataset.comicId = comic.num; // Add the comic ID as a data attribute

    // Create the inner div container
    const comicDiv = document.createElement("div");
    comicDiv.className = "favorited-comic"; // Add the class for the comic container

    // Create the comic title (h3)
    const comicHeading = document.createElement("h3");
    comicHeading.className = "fav-text"; // Add the appropriate class
    comicHeading.textContent = comic.title || "Unknown Title"; // Set the title text

    // Create the comic image (img)
    const comicImage = document.createElement("img");
    comicImage.className = "fav-panel"; // Add the class for the image
    comicImage.src = comic.img || "default-image-url"; // Set the image source (use a default if none)
    comicImage.alt = comic.alt || "No image description"; // Set the alt text for the image

    // Create the comic release date (p) using the release from favorites
    const comicDate = document.createElement("p");
    comicDate.className = "fav-text"; // Add the class for the text
    comicDate.textContent = `Release Date: ${comic.release || "Unknown Date"}`; // Set the date text

    // Create the comic issue number (p)
    const comicIDNumber = document.createElement("p");
    comicIDNumber.className = "fav-text"; // Add the class for the text
    comicIDNumber.textContent = `Issue #: ${comic.num}`; // Set the issue number text

    // Append the heading, image, date, and issue number to the comic div
    comicDiv.append(comicHeading, comicImage, comicDate, comicIDNumber);

    // Append the comic div to the <li> element
    li.appendChild(comicDiv);

    // Append the <li> element to the favorites list (ul)
    favoritesUl.appendChild(li);
  }
};
