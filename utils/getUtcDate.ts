export default (date: string): number => {
  const match = /(\d*)\/(\d*)\/(\d*)/.exec(date);

  if (match) {
    return Date.UTC(+(`20${match[3]}`), +match[1] - 1, +match[2]);
  }

  return 0;
}
