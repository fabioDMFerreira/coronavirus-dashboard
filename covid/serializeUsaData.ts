import {
  makeCumulativeArray,
  mapGrowth,
} from './chartSerializer';
import getUtcDate from '@utils/getUtcDate';
import { EventsMap, ChartsData } from '@common/types';
import buildSheetFromCSV from '@utils/buildSheetFromCSV';


const serializeOccurrencesData =
  (headers: string[], values: string[]): [number, number][] =>
    headers.map((date, index) => ([getUtcDate(date), +values[index]]));

export const parseSheetToJSON = (datesHeaders: string[], sheet: string[][], datesCursor: number): EventsMap => {
  return sheet.reduce(
    (final: EventsMap, row: string[]): EventsMap => {
      if (row && row[0]) {
        const state = row[5];
        const region = row[6];
        const occurrences = row.slice(datesCursor)

        if (state !== 'Unassigned') {
          if (!final[region]) {
            final[region] = serializeOccurrencesData(datesHeaders, occurrences);
          } else if (state) {
            const actualValues = serializeOccurrencesData(datesHeaders, occurrences);
            final[region] = final[region].map(([time, value]: [number, number], index: number) => [time, value + actualValues[index][1]]);
          }
        }
      }

      return final;
    }, {},
  );

};

export const serializeChartsData = async (totalCasesCsv: string, totalDeathsCsv: string): Promise<ChartsData> => {
  const totalCasesSheet: string[][] = await buildSheetFromCSV(totalCasesCsv);
  const totalDeathsSheet: string[][] = await buildSheetFromCSV(totalDeathsCsv);

  const tcHeaderDates = totalCasesSheet[0].slice(11);
  const tdHeaderDates = totalDeathsSheet[0].slice(12);

  const totalCases: EventsMap = parseSheetToJSON(tcHeaderDates, totalCasesSheet.slice(1), 11);
  const totalDeaths: EventsMap = parseSheetToJSON(tdHeaderDates, totalDeathsSheet.slice(1), 12);

  // Ignore New Jersey odd values
  if ("new Jersey" in totalDeaths) {
    const startDate = Date.UTC(2020, 3, 1);
    totalDeaths["New Jersey"]
      = totalDeaths["New Jersey"]
        .map(([date, value]) => date > startDate ? [date, value] : [date, 0])
  }

  return {
    totalCases,
    totalDeaths,
    newCases: Object.keys(totalCases).reduce((final: EventsMap, country) => {
      final[country] = mapGrowth(totalCases[country]);
      return final;
    }, {}),
    newDeaths: Object.keys(totalDeaths).reduce((final: EventsMap, country) => {
      final[country] = mapGrowth(totalDeaths[country]);
      return final;
    }, {}),
  };
}


export default async ([totalCasesCsv, totalDeathsCsv]: [string, string]): Promise<[ChartsData, any, string[]]> => {
  let chartsData: ChartsData = { totalCases: {}, totalDeaths: {} };
  let pivotData: any = [['Date', 'Location', 'New Cases', 'New Deaths', 'Total Cases', 'Total Deaths']];

  if (totalCasesCsv && totalDeathsCsv) {
    chartsData = await serializeChartsData(totalCasesCsv, totalDeathsCsv);

    if (chartsData && chartsData.newCases && chartsData.newDeaths) {
      const USA: any = {
        totalCases: {}, totalDeaths: {}, newCases: {}, newDeaths: {},
      };

      Object.keys(chartsData.newCases)
        .forEach((country) => {
          const countryNewCases = chartsData.newCases && chartsData.newCases[country] ? chartsData.newCases[country] : [];

          const countryNewDeaths = chartsData.newDeaths && chartsData.newDeaths[country] ? chartsData.newDeaths[country] : [];

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const datesMapper: any = {};

          for (let i = 0; i < countryNewCases.length; i++) {
            const [casesDate, newCases] = countryNewCases[i];
            datesMapper[casesDate] = [new Date(casesDate), country, newCases];
            USA.newCases[casesDate] = (USA.newCases[casesDate] || 0) + newCases;
          }

          for (let i = 0; i < countryNewDeaths.length; i++) {
            const [deathsDate, newDeaths] = countryNewDeaths[i];
            if (datesMapper[deathsDate]) {
              datesMapper[deathsDate].push(newDeaths);
            } else {
              datesMapper[deathsDate] = [new Date(deathsDate), country, 0, newDeaths];
            }
            USA.newDeaths[deathsDate] = (USA.newDeaths[deathsDate] || 0) + newDeaths;
          }

          pivotData = [...pivotData, ...Object.values(datesMapper)];
        });

      pivotData = [pivotData[0], ...pivotData.slice(1)];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      USA.newCases = Object.entries(USA.newCases).map(([time, value]) => ([+time, value])).sort((a: any, b: any) => a[0] - b[0]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      USA.newDeaths = Object.entries(USA.newDeaths).map(([time, value]) => ([+time, value])).sort((a: any, b: any) => a[0] - b[0]);

      chartsData.newCases.USA = USA.newCases;
      chartsData.newDeaths.USA = USA.newDeaths;
      chartsData.totalCases.USA = makeCumulativeArray(USA.newCases);
      chartsData.totalDeaths.USA = makeCumulativeArray(USA.newDeaths);

    }
  }

  return [chartsData, pivotData, Object.keys(chartsData.totalCases)];
}
