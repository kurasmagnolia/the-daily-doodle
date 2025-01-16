import { getLatestComic, getSpecificComic } from './fetch-functions';

export const renderFeatureComic = (comic) => {
  const comicDiv = document.getElementById('');
  const comicHeading = document.getElementById('');
  const comicImage = document.createElement('img');

  comicHeading.textContent = `Featured Comic: ${comic.title} `;

  comicImage.src = comic.img;
  comicImage.alt = comic.alt;

  comicDiv.append(comicHeading, comicImage);
};

export const renderRandom = () => {};

export const render3x3 = () => {};

export const renderFavorites = () => {};
