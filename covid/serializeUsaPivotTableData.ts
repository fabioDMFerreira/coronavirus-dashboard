import getMonthAndWeek from "@utils/getMonthAndWeek";

export default (newCases: any, newDeaths: any) => {
  let pivotData: any = [['Location', 'New Cases', 'New Deaths', 'Week']];

  Object.keys(newCases)
    .forEach((region) => {
      const regionNewCases = newCases && newCases[region] ? newCases[region] : [];

      const regionNewDeaths = newDeaths && newDeaths[region] ? newDeaths[region] : [];

      const datesMapper: any = {};

      for (let i = 0; i < regionNewCases.length; i++) {
        const [casesDate, newCases] = regionNewCases[i];
        const week = getMonthAndWeek(casesDate)
        if (datesMapper[week]) {
          datesMapper[week][1] += newCases;
        } else {
          datesMapper[week] = [region, newCases, 0, week];
        }
      }

      for (let i = 0; i < regionNewDeaths.length; i++) {
        const [deathsDate, newDeaths] = regionNewDeaths[i];
        const week = getMonthAndWeek(deathsDate);

        if (datesMapper[week]) {
          datesMapper[week][2] += newDeaths
        } else {
          datesMapper[week] = [region, 0, newDeaths, week];
        }
      }

      pivotData = [...pivotData, ...Object.values(datesMapper)];
    });

  pivotData = [pivotData[0], ...pivotData.slice(1)];


  return pivotData;
}
