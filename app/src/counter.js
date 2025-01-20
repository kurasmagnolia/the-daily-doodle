import { getFeaturedComic } from "./fetch-functions";

const calculateTimeUntilMidnight = () => {
  const now = new Date();
  const nextMidnight = new Date();
  nextMidnight.setHours(24, 0, 0, 0);

  const timeUntilMidnight = nextMidnight - now;

  return timeUntilMidnight;
};

const scheduleReset = () => {
  const timeUntilMidnight = calculateTimeUntilMidnight();

  setTimeout(() => {
    getFeaturedComic();

    setInterval(getFeaturedComic, 86400000);
  }, timeUntilMidnight);
};
