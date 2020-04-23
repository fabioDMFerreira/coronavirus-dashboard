import getWeekNumber from "./getWeekNumber";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export default (time: number) => {
  return `${months[new Date(time).getMonth()]} ${getWeekNumber(time)}`;
}
