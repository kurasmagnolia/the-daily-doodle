import { getFeaturedComic } from "./fetch-functions";

const calculateTimeUntilMidnight = () => {
  const now = new Date();
  const nextMidnight = new Date();
  nextMidnight.setHours(24, 0, 0, 0);

  const timeUntilMidnight = nextMidnight - now;

  return timeUntilMidnight;
};

export const scheduleReset = () => {
  const timeUntilMidnight = calculateTimeUntilMidnight();

  setTimeout(() => {
    getFeaturedComic();

    setInterval(getFeaturedComic, 86400000);
  }, timeUntilMidnight);
};

const updateCountdownTimer = () => {
  const timerElement = document.getElementById("featured-comic-timer"); // Add this element to your HTML

  const updateTImer = () => {
    const timeUntilMidnight = calculateTimeUntilMidnight();

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(timeUntilMidnight / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeUntilMidnight % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeUntilMidnight % (1000 * 60)) / 1000);

    // Update the timer display
    timerElement.textContent = `Time Left Until Reset: ${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Update the timer every second
  setInterval(updateTimer, 1000);
};
