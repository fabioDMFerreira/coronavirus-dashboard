import fetch from 'isomorphic-unfetch';

import {
  ChartsData, parseCSSEGIData, serializeCumulativeArray, serializeStatesData,
} from './chartSerializer';

export default {
  getCountriesData: () => {

    return Promise.all([
      fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv')
        .then((res) => res.text())
        .then((res) => res
          .replace('"Korea, South"', 'South Korea')
          .replace('"Bonaire, Sint Eustatius and Saba"', 'Bonaire and Sint Eustatius and Saba')),
      fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')
        .then((res) => res.text())
        .then((res) => res
          .replace('"Korea, South"', 'South Korea')
          .replace('"Bonaire, Sint Eustatius and Saba"', 'Bonaire and Sint Eustatius and Saba')),
    ]).then(([totalDeathsCsv, totalCasesCsv]) => {
      let chartsData: ChartsData = { totalCases: {}, totalDeaths: {} };
      let pivotData = [['Date', 'Location', 'New Cases', 'New Deaths', 'Total Cases', 'Total Deaths']];

      if (totalCasesCsv && totalDeathsCsv) {
        [chartsData] = parseCSSEGIData(totalCasesCsv, totalDeathsCsv);

        if (chartsData && chartsData.newCases && chartsData.newDeaths) {
          const World: any = {
            totalCases: {}, totalDeaths: {}, newCases: {}, newDeaths: {},
          };

          Object.keys(chartsData.newCases)
            .forEach((country) => {
              const countryNewCases = chartsData.newCases && chartsData.newCases[country] ? chartsData.newCases[country] : [];
              const countryNewCasesSize = countryNewCases.length - 1;

              const countryNewDeaths = chartsData.newDeaths && chartsData.newDeaths[country] ? chartsData.newDeaths[country] : [];
              const countryNewDeathsSize = countryNewDeaths.length - 1;

              for (let i = 0; i < countryNewCases.length; i++) {
                const [date, newCases] = countryNewCases[countryNewCasesSize - i];
                const newDeaths = countryNewDeathsSize - i >= 0 ? countryNewDeaths[countryNewDeathsSize - i][1] : 0;

                const entry: any = [
                  new Date(date),
                  country,
                  newCases,
                  newDeaths,
                ];

                pivotData.push(entry);

                World.newCases[date] = (World.newCases[date] || 0) + newCases;
                World.newDeaths[date] = (World.newDeaths[date] || 0) + newDeaths;
              }
            });

          pivotData = [pivotData[0], ...pivotData.slice(1).reverse()];

          World.newCases = Object.entries(World.newCases).map(([time, value]) => ([+time, value])).sort((a: any, b: any) => a[0] - b[0]);
          World.newDeaths = Object.entries(World.newDeaths).map(([time, value]) => ([+time, value])).sort((a: any, b: any) => a[0] - b[0]);

          chartsData.newCases.World = World.newCases;
          chartsData.newDeaths.World = World.newDeaths;
          chartsData.totalCases.World = serializeCumulativeArray(World.newCases);
          chartsData.totalDeaths.World = serializeCumulativeArray(World.newDeaths);
        }
      }

      return [chartsData, pivotData, Object.keys(chartsData.totalCases)];
    })
  },

  getStatesData: () => Promise.all(
    [
      fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
        .then((res) => res.text())
        .then(serializeStatesData),
      fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv')
        .then((res) => res.text())
        .then((csv) => serializeStatesData(csv, 12)),
    ],
  ),
};
