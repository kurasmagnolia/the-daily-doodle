// 1. setLocalStorageKey- a wrapper function that automatically stringifies the value and sets it to the key
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
  const favorites = getComics(); // retrieves current favorites

  if (favorites[comicNum]) {
    delete favorites[comicNum]; // Remove the comic by its number
    setComics(favorites); // Update local storage
  } else {
    console.warn(`Comic ${comicNum} is not in favorites.`);
  }
};
