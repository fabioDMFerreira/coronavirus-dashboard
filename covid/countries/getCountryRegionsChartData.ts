import { AvailableCountriesRegions } from "@common/availableCountriesRegions";
import covidRepository from "@covid/covid.repository";

import aggregateCountryRegionsData from "./aggregateCountryRegionsData";
import getCountryRegionsData from "./getCountryRegionsData";
import serializeCountryRegionChartData, { CountryRegionChartSeries } from "./serializeCountryRegionChartData";

export default async (country: AvailableCountriesRegions) => {

  const cacheData = await covidRepository.get(`${country}_REGIONS_CHART_DATA`);

  if (cacheData) {
    return cacheData;
  }

  const regionsData = await getCountryRegionsData(country);

  const regionsSeries: [string, CountryRegionChartSeries][] = regionsData.map(([name, regionData]) => {
    return [name, serializeCountryRegionChartData(regionData)];
  });

  const aggregator = aggregateCountryRegionsData(regionsSeries);

  covidRepository.set(`${country}_REGIONS_CHART_DATA`, aggregator);

  return aggregator;
};
