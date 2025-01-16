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
