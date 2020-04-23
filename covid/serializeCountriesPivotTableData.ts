import getMonthAndWeek from "@utils/getMonthAndWeek";


export default (chartsData: any) => {
  let pivotData: any = [['Location', 'New Cases', 'New Deaths', 'Week']];

  const pivotDataGrouped: any = {};

  if (chartsData && chartsData.newCases && chartsData.newDeaths) {
    Object.keys(chartsData.newCases)
      .forEach((country) => {
        const countryNewCases = chartsData.newCases && chartsData.newCases[country] ? chartsData.newCases[country] : [];
        const countryNewCasesSize = countryNewCases.length - 1;

        const countryNewDeaths = chartsData.newDeaths && chartsData.newDeaths[country] ? chartsData.newDeaths[country] : [];
        const countryNewDeathsSize = countryNewDeaths.length - 1;

        for (let i = 0; i < countryNewCases.length; i++) {
          const [date, newCases] = countryNewCases[countryNewCasesSize - i];
          const newDeaths = countryNewDeathsSize - i >= 0 ? countryNewDeaths[countryNewDeathsSize - i][1] : 0;


          const week = getMonthAndWeek(date);

          const key = country + ':' + week;

          if (pivotDataGrouped[key]) {
            pivotDataGrouped[key][1] += newCases;
            pivotDataGrouped[key][2] += newDeaths;
          } else {
            pivotDataGrouped[key] = [
              country,
              newCases,
              newDeaths,
              week
            ]
          }
        }
      });

    pivotData = [pivotData[0], ...Object.values(pivotDataGrouped).reverse()];
  }

  return pivotData;
}
