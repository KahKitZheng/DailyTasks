export const formatTime = (time, type) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  switch (type) {
    case "SEC":
      return seconds;
    case "LONG_SEC":
      return formattedSeconds;
    case "MIN":
      return minutes;
    case "SEC":
      return formattedMinutes;
    default:
      return `${formattedMinutes}:${formattedSeconds}`;
  }
};

/**
 * Quickly generates an array of work or break durations.
 * @param {Number} start, minimum duration in seconds
 * @param {Number} goal, maximum duration in seconds
 * @param {Number} incrementBy, amount to increment
 * @returns an array of durations in ms.
 */
export const generateDurations = (start, goal, incrementBy, type) => {
  let index = 0;
  let duration = start;
  let listOfDurations = [
    { id: Math.floor(Math.random() * 100 + 1), type, duration: duration * 60 },
  ];

  while (duration < goal) {
    index++;
    duration += incrementBy;
    listOfDurations.push({ id: index, type, duration: duration * 60 });

    console.log({ listOfDurations });
  }

  return listOfDurations;
};
