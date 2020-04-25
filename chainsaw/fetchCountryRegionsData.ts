import CovidCountryRegionData from '@db/models/CovidCountryRegionData.model';
import hash from '@utils/hash';
import YYYYMMDD from '@utils/YYYYMMDD';
import colors from 'colors';

import { getUtcTime } from '../covid/countries/serializeCountryRegionChartData';
import buildNarrativaApiUrl from './buildNarrativaApiUrl';
import { fetchRegionData } from './fetchNavarraRegionData';
import getCountriesRegionsCombinations from './getCountriesRegionsCombinations';

export const fetchAllCountryRegionData = async (country: string, region: string) => {
  const cursor = new Date();
  let stop = false;

  while (!stop) {
    const date = YYYYMMDD(cursor);

    const url = buildNarrativaApiUrl(country, region, date);

    const dbData = await CovidCountryRegionData.findOne({ country, region, date });

    if (!dbData) {
      console.log(colors.magenta(`fetching data ${country}/${region}/${date}`));

      try {
        const apiResult = await fetchRegionData(url);

        if (!apiResult || !apiResult.dates || !Object.keys(apiResult.dates).length) {
          if (date !== YYYYMMDD(new Date())) {
            stop = true;
          }
          console.log(hash(JSON.stringify(apiResult)));
        } else {
          await CovidCountryRegionData.findOneAndUpdate({
            country,
            region,
            date,
            time: new Date(getUtcTime(date)),
            source: url,
          }, { apiResult }, { upsert: true });
        }


      } catch (err) {
        console.log(colors.red(`got error on getting ${url}`));
      }
    } else {
      console.log(colors.cyan(`${country}/${region}/${date} data already existed in db`));
      stop = true;
    }

    cursor.setDate(cursor.getDate() - 1);
  }


};

export default async () => {
  const allCountriesRegions = await getCountriesRegionsCombinations();

  await Promise.all(
    allCountriesRegions.map(([country, region]) => fetchAllCountryRegionData(country, region))
  );
};
