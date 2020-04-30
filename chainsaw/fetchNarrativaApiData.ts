import narrativaAvailableCountries from '@common/narrativaAvailableCountries';
import CovidCountryData from '@db/models/CovidCountryData.model';
import CovidCountryRegionData from '@db/models/CovidCountryRegionData.model';
import hash from '@utils/hash';
import YYYYMMDD from '@utils/YYYYMMDD';
import colors from 'colors';

import { getUtcTime } from '../covid/countries/serializeCountryRegionChartData';
import buildCountryNarrativaApiUrl from './buildCountryNarrativaApiUrl';
import fetchNavarraData from './fetchNarrativaData';

const fetchCountryData = async (country: string) => {
  const cursor = new Date();
  let stop = false;

  while (!stop) {
    const date = YYYYMMDD(cursor);
    console.log('Narrativa', date);

    const url = buildCountryNarrativaApiUrl(country, date);

    const dbData = await CovidCountryData.findOne({ country, date });

    if (!dbData) {
      console.log(colors.magenta(`fetching data ${country}/${date}`));

      try {
        const apiResult = await fetchNavarraData(url);

        if (!apiResult || !apiResult.dates || !Object.keys(apiResult.dates).length) {
          if (date !== YYYYMMDD(new Date())) {
            stop = true;
          }
          console.log(hash(JSON.stringify(apiResult)));
        } else {
          const date = Object.keys(apiResult.dates)[0];
          const countryName = Object.keys(apiResult.dates[date].countries)[0];
          const countryData = apiResult.dates[date].countries[countryName];

          await CovidCountryData.findOneAndUpdate({
            country,
            source: "Narrativa",
            time: new Date(getUtcTime(date)),
          }, {
            date: YYYYMMDD(new Date(getUtcTime(date))),
            apiResult,
            totalCases: countryData.today_confirmed,
            newCases: countryData.today_new_confirmed,
            totalDeaths: countryData.today_deaths,
            newDeaths: countryData.today_new_deaths,
          }, { upsert: true });

          await Promise.all(
            countryData.regions.map(
              region => {
                return CovidCountryRegionData.findOneAndUpdate({
                  country,
                  region: region.id,
                  time: new Date(getUtcTime(region.date)),
                }, {
                  date: YYYYMMDD(new Date(region.date)),
                  totalCases: region.today_confirmed,
                  newCases: region.today_new_confirmed,
                  totalDeaths: region.today_deaths,
                  newDeaths: region.today_new_deaths,
                }, { upsert: true });
              }
            )
          );

        }


      } catch (err) {
        console.log(err, colors.red(`got error on getting ${url}`));
      }
    } else {
      console.log(colors.cyan(`${country}/${date} data already existed in db`));
      stop = true;
    }

    cursor.setDate(cursor.getDate() - 1);
  }

};

export default async () => {
  const allCountries = narrativaAvailableCountries;

  return Promise.all(
    allCountries.map(country => {
      return fetchCountryData(country);
    })
  );
};
