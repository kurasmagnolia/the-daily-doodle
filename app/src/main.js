import { getLatestComic, getSpecificComic } from './fetch-functions';

const main = () => {
  getLatestComic();
  getSpecificComic(235);
};

main();
