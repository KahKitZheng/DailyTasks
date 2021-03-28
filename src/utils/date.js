const today = new Date();

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const date = today.getDate();
const day = days[today.getDay()];
const month = months[today.getMonth()];

export function getToday() {
  return `${day}, ${date} ${month}`;
}
