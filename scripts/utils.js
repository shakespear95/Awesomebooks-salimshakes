// eslint-disable-next-line import/no-absolute-path, import/no-unresolved
import { DateTime } from '/node_modules/luxon/src/luxon.js';

export const formatDate = (dateString) => {
  const date = DateTime.fromISO(dateString);
  return date.toFormat('LLLL d, yyyy');
};

export const formatTime = (dateString) => {
  const date = DateTime.fromISO(dateString);
  return date.toFormat('h:mm:ss a');
};

export const refreshTime = () => {
  const timeDisplay = document.getElementById('time');
  const date = DateTime.now();
  const formattedDate = formatDate(date.toISO());
  const formattedTime = formatTime(date.toISO());
  timeDisplay.textContent = `${formattedDate}, ${formattedTime}`;
};

export const showSection = (sectionToShow) => {
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    if (section.classList.contains(sectionToShow)) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });
};

export const ordinalSuffix = (day) => {
  if (day % 10 === 1 && day !== 11) {
    return `${day}st`;
  }
  if (day % 10 === 2 && day !== 12) {
    return `${day}nd`;
  }
  if (day % 10 === 3 && day !== 13) {
    return `${day}rd`;
  }
  return `${day}th`;
};