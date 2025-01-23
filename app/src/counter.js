import { getFeaturedComic } from "./fetch-functions";
import { renderFeaturedComic } from "./dom-helpers";
import { getFeaturedComicData, setFeaturedComicData } from "./local-storage";

const calculateTimeUntilMidnight = () => {
  const now = new Date();
  const nextMidnight = new Date();
  nextMidnight.setHours(24, 0, 0, 0); // Set time to midnight of the next day
  return nextMidnight - now;
};

export const scheduleReset = async () => {
  const storedData = getFeaturedComicData();
  const now = new Date();

  // Check if stored comic exists and is still valid for today
  if (
    storedData &&
    storedData.timestamp &&
    new Date(storedData.timestamp).toDateString() === now.toDateString()
  ) {
    renderFeaturedComic(storedData.comic); // Render the stored comic
  } else {
    try {
      const newComic = await getFeaturedComic();
      if (newComic) {
        renderFeaturedComic(newComic); // Render the new comic
        setFeaturedComicData(newComic); // Save the new comic and timestamp
      } else {
        console.error("Failed to fetch the initial comic.");
      }
    } catch (error) {
      console.error("Error fetching initial comic:", error);
    }
  }

  // Start the countdown timer
  updateCountdownTimer();

  // Schedule the reset for midnight
  const timeUntilMidnight = calculateTimeUntilMidnight();
  setTimeout(async () => {
    try {
      const newComic = await getFeaturedComic();
      if (newComic) {
        renderFeaturedComic(newComic);
        setFeaturedComicData(newComic);
      }
    } catch (error) {
      console.error("Error during comic reset:", error);
    }

    // Schedule resets to repeat every 24 hours
    setInterval(async () => {
      try {
        const newComic = await getFeaturedComic();
        if (newComic) {
          renderFeaturedComic(newComic);
          setFeaturedComicData(newComic);
        }
      } catch (error) {
        console.error("Error fetching the new comic.");
      }
    }, 86400000); // 24 hours in milliseconds
  }, timeUntilMidnight);
};

const updateCountdownTimer = () => {
  const timerElement = document.querySelector(".timer");

  if (!timerElement) {
    console.error("Timer element not found!");
    return;
  }

  const updateTimer = () => {
    const timeUntilMidnight = calculateTimeUntilMidnight();

    const hours = Math.floor(timeUntilMidnight / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeUntilMidnight % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeUntilMidnight % (1000 * 60)) / 1000);

    timerElement.textContent = `New Featured Comic in: ${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  updateTimer();
  setInterval(updateTimer, 1000); // Update every second
};

scheduleReset();
