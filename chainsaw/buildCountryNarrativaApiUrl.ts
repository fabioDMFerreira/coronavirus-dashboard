export default (country: string, startDate: string, endDate?: string) => {
  endDate = endDate || startDate;

  return `https://api.covid19tracking.narrativa.com/api/country/${country}?date_from=${startDate}&date_to=${endDate}`;
};
