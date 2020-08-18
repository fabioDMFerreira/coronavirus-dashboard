import narrativaAvailableCountries from '@common/narrativaAvailableCountries';
import CovidCountryData from '@db/models/CovidCountryData.model';
import CovidCountryRegionData from '@db/models/CovidCountryRegionData.model';
import hash from '@utils/hash';
import YYYYMMDD from '@utils/YYYYMMDD';
import colors from 'colors';

import { getUtcTime } from '../covid/countries/serializeCountryRegionChartData';
import buildCountryNarrativaApiUrl from './buildCountryNarrativaApiUrl';
import fetchNarrativaData from './fetchNarrativaData';

const fetchCountryData = async (country: string) => {
  const cursor = new Date();
  let stop = false;

  while (!stop) {
    const date = YYYYMMDD(cursor);

    const url = buildCountryNarrativaApiUrl(country, date);

    const dbData = await CovidCountryData.findOne({ country, date });

    if (!dbData) {
      console.log(colors.magenta(`fetching data ${country}/${date}`));

      try {
        const apiResult = await fetchNarrativaData(url);

        if (!apiResult || !apiResult.dates || !Object.keys(apiResult.dates).length) {
          if (date !== YYYYMMDD(new Date())) {
            stop = true;
          }
          console.log(hash(JSON.stringify(apiResult)));
        } else {
          const date = Object.keys(apiResult.dates)[0];
          const countryName = Object.keys(apiResult.dates[date].countries)[0];
          const countryData = apiResult.dates[date].countries[countryName];

          const currentDate = new Date(getUtcTime(date));

          await CovidCountryData.findOneAndUpdate({
            country,
            source: "Narrativa",
            time: currentDate,
          }, {
            date: YYYYMMDD(currentDate),
            apiResult,
            totalCases: countryData.today_confirmed,
            newCases: countryData.today_new_confirmed,
            totalDeaths: countryData.today_deaths,
            newDeaths: countryData.today_new_deaths,
          }, { upsert: true });

          const bulk = CovidCountryRegionData.collection.initializeOrderedBulkOp();

          for (let i = 0; i < countryData.regions.length; i++) {
            const region = countryData.regions[i];

            bulk.find({
              country,
              region: region.id,
              time: new Date(getUtcTime(region.date)),
            }).upsert().updateOne({
              date: YYYYMMDD(new Date(region.date)),
              totalCases: region.today_confirmed,
              newCases: region.today_new_confirmed,
              totalDeaths: region.today_deaths,
              newDeaths: region.today_new_deaths,
            });
          }

          await bulk.execute();

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

const fixDBNewCases = async (country: string) => {
  const countryDataRows = await CovidCountryData.find({
    country,
    source: "Narrativa",
  })
    .sort({ time: 1 });

  await Promise.all(
    countryDataRows
      .slice(1)
      .map(async (row, index) => {
        await CovidCountryData
          .findByIdAndUpdate(row._id, {
            $set: {
              newCases: row.totalCases - countryDataRows[index].totalCases,
              newDeaths: row.totalDeaths - countryDataRows[index].totalDeaths
            }
          });
      })
  );

};

export default async () => {
  const allCountries = narrativaAvailableCountries;

  return Promise.all(
    allCountries.map(async country => {
      await fetchCountryData(country);
      await fixDBNewCases(country);
    })
  );
};
