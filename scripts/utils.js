import { DateTime } from "luxon";

function refreshTime() {
  const timeDisplay = document.getElementById("time");
  const currentDate = DateTime.local();

  const formattedDate = currentDate.toLocaleString({
    month: "long",
    day: "ordinal",
    year: "numeric"
  });

  const formattedTime = currentDate.toLocaleString({
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  timeDisplay.textContent = `${formattedDate}, ${formattedTime}`;
}

refreshTime();