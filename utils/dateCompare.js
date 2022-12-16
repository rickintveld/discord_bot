function isToday(timestamp) {
  return new Date().getDay() === new Date(timestamp).getDay();
}

function differenceInTime(timestamp) {
  return new Date().getTime() - new Date(timestamp).getTime();
}

function differenceInDays(timestamp) {
  return this.differenceInTime(timestamp) / (1000 * 3600 * 24);
}

export const dateCompare = {
  isToday,
  differenceInDays,
  differenceInTime,
};
