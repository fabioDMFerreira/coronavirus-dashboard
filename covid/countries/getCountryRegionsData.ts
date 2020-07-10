import { AvailableCountriesRegions } from "@common/availableCountriesRegions";
import { CountryRegionChartSeries } from "@common/types";
import CovidCountryRegionData from '@db/models/CovidCountryRegionData.model';

export const getRegionDataAggregated = async (country: string, region: string, from?: Date, to?: Date): Promise<[string, CountryRegionChartSeries]> => {
  let results;

  if (from && to) {
    results = await CovidCountryRegionData.find({ country, region, time: { $gte: from, $lte: to } }).sort({ time: 1 });
  } else {
    results = await CovidCountryRegionData.find({ country, region }).sort({ time: 1 });
  }

  const defaultResponse = {
    totalCases: [],
    newCases: [],
    totalDeaths: [],
    newDeaths: []
  };

  const aggregator: CountryRegionChartSeries = results.reduce((agg, result) => {

    agg.totalCases.push([result.time.getTime(), result.totalCases]);
    agg.newCases.push([result.time.getTime(), result.newCases]);
    agg.totalDeaths.push([result.time.getTime(), result.totalDeaths]);
    agg.newDeaths.push([result.time.getTime(), result.newDeaths]);

    return agg;
  }, defaultResponse);

  return [region, aggregator];
};

export default async (country: AvailableCountriesRegions, from?: Date, to?: Date): Promise<[string, CountryRegionChartSeries][]> => {
  const regions = await CovidCountryRegionData.distinct('region', { country });

  return Promise.all(
    regions.map(
      async (region) => {
        return getRegionDataAggregated(country, region, from, to);
      }
    )
  );
};
