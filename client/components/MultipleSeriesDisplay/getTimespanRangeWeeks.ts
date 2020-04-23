import getWeekNumber from '@utils/getWeekNumber';

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
]

const getStartWeekTime = (time: number) => {
  const startDate = new Date(time);
  const mod = startDate.getDate() % 7;
  const startWeekDate = mod ?
    (Math.floor(startDate.getDate() / 7) * 7) + 1 :
    (Math.floor((startDate.getDate() - 1) / 7) * 7) + 1;
  return startDate.setDate(startWeekDate || 1)
}

export default (startTime: number, endTime: number) => {
  if (startTime > endTime) {
    return [];
  }


  let cursor = getStartWeekTime(startTime);
  const weeks = [];

  while (cursor < endTime) {

    weeks.push(
      `${months[new Date(cursor).getMonth()]} ${getWeekNumber(cursor)}`
    )

    cursor = getStartWeekTime(cursor + 604800000);
  }

  const endTimeWeek = `${months[new Date(endTime).getMonth()]} ${getWeekNumber(endTime)}`;

  if (endTimeWeek !== weeks[weeks.length - 1]) {
    weeks.push(endTimeWeek);
  }

  return weeks;
}
