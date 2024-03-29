import { ChartsData } from '@common/types';

import {
  makeCumulativeArray,
  parseCSSEGIData
} from './chartSerializer';

export default async ([totalDeathsCsv, totalCasesCsv]: any) => {
  let chartsData: ChartsData = { totalCases: {}, totalDeaths: {} };

  if (totalCasesCsv && totalDeathsCsv) {
    [chartsData] = await parseCSSEGIData(totalCasesCsv, totalDeathsCsv);

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

            World.newCases[date] = (World.newCases[date] || 0) + newCases;
            World.newDeaths[date] = (World.newDeaths[date] || 0) + newDeaths;
          }
        });

      World.newCases = Object.entries(World.newCases).map(([time, value]) => ([+time, value])).sort((a: any, b: any) => a[0] - b[0]);
      World.newDeaths = Object.entries(World.newDeaths).map(([time, value]) => ([+time, value])).sort((a: any, b: any) => a[0] - b[0]);

      chartsData.newCases.World = World.newCases;
      chartsData.newDeaths.World = World.newDeaths;
      chartsData.totalCases.World = makeCumulativeArray(World.newCases);
      chartsData.totalDeaths.World = makeCumulativeArray(World.newDeaths);
    }
  }

  return chartsData;
}
