import {
  getLatestComic,
  getSpecificComic,
  fetch9RandomComics,
} from "./fetch-functions";
import { handle3, render3x3 } from "./dom-helpers";

const main = async () => {
  const comicDiv = document.getElementById("comic-grid");

  const comics = await fetch9RandomComics();
  // event listeners for buttons across our application
  document
    .querySelector(".comic-3x3-button")
    .addEventListener("click", handle3);

  // getLatestComic();
  // getSpecificComic(235);

  // const latestComic = await getLatestComic();

  // // console.log(latestComic);
  // const randomGen = Math.floor(Math.random() * latestComic.num);

  // console.log(await getSpecificComic(randomGen));

  // const comics = await fetch9RandomComics();

  // render3x3(comicDiv, comics);
};

await main();
