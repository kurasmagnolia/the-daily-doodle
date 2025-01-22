import {
  getLatestComic,
  getSpecificComic,
  getFeaturedComic,
  fetch9RandomComics,
} from './fetch-functions';

export const renderFeatureComic = (comic) => {
  const comicDiv = document.getElementsByClassName('featured-comic-container');
  const comicHeading = document.getElementsByClassName('featured-h2');
  const comicImage = document.createElement('img');

  comicHeading.textContent = `Featured Comic: ${comic.title} `;

  comicImage.src = comic.img;
  comicImage.alt = comic.alt;

  comicDiv.append(comicHeading, comicImage);
};

// export const renderRandom = (comicDiv, comics) => {
//   // clears each row before inserting its 3 comic strip images
//   comicDiv.innerHTML = '';

//   // iterate through comics array and create cell for it
//   comics.forEach((comic) => {
//     const comicCell = document.createElement('div');
//     const comicImage = document.createElement('img');

//     // give elements their attributes and content
//     comicCell.className = 'comic-cell';
//     comicImage.src = comic.src;
//     comicImage.className = 'comic-panel';
//     comicImage.alt = comic.alt;

//     // append elements to its correct container
//     comicCell.append(comicImage);
//     comicDiv.append(comicCell);
//     comicDiv.append(comicHeading, comicImage);
//   });
// };

// grid-template-columns: 1fr 1fr 1fr;

export const render3x3 = (comicDiv, comics) => {
  // clears each row before inserting its 3 comic strip images
  comicDiv.innerHTML = '';

  console.log(comics);

  // iterate through comics array and create cell for it
  comics.forEach((comic) => {
    const comicImage = document.createElement('img');

    // give elements their attributes and content
    comicImage.src = comic.img;
    comicImage.className = 'comic-panel';
    comicImage.alt = comic.alt;

    // append elements to its correct container
    // comicCell.append(comicImage);
    // comicDiv.append(comicCell);
    comicDiv.append(comicImage);
  });
};

export const handle3 = async () => {
  const comicDiv = document.getElementById('comic-grid');

  const comics = await fetch9RandomComics();

  render3x3(comicDiv, comics);
};

export const renderFavorites = (favoritesUl, comics) => {
  const comicDiv = document.createElement('div');
  const comicImg = document.createElement('img');
  const comicHeading = document.createElement('h3');
  const date = document.createElement('p');
  const idNumber = document.createElement('p');

  comicImg.src = comics.img;
  comicImg.alt = comics.alt;
  comicHeading.textContent = `${comics.title}`;
  date.textContent = `Date: ${comics.month} / ${comics.year}`;
  idNumber.textContent = `Issue Number:${comics.num}`;

  comicDiv.className = 'favorited-comic';
  comicImg.className = 'fav-panel';
  comicHeading.className = 'fav-text';
  date.className = 'fav-text';
  idNumber.className = 'fav-text';

  comicDiv.append(comicHeading, comicImg, date, idNumber);
  favoritesUl.append(comicDiv);
};
