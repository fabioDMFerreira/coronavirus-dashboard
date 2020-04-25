import { AvailableCountriesRegions } from "@common/availableCountriesRegions";
import NavarraRegionDataResponse from "@common/NavarraRegionDataApiResponse";
import CovidCountryRegionData from '@db/models/CovidCountryRegionData.model';

export const getRegionDataAggregated = async (country: string, region: string, from?: Date, to?: Date): Promise<[string, NavarraRegionDataResponse]> => {
  let results;

  if (from && to) {
    results = await CovidCountryRegionData.find({ country, region, time: { $gte: from, $lte: to } }, null, { $sort: { time: -1 } });
  } else {
    results = await CovidCountryRegionData.find({ country, region }, null, { $sort: { time: -1 } });
  }

  const response: NavarraRegionDataResponse = { "dates": {} };

  const aggregator: NavarraRegionDataResponse = results.reduce((agg, result) => {
    const date = Object.keys(result.apiResult.dates)[0];

    agg.dates[date] = result.apiResult.dates[date];

    return agg;
  }, response);

  const aggregatorCountry = Object.keys(aggregator.dates[Object.keys(aggregator.dates)[0]].countries)[0];
  const regionName = aggregator.dates[Object.keys(aggregator.dates)[0]].countries[aggregatorCountry].regions[0].name;

  return[regionName, aggregator];
};

export default async (country: AvailableCountriesRegions, from?: Date, to?: Date): Promise<[string, NavarraRegionDataResponse][]> => {
  const regions = await CovidCountryRegionData.distinct('region', { country });

  return Promise.all(
    regions.map(
      async (region) => {
        return getRegionDataAggregated(country, region, from, to);
      }
    )
  );
};
