const comicsUrl = "https://xkcd.vercel.app/?comic=latest";

export const getLatestComic = async () => {
  try {
    const response = await fetch(comicsUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to get latest comic! ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export const getSpecificComic = async (comicNum) => {
  const comicUrl = `https://xkcd.vercel.app/?comic=${comicNum}`;

  try {
    const response = await fetch(comicUrl);

    if (!response.ok) {
      throw Error(
        `Failed to get this specific comic! ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export const fetch9RandomComics = async () => {
  const comics = []; // initializes empty array to store comics

  //  iterates 9 times to create new comic and push to the empty array
  for (let i = 0; i < 9; i++) {
    try {
      const latestComic = await getLatestComic(); // gets latest comic for stopping point
      const randomGen = Math.floor(Math.random() * latestComic.num); // generates random number
      const comic = await getSpecificComic(randomGen); // fetch one comic
      comics.push(comic); // adds it to the array
    } catch (error) {
      console.warn(error);
      return null;
    }
  }
  console.log(comics);
  return comics; // returns the array of comic objects
};

export const getFeaturedComic = async () => {
  try {
    const latestComic = await getLatestComic(); // gets latest comic for stopping point
    const randomGen = Math.floor(Math.random() * latestComic.num); // generates random number
    const comic = await getSpecificComic(randomGen); // fetch one comic
    return comic;
  } catch (error) {
    console.warn(error);
    return null;
  }
};
