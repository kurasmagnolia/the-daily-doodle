import { getFeaturedComic } from "./fetch-functions";
import { renderFeaturedComic } from "./dom-helpers";

// Calculate the time remaining until midnight
const calculateTimeUntilMidnight = () => {
  const now = new Date();
  const nextMidnight = new Date();
  nextMidnight.setHours(24, 0, 0, 0); // Set time to midnight of the next day

  const timeUntilMidnight = nextMidnight - now;
  return timeUntilMidnight;
};

// Schedule the comic reset and countdown timer
export const scheduleReset = async () => {
  const timeUntilMidnight = calculateTimeUntilMidnight();

  // Fetch and render the initial comic
  try {
    const initialComic = await getFeaturedComic();
    if (initialComic) {
      renderFeaturedComic(initialComic);
    } else {
      console.error("Failed to fetch the initial comic.");
    }
  } catch (error) {
    console.error("Error fetching initial comic:", error);
  }

  // Start the countdown timer
  updateCountdownTimer();

  // Fetch and render a new featured comic after the timer expires
  setTimeout(async () => {
    try {
      console.log("Fetching new featured comic...");
      const comic = await getFeaturedComic();

      if (comic) {
        renderFeaturedComic(comic);
      } else {
        console.error("Failed to fetch the new comic.");
      }

      // Schedule the reset to repeat every 24 hours (86400000 ms)
      setInterval(async () => {
        console.log("Fetching new comic for the next day...");
        const newComic = await getFeaturedComic();

        if (newComic) {
          renderFeaturedComic(newComic);
        } else {
          console.error("Failed to fetch the new comic.");
        }
      }, 86400000);
    } catch (error) {
      console.error("Error during comic reset:", error);
    }
  }, timeUntilMidnight);
};

// Update the countdown timer every second
const updateCountdownTimer = () => {
  const timerElement = document.querySelector(".timer");

  if (!timerElement) {
    console.error("Timer element not found!");
    return;
  }

  const updateTimer = () => {
    const timeUntilMidnight = calculateTimeUntilMidnight();

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(timeUntilMidnight / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeUntilMidnight % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeUntilMidnight % (1000 * 60)) / 1000);

    // Update the timer display
    timerElement.textContent = `New Featured Comic in: ${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Initial call to update the timer
  updateTimer();

  // Update the timer every second
  setInterval(updateTimer, 1000);
};

// Start the schedule
scheduleReset();
