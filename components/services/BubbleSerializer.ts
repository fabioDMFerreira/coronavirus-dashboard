import Papa from 'papaparse';

import { getUtcDate } from './ChartSerializer';

const serializeOccurrencesData = (headers: string[], values: string[]): [number, number][] => headers.map((date, index) => ([getUtcDate(date), +values[index]]));

export const serializeBubbleData = async (csv: string, datesCursor = 11) => new Promise((accept, reject) => {
  Papa.parse(csv.trim(), {
    complete: (parsed) => {
      const balanceSheet = parsed.data;

      if (!balanceSheet || !balanceSheet.length) {
        return accept();
      }

      const datesHeaders = balanceSheet[0].slice(datesCursor);


      const json = balanceSheet
        .slice(1)
        .reduce((final: { [key: string]: [number, number][] }, actual) => {
          const [, , , , , state, region] = actual;

          const occurrences = actual.slice(datesCursor);

          if (!final[region]) {
            final[region] = serializeOccurrencesData(datesHeaders, occurrences);
          } else if (state) {
            const actualValues = serializeOccurrencesData(datesHeaders, occurrences);
            final[region] = final[region].map(([time, value]: [number, number], index: number) => [time, value + actualValues[index][1]]);
          }

          return final;
        }, {});

      accept(json);
    },
  });
});
