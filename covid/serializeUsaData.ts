import { ChartsData, EventsMap } from '@common/types';
import buildSheetFromCSV from '@utils/buildSheetFromCSV';
import getUtcDate from '@utils/getUtcDate';

import {
  makeCumulativeArray,
  mapGrowth,
} from './chartSerializer';

type SheetDataAggregator = (datesHeaders: string[], sheet: string[][], datesCursor: number) => EventsMap

const serializeOccurrencesData =
  (headers: string[], values: string[]): [number, number][] =>
    headers.map((date, index) => {
      return [getUtcDate(date), +values[index]];
    });

export const guaranteeValuesAlwaysIncrease = (values: string[]) => {
  const newValues = [values[0]];

  for (let i = 1; i < values.length; i++) {
    const addValue = +values[i] < +newValues[i - 1] ? newValues[i - 1] : values[i];
    newValues.push(addValue);
  }

  return newValues;
};

export const aggregateRegionData = (region: string) => (datesHeaders: string[], sheet: string[][], datesCursor: number): EventsMap => {
  return sheet.reduce(
    (final: EventsMap, row: string[]): EventsMap => {
      if (row && row[0]) {
        const state = row[5];
        const countryRegion = row[6];
        const occurrences = guaranteeValuesAlwaysIncrease(row.slice(datesCursor));

        if (state !== 'Unassigned' && countryRegion.toLowerCase() === region.toLowerCase()) {
          final[state] = serializeOccurrencesData(datesHeaders, occurrences);
        }
      }

      return final;
    }, {},
  );

};

export const aggregateDataPerRegion: SheetDataAggregator = (datesHeaders: string[], sheet: string[][], datesCursor: number): EventsMap => {
  return sheet.reduce(
    (final: EventsMap, row: string[]): EventsMap => {
      if (row && row[0]) {
        const state = row[5];
        const region = row[6];
        const occurrences = guaranteeValuesAlwaysIncrease(row.slice(datesCursor));

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

export const serializeChartsData = async (totalCasesCsv: string, totalDeathsCsv: string, aggregator: SheetDataAggregator): Promise<ChartsData> => {
  const totalCasesSheet: string[][] = await buildSheetFromCSV(totalCasesCsv);
  const totalDeathsSheet: string[][] = await buildSheetFromCSV(totalDeathsCsv);

  const tcHeaderDates = totalCasesSheet[0].slice(11);
  const tdHeaderDates = totalDeathsSheet[0].slice(12);

  const totalCases: EventsMap = aggregator(tcHeaderDates, totalCasesSheet.slice(1), 11);
  const totalDeaths: EventsMap = aggregator(tdHeaderDates, totalDeathsSheet.slice(1), 12);

  // Ignore New Jersey odd values
  if ("new Jersey" in totalDeaths) {
    const startDate = Date.UTC(2020, 3, 1);
    totalDeaths["New Jersey"]
      = totalDeaths["New Jersey"]
        .map(([date, value]) => date > startDate ? [date, value] : [date, 0]);
  }

  return {
    totalCases,
    totalDeaths,
    newCases: Object.keys(totalCases).reduce((final: EventsMap, region) => {
      final[region] = mapGrowth(totalCases[region]);
      return final;
    }, {}),
    newDeaths: Object.keys(totalDeaths).reduce((final: EventsMap, region) => {
      final[region] = mapGrowth(totalDeaths[region]);
      return final;
    }, {}),
  };
};

export const buildTotalNewCasesAndTotalNewDeaths = (newCases: any, newDeaths: any) => {
  const aggregator: any = {
    totalCases: {}, totalDeaths: {}, newCases: {}, newDeaths: {},
  };

  Object.keys(newCases)
    .forEach((region) => {
      const regionNewCases = newCases && newCases[region] ? newCases[region] : [];

      const regionNewDeaths = newDeaths && newDeaths[region] ? newDeaths[region] : [];

      const datesMapper: any = {};

      for (let i = 0; i < regionNewCases.length; i++) {
        const [casesDate, newCases] = regionNewCases[i];
        datesMapper[casesDate] = [new Date(casesDate), region, newCases];
        aggregator.newCases[casesDate] = (aggregator.newCases[casesDate] || 0) + newCases;
      }

      for (let i = 0; i < regionNewDeaths.length; i++) {
        const [deathsDate, newDeaths] = regionNewDeaths[i];
        if (datesMapper[deathsDate]) {
          datesMapper[deathsDate].push(newDeaths);
        } else {
          datesMapper[deathsDate] = [new Date(deathsDate), region, 0, newDeaths];
        }
        aggregator.newDeaths[deathsDate] = (aggregator.newDeaths[deathsDate] || 0) + newDeaths;
      }
    });


  aggregator.newCases = Object.entries(aggregator.newCases).map(([time, value]) => ([+time, value])).sort((a: any, b: any) => a[0] - b[0]);
  aggregator.newDeaths = Object.entries(aggregator.newDeaths).map(([time, value]) => ([+time, value])).sort((a: any, b: any) => a[0] - b[0]);

  return aggregator;
};


export const serializeUsaData = async ([totalCasesCsv, totalDeathsCsv]: [string, string]): Promise<ChartsData> => {
  let chartsData: ChartsData = { totalCases: {}, totalDeaths: {} };

  if (totalCasesCsv && totalDeathsCsv) {
    chartsData = await serializeChartsData(totalCasesCsv, totalDeathsCsv, aggregateDataPerRegion);

    if (chartsData && chartsData.newCases && chartsData.newDeaths) {

      const total = buildTotalNewCasesAndTotalNewDeaths(chartsData.newCases, chartsData.newDeaths);


      chartsData.newCases.USA = total.newCases;
      chartsData.newDeaths.USA = total.newDeaths;
      chartsData.totalCases.USA = makeCumulativeArray(total.newCases);
      chartsData.totalDeaths.USA = makeCumulativeArray(total.newDeaths);

    }
  }

  return chartsData;
};

export const serializeUsaRegionData = (region: string) => {
  return async ([totalCasesCsv, totalDeathsCsv]: [string, string]) => {
    let chartsData: ChartsData = { totalCases: {}, totalDeaths: {} };

    if (totalCasesCsv && totalDeathsCsv) {
      chartsData = await serializeChartsData(totalCasesCsv, totalDeathsCsv, aggregateRegionData(region));
    }

    return chartsData;
  };
};
