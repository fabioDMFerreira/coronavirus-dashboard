import { getUtcTime } from '@covid/countries/serializeCountryRegionChartData';
import CovidCountryData from '@db/models/CovidCountryData.model';
import YYYYMMDD from '@utils/YYYYMMDD';
export default async () => {

  await CovidCountryData.deleteMany({ country: 'world' });

  const aggregateData = await CovidCountryData
    .aggregate(
      [
        {
          $match: {
            time: { $lt: new Date(YYYYMMDD(new Date())) }
          }
        },
        {
          $group:
          {
            _id: "$date",
            totalCases: { $sum: "$totalCases" },
            newCases: { $sum: "$newCases" },
            totalDeaths: { $sum: "$totalDeaths" },
            newDeaths: { $sum: "$newDeaths" },
            country: { $push: "$country" }
          },
        }
      ]
    );

  await Promise.all(
    aggregateData.map(data => {
      const { totalCases, newCases, totalDeaths, newDeaths } = data;

      return CovidCountryData.findOneAndUpdate(
        {
          country: "world",
          time: new Date(getUtcTime(data._id)),
        }, {
          date: data._id,
          totalCases,
          newCases,
          totalDeaths,
          newDeaths,
        },
        { upsert: true }
      );
    })
  );
};
