import { AvailableCountriesRegions } from "@common/availableCountriesRegions";

import aggregateCountryRegionsData from "./aggregateCountryRegionsData";
import getCountryRegionsData from "./getCountryRegionsData";
import serializeCountryRegionChartData, { CountryRegionChartSeries } from "./serializeCountryRegionChartData";

export default async (country: AvailableCountriesRegions) => {
  const regionsData = await getCountryRegionsData(country);

  const regionsSeries: [string, CountryRegionChartSeries][] = regionsData.map(([name, regionData]) => {
    return [name, serializeCountryRegionChartData(country, regionData)];
  });

  const aggregator = aggregateCountryRegionsData(regionsSeries);

  return aggregator;
};
