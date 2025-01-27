import { renderFavorites } from "./dom-helpers";

const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error);
    return null;
  }
};

// store the featured comic and its timestamp
export const setFeaturedComicData = (comic) => {
  const data = {
    comic,
    timestamp: new Date().toISOString(), // Save the current time
  };
  setLocalStorageKey("featuredComic", data);
};

// retrieve the featured comic and timestamp
export const getFeaturedComicData = () => {
  return getLocalStorageKey("featuredComic");
};

export const setComics = (newComics) => {
  setLocalStorageKey("favorites", newComics);
};

export const getComics = () => {
  const storedComics = getLocalStorageKey("favorites");
  if (!storedComics) {
    return {};
  }
  return storedComics;
};

export const unfavoriteComic = (comicNum) => {
  const favoritesUL = document.querySelector(".favorites-list");
  const favorites = getComics(); // Retrieve current favorites from localStorage

  if (favorites[comicNum]) {
    // Remove the comic from favorites in localStorage
    delete favorites[comicNum];
    setComics(favorites); // Update the favorites in localStorage

    console.log(`Comic ${comicNum} removed from favorites.`);

    // Clear the current list in the DOM before re-rendering
    favoritesUL.innerHTML = ""; // Clear the existing list in the DOM

    // Re-render the remaining comics in the list (without the removed one)
    renderFavorites(favoritesUL, favorites); // Re-render with updated favorites
  } else {
    console.warn(`Comic ${comicNum} is not in favorites.`);
  }
};
