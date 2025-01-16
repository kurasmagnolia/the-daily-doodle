const comicsUrl = "https://xkcd.vercel.app/?comic=latest";

export const getLatestComic = () => {
  return fetch(comicsUrl)
    .then((response) => {
      if (!response.ok) {
        throw Error(
          `Failed to get latest comic! ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((comicBody) => {
      console.log(comicBody);
      return comicBody;
    })
    .catch((error) => {
      console.warn(error);
      return null;
    });
};

export const getSpecificComic = (comicNum) => {
  const comicUrl = `https://xkcd.vercel.app/?comic=${comicNum}`;

  return fetch(comicUrl)
    .then((response) => {
      if (!response.ok) {
        throw Error(
          `Failed to get this specific comic! ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((comicBody) => {
      console.log(comicBody);
      return comicBody;
    })
    .catch((error) => {
      console.warn(error);
      return null;
    });
};
