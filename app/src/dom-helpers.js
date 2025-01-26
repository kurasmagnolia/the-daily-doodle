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
  comicImage.id = "comic-gen-img";
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
  const comicDiv = document.createElement("div");
  const comicImg = document.createElement("img");
  const comicHeading = document.createElement("h3");
  const date = document.createElement("p");
  const idNumber = document.createElement("p");

  for (const comic in comics) {
    comicImage.dataset.title = comic.title;
    comicImage.dataset.issueNum = comic.num;
    comicImage.dataset.release = `${comic.month}/${comic.day}/${comic.year}`;

    comicImage.src = comic.img;
    comicImage.alt = comic.alt;
    comicHeading.textContent = `${comic.title}`;
    comicDate.textContent = `Release Date: ${comic.month}/${comic.day}/${comic.year}`;
    comicIDNumber.textContent = `Issue #: ${comic.num}`;

    comicDiv.className = "favorited-comic";
    comicImg.className = "fav-panel";
    comicHeading.className = "fav-text";
    date.className = "fav-text";
    idNumber.className = "fav-text";

    comicDiv.append(comicHeading, comicImage, comicDate, comicIDNumber);
    favoritesUl.append(comicDiv);
  }
};
