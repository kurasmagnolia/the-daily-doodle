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

// Store the featured comic and its timestamp
export const setFeaturedComicData = (comic) => {
  const data = {
    comic,
    timestamp: new Date().toISOString(), // Save the current time
  };
  setLocalStorageKey("featuredComic", data);
};

// Retrieve the featured comic and timestamp
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
  const favorites = getComics(); // retrieves current favorites

  if (favorites[comicNum]) {
    delete favorites[comicNum]; // Remove the comic by its number
    setComics(favorites); // Update local storage
  } else {
    console.warn(`Comic ${comicNum} is not in favorites.`);
  }
};
