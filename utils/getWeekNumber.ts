export default function getWeekNumber(d: any) {
  const monthDay = new Date(d).getDate();
  const mod = monthDay % 7;

  const week = mod ?
    Math.floor((monthDay / 7) + 1):
    Math.floor(monthDay / 7)

  return `week ${week}`;
};
