import { getLatestComic, getSpecificComic } from './fetch-functions';

const main = async () => {
  getLatestComic();
  getSpecificComic(235);

  const latestComic = await getLatestComic();

  // console.log(latestComic);
  const randomGen = Math.floor(Math.random() * latestComic.num);

  console.log(await getSpecificComic(randomGen));

  const comics = await fetch9RandomComics();

  // render3x3(comicDiv, comics);
};

main();
