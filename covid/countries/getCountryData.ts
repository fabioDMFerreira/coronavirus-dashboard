import { ChartsData } from '@common/types';
import CovidCountryData from '@db/models/CovidCountryData.model';

export const getCountryDataAggregated = async (country: string, from?: Date, to?: Date): Promise<[string, ChartsData]> => {
  let results;

  if (from && to) {
    results = await CovidCountryData.find({ country, time: { $gte: from, $lte: to } }).sort({ time: 1 });
  } else {
    results = await CovidCountryData.find({ country }).sort({ time: 1 });
  }

  const defaultResponse = {
    totalCases: [],
    newCases: [],
    totalDeaths: [],
    newDeaths: []
  };

  const aggregator: ChartsData = results.reduce((agg, result) => {

    agg.totalCases.push([result.time.getTime(), result.totalCases]);
    agg.newCases.push([result.time.getTime(), result.newCases]);
    agg.totalDeaths.push([result.time.getTime(), result.totalDeaths]);
    agg.newDeaths.push([result.time.getTime(), result.newDeaths]);

    return agg;
  }, defaultResponse);

  return [country, aggregator];
};

export default async (country: string, from?: Date, to?: Date): Promise<[string, ChartsData]> => {
  return getCountryDataAggregated(country, from, to);
};
