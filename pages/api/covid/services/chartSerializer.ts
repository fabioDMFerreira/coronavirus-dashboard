import Papa from 'papaparse';
import { buildSheetFromCSV } from "./csvUtils";

interface EventsMap {
  [key: string]: Array<[number, number]>
}

export interface ChartsData {
  totalCases: EventsMap,
  totalDeaths: EventsMap,
  newCases?: EventsMap,
  newDeaths?: EventsMap,
}

export function calculateGrowthRate(prev: number, actual: number) {
  return (actual - prev) / prev * 100;
}

export function calculateSerieGrowthRate(serie: Array<number>) {
  if (serie.length <= 1) {
    return [];
  }

  const growthRate = [];

  for (let i = 1; i < serie.length; i++) {
    const actual = serie[i];
    const prev = serie[i - 1];

    growthRate.push(calculateGrowthRate(prev, actual))
  }

  return growthRate
}

export function parseOurWorldInData(csv: string) {

  const sheet = buildSheetFromCSV(csv);

  const totalCases: EventsMap = {};
  const totalDeaths: EventsMap = {};

  sheet.slice(1).forEach(row => {
    if (!row) {
      return;
    }

    const [date, location, , , total_cases, total_deaths]: string[] = row;

    if (!location || !+total_cases) {
      return;
    }

    if (location && !(location in totalCases)) {
      totalCases[location] = [];
      totalDeaths[location] = [];
    }

    const dateMs = new Date(date).getTime()

    totalCases[location].push([dateMs, +total_cases]);
    totalDeaths[location].push([dateMs, +total_deaths]);
  })

  return {
    totalCases,
    totalDeaths,
  }
}

export function getUtcDate(date: string): number {
  const match = /(\d*)\/(\d*)\/(\d*)/.exec(date);

  if (match) {
    return Date.UTC(+('20' + match[3]), +match[1] - 1, +match[2])
  }

  return 0;
}

const parseCSSEGISheetToJSON = (headerDates: string[], sheet: string[][]): [EventsMap] => {
  const countriesWithGlobalCounters: any = {};
  const stateRecords: any = {};

  let [chartsData] = sheet.reduce(
    ([total]: [EventsMap], row: string[]): [EventsMap] => {

      if (row) {
        const [state, country, , , ...datesOccurences]: string[] = row;

        if (country) {
          if (
            !(country in total)
          ) {
            total[country] = []
          }

          if (!state) {
            datesOccurences.forEach((occurrences, index) => {
              const date = getUtcDate(headerDates[index]);

              if (!date) {
                return
              }

              total[country].push([date, +occurrences])
            })
          } else {
            const occurrences = datesOccurences.map((occurrences, index) => {
              const date = getUtcDate(headerDates[index]);

              return [date, +occurrences]
            })

            if (!stateRecords[country]) {
              stateRecords[country] = [{ state, occurrences }]
            } else {
              stateRecords[country].push({ state, occurrences })
            }
          }
        }
      }

      return [total];

    }, [{}]);

  Object.keys(stateRecords).forEach((country: string) => {
    const recordsGroup = stateRecords[country];

    if (countriesWithGlobalCounters[country]) {
      recordsGroup.forEach((record: any) => {
        chartsData[record.state] = record.occurrences;
      })
    } else {
      let emptyArray = headerDates.map((time) => ([getUtcDate(time), 0]));

      chartsData[country] = recordsGroup.slice(0).reduce(
        (total: any, recordGroup: any) => {

          return total.map(([time, value]: any, index: number) => {
            return [time, value + recordGroup.occurrences[index][1]]
          })
        }, emptyArray
      )
    }
  });


  return [chartsData];
}

export function parseCSSEGIData(totalCasesCsv: string, totalDeathsCsv: string): [ChartsData] {
  const totalCasesSheet = buildSheetFromCSV(totalCasesCsv);
  const totalDeathsSheet = buildSheetFromCSV(totalDeathsCsv);

  const tcHeaderDates = totalCasesSheet[0].slice(4);
  const tdHeaderDates = totalDeathsSheet[0].slice(4);

  const [totalCases]: [EventsMap] = parseCSSEGISheetToJSON(tcHeaderDates, totalCasesSheet.slice(1))
  const [totalDeaths]: [EventsMap] = parseCSSEGISheetToJSON(tdHeaderDates, totalDeathsSheet.slice(1))

  return [{
    totalCases,
    totalDeaths,
    newCases: Object.keys(totalCases).reduce((final: EventsMap, country) => {
      final[country] = serializeGrowthArray(totalCases[country]);
      return final
    }, {}),
    newDeaths: Object.keys(totalDeaths).reduce((final: EventsMap, country) => {
      final[country] = serializeGrowthArray(totalDeaths[country]);
      return final
    }, {}),
  }]
}

export function serializeGrowthArray(arr: [number, number][]) {
  if (!arr.length) {
    return [];
  }

  const result = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    result.push([arr[i][0], arr[i][1] - arr[i - 1][1]]);
  }

  return result;
}

export function serializeCumulativeArray(arr: [number, number][]) {
  if (!arr.length) {
    return [];
  }

  const result = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    result.push([arr[i][0], arr[i][1] + result[i - 1][1]]);
  }

  return result;
}

const serializeOccurrencesData = (headers: string[], values: string[]): [number, number][] => {
  return headers.map((date, index) => ([getUtcDate(date), +values[index]]))
}

export const serializeStatesData = async (csv: string, datesCursor=11) => {
  return new Promise((accept, reject) => {
    Papa.parse(csv.trim(), {
      complete: (parsed) => {
        const balanceSheet = parsed.data;

        if (!balanceSheet || !balanceSheet.length) {
          return accept();
        }

        const datesHeaders = balanceSheet[0].slice(datesCursor);


        const json =
          balanceSheet
            .slice(1)
            .reduce((final: { [key: string]: [number, number][] }, actual) => {
              const [, , , , , state, region,] = actual;

              const occurrences = actual.slice(datesCursor);

              if (!final[region]) {
                final[region] = serializeOccurrencesData(datesHeaders, occurrences)
              } else if (state) {
                const actualValues = serializeOccurrencesData(datesHeaders, occurrences);
                final[region] = final[region].map(([time, value]: [number, number], index: number) => {
                  return [time, value + actualValues[index][1]]
                })
              }

              return final;
            }, {})

        accept(json)
      }
    });
  })
}

