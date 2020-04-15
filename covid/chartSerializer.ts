import getUtcDate from '@utils/getUtcDate';
import calculateGrowthRate from '@utils/calculateGrowthRate';
import { EventsMap, ChartsData } from '@common/types';
import buildSheetFromCSV from '@utils/buildSheetFromCSV';



export function mapGrowth(arr: [number, number][]) {
  if (!arr.length) {
    return [];
  }

  const result = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    result.push([arr[i][0], arr[i][1] - arr[i - 1][1]]);
  }

  return result;
}

export function makeCumulativeArray(arr: [number, number][]) {
  if (!arr.length) {
    return [];
  }

  const result = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    result.push([arr[i][0], arr[i][1] + result[i - 1][1]]);
  }

  return result;
}




export function calculateSerieGrowthRate(serie: Array<number>) {
  if (serie.length <= 1) {
    return [];
  }

  const growthRate = [];

  for (let i = 1; i < serie.length; i++) {
    const actual = serie[i];
    const prev = serie[i - 1];

    growthRate.push(calculateGrowthRate(prev, actual));
  }

  return growthRate;
}


export

const parseCSSEGISheetToJSON = (headerDates: string[], sheet: string[][]): [EventsMap] => {
  const countriesWithGlobalCounters: any = {};
  const stateRecords: any = {};

  const [chartsData] = sheet.reduce(
    ([total]: [EventsMap], row: string[]): [EventsMap] => {
      if (row) {
        const [state, country, , , ...datesOccurences]: string[] = row;

        if (country) {
          if (
            !(country in total)
          ) {
            total[country] = [];
          }

          if (!state) {
            countriesWithGlobalCounters[country] = true;

            datesOccurences.forEach((occurrences, index) => {
              const date = getUtcDate(headerDates[index]);

              if (!date) {
                return;
              }

              total[country].push([date, +occurrences]);
            });
          } else {
            const occurrences = datesOccurences.map((occurrences, index) => {
              const date = getUtcDate(headerDates[index]);

              return [date, +occurrences];
            });

            if (!stateRecords[country]) {
              stateRecords[country] = [{ state, occurrences }];
            } else {
              stateRecords[country].push({ state, occurrences });
            }
          }
        }
      }

      return [total];
    }, [{}],
  );

  Object.keys(stateRecords).forEach((country: string) => {
    const recordsGroup = stateRecords[country];

    if (countriesWithGlobalCounters[country]) {
      recordsGroup.forEach((record: any) => {
        chartsData[record.state] = record.occurrences;
      });
    } else {
      const emptyArray = headerDates.map((time) => ([getUtcDate(time), 0]));

      chartsData[country] = recordsGroup.slice(0).reduce(
        (total: any, recordGroup: any) => total.map(([time, value]: any, index: number) => [time, value + recordGroup.occurrences[index][1]]), emptyArray,
      );
    }
  });


  return [chartsData];
};

export async function parseCSSEGIData(totalCasesCsv: string, totalDeathsCsv: string): Promise<[ChartsData]> {
  const totalCasesSheet = await buildSheetFromCSV(totalCasesCsv);
  const totalDeathsSheet = await buildSheetFromCSV(totalDeathsCsv);

  const tcHeaderDates = totalCasesSheet[0].slice(4);
  const tdHeaderDates = totalDeathsSheet[0].slice(4);

  const [totalCases]: [EventsMap] = parseCSSEGISheetToJSON(tcHeaderDates, totalCasesSheet.slice(1));
  const [totalDeaths]: [EventsMap] = parseCSSEGISheetToJSON(tdHeaderDates, totalDeathsSheet.slice(1));

  return [{
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
  }];
}
